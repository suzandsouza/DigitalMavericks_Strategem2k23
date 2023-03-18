const ErrorHandler = require("../utils/errorhandler");
const jwt = require("jsonwebtoken");
const UserMaveric = require("../models/User");

exports.isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please login to access the resource"));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await UserMaveric.findById(decodedData.id);
  next();
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          //$ is used as a shorthand for the function
          //  `document.getElementById() `
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
