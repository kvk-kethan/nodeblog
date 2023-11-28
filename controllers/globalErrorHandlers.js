module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500
    err.status=err.status || "error"
    err.message=err.message || "something went wrong please try again later"
    res.status(err.statusCode).json({
        status:err.status,
        message:err.message
    })
}