const jwt = require("jsonwebtoken");
require("dotenv").config();

const ACCESS_TOKEN_PRIVATE_KEY = process.env.JWT_SECRET;

exports.signJwt = (payload) => {
  return jwt.sign(payload, ACCESS_TOKEN_PRIVATE_KEY, {
    expiresIn: "50h",
  });
};

exports.verifyJwt = ( token, ACCESS_TOKEN_PRIVATE_KEY ) => {
  return jwt.verify(token, ACCESS_TOKEN_PRIVATE_KEY);
}