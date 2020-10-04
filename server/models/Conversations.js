const mongoose = require("mongoose");
const ObjectID = require("mongodb").ObjectID;

const ConversationSchema = new mongoose.Schema({
	participants: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	messages: [
		{
			message: {
				type: String,
			},
			sender: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
			sent: {
				type: Date,
				default: Date.now(),
			},
		},
	],
	date: {
		type: Date,
		default: Date.now(),
	},
});

// all the conversations that the logged in user has
ConversationSchema.statics.getConversationsByUserId = async function (userId) {
	try {
		// const rooms = await this.find({ participants: { $all: [userId] } });
		const conversations = await this.aggregate([
			{
				$match: { participants: ObjectID(userId) },
			},
			{
				$project: {
					_id: 1,
					messages: 1,
					date: 1,
					participants: {
						$filter: {
							input: "$participants",
							as: "participant",
							cond: { $ne: ["$$participant", ObjectID(userId)] },
						},
					},
				},
			},
			{
				$lookup: {
					from: "users",
					localField: "participants",
					foreignField: "_id",
					as: "participants",
				},
			},
			{
				// removing passwords
				$unset: ["participants.password"],
			},
		]);
		return conversations;
	} catch (error) {
		throw error;
	}
};

//roomId - id of conversation

ConversationSchema.statics.getConversationByRoomId = async function (roomId) {
	try {
		const room = await this.findOne({ _id: roomId });
		return room;
	} catch (error) {
		throw error;
	}
};
// start an conversation or create a new conversation
//userId - array of strings of userIds
ConversationSchema.statics.initiateConversation = async function (userIds) {
	try {
		let conversation;
		// first look if a conversation exists between given userids
		const availableConversation = await this.findOne({
			participants: {
				$all: [...userIds],
			},
		});
		if (availableConversation) {
			conversation = availableConversation;
		} else {
			//if it doesnt exist create a new one
			const newConversartion = await this.create({ participants: userIds });
			conversation = newConversartion;
		}

		const result = await this.aggregate([
			{ $match: { _id: conversation._id } },
			{
				$lookup: {
					from: "users",
					localField: "participants",
					foreignField: "_id",
					as: "participants",
				},
			},
			{
				// removing passwords
				$unset: ["participants.password"],
			},
		]);
		return result;
	} catch (error) {
		console.log("error on start chat method", error);
		throw error;
	}
};

ConversationSchema.statics.addMessageToConversation = async function (
	conversationId,
	message,
	sender
) {
	try {
		const updatedConversation = await this.findByIdAndUpdate(
			{ _id: conversationId },
			{ $push: { messages: { message, sender } } },
			{ new: true }
		);

		const savedMessage = await this.aggregate([
			{ $match: { _id: updatedConversation._id } },
			{
				$project: {
					message: {
						$slice: ["$messages", -1],
					},
				},
			},
		]);
		return savedMessage[0];
	} catch (error) {
		console.log("error on start chat method", error);
		throw error;
	}
};

const Conversation = mongoose.model("Conversation", ConversationSchema);

module.exports = Conversation;
