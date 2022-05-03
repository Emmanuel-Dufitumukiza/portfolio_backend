const express = require("express");
const { sendMessage, getMessages } = require("../controllers/message");
const authCheck = require("../middlewares/authCheck,");
const router = express.Router();

router.post("/sendMessage", sendMessage);
router.get("/getMessages",authCheck,getMessages);

module.exports = router;