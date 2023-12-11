const { loginWrapper, signupWrapper } = require("../utils/auth");
const Admin = require("../models/Admin");

const login = loginWrapper(Admin);
const signup = signupWrapper(Admin);
const getSignup=(req,res)=>{
  res.render("Admin/adminSignup");
}
const getLogin=(req,res)=>{
  res.render("Admin/adminLogin")
}

module.exports = {
  login,
  signup,
  getSignup,
  getLogin
};