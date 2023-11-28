const express=require("express")
const authRouter=require("./routes/userRoutes")
const blogRouter=require("./routes/BlogRoutes")
const globalErrorHandlers = require("./controllers/globalErrorHandlers")
const app=express()

app.use(express.json())
app.use("/app/v1/users",authRouter);
app.use("/app/v1/blogs",blogRouter);

app.all("*",(req,res,next)=>{
    // res.status(404).json({status:"fail",message:"page not found"})
    // let err=new Error("page not found")
    // err.statusCode=404;
    // err.status="fail"
    // next(err)
    let err=new CustomerError(404,"page not found")
    next(err)
})

//global error handler
app.use(globalErrorHandlers)

module.exports=app;
