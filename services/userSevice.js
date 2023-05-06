const fs = require("fs");
const filePath = require("../utils/filePath");

const getUsers = () => {
  const rawJson = fs.readFileSync(filePath);
  const users = JSON.parse(rawJson);

  return users || [];
};

const getUserById = (id) => {
  const users = getUsers();

  return users.find((user) => user.id === Number(id));
};

module.exports = { getUsers, getUserById };
