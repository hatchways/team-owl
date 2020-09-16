const express = require('express');
const router = express.Router();
const multer = require('multer');

const {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
} = require('../controllers/users');

const multerSingle = multer({
  dest: 'temp/',
  limits: { fieldSize: 8 * 1024 * 1024 },
}).single('avatar');

router.post('/', multerSingle, createUser);
router.get('/', getAllUsers);
router.delete('/', deleteUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);

module.exports = router;
