const Ticket = require('../models/Ticket');

// Create a new ticket
const createTicket = async (req, res) => {
  try {
    const { issue_title, description, status, priority, category } = req.body;

    // Create a new ticket in the database
    const newTicket = await Ticket.create({
      issue_title,
      description,
      status,
      priority,
      category,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log('New ticket created:', newTicket);  // Log the created ticket for debugging
    res.status(201).json(newTicket);  // Return the newly created ticket in the response
  } catch (error) {
    console.error('Error creating ticket:', error);  // Log the full error
    res.status(500).json({ message: 'Error creating ticket', error });  // Send error response
  }
};

const getAllTickets = async (req, res) => {
  try {
    // Attempt to fetch tickets using Sequelize
    const tickets = await Ticket.findAll();
    console.log('Tickets fetched using Sequelize:', tickets);

    // If no tickets are found, log and return appropriate response
    if (tickets.length === 0) {
      console.log('No tickets found in the database.');
      return res.status(404).json({ message: 'No tickets found' });
    }

    // Return the fetched tickets
    res.status(200).json(tickets);
  } catch (error) {
    // Log the error for detailed debugging
    console.error('Error fetching tickets:', error);
    res.status(500).json({ message: 'Error fetching tickets', error: error.message });
  }
};


// Get a ticket by ID
const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);  // Find ticket by primary key (ID)

    if (!ticket) {
      console.log('Ticket not found with ID:', req.params.id);
      return res.status(404).json({ message: 'Ticket not found' });
    }

    console.log('Ticket fetched by ID:', ticket);
    res.status(200).json(ticket);  // Return the ticket found by ID
  } catch (error) {
    console.error('Error fetching ticket by ID:', error);  // Log the full error
    res.status(500).json({ message: 'Error fetching ticket by ID', error });  // Send error response
  }
};

// Update a ticket by ID
const updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);  // Find ticket by ID

    if (!ticket) {
      console.log('Ticket not found for update with ID:', req.params.id);
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Destructure new ticket data from the request body
    const { issue_title, description, status, priority, category } = req.body;

    // Update the ticket details
    await ticket.update({
      issue_title: issue_title || ticket.issue_title,
      description: description || ticket.description,
      status: status || ticket.status,
      priority: priority || ticket.priority,
      category: category || ticket.category,
      updatedAt: new Date(),
    });

    console.log('Ticket updated:', ticket);
    res.status(200).json(ticket);  // Return the updated ticket
  } catch (error) {
    console.error('Error updating ticket:', error);  // Log the full error
    res.status(500).json({ message: 'Error updating ticket', error });  // Send error response
  }
};

// Delete a ticket by ID
const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);  // Find ticket by ID

    if (!ticket) {
      console.log('Ticket not found for deletion with ID:', req.params.id);
      return res.status(404).json({ message: 'Ticket not found' });
    }

    await ticket.destroy();  // Delete the ticket from the database
    console.log('Ticket deleted:', ticket);
    res.status(204).json();  // No content, as the ticket is deleted
  } catch (error) {
    console.error('Error deleting ticket:', error);  // Log the full error
    res.status(500).json({ message: 'Error deleting ticket', error });  // Send error response
  }
};

// Export the functions to use in routes
module.exports = {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket
};
