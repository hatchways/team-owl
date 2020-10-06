const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");

const {
	initiateConversation,
	getAllConversation,
	addMessageToConversation,
} = require("../controllers/conversation");

// router.post("/", auth, initiateConversation);
// router.get("/", auth, getAllConversation);
// router.put("/:conversationId/message", auth, addMessageToConversation);

module.exports = router;
