//function to make sure only the user who created the model instance (eg. contest, submission) can
//delete the model.

exports.participantCheck = (model, user) => {
	const participant1 = model.participants[0].user._id;
	const participant2 = model.participants[1].user._id;
	const userId = user.userId;
	if (
		participant1.toString() === userId ||
		participant2.toString() === userId
	) {
		return true;
	}
};
