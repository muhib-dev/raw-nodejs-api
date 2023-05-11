const fs = require("fs/promises");
const filePath = require("./filePath");

/**
 * Writes data to a file asynchronously.
 * @param {object} data - The data to be written to the file.
 * @returns {Promise<void>} A promise that resolves when the file has been written.
 */
const writeDataAsync = (data) => {
  return fs.writeFile(filePath, JSON.stringify(data));
};

/**
 * Reads data from a file asynchronously.
 * @returns {Promise<object[]>} A promise that resolves to an array of objects read from the file.
 * If the file is empty or doesn't exist, an empty array is returned.
 */
const readDataAsync = async () => {
  const rawJson = await fs.readFile(filePath);
  const data = JSON.parse(rawJson) || [];

  return data;
};

module.exports = { writeDataAsync, readDataAsync };
