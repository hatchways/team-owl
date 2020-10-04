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

		// subscribe person to chat & other user as well
		client.on("join", (room) => {
			client.join(room);
			console.log("joined", room);
		});

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
				// global.io.sockets.in(conversationId).emit("chatmessage", savedMessage);
				console.log(savedMessage);
				io.in(room).emit("chatmessage", savedMessage);
			} catch (error) {
				console.error(error.message);
			}
		});

		client.on("disconnect", () => {
			console.log("user is disconnected");
		});
	});
};
