const User = require("../models/User");
const { verifyJwt } = require("../util/jwt");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({
      message: "Please login to access this route",
    });
  }

  const decoded = verifyJwt(token, JWT_SECRET);
  const currentUser = await User.findById(decoded._id);
  if (!currentUser) {
    return res.status(401).json({
      message: "The user of this token does no exist",
    });
  }

  req.user = currentUser;
  next();
};

exports.allowedTo =
  (...roles) =>
  async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        message: "You are not allowed to access this route",
      });
    }
    next();
  };
