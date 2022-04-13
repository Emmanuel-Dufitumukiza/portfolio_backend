const express = require("express");
const { getBlogs, createBlog, updateBlog, deleteBlog, singleBlog, likeBlog, commentBlog } = require("../controllers/blogs");
const authCheck = require("../middlewares/authCheck,");
const { validateBlog } = require("../models/blogs");
const router = express.Router();

router.get("/blogs", getBlogs);
router.post("/blogs/new",authCheck,validateBlog,createBlog);
router.patch("/blogs/:id",authCheck,validateBlog,updateBlog);
router.delete("/blogs/delete/:id",authCheck, deleteBlog)
router.get("/blogs/:id", singleBlog);
router.patch("/blogs/like/:userId/:blogId",authCheck,likeBlog);
router.patch("/blogs/comment/:blogId",authCheck,commentBlog);

module.exports = router;