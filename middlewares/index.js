/**
 * Middleware function that logs the incoming request method and URL to the console.
 *
 * @param {import('http').IncomingMessage} req - The incoming request object.
 * @param {import('http').ServerResponse} res - The server response object.
 * @returns {void}
 */
const loggerMiddleware = (req, res) => {
  console.log(`${req.method} ${req.url}`);
};

module.exports = {
  loggerMiddleware,
};
