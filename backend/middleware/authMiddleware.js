import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

/**
 * Protect routes middleware
 * Verifies JWT token and attaches user to request
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;

  if (token) {
    try {
      // Verify token
      const decoded = jwt.verify(token, 'your_jwt_secret');
      
      // Attach user to request (excluding password)
      req.user = await User.findById(decoded.userId).select('-password');
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { protect };