const { loginWrapper, signupWrapper } = require("../utils/auth");
const Author = require("../models/Author");

const login = loginWrapper(Author);
const signup = signupWrapper(Author);

module.exports = {
  login,
  signup,
};