const User = require("../model/User");
const Business = require("../model/Business");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose")
const cloudinary = require("../utils/cloudinary.js");

exports.CheckEmail = async(req,res)=>{
    try{
      req.body.email = req.body.email.toLowerCase();
        let userExist = await User.find({email: req.body.email});
   
        if(userExist.length<=0){
            return res.status(200).send({message: false})
        }if(userExist.length>0){
         return res.status(200).send({message: `Email had already taken, please try different email address`})
        }
    }
    catch(error){
        console.log(error)
        return res.status(400).send(error);
    }
}

exports.Register = async(req,res)=>{
 try{
     let userExist = await User.find({email: req.body.user.email});
     if(userExist.length<=0){

        const salt = bcrypt.genSaltSync(10);
                        const hash = bcrypt.hashSync(
                          `${req.body.user.password}`,
                          salt
                        );
                        req.body.user.password = hash;

                        const random = async(min, max) => {
                          let num = Math.random() * (max - min) + min;
                          num = Math.floor(num)

                          let exist =  await User.find({companyId: num});
                                          
                          if(exist.length>0){
                          random(min, max);
                       }
                          if(exist.length == 0) {
                            return num;
                          }     
                     };

          req.body.user.companyId = await random(1000000,9000000);
         
         let saveUser = new User(req.body.user);
         let userInfo = await saveUser.save();


         console.log(userInfo)
     
         let user = userInfo._id;
         req.body.business.user = user;
         let saveNewBusiness = new Business(req.body.business);
         let businessInfo = await saveNewBusiness.save();

         const userId = userInfo._id;
        const token = jwt.sign(
          { userId },
          "finance360-user123-can-auth360-now"
        );
     
        console.log(userExist)
         return res.status(200).send({user: userInfo, business: businessInfo,message: false,token: token});
     }else{
         return res.status(200).send({message: `Email had already taken, please try different email address`})
     }

 }
 catch(error){
     console.log(error)
     return res.status(400).send(error);
 }
}

exports.updateProfile = async(req,res)=>{
   try{
    let {profileImage} = req.body;
    let id = mongoose.Types.ObjectId(req.body.id);

   await User.findOneAndUpdate({_id: id},{
     profileImage: profileImage
 });

 let publicId = req.body.publicId;
 await cloudinary.uploader.destroy(publicId)

   return res.status(200).send("User updated successfully")

   }
   catch(error){
    console.log(error)
    return res.status(400).send(error);
}
}

exports.Login = (req, res) => {
    let { email, password } = req.body;
    email = req.body.email.toLowerCase()
  
    User.findOne({ email }).then((result) => {
      if (result) {
        let dbPass = result.password;
        const valid = bcrypt.compareSync(`${password}`, dbPass);
  
        if (valid) {
          const userId = result._id;
          const token = jwt.sign(
            { userId },
            "finance360-user123-can-auth360-now"
          );
  
          return res.send({ error: false, token: token, user: result });
        } else {
          return res.send({ error: "Incorrect email or password" });
        }
      } else {
        return res.send({ error: "Incorrect email or password" });
      }
    });
  };

exports.GetUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      return res.status(200).send(user);
    } catch (error) {
      return res.status(404).send(error.message);
    }
};


exports.getAllUsers = async (req, res) => {
  try{
    if(req.params.key == "20222finance360appapiadmin"){
     let users = await User.find({});
     res.status(200).send(users);
    }else{
        return res.status(401).send({message: "You are not allowed to get users"});
    }
 }
 catch(error){
     console.log(error)
     return res.status(400).send(error);
 }
};

exports.CheckAuth = (req,res)=>{
  return res.status(200).send({loggedIn: true})
}

exports.updateUser = (req,res)=>{
    
}

exports.resetUserPassword = async(req,res)=>{
  try{
   let email = req.body.email;
   email = email.toLowerCase();
 
   let result = await User.find({email: email});
 
        const salt = bcrypt.genSaltSync(10);
                        let hash = bcrypt.hashSync(
                          `${result[0]?._id}`,
                          salt
                        );
 
                        hash = hash.replaceAll(".", "");
                        hash = hash.replaceAll("/", "");
                        hash = hash.replaceAll("?", "");
                        hash = hash.replaceAll("&", "");
 
   if(result.length>0){
     var mailOptions = {
       from: process.env.email,
       to: email,
       subject: 'Finance360 Reset Password Link',
       html: `<h1>Finance360 Reset Password Link</h1><p>Hi ${result[0]?.fullname} click the link bellow to reset your password</p>
       <p><a href='http://localhost:3000/resetpassword/${result[0]?._id}/${hash}'>http://localhost:3000/resetpassword/${result[0]?._id}/${hash}</a></p>
       `
     };
     
     transporter.sendMail(mailOptions, async function(error, info){
       if (error) {
         console.log(error);
       } else {
 
         console.log('Email sent: ' + info.response);
         await User.updateOne({_id: result[0]?._id},{resetLink: hash+""+result[0]?._id});
 
         return res.status(200).send({messageSuccess: "Email sent"})
       }
     });
     
   }else{
     return res.status(200).send({message: "User with such email not found in our record"});
   }
  }
  catch(error){
    console.log(error)
    return res.status(400).send(error)
  }
 }
 
 exports.checkResetLink = async(req,res)=>{
  try{
   let link = req.body.link;
   let id = req.body.id;
   ids  = mongoose.Types.ObjectId(id);
 
   let result = await User.find({_id: ids,resetLink: link+""+id});
 
   if(result.length>0){
     return res.status(200).send({message: true});
   }else{
     return res.status(200).send({message: false})
   }
  }
  catch(error){
   console.log(error)
   return res.status(400).send(error)
 }
 }
 
 exports.changeUserPassword = async(req,res)=>{
   try{
     let link = req.body.link;
     let id = req.body.id;
     ids  = mongoose.Types.ObjectId(id);
     let newpass = req.body.newpass;
   
     let result = await User.find({_id: ids,resetLink: link+""+id});
     
     if(result){
       const salt = bcrypt.genSaltSync(10);
       let hash = bcrypt.hashSync(
         `${newpass}`,
         salt
       );
 
       let result2 =  await User.findOneAndUpdate({_id: ids,resetLink: link+""+id},{resetLink: null,password: hash})
       return res.status(200).send({message: true});
     }else{
       return res.status(200).send({message: false})
     }
    }
    catch(error){
     console.log(error)
     return res.status(400).send(error)
   }
 }