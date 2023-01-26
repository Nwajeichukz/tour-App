const User = require('../models/userModel');
const catchAsync = require('../utilis/catchAsync');
const AppError = require('../utilis/appError');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// ROUTE HANDLERS
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create an error if user POSTs(update) password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. please use / UpdateMyPassword',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    date: {
      user: updatedUser,
    },
  });
});

exports.createUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined: Please use sign up instead',
  });
};

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getAllUsers = factory.getAll(User);
exports.getUsers = factory.getOne(User);

// DO NOT UPDATE PASSWORDS WITH THIS
exports.updateUsers = factory.updateOne(User);
exports.deleteUsers = factory.deleteOne(User);
