const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const Email = require('./../utils/email');

const signToken = id => {
   return jwt.sign({ id }, process.env.JWT_SECERET, {
      expiresIn: process.env.JWT_EXPIRES_IN
   });
};

const createSendToken = (user, statusCode, res) => {
   const token = signToken(user._id);
   const cookieOptions = {
      expires: new Date(Date.now() + process.env.JWT_EXPIRES_IN * 86400000),
      httpOnly: true
   };

   if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

   res.cookie('jwt', token, cookieOptions);

   // Remove the password from output
   user.password = undefined;

   res.status(statusCode).json({
      status: 'success',
      token,
      data: {
         user
      }
   });
};

const signup = catchAsync(async (req, res, next) => {
   const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      photo: req.body.photo,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm
   });

   const url = `${req.protocol}://${req.get('host')}/me`;
   console.log(url);
   await new Email(newUser, url).sendWelcome();

   createSendToken(newUser, 201, res);
});

const login = catchAsync(async (req, res, next) => {
   const { email, password } = req.body;

   // 1) Check if the email and password are entered
   if (!email || !password)
      return next(new AppError('Please enter your email and password', 400));

   // 2) Check if the user exists && password is correct
   const user = await User.findOne({ email }).select('+password');

   if (!user || !(await user.checkPassword(password, user.password)))
      return next(new AppError('incorrect email or password', 401));

   // 3) If everything is ok, send token to client
   createSendToken(user, 200, res);
});

const logout = (req, res, next) => {
   res.cookie('jwt', 'logged-out', {
      expires: new Date(Date.now() + 1000),
      httpOnly: true
   });
   res.status(200).json({
      status: 'success'
   });
};

const protect = catchAsync(async (req, res, next) => {
   // 1) Getting the token and check if it is there
   let token;

   if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
   ) {
      token = req.headers.authorization.split(' ')[1];
   } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
   }

   if (!token)
      return next(
         new AppError('You are not logged in! Please log in to get access', 401)
      );

   // 2) Verification of the token
   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECERET);

   // 3) Check if the user still exist
   const currentUser = await User.findById(decoded.id);
   if (!currentUser)
      return next(
         new AppError(
            'The user belonging to this token does no longer exists.',
            401
         )
      );

   // 4) Check if user changed password after JWT was issued
   if (currentUser.changedPasswordAfter(decoded.iat))
      return next(
         new AppError(
            'User recently changed password! Please log in again.',
            401
         )
      );

   // GRANT ACCESSS TO THE PROTECTED ROUTE
   req.user = currentUser;
   res.locals.user = currentUser;
   next();
});

// Only for rendered pages, no errors
const isLoggedIn = async (req, res, next) => {
   try {
      // 1) Getting the token and check if it is there
      if (req.cookies.jwt) {
         // 1) Verification of the token

         const decoded = await promisify(jwt.verify)(
            req.cookies.jwt,
            process.env.JWT_SECERET
         );

         // 2) Check if the user still exist
         const currentUser = await User.findById(decoded.id);
         if (!currentUser) return next();

         // 3) Check if user changed password after JWT was issued
         if (currentUser.changedPasswordAfter(decoded.iat)) return next();

         // THERE IS A LOGGED IN USER
         res.locals.user = currentUser;
         return next();
      }
      next();
   } catch (err) {
      return next();
   }
};

const restrictTo = (...roles) => {
   return (req, res, next) => {
      if (roles.includes(req.user.role)) return next();

      next(new AppError('You are not authorized to perform this action.', 403));
   };
};

const forgotPassword = catchAsync(async (req, res, next) => {
   // 1) Get user based on POSTed email
   const user = await User.findOne({ email: req.body.email });

   if (!user) return next(new AppError('No user found with that id', 400));

   // 2) Generate the random token
   const resetToken = user.createPasswordResetToken();

   await user.save({ validateBeforeSave: false });

   // 3) Send it to user's email
   const url = `${req.protocol}://${req.get(
      'host'
   )}/api/v1/users/resetPassword/${resetToken}`;

   const message = `Forgot your password? send a PATCH request to ${url} with your password and passwordConfirm.\nIf you didn't forget your password, please ignore this email.`;

   /* TO BE ACTIVATED WHEN THE MAILTRAP IS READY */

   try {
      // await sendEmail({
      //    email: user.email,
      //    subject: 'Your password reset token. valid for 10 min.',
      //    message
      // });

      res.status(200).json({
         status: 'success',
         message: 'Token send to the email'
      });
   } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;

      await user.save({ validateBeforeSave: false });

      return next(
         new AppError(
            'There was an error sending the email! Please try again later.',
            500
         )
      );
   }

   // For testing only
   // res.status(200).json({
   //    status: 'success',
   //    message: 'Token send to the email',
   //    resetToken
   // });
});

const resetPassword = catchAsync(async (req, res, next) => {
   // 1) Get user based on the token
   const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

   const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gte: Date.now() }
   });

   if (!user) return next(new AppError('The token is invalid or has expired'));

   // 2) Set the new password if the token has not expired and there is a user
   user.password = req.body.password;
   user.passwordConfirm = req.body.passwordConfirm;
   user.passwordResetToken = undefined;
   user.passwordResetExpires = undefined;

   await user.save();

   // 3) Update changedPasswordAt property for the current user
   // is done by the pre-save middleware

   // 4) Log the user in. send JWT
   createSendToken(user, 200, res);
});

const updatePassword = catchAsync(async (req, res, next) => {
   const { currentPassword, password, passwordConfirm } = req.body;

   // 1) Get the user from collection
   const user = await User.findById(req.user.id).select('+password');

   // 2) Check if the POSTed password is correct
   if (!(await user.checkPassword(currentPassword, user.password)))
      return next(new AppError('Incorrect password! Please try again', 401));

   // 3) If so, update the password
   user.password = password;
   user.passwordConfirm = passwordConfirm;
   await user.save();

   // 4) Log user in, send JWT
   createSendToken(user, 200, res);
});

module.exports = {
   signup,
   login,
   logout,
   protect,
   restrictTo,
   forgotPassword,
   resetPassword,
   updatePassword,
   isLoggedIn
};
