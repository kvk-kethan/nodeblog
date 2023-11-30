const CustomError = require("../utils/CustomError")

const devError = (res, err) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        errorStack: err.stack
    })
}

const prodError = (res, err) => {
    if (err.isOperational === true) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        })
    } else {
        res.status(err.statusCode).json({
            status: "fail",
            message: "something went wrong please try again later",
        })
    }
}


const validationErrorHandler=(err)=>{
    let errArray=Object.values(err.errors)
    let msgs=errArray.map(doc=>doc.message)
    let msg=msgs.join(" .")
    let error=new CustomError(400,msg)
    return error
}
const handleCastError=(err)=>{
    let msg=`this value  ${err.value} is not proper Id`
    let error=new CustomError(400,msg)
    return error
}

const duplicateErrorHandler=(err)=>{
    let email=err.keyValue.email
    let msg=`this email ${email} already exists`
    let error=new CustomError(400,msg)
    return error
}
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || "error"
    if (process.env.NODE_ENV ==='development') {
        devError(res, err)
    }
    if (process.env.NODE_ENV ==='production') {
        if(err.name==="ValidationError"){
            err=validationErrorHandler(err)
        }
        if(err.code===11000){
            err=duplicateErrorHandler(err)
        }
        if(err.name==="CastError"){
            err=handleCastError(err)
        }
        prodError(res, err)
    }
}