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
exports.verifyToken = async (req, res) => {
  try {
    const token = req.body.token;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Failed to authenticate token:', err);
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }
        res.status(200).json({ message: 'Token is valid' });
    });
} catch (error) {
    console.error('Error verifying token:', error);
    res.status(500).json({ message: 'Error verifying token', error });
}
}

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
