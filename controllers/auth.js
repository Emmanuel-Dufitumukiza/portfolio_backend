const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Register = async(req,res)=>{
 try{
     req.body.email = req.body.email.toLowerCase();
     let userExist = await User.find({email: req.body.email});
     if(userExist.length<=0){

        const salt = bcrypt.genSaltSync(10);
                        const hash = bcrypt.hashSync(
                          `${req.body.password}`,
                          salt
                        );
                        req.body.password = hash;

         let saveUser = new User(req.body);
         let userInfo = await saveUser.save();

        const userId = userInfo._id;
        const token = jwt.sign(
          { userId },
          "e-portfolio-2022-api-tkn"
        );
     
         return res.status(200).send({user: {
           role: userInfo?.role,
           email: userInfo?.email,
           username: userInfo?.username,
           profileImage: userInfo?.profileImage,
           _id: userInfo?._id
         },token: token});
     }else{
         return res.status(200).send({message: `Email had already taken, please try different email address`})
     }

 }
 catch(error){
     console.log(error)
     return res.status(400).send(error);
 }
}

exports.Login = (req, res) => {
if(req.body){
  let { email, password } = req.body;
  email = req.body.email?.toLowerCase()

  User.findOne({ email }).then((result) => {
    if (result) {
      let dbPass = result.password;
      const valid = bcrypt.compareSync(`${password}`, dbPass);

      if (valid) {
        const userId = result._id;
        const token = jwt.sign(
          { userId },
          "e-portfolio-2022-api-tkn"
        );

        return res.send({ error: false, token: token, user: {
        _id: result?._id,
        email: result?.email,
        username: result?.username,
        profileImage: result?.profileImage,
        role: result?.role
        } });
      } else {
        return res.status(200).send({ error: "Incorrect email or password" });
      }
    } else {
      return res.status(200).send({ error: "Incorrect email or password" });
    }
  });
}else{
  return res.status(400).send("Email And Password Are required")
}
};

exports.getUser = async (req, res) => {
    try {
      const { id } = req.params;
      let user = await User.findById(id);
      let result  = user;

      return res.status(200).send({
        _id: result?._id,
        email: result?.email,
        username: result?.username,
        profileImage: result?.profileImage,
        role: result?.role
      });
    } catch (error) {
      return res.status(404).send(error.message);
    }
};

exports.getUserInfo = async(req,res)=>{
  try {
    let user = await User.findById(req.user);
    let result  = user;
    return res.status(200).send({
      _id: result?._id,
      email: result?.email,
      username: result?.username,
      profileImage: result?.profileImage,
      role: result?.role
    });
  } catch (error) {
    return res.status(404).send(error.message);
  }
}

exports.getAllUsers = async (req, res) => {
  try{
     let users = await User.find({},"-password").sort({"createdAt": -1});
     res.status(200).send(users);
 }
 catch(error){
     console.log(error)
     return res.status(400).send(error);
 }
};

exports.updateUser = async(req,res)=>{
 
  try{
    let user = await User.findOne({_id: req.user});
    
    if(req.body.username){
      user.username = req.body.username;
    }

    if(req.body.profileImage){
      user.profileImage = req.body.profileImage;
    }
    
    if(req.body.password && req.body.currentPassword){

      const valid = bcrypt.compareSync(`${req.body.currentPassword}`, user.password);

      if(!valid){
        return res.status(200).send({error: "Current Password Is incorrect"})
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(
        `${req.body.password}`,
        salt
      );

      req.body.password = hash;
      user.password = req.body.password;
    }

    let result = await user.save();
    console.log(result)
    return res.send({user: {
      _id: result?._id,
      email: result?.email,
      username: result?.username,
      profileImage: result?.profileImage,
      role: result?.role
    }});
}
catch(error){
    console.log(error)
    return res.status(400).send(error);
}
}