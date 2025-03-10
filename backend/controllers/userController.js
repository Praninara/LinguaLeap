import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

/**
 * Authenticate user and get token
 * @route   POST /api/users/auth
 * @access  Public
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      totalXP: user.totalXP,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

/**
 * Register a new user
 * @route   POST /api/users
 * @access  Public
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    totalXP: 0,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      totalXP: user.totalXP,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

/**
 * Logout user and clear cookie
 * @route   POST /api/users/logout
 * @access  Public
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

/**
 * Get user profile
 * @route   GET /api/users/profile
 * @access  Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      totalXP: user.totalXP,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

/**
 * Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      totalXP: updatedUser.totalXP,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

/**
 * Delete user account
 * @route   DELETE /api/users/:id
 * @access  Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user._id.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to delete this user');
    }

    await User.deleteOne({ _id: user._id });
    res.json({ message: 'User deleted successfully' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

/**
 * Update user XP
 * @route   POST /api/users/:name/addXP
 * @access  Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateUserXP = asyncHandler(async (req, res) => {
  const { xp } = req.body;
  const user = await User.findOne({ name: req.params.name });

  if (user) {
    user.totalXP = (user.totalXP || 0) + xp;
    await user.save();

    res.json({
      name: user.name,
      totalXP: user.totalXP,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

/**
 * Get user XP
 * @route   GET /api/users/:name/totalXP
 * @access  Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getUserXP = asyncHandler(async (req, res) => {
  const user = await User.findOne({ name: req.params.name });

  if (user) {
    res.json({
      name: user.name,
      totalXP: user.totalXP || 0,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  updateUserXP,
  getUserXP,
};