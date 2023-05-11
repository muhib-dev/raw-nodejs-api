const userController = require("../controllers/userController");
const response = require("../utils/response");
const { validateUserData } = require("../validation/userValidation");

/**
 * Defines the routes and associated controllers for the application.
 *
 * @type {Object}
 * @property {Object} / - The root route.
 * @property {Object} /users - The users route.
 * @property {Object} /users/:id - The user by ID route.
 * @property {Function} notFound - The not found route controller.
 */
const routes = {
  "/": {
    GET: (_req, res) => {
      response(res, { data: { message: "running nodejs api" } });
    },
  },
  "/users": {
    GET: userController.getUsers,
    POST: (req, res) => {
      validateUserData(req, res, userController.createUser);
    },
  },
  "/users/:id": {
    GET: userController.getUserById,
    DELETE: userController.deleteUserById,
    PUT: (req, res) => {
      validateUserData(req, res, userController.updateUser);
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
