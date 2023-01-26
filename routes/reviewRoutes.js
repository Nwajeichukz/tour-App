const express = require('express');
const reviewControllers = require('../controllers/reviewController');
const authControllers = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authControllers.protect);

router
  .route('/')
  .get(reviewControllers.getAllReviews)
  .post(
    authControllers.restrictTo('user'),
    reviewControllers.setTourUserIds,
    reviewControllers.createReview
  );

router
  .route('/:id')
  .get(reviewControllers.getReview)
  .patch(
    authControllers.restrictTo('user', 'admin'),
    reviewControllers.updateReview
  )
  .delete(reviewControllers.deleteReview);

module.exports = router;
