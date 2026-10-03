const User = require('../models/userModel');
const AppError = require('../utils/appError');

exports.signUp = async ({
  firstName,
  lastName,
  email,
  password,
  phone,
  address,
}) => {
  const existUser = await User.findOne({ email });
  if (existUser) {
    throw new AppError('Email already in use', 409);
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    phone,
    addresses: address ? [{ address, isDefault: true }] : [],
  });
  return user;
};
