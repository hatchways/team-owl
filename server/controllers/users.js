const User = require("../models/User");
const validator = require("email-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ensureIndexes } = require("../models/User");

//POST - create user
exports.createUser = async (req, res, next) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		return res.status(400).json({ msg: "Name, email, password are required." });
	}

	if (!validator.validate(email)) {
		return res.status(400).json({ msg: "Email provided is not valid." });
	}

	if (password.length < 6) {
		return res
			.status(400)
			.json({ msg: "Password must have at least 6 characters." });
	}
	try {
		let user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ msg: "User already exists." });
		}

		user = new User({
			name,
			email,
			password,
		});

		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);

		await user.save();

		res.status(200).json(user);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ msg: "Server error - 500" });
	}
};

//POST - log in user - missing JWT
exports.loginUser = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		if (!email || !password) {
			return res.status(400).json({ msg: "Email and password required" });
		}
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ msg: "Email / Password invalid" });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ msg: "Email / Password invalid" });
		}
		const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET_KEY);
		res.status(200).json({
			token,
			user: { name: user.name, id: user._id },
			msg: "Login Successful",
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ msg: "Server error - 500" });
	}
};

//POST -  verfiy Token - Logged in
exports.verifyToken = async (req, res, next) => {
	return res.status(200).json(req.user);
};

//GET - get User by Id
exports.getUserById = async (req, res, next) => {
	const user = await User.findOne({ _id: req.params.id });
	console.log(user);

	try {
		if (!user) {
			return res.status(400).json({ msg: "User ID does not exist" });
		}

		res.status(200).json(user);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ msg: "Server error - 500" });
	}
};

//GET - get all Users
exports.getAllUsers = async (req, res, next) => {
	const users = await User.find();
	try {
		if (!users) {
			return res.status(400).json({ msg: "No users exists" });
		}

		res.status(200).json(users);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ msg: "Server error - 500" });
	}
};

//PUT - update User by Id - auth
exports.updateUser = async (req, res, next) => {
	return res.status(200).json({ msg: "Update User" });
};

//DELETE - delete User by Id - auth
exports.deleteUser = async (req, res, next) => {
	return res.status(200).json({ msg: "Delete User" });
};
