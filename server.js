const http = require("http");
const routes = require("./routes");
const { loggerMiddleware } = require("./middlewares");

const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  const { url, method } = req;
  let handler = routes[url] && routes[url][method];

  if (!handler) {
    const routeKeys = Object.keys(routes).filter((key) => key.includes(":"));

    const matchedKey = routeKeys.find((key) => {
      const regex = new RegExp(`^${key.replace(/:[^/]+/g, "([^/]+)")}$`);
      return regex.test(url);
    });

    if (matchedKey) {
      const regex = new RegExp(`^${matchedKey.replace(/:[^/]+/g, "([^/]+)")}$`);
      const dynamicParams = regex.exec(url).slice(1);
      const dynamicHandler = routes[matchedKey][method];

      const paramKeys = matchedKey
        .match(/:[^/]+/g)
        .map((key) => key.substring(1));

      req.params = dynamicParams.reduce(
        (acc, val, i) => ({ ...acc, [paramKeys[i]]: val }),
        {}
      );

      handler = dynamicHandler;
    }
  }

  if (!handler) {
    handler = routes.notFound;
  }

  handler(req, res);
});

// middleware
server.on("request", loggerMiddleware);

server.listen(PORT, () => console.log(`server listening on port: ${PORT}`));
