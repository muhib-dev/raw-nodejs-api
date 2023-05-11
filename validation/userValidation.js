const response = require("../utils/response");

const userPostValidation = (req, res, next) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    try {
      body = body ? JSON.parse(body) : {};

      if (!body.name || !body.phone || !body.email) {
        return response(res, {
          status: 400,
          data: { message: "Name, phone and email are required" },
        });
      }

      req.body = body;

      next();
    } catch (error) {
      console.log(error);
      response(res, { status: 400, data: { message: error.message } });
    }
  });
};

module.exports = {
  userPostValidation,
};
