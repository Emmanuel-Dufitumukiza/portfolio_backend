const Blog = require("../models/blogs.js");

exports.createBlog = async(req,res)=>{
  try{
console.log(req.body)
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
    console.log(error)
    return res.status(400).send(error);
  }
}

exports.getBlogs = async(req,res)=>{
    try{
     let blogs = await Blog.find({}).sort({'createdAt': -1});
     return res.send(blogs);
    }
    catch(error){
        return res.status(400).send(error);
    }
}

exports.deleteBlog = async(req,res)=>{
    try{
        await Blog.deleteOne({_id: req.params.id});
        return res.status(200).send("Blog deleted successfully");
    }
    catch(error){
       return res.status(400).send("Blog does not exist");
    }
}

exports.singleBlog = async(req,res)=>{
    try{
        let blog = await Blog.findOne({_id: req.params.id});
        return res.send(blog);
    }
    catch(error){
        return res.status(400).send("Blog does not exist");
     }
}

exports.updateBlog = async(req,res)=>{
  try{

    const blog = await Blog.findOne({_id: req.params.id });
  
    if(req.body?.title?.trim()?.length >0){
      blog.title = req.body?.title;
    }
    if(req.body?.text?.trim()?.length >0){
      blog.text = req.body?.text;
    }
    if(req.body?.filePublicId?.trim()?.length>0){
      blog.filePublicId = req.body?.filePublicId;
    }
    if(req.body?.fileUrl?.trim()?.length>0){
      blog.fileUrl = req.body?.fileUrl;
    }

    await blog.save();
    return res.send(blog);
  }
  catch(error){
    return res.status(400).send("Blog does not exist");
 }
}

exports.likeBlog = async(req,res)=>{
  try{
    let blog =  await Blog.findOne({_id: req.params.id});

    if(blog){
      if(!blog?.likes?.includes(req.user)){

      await Blog.updateOne({_id: req.params.id},{
         $push: {likes: req.user}
       });
 
       return res.send("Like added successfully!");
      }else{
        await Blog.updateOne({_id: req.params.id},{
          $pull: {likes: req.user}
        });

       return res.send("Like removed successfully!");

      }
    }
    
    return res.status(400).send({error: "Blog does not exist"});
  }
  catch(error){
    return res.status(400).send({error: "Blog does not exist"});
  }
}

exports.deleteComment = async(req,res)=>{
  try{
    await Blog.findOneAndUpdate({_id: req.params.id}, {
      $pull: {comments: {_id: req.params.commentId}}
    });

    return res.send("Comment deleted");
  }
  catch(error){
    console.log(error)
    return res.status(400).send({error: "Blog does not exist"});
  }
}

exports.commentBlog = async(req,res)=>{
  try{
    let blog =  await Blog.findOne({_id: req.params.id});

    if(blog){

      await Blog.updateOne({_id: req.params.id},{
         $push: {comments: {
          userId: req.user,
          comment: req.body.comment
         }}
       });
 
       return res.send("Comment added successfully!");

    }
    
    return res.status(400).send({error: "Blog does not exist"});
  }
  catch(error){
    console.log(error)
    return res.status(400).send({error: "Blog does not exist"});
  }
}