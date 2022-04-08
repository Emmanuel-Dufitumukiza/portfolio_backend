const nodemailer = require('nodemailer');
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.email,
      pass: process.env.password
    }
});

exports.sendContactMessage = async(req,res)=>{
    try{
        let mailOptions = {
            from: process.env.email,
            to: process.env.email,
            subject: 'Contact Message From '+ req.body.names,
            html: `
                <div>
                <h3 style="color: green;font-family: arial;font-weight: bold;" >Contact Message From ${req.body.names}</h3>
                
                <p style="font-family: arial;"><b style="font-family: arial;">FullName: </b>${req.body.names}</p>
                <p style="font-family: arial;"><b style="font-family: arial;">Email: </b>${req.body.email}</p>

                <p style="font-family: arial;">
                 ${req.body.message}
                </p>
                </div>
            `
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              return res.status(400).send(error);
            } else {
              console.log('Email sent: ' + info.response);
              return res.send("Message Was Sent Successfully!");
            }
          });
    }
    catch(error){
        return res.status(400).send(error);
    }
}