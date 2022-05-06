const express = require("express");
const { sendMessage, getMessages } = require("../controllers/message");
const authCheck = require("../middlewares/authCheck,");
const router = express.Router();

router.post("/messages", sendMessage);
router.get("/messages",authCheck,getMessages);

module.exports = router;