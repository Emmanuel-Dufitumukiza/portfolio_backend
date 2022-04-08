const express = require("express");
const { sendContactMessage } = require("../controllers/contactMessage");
const router = express.Router();

router.post("/sendMessage", sendContactMessage);

module.exports = router;