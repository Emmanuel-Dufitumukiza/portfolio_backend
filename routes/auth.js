const express = require("express");
const { Register, Login, getAllUsers, getUser, updateUser,getUserInfo } = require("../controllers/auth");
const authCheck = require("../middlewares/authCheck,");
const getLoggedUser = require("../middlewares/getLoggedUser");
const { validateUser } = require("../models/user.js");
const router = express.Router();

router.post("/register",validateUser,Register);
router.post("/login", Login);
router.get("/users",authCheck, getAllUsers);
router.get("/users/:id",authCheck, getUser);
router.patch("/users/update/:id",authCheck,updateUser);
router.get("/getLoggedUser", getLoggedUser,getUserInfo)

module.exports = router;