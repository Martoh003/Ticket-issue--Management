const Timetable = require('../models/Timetable');

// Get all timetable entries
const getAllTimetable = async (req, res) => {
  try {
    const timetables = await Timetable.findAll();
    res.status(200).json(timetables);
  } catch (error) {
    console.error(error); // Log the actual error for debugging
    res.status(500).json({ message: 'Error fetching timetables', error });
  }
};

// Get a single timetable entry by ID
const getTimetableById = async (req, res) => {
  try {
    const timetable = await Timetable.findByPk(req.params.id);
    if (!timetable) {
      return res.status(404).json({ message: 'Timetable entry not found' });
    }
    res.status(200).json(timetable);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching timetable entry', error });
  }
};

// Create a new timetable entry
const createTimetable = async (req, res) => {
  try {
    const { user_id, event_name, description, start_time, end_time } = req.body;
    const newTimetable = await Timetable.create({
      user_id,
      event_name,
      description,
      start_time,
      end_time
    });
    res.status(201).json(newTimetable);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating timetable entry', error });
  }
};

// Update a timetable entry
const updateTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.findByPk(req.params.id);
    if (!timetable) {
      return res.status(404).json({ message: 'Timetable entry not found' });
    }

    const { event_name, description, start_time, end_time } = req.body;
    await timetable.update({
      event_name: event_name || timetable.event_name,
      description: description || timetable.description,
      start_time: start_time || timetable.start_time,
      end_time: end_time || timetable.end_time
    });
    res.status(200).json(timetable);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating timetable entry', error });
  }
};

// Delete a timetable entry
const deleteTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.findByPk(req.params.id);
    if (!timetable) {
      return res.status(404).json({ message: 'Timetable entry not found' });
    }
    await timetable.destroy();
    res.status(200).json({ message: 'Timetable entry deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting timetable entry', error });
  }
};

module.exports = {
  getAllTimetable,
  getTimetableById,
  createTimetable,
  updateTimetable,
  deleteTimetable
};
