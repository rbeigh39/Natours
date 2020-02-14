const express = require('express');
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController');
const bookingController = require('./../controllers/bookingController');

const router = express.Router();

// router.use((req, res, next) => {
//    console.log('into the middlware');
//    next();
// },)

// Protected routes
router.get('/me', authController.protect, viewsController.getAccount);
router.get('/my-tours', authController.protect, viewsController.getMyTours);

router.post(
   '/submit-user-data',
   authController.protect,
   viewsController.updateUserData
);

router.use(authController.isLoggedIn);

// Routes for which we have to check if the user is logged in
router.get(
   '/',
   bookingController.createBookingCheckout,
   viewsController.getOverview
);
router.get('/tour/:slug', viewsController.getTour);
router.get('/login', viewsController.getLoginForm);

module.exports = router;
