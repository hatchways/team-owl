const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const multer = require('multer');

const {
	createUser,
	getUserById,
	getAllUsers,
	updateUser,
	deleteUser,
	loginUser,
	verifyToken,
} = require("../controllers/users");


const multerSingle = multer({
  dest: 'temp/',
  limits: { fieldSize: 8 * 1024 * 1024 },
}).single('avatar');

router.post("/", createUser);
router.get("/", getAllUsers);
router.delete("/", auth, deleteUser);
router.get("/:id", getUserById);
router.put("/:id", auth, updateUser);
router.post("/login", loginUser);
router.post("/verifytoken", auth, verifyToken);



module.exports = router;
