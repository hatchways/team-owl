const express = require('express');
const router = express.Router();

const {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
} = require('../controllers/users');

router.post('/', createUser);
router.get('/', getAllUsers);
router.delete('/', deleteUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);

module.exports = router;
