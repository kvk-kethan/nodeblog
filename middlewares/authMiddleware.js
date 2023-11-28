const jwt=require("jsonwebtoken");
const User = require("../models/User");
const auth=async (req,res,next)=>{
try {
    let testToken=req.headers.authorization
    let token;
    if(testToken && testToken.startsWith("Bearer")){
        token=testToken.split(" ")[1]
    }
    if(!token){
       return  res.status(401).json({
            status:'fail',
            message:'Try logging in,to access'
        })
    }
    const decodedToken=await jwt.verify(token,process.env.JWT_SECRET)
    const user=await User.findById(decodedToken.id)
    if(!user){
        return res.status(401).json({
            status:'fail',
            message:'user no longer exists'
        })
    }
    req.user=user;
    next()
} catch (error) {
    res.status(401).json({
        status:'fail',
        message:error.message
    })
}
}

// const verifyRole=(role)=>{
//     return (req,res,next)=>{
//         if(req.user.role!==role){
//             return res.status(400).json({
//                 status:'fail',
//                 message:'you\'re not authorized'
//             })
//         }
//         next()
//     }
// }

const verifyRole = (role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return res.status(400).json({
        status: "fail",
        message: "you're not authorized",
      });
    }
    next();
  };
};
module.exports={auth,verifyRole};