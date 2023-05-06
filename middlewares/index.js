const loggerMiddleware = (req, _res) => {
  console.log(`${req.method} ${req.url}`);
};

module.exports = {
  loggerMiddleware,
};
