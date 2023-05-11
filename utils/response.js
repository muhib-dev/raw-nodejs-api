/**
 * Sends a response to the client with the specified data, status code, and content type.
 *
 * @param {import('http').ServerResponse} res - The server response object.
 * @param {Object} options - The response options object.
 * @param {Object} options.data - The response data object.
 * @param {number} options.status - The response status code.
 * @param {string} options.contentType - The response content type.
 */

const response = (
  res,
  { data = {}, status = 200, contentType = "application/json" }
) => {
  res.writeHead(status, { "Content-Type": contentType });
  res.write(JSON.stringify(data));
  res.end();
};

module.exports = response;
