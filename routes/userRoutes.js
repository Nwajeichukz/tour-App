const express = require('express');
const userControllers = require('../controllers/userController');
const authControllers = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authControllers.signup);
router.post('/login', authControllers.login);

router.post('/forgotPassword', authControllers.forgotPassword);
router.patch('/resetPassword/:token', authControllers.resetPassword);

// Protect Routes that comes after Middleware, caues middleware runs in sequence
router.use(authControllers.protect);

router.patch('/updateMyPassword', authControllers.updatePassword);
router.get('/me', userControllers.getMe, userControllers.getUsers);
router.patch('/updateMe', userControllers.updateMe);
router.delete('/deleteMe', userControllers.deleteMe);

// Restricted Routes too only ADMINS
router.use(authControllers.restrictTo('admin'));

router
  .route('/')
  .get(userControllers.getAllUsers)
  .post(userControllers.createUsers);

router
  .route('/:id')
  .get(userControllers.getUsers)
  .patch(userControllers.updateUsers)
  .delete(userControllers.deleteUsers);

module.exports = router;
