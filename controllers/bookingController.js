const stripe = require('stripe')(process.env.STRIPE_SECERET_KEY);
const Tour = require('./../models/tourModel');
const Booking = require('./../models/bookingModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');
// const AppError = require('./../utils/appError');

const getCheckoutSesssion = catchAsync(async (req, res, next) => {
   // 1) Ge the currently booked tour
   const tour = await Tour.findById(req.params.tourId);

   // 2) Create checkout session
   const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      success_url: `${req.protocol}://${req.get('host')}/?tour=${
         req.params.tourId
      }&user=${req.user.id}&price=${tour.price}`,
      cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
      customer_email: req.user.email,
      client_reference_id: req.params.tourId,
      line_items: [
         {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [`http://www.natours.dev/img/tours/${tour.imageCover}`],
            amount: tour.price * 100,
            currency: 'usd',
            quantity: 1
         }
      ]
   });

   // 2) Create session as response
   res.status(200).json({
      status: 'success',
      session
   });
});

const createBookingCheckout = catchAsync(async (req, res, next) => {
   // This is only temporary, anyone can make booking without paying
   const { tour, user, price } = req.query;

   if (!tour || !user || !price) return next();
   await Booking.create({ tour, price, user });

   res.redirect(req.originalUrl.split('?')[0]);
});

const createBooking = factory.createOne(Booking);
const getBooking = factory.getOne(Booking);
const getAllBookings = factory.getAll(Booking);
const updateBooking = factory.updateOne(Booking);
const deleteBooking = factory.deleteOne(Booking);

module.exports = {
   getCheckoutSesssion,
   createBookingCheckout,
   createBooking,
   getBooking,
   updateBooking,
   deleteBooking,
   getAllBookings
};
