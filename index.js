const express = require("express");
const mongoose = require("mongoose");
const blogsRoutes = require("./routes/blogs.routes");
const authRoutes = require("./routes/auth.routes");
const messageRoutes = require("./routes/contactMessage.routes");
require("dotenv").config();
const bodyParser = require("body-parser");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require("cors");

mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true
})
.then(()=>{
console.log("Connected to DB")
})
.catch(error=>console.log(error))

    const app = express();
    app.use(bodyParser.json());
    app.use(express.urlencoded({extended: true}));
    app.use(cors())
    const port = process.env.PORT;
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.get("/", async (req,res)=>{
        return res.send("Welcome to My Portfolio APIs")
    })

    app.use("/api", blogsRoutes);
    app.use("/api", messageRoutes);
    app.use("/api", authRoutes);

   module.exports = app.listen(port, ()=>{
        console.log("Server is started on port "+port);
   })