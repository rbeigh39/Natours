const Tour = require('./../models/tourModel');
const User = require('./../models/userModel');
const Booking = require('./../models/bookingModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const getOverview = catchAsync(async (req, res, next) => {
   // 1) Get tour data from collection
   const tours = await Tour.find();
   console.log(
      tours[0].startDates[0].toLocaleString('en-us', {
         month: 'long',
         year: 'numeric'
      })
   );

   // 2) Build template: will be build in PUG template
   // 3) Using that template using tour data from 1
   res.status(200).render('overview', {
      title: 'All tours',
      tours
   });
});

const getTour = catchAsync(async (req, res, next) => {
   // 1) Get the data, for the requested tour (includeing reviews and tour guides)
   const tour = await Tour.findOne({ slug: req.params.slug }).populate({
      path: 'reviews',
      select: ['review', 'rating', 'name', 'review', 'rating']
   });

   if (!tour)
      return next(new AppError('There is no tour with that name!', 404));

   // 2) Build template
   // 3) Render template using data from 1
   res.status(200).render('tour', {
      title: `${tour.name} Tour`,
      tour
   });
});

const getLoginForm = (req, res) => {
   res.status(200).render('login', {
      title: 'Log in'
   });
};

const getAccount = (req, res, next) => {
   res.status(200).render('account', {
      title: 'My Account'
   });
};

const updateUserData = catchAsync(async (req, res, next) => {
   console.log('Updating USER!', req.body);

   const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
         name: req.body.name,
         email: req.body.email
      },
      {
         new: true,
         runValidators: true
      }
   );

   res.status(200).render('account', {
      title: 'My Account',
      user: updatedUser
   });
});

const getMyTours = catchAsync(async (req, res, next) => {
   // 1) Find all bookings
   const bookings = await Booking.find({ user: req.user.id });

   // 2) Find tours with the returned Id's
   const tourIds = bookings.map(cur => cur.tour);

   // const tours = await Tour.find({ _id: { $in: tourIds } });
   const tours = await Tour.find({ _id: { $in: tourIds } });

   res.status(200).render('overview', {
      title: 'My bookings',
      tours
   });
});

module.exports = {
   getOverview,
   getTour,
   getLoginForm,
   getAccount,
   updateUserData,
   getMyTours
};
