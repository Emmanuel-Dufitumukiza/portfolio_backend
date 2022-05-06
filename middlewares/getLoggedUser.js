const jwt = require("jsonwebtoken")

module.exports = function (req, res, next){
    const token = req.header('Authorization')
    console.log(1)
    if(!token){
        return res.status(400).send("Access Denied! You need to login first")
    }

    try{
        const TokenArray = token;
        jwt.verify(TokenArray,"e-portfolio-2022-api-tkn",(err, decoded)=>{
            if(decoded){
                
            req.user = decoded?.userId;
            return next()
            }
            if(err){
                return res.status(400).send("Invalid Token")
            }
        })
    }
    catch(ex){      
       return res.status(400).send("Invalid Token")
    }
}