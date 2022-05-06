const express = require("express");
const { getBlogs, createBlog, updateBlog, deleteBlog, singleBlog, likeBlog, commentBlog,deleteComment } = require("../controllers/blogs");
const authCheck = require("../middlewares/authCheck,");
const { validateBlog } = require("../models/blogs");
const router = express.Router();

router.get("/blogs", getBlogs);
router.post("/blogs",authCheck,validateBlog,createBlog);
router.patch("/blogs/:id",authCheck,validateBlog,updateBlog);
router.delete("/blogs/:id",authCheck, deleteBlog)
router.get("/blogs/:id", singleBlog);
router.patch("/blogs/:id/likes",authCheck,likeBlog);
router.patch("/blogs/:id/comments",authCheck,commentBlog);
router.delete("/blogs/:id/comments/:commentId", authCheck, deleteComment);

module.exports = router;