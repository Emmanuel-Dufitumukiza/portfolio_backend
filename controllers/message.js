const Messages = require("../models/messages");
const User = require("../models/user.js");

exports.sendMessage = async(req,res)=>{
    try{
       let msg = new Messages(req.body);
       await msg.save();
       
       return res.send(msg);
    }
    catch(error){
        return res.status(400).send(error);
    }
}

exports.getMessages = async(req,res)=>{
    try{
       let info = await User.findOne({_id: req.user});

       if(info.role != "padmin"){
           return res.status(400).send("You are not allowed to get contact messages");
       }
       let msg = await Messages.find();
       
       return res.send({msg: msg});
    }
    catch(error){
        return res.status(400).send(error);
    }
}