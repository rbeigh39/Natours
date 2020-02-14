const mongoose = require('mongoose');
const slugify = require('slugify');
// const User = require('./userModel');

const tourSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, 'A tour must have a name'],
         unique: true,
         trim: true,
         minlength: [10, 'A tour name must contain at least 10 characters'],
         maxlength: [40, 'A tour name must contain at most 40 characters']
      },
      slug: String,
      duration: {
         type: Number,
         required: [true, 'A tour must have a duration']
      },
      maxGroupSize: {
         type: Number,
         required: [true, 'A tour must have a group size']
      },
      difficulty: {
         type: String,
         required: [true, 'A tour must have a difficulty'],
         enum: {
            values: ['easy', 'medium', 'difficult'],
            message: 'Difficulty is either: easy, medium or difficult'
         }
      },
      ratingsAverage: {
         type: Number,
         default: 4.5,
         min: [1, 'The rating must be above than or equal to 1.0'],
         max: [5, 'The rating must be below than or equal to 5.0'],
         set: value => Math.round(value * 10) / 10 // 4.789 => 5
      },
      ratingsQuantity: {
         type: Number,
         default: 0
      },
      price: {
         type: Number,
         required: [true, 'A tour must have a price']
      },
      priceDiscount: {
         type: Number,
         validate: {
            validator: function(val) {
               console.log('price', this.price);
               return val < this.price;
            },
            message:
               'Price discount ({VALUE}) must be lower than the original price'
         }
      },
      summary: {
         type: String,
         trim: true,
         required: [true, 'A tour must have a summary']
      },
      description: {
         type: String,
         trim: true
      },
      imageCover: {
         type: String,
         required: [true, 'A tour must have a cover image']
      },
      images: [String],
      createdAt: {
         type: Date,
         default: Date.now(),
         select: false
      },
      startDates: [Date],

      seceretTour: {
         type: Boolean,
         default: false
      },
      startLocation: {
         // GeoJSON
         type: {
            type: String,
            default: 'Point',
            enum: ['Point']
         },
         coordinates: [Number], // Longitude first [longitude, latitude]
         address: String,
         description: String
      },
      locations: [
         {
            type: {
               type: String,
               default: 'Point',
               enum: ['Point']
            },
            coordinates: [Number],
            address: String,
            description: String,
            day: Number
         }
      ],
      guides: [
         {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
         }
      ]
   },
   {
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
   }
);

// Indexes
tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });
tourSchema.index({ startLocation: '2dsphere' });

// Virtual properties
tourSchema.virtual('durationWeeks').get(function() {
   // this keyword points to the current document.
   return this.duration / 7;
});

tourSchema.virtual('reviews', {
   ref: 'Review',
   foreignField: 'tour',
   localField: '_id'
});

// Document middleware: runs before .save() and .create() and not on .insertMany()
tourSchema.pre('save', function(next) {
   // this points to the currently processing document
   this.slug = slugify(this.name, { lower: true });
   next();
});

// tourSchema.pre('save', async function(next) {
//    const guidesPromises = this.guides.map(
//       async cur => await User.findById(cur)
//    );
//    this.guides = await Promise.all(guidesPromises);
//    next();
// });

tourSchema.pre(/^find/, function(next) {
   // this keyword points to the current query.
   this.find({ seceretTour: { $ne: true } });
   this.startsAt = Date.now();
   next();
});

tourSchema.pre(/^find/, function(next) {
   this.populate({
      path: 'guides',
      select: ['-__v', '-passwordChangedAt']
   });
   next();
});

tourSchema.post(/^find/, function(docs, next) {
   console.log(`The query took ${Date.now() - this.startsAt} milliseconds`);
   next();
});

// Aggregation middleware:
// tourSchema.pre('aggregate', function(next) {
//    // this keyword points to the current aggregation
//    this.pipeline().unshift({ $match: { seceretTour: { $ne: true } } });
//    next();
// });

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
