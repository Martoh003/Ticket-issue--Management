const express = require('express');
const {
  getAllTimetable, // Ensure proper spelling and case
  getTimetableById,
  createTimetable,
  updateTimetable,
  deleteTimetable
} = require('../controllers/timetableController'); // Correct path to the controller file

const router = express.Router();

// CREATE a new timetable entry
router.post('/', createTimetable);

// READ all timetable entries
router.get('/', getAllTimetable); // Correct the function name

// READ a single timetable entry by ID
router.get('/:id', getTimetableById);

// UPDATE a timetable entry by ID
router.put('/:id', updateTimetable);

// DELETE a timetable entry by ID
router.delete('/:id', deleteTimetable);

module.exports = router;
