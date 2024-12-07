const express = require('express');
const { Ticket } = require('../models/Ticket'); // Assuming Ticket model is correctly defined
const { getAllTickets } = require('../controllers/ticketController')

const router = express.Router();

// CREATE a new Ticket
router.post('/', async (req, res) => {
  try {
    const { issue_title, description, status, priority, category } = req.body;
    const ticket = await Ticket.create({
      issue_title,
      description,
      status,
      priority,
      category,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Error creating ticket', error });
  }
});

// READ all tickets
router.get('/', getAllTickets);

// READ a single ticket by ID
router.get('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (ticket) {
      res.status(200).json(ticket);
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ticket', error });
  }
});

// UPDATE a ticket by ID
router.put('/:id', async (req, res) => {
  try {
    const { issue_title, description, status, priority, category } = req.body;
    const ticket = await Ticket.findByPk(req.params.id);
    if (ticket) {
      ticket.issue_title = issue_title || ticket.issue_title;
      ticket.description = description || ticket.description;
      ticket.status = status || ticket.status;
      ticket.priority = priority || ticket.priority;
      ticket.category = category || ticket.category;
      ticket.updatedAt = new Date();
      await ticket.save();
      res.status(200).json(ticket);
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating ticket', error });
  }
});

// DELETE a ticket by ID
router.delete('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (ticket) {
      await ticket.destroy();
      res.status(200).json({ message: 'Ticket deleted successfully' });
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting ticket', error });
  }
});

router.get('/', getAllTickets ); 

module.exports = router;
