/**
 * Not Found Error Handler
 * Handles 404 errors for undefined routes
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Global Error Handler
 * Handles all errors in the application
 * 
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const errorHandler = (err, req, res, next) => {
  // If status code is 200, set it to 500 (Internal Server Error)
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Special handling for Mongoose bad ObjectId
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }

  res.status(statusCode).json({
    message,
    // Only show stack trace in development
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };