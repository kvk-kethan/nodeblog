const { loginWrapper, signupWrapper } = require("../utils/auth");
const Author = require("../models/Author");

const login = loginWrapper(Author);
const signup = signupWrapper(Author);
const getSignup=(req,res)=>{
  res.render("Author/authorSignup")
}
const getLogin=(req,res)=>{
  res.render("Author/authorLogin")
}
module.exports = {
  login,
  signup,
  getSignup,
  getLogin
};