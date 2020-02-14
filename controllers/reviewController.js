const Review = require('./../models/reviewModel');
const factory = require('./handlerFactory');
// const catchAsync = require('./../utils/catchAsync');
// const AppError = require('./../utils/appError');

const getAllReviews = factory.getAll(Review);
const getReview = factory.getOne(Review);
const createReview = factory.createOne(Review);
const updateReview = factory.updateOne(Review);
const deleteReview = factory.deleteOne(Review);

const setTourUserIds = (req, res, next) => {
   // allow nested routes
   if (!req.body.tour) req.body.tour = req.params.tourId;
   if (!req.body.user) req.body.user = req.user.id;

   next();
};

module.exports = {
   getAllReviews,
   getReview,
   createReview,
   deleteReview,
   updateReview,
   setTourUserIds
};
