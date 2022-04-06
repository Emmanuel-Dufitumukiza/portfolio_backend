const express = require("express");
const { getBlogs, createBlog, updateBlog, deleteBlog, singleBlog } = require("../controllers/blogs");
const { validateBlog } = require("../models/blogs");
const router = express.Router();

router.get("/blogs", getBlogs);
router.post("/blogs",validateBlog,createBlog);
router.patch("/blogs/:id",validateBlog,updateBlog);
router.delete("/blogs/:id", deleteBlog)
router.get("/blogs/:id", singleBlog);

module.exports = router;