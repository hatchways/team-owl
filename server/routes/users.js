const express = require("express");
const router = express.Router();
const multer = require("multer");
const { auth } = require("../middleware/auth");

const {
	createUser,
	getLoggedinUser,
	getUserById,
	getAllUsers,
	updateUser,
	deleteUser,
	loginUser,
	verifyToken,
	getAllContestsByUserId,
	getAllSubmissionsByUserId,
} = require("../controllers/users");

const multerSingle = multer({
	dest: "temp/",
	limits: { fieldSize: 8 * 1024 * 1024 },
}).single("avatar");

router.post("/", createUser);
router.get("/me", auth, getLoggedinUser);
router.get("/", getAllUsers);
router.delete("/", auth, deleteUser);
router.get("/:id", getUserById);
router.put("/:id", auth, multerSingle, updateUser);
router.post("/login", loginUser);
router.post("/verifytoken", auth, verifyToken);
router.get("/:id/contests", auth, getAllContestsByUserId);
router.get("/:id/submissions", auth, getAllSubmissionsByUserId);

module.exports = router;
