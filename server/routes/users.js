const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");

const {
	createUser,
	getUserById,
	getAllUsers,
	updateUser,
	deleteUser,
	loginUser,
} = require("../controllers/users");

router.post("/", createUser);
router.get("/", getAllUsers);
router.delete("/", auth, deleteUser);
router.get("/:id", getUserById);
router.put("/:id", auth, updateUser);
router.post("/login/", loginUser);

module.exports = router;
