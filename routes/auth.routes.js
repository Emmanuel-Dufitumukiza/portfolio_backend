const express = require("express");
const { Register, Login, getAllUsers, getUser, updateUser,getUserInfo } = require("../controllers/auth");
const authCheck = require("../middlewares/authCheck,");
const getLoggedUser = require("../middlewares/getLoggedUser");
const { validateUser } = require("../models/user.js");
const router = express.Router();

router.post("/users",validateUser,Register);
router.post("/users/login", Login);
router.get("/users", getAllUsers);
router.get("/users/:id", getUser);
router.patch("/users",authCheck,updateUser);
router.get("/users/info/loggedinuser",getLoggedUser,getUserInfo)

module.exports = router;