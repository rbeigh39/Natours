const multer = require('multer');
const sharp = require('sharp');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

/* MULTER */

// const multerStorage = multer.diskStorage({
//    destination: (req, file, cb) => {
//       cb(null, 'public/img/users');
//    },
//    filename: (req, file, cb) => {
//       const ext = file.mimetype.split('/')[1];
//       cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//    }
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
   if (file.mimetype.startsWith('image')) {
      return cb(null, true);
   }

   cb(new AppError('Not an image! Please upload only images', 400), false);
};

const upload = multer({
   storage: multerStorage,
   fileFilter: multerFilter
});

const uploadUserPhoto = upload.single('photo');

const resizeUserPhoto = catchAsync(async (req, res, next) => {
   if (!req.file) return next();

   req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

   await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/users/${req.file.filename}`);

   next();
});

/* HELPER FUNCTIONS */
const filterObj = (object, ...allowedFields) => {
   const newObj = {};
   Object.keys(object).forEach(cur => {
      if (allowedFields.includes(cur)) newObj[cur] = object[cur];
   });

   return newObj;
};

const getMe = (req, res, next) => {
   req.params.id = req.user.id;
   next();
};

const createUser = (req, res) => {
   res.status(500).json({
      status: 'error',
      data: {
         tour: 'This route is not defined! Please use /signup instead'
      }
   });
};

const getAllUsers = factory.getAll(User);
const getUser = factory.getOne(User);
const updateUser = factory.updateOne(User); // Do NOT updata password with this!
const deleteUser = factory.deleteOne(User);

const updateMe = catchAsync(async (req, res, next) => {
   // 1) Create an error if the user POSTs password data
   if (req.body.password || req.body.passwordConfirm)
      return next(
         new AppError(
            'This route is not for password updates! Please use /updateMyPassword instead',
            400
         )
      );

   // 2) Filter out unwanted field names that are not allowed to be updated
   const filteredBody = filterObj(req.body, 'name', 'email');
   if (req.file) filteredBody.photo = req.file.filename;

   // 3) Update the user document
   const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      filteredBody,
      {
         new: true,
         runValidators: true
      }
   );

   res.status(200).json({
      status: 'success',
      data: {
         user: updatedUser
      }
   });
});

const deleteMe = catchAsync(async (req, res, next) => {
   await User.findByIdAndUpdate(req.user._id, { active: false });

   res.status(204).json({
      status: 'success',
      data: null
   });
});

module.exports = {
   getMe,
   getAllUsers,
   createUser,
   getUser,
   updateUser,
   deleteUser,
   updateMe,
   deleteMe,
   uploadUserPhoto,
   resizeUserPhoto
};
