// An error that carries an HTTP status code (400 bad input, 401 not logged in, 404 not found...).
export class AppError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}

// Wraps an async route function so any error it throws is passed to Express's
// error handler instead of crashing the request.
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);