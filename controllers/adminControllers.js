const { loginWrapper, signupWrapper } = require("../utils/auth");
const Admin = require("../models/Admin");

const login = loginWrapper(Admin);
const signup = signupWrapper(Admin);

module.exports = {
  login,
  signup,
};