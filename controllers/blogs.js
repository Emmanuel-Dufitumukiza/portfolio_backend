const Blog = require("../models/blogs.js");
const Like = require("../models/likes.js");
const Comment = require("../models/comments.js");

exports.createBlog = async(req,res)=>{
  try{

   let {title,text,filePublicId,fileUrl} = req.body;

   let post = new Blog({
       title: title,
       text: text,
       filePublicId: filePublicId,
       fileUrl: fileUrl
   });

   await post.save();

   return res.send(post);
  }
  catch(error){
    return res.status(400).send(error);
  }
}

exports.getBlogs = async(req,res)=>{
    try{
     let blogs = await Blog.find();
     return res.send(blogs);
    }
    catch(error){
        return res.status(400).send(error);
    }
}

exports.deleteBlog = async(req,res)=>{
    try{
        await Blog.deleteOne({_id: req.params.id});
        return res.status(204).send();
    }
    catch(error){
       return res.status(400).send({error: "Blog does not exist"});
    }
}

exports.singleBlog = async(req,res)=>{
    try{
        let blog = await Blog.findOne({_id: req.params.id});
        return res.send(blog);
    }
    catch(error){
        return res.status(400).send({error: "Blog does not exist"});
     }
}

exports.updateBlog = async(req,res)=>{
  try{
   let {title,text,filePublicId,fileUrl} = req.body;

    const blog = await Blog.findOne({_id: req.params.id });
  
    blog.title = title;
    blog.text = text;
    blog.filePublicId = filePublicId;
    blog.fileUrl = fileUrl;

    await blog.save();
    return res.send(blog);
  }
  catch(error){
    return res.status(400).send({error: "Blog does not exist"});
 }
}

exports.likeBlog = async(req,res)=>{
  try{
    let blog =  await Blog.findOne({_id: req.params.blogId});

    if(blog){
      let liked = await Like.findOne({blogId: req.params.blogId, userId: req.params.userId});

      if(liked?.length>0){
       let like = new Like({
         userId: req.params.userId,
         blogId: req.params.blogId
       });

       await like.save();
 
       return res.send("Like added");
      }
      
      return res.send();

    }
    
    return res.status(400).send({error: "Blog does not exist"});
  }
  catch(error){
    return res.status(400).send({error: "Blog does not exist"});
  }
}