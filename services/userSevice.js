const fs = require("fs");
const filePath = require("../utils/filePath");

/**
 * get users
 * @returns {Array} users[]
 */
const getUsers = () => {
  const rawJson = fs.readFileSync(filePath);
  const users = JSON.parse(rawJson);

  return users || [];
};

/**
 * get user by user id
 * @param {number} id -user id
 * @returns {Object} user
 */
const getUserById = (id) => {
  const users = getUsers();

  return users.find((user) => user.id === Number(id));
};

module.exports = { getUsers, getUserById };
