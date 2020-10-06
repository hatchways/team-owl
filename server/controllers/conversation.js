const User = require("../models/User");
const Conversation = require("../models/Conversations");
const { userCheck } = require("../helpers/userCheck");
const { find } = require("../models/Conversations");
const Contest = require("../models/Contest");
// const io = require("../bin/www");

//POST - start Conversation or create a new one
exports.initiateConversation = async (req, res, next) => {
	const firstUserId = req.user.userId;
	const { secondUserId } = req.body;

	try {
		const conversation = await Conversation.initiateConversation(userIds);
		res.status(201).json(conversation);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ msg: "Server error - 500" });
	}
};

//PUT - Add Message
exports.addMessageToConversation = async (req, res, next) => {
	const { message } = req.body;
	const { conversationId } = req.params;
	try {
		const sender = await User.findOne({ _id: req.user.userId });
		const savedMessage = await Conversation.addMessageToConversation(
			conversationId,
			message,
			sender
		);
		global.io.sockets.in(conversationId).emit("chatmessage", savedMessage);
		res.status(201).json(savedMessage);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ msg: "Server error - 500" });
	}
};

//GET - All Conversation
exports.getAllConversation = async (req, res, next) => {
	try {
		const conversations = await Conversation.getConversationsByUserId(
			req.user.userId
		);
		res.status(201).json(conversations);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ msg: "Server error - 500" });
	}
};

// GET - Get More Messages
