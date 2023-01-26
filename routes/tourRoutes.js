const express = require('express');
const tourControllers = require('../controllers/tourController');
const authControllers = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);

router
  .route('/top-5-cheap')
  .get(tourControllers.aliasTopTours, tourControllers.getAllTours);

router.route('/tour-stats').get(tourControllers.getTourStats);
router
  .route('/monthly-plan/:year')
  .get(
    authControllers.protect,
    authControllers.restrictTo('admin', 'lead-guide'),
    tourControllers.getMonthlyPlan
  );

// router.route(./tours-within/:distance/center/:latling)

router
  .route('/')
  .get(tourControllers.getAllTours)
  .post(
    authControllers.protect,
    authControllers.restrictTo('admin', 'lead-guide'),
    tourControllers.createTour
  );

router
  .route('/:id')
  .get(tourControllers.getTour)
  .patch(
    authControllers.protect,
    authControllers.restrictTo('admin', 'lead-guide'),
    tourControllers.deleteTour,
    tourControllers.updateTour
  )
  .delete(
    authControllers.protect,
    authControllers.restrictTo('admin', 'lead-guide'),
    tourControllers.deleteTour
  );

module.exports = router;
