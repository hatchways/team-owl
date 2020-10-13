const Contest = require("../models/Contest");
const User = require("../models/User");
const Submission = require("../models/Submission");
const { userCheck } = require("../helpers/userCheck");

//POST - create contest - auth
exports.createContest = async (req, res, next) => {
	const { title, description, prize, deadline, contestPics } = req.body;

	try {
		const user = await User.findOne({ _id: req.user.userId }).select(
			"-password"
		);

		if (!user.stripeCreditCustomer) {
			return res
				.status(400)
				.json({ msg: "Please upload your credit card information first." });
		}

		const contest = new Contest({
			title,
			description,
			prize,
			deadline,
			contestPics,
			user,
		});

		const dateNow = Date.now();
		const deadlineJS = new Date(contest.deadline);
		const deadlineEpoch = deadlineJS.getTime();

		if (deadlineEpoch < dateNow) {
			return res
				.status(400)
				.json({ msg: "Deadline date must be later than current time." });
		}

		await contest.save();
		res.status(201).json(contest);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ msg: "Server error - 500" });
	}
};

//GET - get contest by Id
exports.getContestById = async (req, res, next) => {
	try {
		const contest = await Contest.findOne({ _id: req.params.id }).populate(
			"user"
		);

		if (!contest) {
			return res.status(404).json({ msg: "This contest ID does not exist" });
		}
		res.status(200).json(contest);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ msg: "Server error - 500" });
	}
};

//GET - get all contests
exports.getAllContests = async (req, res, next) => {
	try {
		const contests = await Contest.find({ deadline: { $gte: Date.now() } })
			.sort({ deadline: 1 })
			.populate("user");
		if (!contests) {
			return res.status(404).json({ msg: "There are no contests" });
		}
		res.status(200).json(contests);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ msg: "Server error - 500" });
	}
};

//PUT - update contest by Id - auth
exports.updateContest = async (req, res, next) => {
	try {
		const contest = await Contest.findOne({ _id: req.params.id });
		if (!contest) {
			return res.status(404).json({ msg: "This contest ID does not exist" });
		}
		const user = req.user;
		const verify = userCheck(contest, user);
		if (!verify) {
			return res
				.status(401)
				.json({ msg: "You are not authorized to modify this contest" });
		}

		const { title, description, prize, deadline } = req.body;
		contest.title = title;
		contest.description = description;
		contest.prize = prize;
		contest.deadline = deadline;

		await contest.save();
		res.status(200).json(contest);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ msg: "Server error - 500" });
	}
};

//DELETE - create contest by Id - auth
exports.deleteContest = async (req, res, next) => {
	try {
		const contest = await Contest.findOne({ _id: req.params.id });
		if (!contest) {
			return res.status(404).json({ msg: "This contest ID does not exist" });
		}
		const user = req.user;
		const verify = userCheck(contest, user);
		if (!verify) {
			return res
				.status(401)
				.json({ msg: "You are not authorized to delete this contest" });
		}
		await Submission.deleteMany({
			contest: req.params.id,
		});
		await Contest.findOneAndRemove({ _id: req.params.id });
		res.status(200).json({ msg: "Contest deleted." });
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ msg: "Server error - 500" });
	}
};

//GET - All submissions by contest Id - auth - viewable only by contest creator
exports.getAllSubmissionsByContestId = async (req, res, next) => {
	const contestId = req.params.contestId;
	const user = req.user;

	//get all submissions under the same contest Id
	const submissions = await Submission.find({ contest: req.params.contestId });

	if (!submissions) {
		res.status(404).json({ msg: "There are no submissions under this ID." });
	}

	//make sure only the creator gets to view the data
	const contest = await Contest.findOne({ _id: contestId });

	const verify = userCheck(contest, user);

	if (!verify) {
		return res.status(401).json({
			msg:
				"You are not authorized to view this page. Only the contest creator can see all submissions.",
		});
	}

	res.status(200).json(submissions);
	try {
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server error");
	}
};
