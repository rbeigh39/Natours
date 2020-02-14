const mongoose = require('mongoose');
const Tour = require('./tourModel');

const reviewSchema = new mongoose.Schema(
   {
      review: {
         type: String,
         required: [true, 'Review cannot be empty'],
         trim: true
      },
      rating: {
         type: Number,
         required: [true, 'A review must have a rating'],
         min: [1, 'A review must be equal to or above than 1.0'],
         max: [5, 'A review must be equal to or below than 5.0']
      },
      createdAt: {
         type: Date,
         default: Date.now
      },
      tour: {
         type: mongoose.Schema.ObjectId,
         ref: 'Tour',
         required: [true, 'A review must belong to a tour']
      },
      user: {
         type: mongoose.Schema.ObjectId,
         ref: 'User',
         required: [true, 'A review must belong to a user']
      }
   },
   {
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
   }
);

// Indexes
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function(next) {
   this.populate({
      path: 'user',
      select: ['name', 'photo']
   });

   next();
});

reviewSchema.statics.calcAverageRatings = async function(tourId) {
   // this keyword points to the current model
   const stats = await this.aggregate([
      {
         $match: { tour: tourId }
      },
      {
         $group: {
            _id: '$tour',
            nRatings: { $sum: 1 },
            avgRating: { $avg: '$rating' }
         }
      }
   ]);

   if (stats.length > 0) {
      await Tour.findByIdAndUpdate(tourId, {
         ratingsQuantity: stats[0].nRatings,
         ratingsAverage: stats[0].avgRating
      });
   } else {
      await Tour.findByIdAndUpdate(tourId, {
         ratingsQuantity: 0,
         ratingsAverage: 4.5
      });
   }
};

reviewSchema.post('save', function() {
   // this: points to current review
   this.constructor.calcAverageRatings(this.tour);
});

reviewSchema.pre(/^findOneAnd/, async function(next) {
   // this: points to the current query
   this.r = await this.findOne();
   next();
});

reviewSchema.post(/^findOneAnd/, function() {
   this.r.constructor.calcAverageRatings(this.r.tour);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

/*
Getting all reviews: end-point
Creating new reviews: end-point

Create the controller file. in there, create the controller functions. 
Also, create the routes in the reviewRoutes file.

By the end, create some new reviews and also retrive them from the database using getAllReviews
*/
