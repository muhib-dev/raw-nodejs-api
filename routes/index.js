const userController = require("../controllers/userController");
const response = require("../utils/response");
const { userPostValidation } = require("../validation/userValidation");

const routes = {
  "/": {
    GET: (_req, res) => {
      response(res, { data: { message: "running nodejs api" } });
    },
  },
  "/users": {
    GET: userController.getUsers,
    POST: (req, res) => {
      userPostValidation(req, res, () => {
        userController.createUser(req, res);
      });
    },
  },
  "/users/:id": {
    GET: userController.getUserById,
    DELETE: userController.deleteUserById,
    PUT: (req, res) => {
      userPostValidation(req, res, () => {
        userController.updateUser(req, res);
      });
    },
  },
  "/users/:id/name/:name": {
    GET: userController.getUserById,
    DELETE: userController.deleteUserById,
    PUT: (req, res) => {
      userPostValidation(req, res, () => {
        userController.updateUser(req, res);
      });
    },
  },

  notFound: (_req, res) => {
    response(res, {
      status: 404,
      data: { message: "requested resource not found!" },
    });
  },
};

module.exports = routes;
