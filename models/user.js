const mongoose = require("mongoose");
const Joi = require('joi');

const Schema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        default: null
    },
    role: {
        type: String,
        default: null
    },
    profileImage: {
          public_id: {
            type: String,
          },
          url: {
            type: String,
          },
    }
},
{
    timestamps: true,
}
)

const User = mongoose.model("User", Schema);
module.exports = User;

const validateSchema = Joi.object({
    username: Joi.string().min(3).max(60).required(),
    email: Joi.string().min(5).max(100).required(),
    password: Joi.string().min(6).max(25).required(),
});

const validateUser = async(req,res,next)=>{
    try {
        let {username,email,password} = req.body;

        const {error} = await validateSchema.validateAsync({
            username: username,
            email: email,
            password: password
        });

        if(!error)
        return next();
    }
    catch (error){
        return res.status(400).send({error: error.message})
    }
}

module.exports.validateUser = validateUser;