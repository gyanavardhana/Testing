const express = require("express");
const {getMessages, sendMessage, getOrgId, getAllSenderIds} = require("../Controllers/MessageController"); 
const { protectedRoute } = require("../Controllers/Project");
const router = express.Router();

router.get("/mes/:id", getMessages);
router.get("/senderIds", getAllSenderIds);
router.post("/send/:id",  sendMessage);
router.get("/userId", getOrgId);

module.exports = router;