const {Schema,model}=require("mongoose")
const User=require("./User")
const Blogs=require("./Blogs")

let ratingsSchema=new Schema({
    ratings:{
        type:Number,
        min:[1,"please provide ratings above 1"],
        max:[5,"please provide ratings below 5"],
        default:1
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    blogId:{
        type:Schema.Types.ObjectId,
        ref:"blog"
    },
    date:{
        type:Date,
        default:Date.now()
    }
},{
    timestamps:true
})
module.exports=model("ratings",ratingsSchema)