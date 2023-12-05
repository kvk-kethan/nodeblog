const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/CustomError");
const Admin = require("../models/Admin");
const Author = require("../models/Author");

const auth = asyncErrorHandler(async (req, res, next) => {
  let testToken = req.headers.authorization;
  let token;
  if (testToken && testToken.startsWith("Bearer")) {
    token = testToken.split(" ")[1];
  }
  if (!token) {
    const err = new CustomError(401, "Try logging in,to access");
    next(err);
  }
  const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
  let Models = [User, Admin, Author];
  let users = Models.map(async (Model) => {
    let users=await Model.findById(decodedToken.id)
    return users;
  });
  users= await Promise.all(users);
  let authorizedUser = users.filter((doc) => doc !== null);
  if (!authorizedUser) {
    const err = new CustomError(401, "user no longer exists");
    next(err);
  }
  req.user = authorizedUser[0];
  next();
});

const verifyRole = (role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      const err = new CustomError(400, "you're not authorized");
      next(err);
    }
    next();
  };
};
module.exports = { auth, verifyRole };