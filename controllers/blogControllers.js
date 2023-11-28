const Blog = require("../models/Blogs");

const postBlog=async(req,res)=>{
    try {
        let user=req.user;
        const newBlog=await Blog.create({
            title:req.body.title,
            snippet:req.body.snippet,
            description:req.body.description,
            image:req.body.image,
            author:user._id
        })
        res.status(201).json({
            status:'success',
            data:{
                newBlog
            }
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:error.message
        })
    }
}

const getBlog=async(req,res)=>{
    try {
        const {id}=req.params
        const blog=await Blog.findById(id)
        res.status(200).json({
            status:'success',
            data:{
                blog
            }
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:error.message
        })
    }
}

const getBlogs=async(req,res)=>{
    try {
        let search=req.query.search || ""
        let page=req.query.page*1 || 1
        let limit=req.query.limit*1 || 2
        let sort=req.query.sort || "rating"
        let skip=(page-1)*limit
        //ratings,year  //ratings year  
        sort && sort.split(",").join(" ") 
        const blogs=await Blog.find({title:{$regex:search,$options:"i"}}).skip(skip).limit(limit).sort(sort)
        let totalBlogs=await Blog.countDocuments()
        res.status(200).json({
            status:'success',
            page,
            limit,
            totalBlogs,
            data:{
                blogs
            }
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:error.message
        })
    }
}

const updateBlog=async(req,res)=>{
    try {
        const {id}=req.params
        const {title,description,snippet,image,ratings}=req.body
        if(req.user.role==='author'){
            const updatedBlog=await Blog.findByIdAndUpdate({_id:id},{$set:{title:title,snippet:snippet,description:description,image:image,}},{new:true,runValidators:true})
        res.status(200).json({
            status:'success',
            data:{
                updatedBlog
            }
        })
        }
        if(req.user.role==='user'){
            const updatedBlog=await Blog.findByIdAndUpdate({_id:id},{$set:{ratings:ratings}},{new:true,runValidators:true})
        res.status(200).json({
            status:'success',
            data:{
                updatedBlog
            }
        })
        }

    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:error.message
        })
    }
}

const deleteBlog=async(req,res)=>{
    try {
        const {id}=req.params
    await Blog.findByIdAndDelete(id)
        res.status(200).json({
            status:'success',
            data:null
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:error.message
        })
    }
}

module.exports={
    postBlog,getBlog,getBlogs,updateBlog,deleteBlog
}