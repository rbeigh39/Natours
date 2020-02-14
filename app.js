const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const viewRouter = require('./routes/viewRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

// Create Express application:
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public'))); // serve static files

// Rate limiter
const limiter = {
   max: 100,
   windowMs: 3600000,
   message: 'Too many request from this IP. Please try again in an hour.'
};
app.use('/api', rateLimit(limiter));

app.use('/overview.html', (req, res) => {
   res.status(200).json({
      status: 'success',
      message: 'Done'
   });
});

// 1) Middlewares
// Set security HTTP headers
app.use(helmet());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Body parser: Reading data from the body into req.body
app.use(express.json({ limit: '10kb' })); // also limit the incoming body data to 10kb

app.use(express.urlencoded({ extended: true, limit: '10kb' })); // to parse the URL encoded form data

// Cookie parser
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS attacks
app.use(xss());

// Prevent parameter pollution
app.use(
   hpp({
      whitelist: [
         'duration',
         'ratingsAverage',
         'ratingsQuantity',
         'maxGroupSize',
         'difficulty',
         'price'
      ]
   })
);

app.use((req, res, next) => {
   // console.log('Hello from the middleware!');
   // console.log(req.cookies);
   next();
});

// 2) Routers
app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

app.all('*', (req, res, next) => {
   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
