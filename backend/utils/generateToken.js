import jwt from 'jsonwebtoken';

/**
 * Generate JWT Token and set cookie
 * Creates a JWT token and sets it in an HTTP-only cookie
 * 
 * @param {Object} res - Express response object
 * @param {string} userId - MongoDB user ID
 */
const generateToken = (res, userId) => {
  // Create token with user ID and expiration
  const token = jwt.sign({ userId }, 'your_jwt_secret', {
    expiresIn: '30d',
  });

  // Set token in HTTP-only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Protect against CSRF
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  });
};

export default generateToken;