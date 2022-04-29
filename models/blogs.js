const mongoose = require("mongoose");
const Joi = require('joi');

const blogSchema = mongoose.Schema({
  title: {
      type: String,
      required: true
  },
  text: {
    type: String,
    required: true
  },
  fileUrl: {
      type: String,
      required: true
  },
  filePublicId: {
    type: String,
    required: true
  },
  comments: [
      {
        userId: {
            type: String
        },
        comment: {
            type: String
        }
      }
  ],
  likes: []
},{timestamps: true});

module.exports = mongoose.model("Blog", blogSchema);

const schema = Joi.object({
    title: Joi.string().min(2).max(180).required(),
    text: Joi.string().min(3).max(4000).required(),
    filePublicId: Joi.string().min(2).max(150).required(),
    fileUrl: Joi.string().min(4).max(370).required()
});

const validateBlog = async(req,res,next)=>{
    try {
        console.log(req.body)
        let {title,text,filePublicId,fileUrl} = req.body;

        const {error} = await schema.validateAsync({
            title: title,
            text: text,
            filePublicId: filePublicId,
            fileUrl: fileUrl
        });
console.log(error)
        if(!error)
        return next();
    }
    catch (error){
        return res.status(400).send({error: error.message})
    }
}

module.exports.validateBlog = validateBlog;