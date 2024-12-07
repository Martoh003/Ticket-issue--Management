const User = require('../models/User');  // Ensure correct path to your User model

// Create a new user
const createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const newUser = await User.create({ username, email, password, role });
    console.log('New user created:', newUser);  // Log the created user
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);  // Detailed error logging
    res.status(500).json({ message: 'Error creating user', error });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      console.log('User not found with ID:', req.params.id);  // Log if user is not found
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('User fetched by ID:', user);  // Log the found user
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);  // Detailed error logging
    res.status(500).json({ message: 'Error fetching user by ID', error });
  }
};

// Update a user
const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      console.log('User not found for update with ID:', req.params.id);  // Log if user is not found
      return res.status(404).json({ message: 'User not found' });
    }

    const { username, email, password, role } = req.body;
    await user.update({ username, email, password, role });
    console.log('User updated:', user);  // Log the updated user
    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error);  // Detailed error logging
    res.status(500).json({ message: 'Error updating user', error });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      console.log('User not found for deletion with ID:', req.params.id);  // Log if user is not found
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();
    console.log('User deleted:', user);  // Log deleted user
    res.status(204).json();
  } catch (error) {
    console.error('Error deleting user:', error);  // Detailed error logging
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

// Export controller functions
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
