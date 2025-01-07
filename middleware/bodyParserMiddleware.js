const bodyParser = require("body-parser");

const bodyParserMiddleware = bodyParser.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  },
});

module.exports = bodyParserMiddleware;
