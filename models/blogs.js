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
  }
},{timestamps: true});

module.exports = mongoose.model("Blog", blogSchema);

const schema = Joi.object({
    title: Joi.string().min(2).max(80).required(),
    text: Joi.string().min(3).max(1000).required(),
    filePublicId: Joi.string().min(2).max(150).required(),
    fileUrl: Joi.string().min(4).max(70).required()
});

const validateBlog = async(req,res,next)=>{
    try {
        let {title,text,filePublicId,fileUrl} = req.body;

        const {error} = await schema.validateAsync({
            title: title,
            text: text,
            filePublicId: filePublicId,
            fileUrl: fileUrl
        });

        if(!error)
        return next();
    }
    catch (error){
        return res.status(400).send({error: error.message})
    }
}

module.exports.validateBlog = validateBlog;