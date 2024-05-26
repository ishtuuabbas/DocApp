const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../model/user");

exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res
      .status(422)
      .json({ message: "Validation Failed!", errors: errorMessages });
  }

  const { name, email, password, role } = req.body;
  try {
    const alreadyExists = await User.findOne({ email: email });
    if (alreadyExists) {
      const error = new Error("User with this email already exists!");
      error.statusCode = 409;
      throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
    });
    await user.save();
    
    res.status(201).json({
      message: "User Created Successfully!",
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res
      .status(422)
      .json({ message: "Validation Failed!", errors: errorMessages });
  }

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("User with this email does not exist!");
      error.statusCode = 404;
      throw error;
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Invalid Password!");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET_STRING,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "User Logged In Successfully!",
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: token,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find({}, { password: 0 });
    if (allUsers.length === 0) {
      const error = new Error("Can't Find Any User!");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: "All Users Are Fetched Successfully!",
      allUsers: allUsers,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  const userId = req.params.userId;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const error = new Error("Invalid user ID.");
    error.statusCode = 400;
    return next(error);
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ user: user });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  const userId = req.params.userId;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const error = new Error("Invalid user ID.");
    error.statusCode = 400;
    return next(error);
  }

  try {
    const user = await User.findByIdAndRemove(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while deleting the user." });
  }
};
