const fs = require("fs");
const filePath = require("../utils/filePath");
const userSevice = require("../services/userSevice");
const response = require("../utils/response");

/**
 * Controller function to create new user
 * @param {import('http').IncomingMessage} req - The incoming request object.
 * @param {import('http').ServerResponse} res - The server response object.
 * @returns {import('http').ServerResponse} The server response
 */
const createUser = (req, res) => {
  try {
    let body = req.body;
    const users = userSevice.getUsers();

    const foundUser = users.find((user) => user.name === body.name);

    if (foundUser) {
      return response(res, {
        data: { message: `'${body.name}' already exists!` },
        status: 409,
      });
    }

    body.id = users.length + 1;
    users.push(body);

    fs.writeFileSync(filePath, JSON.stringify(users));

    response(res, { data: users, status: 201 });
  } catch (error) {
    response(res, { status: 400, data: { message: error.message } });
  }
};

/**
 * Controller function to get users
 * @param {import('http').IncomingMessage} req - The incoming request object.
 * @param {import('http').ServerResponse} res - The server response object.
 * @returns {import('http').ServerResponse} The server response
 */
const getUsers = (req, res) => {
  const users = userSevice.getUsers();

  response(res, { data: users });
};

/**
 * Controller function to get user by user id
 * @param {import('http').IncomingMessage} req - The incoming request object.
 * @param {import('http').ServerResponse} res - The server response object.
 * @returns {import('http').ServerResponse} The server response
 */
const getUserById = (req, res) => {
  const { id } = req.params;

  const user = userSevice.getUserById(id);

  const data = user ? user : { message: `user not found for id '${id}'` };
  response(res, { data });
};

/**
 * Controller function to update user by user id
 * @param {import('http').IncomingMessage} req - The incoming request object.
 * @param {import('http').ServerResponse} res - The server response object.
 * @returns {import('http').ServerResponse} The server response
 */
const updateUser = (req, res) => {
  const { id } = req.params;
  let users = userSevice.getUsers();

  const foundUser = users.find((user) => user.id === Number(id));
  if (!foundUser) {
    return response(res, { data: { message: "user not found" }, status: 400 });
  }

  users = users.map((user) => {
    if (user.id === Number(id)) {
      return {
        ...user,
        ...req.body,
      };
    }
    return user;
  });

  fs.writeFileSync(filePath, JSON.stringify(users));

  response(res, {
    data: users,
    status: 201,
    message: "user successfully updated",
  });
};

/**
 * Controller function to delete user by user id
 * @param {import('http').IncomingMessage} req - The incoming request object.
 * @param {import('http').ServerResponse} res - The server response object.
 * @returns {import('http').ServerResponse} The server response
 */
const deleteUserById = (req, res) => {
  const { id } = req.params;
  let users = userSevice.getUsers();

  const foundUser = users.find((user) => user.id === Number(id));
  if (!foundUser) {
    return response(res, { data: { message: "user not found" }, status: 400 });
  }

  users = users.filter((user) => user.id !== Number(id));
  fs.writeFileSync(filePath, JSON.stringify(users));

  response(res, { status: 204 });
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUserById,
};
