const express = require('express');
const { User } = require('../models/User'); // Assuming User model is correctly defined
const { getAllUsers } = require('../controllers/userController');

const router = express.Router();

// CREATE a new User
router.post('/', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const user = await User.create({
      username,
      email,
      password,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

// Use the controller for getting all users
router.get('/', getAllUsers);  // Call the getAllUsers controller

// READ a single user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
});

// UPDATE an existing user by ID
router.put('/:id', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const user = await User.findByPk(req.params.id);
    if (user) {
      user.username = username || user.username;
      user.email = email || user.email;
      user.password = password || user.password;
      user.role = role || user.role;
      user.updatedAt = new Date();
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
});

// DELETE a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
});

router.get('/', getAllUsers );

module.exports = router;
