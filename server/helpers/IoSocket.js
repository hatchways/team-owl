const socket = require("socket.io");
const jwt = require("jsonwebtoken");
const { auth } = require("../middleware/auth");
const User = require("../models/User");
const Conversation = require("../models/Conversations");

const allUsers = {};

module.exports = function (server) {
	const io = socket(server);

	//Auth middleware
	io.use((client, next) => {
		client.request.token = client.handshake.query.token;
		auth(client.request, client.request.res, next);
	});

	io.on("connection", (client) => {
		allUsers[client.request.user.userId] = client.id;

		// event fired when the chat room is disconnected
		client.on("disconnect", () => {
			delete allUsers[client.request.user.userId];
		});

		// subscribe person to chat & other user as well
		client.on("join", (room) => {
			if (room) {
				client.join(room);
			}
		});

		client.on("leave", (room) => {
			if (room) {
				client.leave(room);
			}
		});

		// get all conversations
		client.on("getAllConversations", async (data, callback) => {
			const { userId } = client.request.user;
			client.join(userId);
			try {
				const conversations = await Conversation.getConversationsByUserId(
					userId
				);
				callback(conversations);
				// io.to(userId).emit("getAllConversations", conversations);
			} catch (error) {
				console.error(error.message);
			}
		});

		// get conversation by RoomID/ conversationId
		client.on("getOneConversation", async (data, callback) => {
			const { userId } = client.request.user;
			const oneConversation = await Conversation.getConversationByRoomId(
				data,
				userId
			);
			callback(oneConversation);
			// io.to(userId).emit("getOneConversation", oneConversation);
		});

		// starting a conversation
		client.on("startConversation", async (data, callback) => {
			const firstUserId = client.request.user.userId; //logged in user
			const { participant } = data;
			const userIds = [firstUserId, participant];

			try {
				const sender = await User.findOne({ _id: firstUserId });
				const newConversation = await Conversation.initiateConversation(
					userIds,
					sender
				);
				callback(newConversation);
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
				const sender = await User.findOne({ _id: userId }, { password: 0 });
				const savedMessage = await Conversation.addMessageToConversation(
					room,
					message,
					sender
				);
				const participant = savedMessage.participants[0];
				const participantSocket = allUsers[participant._id];
				const newMessage = savedMessage.message[0];
				newMessage.senderName = sender.name;
				newMessage.conversationId = savedMessage._id;
				const getRoomClients = (room) => {
					return new Promise((resolve, reject) => {
						io.of("/")
							.in(room)
							.clients((error, clients) => {
								resolve(clients);
							});
					});
				};
				const totalUsers = await getRoomClients(room);
				if (totalUsers.length === 1) {
					client.emit("chatmessage", newMessage);
					io.to(participantSocket).emit("notification", {
						newMessage,
						participant,
					});
				} else {
					io.in(room).emit("chatmessage", newMessage);
				}
			} catch (error) {
				console.error(error.message);
			}
		});
	});
};
