// const User=require("../models/User")
// const jwt=require("jsonwebtoken")
// const asyncErrorHandler=require("../utils/asyncErrorHandler")
// const CustomError=require("../utils/CustomError")

// const genToken=async (id)=>{
//    return await jwt.sign({id},process.env.JWT_SECRET,{
//         expiresIn:24*60*60
//     })
// }
// const signup=asyncErrorHandler(async (req,res,next)=>{
//         const newUser=await User.create(req.body)
//         const token=await genToken(newUser._id)
//         res.status(201).json({
//             status:'success',
//             token,
//             data:{
//                 newUser
//             }
//         })
// })

// const login=asyncErrorHandler(async (req,res,next)=>{
//         if(!req.body.email || !req.body.password ){
//             const err=new CustomError(400,"please enter credentials")
//             next(err)
//         }
//         const existingUser=await User.findOne({email:req.body.email})
//         if(!existingUser || !(await existingUser.comparePassword(req.body.password,existingUser.password))){
//              const err=new CustomError(400,"User name and password is not correct")
//             next(err)
//         }
//         const token=await genToken(existingUser._id)
//         res.status(200).json({
//             status:"success",
//             token,
//             data:{
//                 existingUser
//             }
//         })
// })

// module.exports={
//     signup,login
// }

const {loginWrapper,signupWrapper}=require("../utils/auth")
const User=require("../models/User")


const login=loginWrapper(User)
const signup=signupWrapper(User)


module.exports={
login,signup
}