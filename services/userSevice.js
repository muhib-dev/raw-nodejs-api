const { readDataAsync } = require("../utils/fileHelperAsync");

/**
 * get users
 * @returns {Promise} a promise users[]
 */
const getUsers = () => {
  return readDataAsync();
};

/**
 * get user by user id
 * @param {number} id -user id
 * @returns {Object} user
 */
const getUserById = async (id) => {
  const users = await getUsers();

  return users.find((user) => user.id === Number(id));
};

module.exports = { getUsers, getUserById };
