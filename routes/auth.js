const express = require("express");
const { Register, Login, getAllUsers, getUser } = require("../controllers/auth");
const { validateUser } = require("../models/User");
const router = express.Router();

router.post("/register",validateUser,Register);
router.post("/login", Login);
router.get("/users", getAllUsers);
router.get("/users/:id", getUser);

module.exports = router;