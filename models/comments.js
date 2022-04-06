const mongoose = require("mongoose");
const Joi = require('joi');

const commentSchema = mongoose.Schema({
   userId: {
       type: mongoose.Types.ObjectId,
       required: true
   },
   blogId: {
    type: mongoose.Types.ObjectId,
    required: true
   },
   comment: {
       type: String,
       required: true
   }
},{timestamps: true});

module.exports = mongoose.model("Comment", commentSchema);

const schema = Joi.object({
    userId: Joi.string().max(100).required(),
    blogId: Joi.string().max(100).required(),
    comment: Joi.string().min(1).max(500).required()
});

const validateComment = async(req,res,next)=>{
    try {
        let {userId,blogId,comment} = req.body;

        const {error} = await schema.validateAsync({
            userId: userId,
            blogId: blogId,
            comment: comment
        });

        if(!error)
        return next();
    }
    catch (error){
        return res.status(400).send({error: error.message})
    }
}

module.exports.validateComment = validateComment;