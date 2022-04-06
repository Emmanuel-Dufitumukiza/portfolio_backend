const express = require("express");
const mongoose = require("mongoose");
const blogsRoutes = require("./routes/blogs");
require("dotenv").config();
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost:27017/nodejs",{
    useNewUrlParser: true
})
.then(()=>{
    const app = express();
    app.use(bodyParser.json());
    const port = process.env.PORT;

    app.use("/api", blogsRoutes);

    app.listen(port, ()=>{
        console.log("Server is started on port "+port);
    })
})
.catch(error=>console.log(error))