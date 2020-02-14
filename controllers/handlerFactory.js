const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

const createOne = Model =>
   catchAsync(async (req, res, next) => {
      const doc = await Model.create(req.body);

      res.status(201).json({
         status: 'success',
         data: {
            data: doc
         }
      });
   });

const getAll = Model =>
   catchAsync(async (req, res, next) => {
      // To allow for nested get reviews on tour
      let filter;
      if (req.params.tourId) filter = { tour: req.params.tourId };

      // Execute the query
      const features = new APIFeatures(Model.find(filter), req.query)
         .filter()
         .sort()
         .limitFields()
         .paginate();

      // const docs = await features.query.explain();
      const docs = await features.query;

      // Send response
      res.status(200).json({
         status: 'success',
         results: docs.length,
         data: {
            data: docs
         }
      });
   });

const getOne = (Model, popOptions) =>
   catchAsync(async (req, res, next) => {
      let query = Model.findById(req.params.id);
      if (popOptions) query = query.populate(popOptions);

      const doc = await query;

      if (!doc)
         return next(new AppError('No document found with that ID', 404));

      res.status(200).json({
         status: 'success',
         data: {
            doc
         }
      });
   });

const updateOne = Model =>
   catchAsync(async (req, res, next) => {
      const updatedDoc = await Model.findByIdAndUpdate(
         req.params.id,
         req.body,
         {
            new: true,
            runValidators: true
         }
      );

      if (!updatedDoc)
         return next(new AppError('No document found with that ID', 404));

      res.status(200).json({
         status: 'success',
         data: {
            data: updatedDoc
         }
      });
   });

const deleteOne = Model =>
   catchAsync(async (req, res, next) => {
      const doc = await Model.findByIdAndDelete(req.params.id);

      if (!doc)
         return next(new AppError('No document found with that ID', 404));

      res.status(204).json({
         status: 'success',
         data: null
      });
   });

module.exports = {
   createOne,
   getAll,
   getOne,
   updateOne,
   deleteOne
};
