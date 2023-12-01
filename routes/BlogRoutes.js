const router=require("express").Router()
const { postBlog, getBlogs, getBlog, updateBlog, deleteBlog, updateRatings, postRatings, getRating } = require("../controllers/blogControllers");
const {auth,verifyRole}=require("../middlewares/authMiddleware")

router.post("/",auth,verifyRole(["author"]),postBlog)
router.get("/",auth,getBlogs)
router.get("/:id",auth,getBlog)
router.patch("/:id",auth,verifyRole(["author"]),updateBlog)
router.post("/ratings/:id",auth,verifyRole(["user"]),postRatings)
router.get("/ratings/:id",auth,verifyRole(["user","admin","author"]),getRating)
router.delete("/:id",auth,verifyRole(["admin","author"]),deleteBlog)

module.exports=router;