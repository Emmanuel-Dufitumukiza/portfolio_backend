const express = require("express");
const mongoose = require("mongoose");
const blogsRoutes = require("./routes/blogs");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/contactMessage");
require("dotenv").config();
const bodyParser = require("body-parser");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require("cors");

mongoose.connect("mongodb://localhost:27017/nodejs",{
    useNewUrlParser: true
})
.then(()=>{
    const app = express();
    app.use(bodyParser.json());
    app.use(cors())
    const port = process.env.PORT;
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.use("/api", blogsRoutes);
    app.use("/api", messageRoutes);
    app.use("/api", authRoutes);

    app.listen(port, ()=>{
        console.log("Server is started on port "+port);
    })
})
.catch(error=>console.log(error))