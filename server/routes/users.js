const express = require('express');
const router = express.Router();
const multer = require('multer');
const { auth } = require('../middleware/auth');

const {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  loginUser,
} = require('../controllers/users');

const multerSingle = multer({
  dest: 'temp/',
  limits: { fieldSize: 8 * 1024 * 1024 },
}).single('avatar');

router.post('/', multerSingle, createUser);
router.get('/', getAllUsers);
router.delete('/', auth, deleteUser);
router.get('/:id', getUserById);
router.put('/:id', auth, updateUser);
router.post('/login', loginUser);

module.exports = router;
