const getPostBodyAsync = require("../utils/getPostBodyAsync");
const response = require("../utils/response");

/**
 * Middleware function to validate user data in a POST request.
 * @param {import('http').IncomingMessage} req - The incoming request object.
 * @param {import('http').ServerResponse} res - The server response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */

const validateUserData = async (req, res, next) => {
  try {
    const body = await getPostBodyAsync(req);

    if (!body.name || !body.phone || !body.email) {
      return response(res, {
        status: 400,
        data: { message: "Name, phone and email are required" },
      });
    }

    req.body = body;

    next(req, res);
  } catch (error) {
    console.log(error);
    response(res, { status: 400, data: { message: error.message } });
  }
};

module.exports = {
  validateUserData,
};
