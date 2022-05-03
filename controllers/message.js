const Messages = require("../models/messages");

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
       let msg = await Messages.find();
       
       return res.send({msg: msg});
    }
    catch(error){
        return res.status(400).send(error);
    }
}