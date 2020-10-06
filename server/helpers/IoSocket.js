const socket = require("socket.io");
const jwt = require("jsonwebtoken");
const { auth } = require("../middleware/auth");
const User = require("../models/User");
const Conversation = require("../models/Conversations");

module.exports = function (server) {
	const io = socket(server);

	//middleware
	io.use((client, next) => {
		client.request.token = client.handshake.query.token;

		auth(client.request, client.request.res, next);
	});

	io.on("connection", (client) => {
		console.log("someone connected");

		// event fired when the chat room is disconnected
		client.on("disconnect", () => {
			console.log("user is disconnected");
		});

		// subscribe person to chat & other user as well
		client.on("join", (room) => {
			if (room) {
				client.join(room);
				console.log("joined", room, client.id);
			}
		});

		// get all conversations
		client.on("getAllConversations", async () => {
			const { userId } = client.request.user;
			client.join(userId);
			try {
				const conversations = await Conversation.getConversationsByUserId(
					userId
				);
				io.to(userId).emit("getAllConversations", conversations);
			} catch (error) {
				console.error(error.message);
			}
		});

		// get conversation by RoomID/ conversationId
		client.on("getOneConversation", async (data) => {
			const { userId } = client.request.user;
			const oneConversation = await Conversation.getConversationByRoomId(
				data,
				userId
			);
			io.to(userId).emit("getOneConversation", oneConversation);
		});
		// starting a conversation
		client.on("startConversation", async (data) => {
			const firstUserId = client.request.user.userId; //logged in user
			const { participant } = data;
			const userIds = [firstUserId, participant];

			try {
				const sender = await User.findOne({ _id: firstUserId });
				const newConversation = await Conversation.initiateConversation(
					userIds,
					sender
				);
				io.emit("sendNewConversation", newConversation);
			} catch (error) {
				console.error(error.message);
				res.status(500).json({ msg: "Server error - 500" });
			}
		});

		// sending a message
		client.on("sendMessage", async (data) => {
			const { userId } = client.request.user;
			const { room, message } = data;
			try {
				const sender = await User.findOne({ _id: userId });
				const savedMessage = await Conversation.addMessageToConversation(
					room,
					message,
					sender
				);
				io.in(room).emit("chatmessage", savedMessage);
			} catch (error) {
				console.error(error.message);
			}
		});
	});
};
