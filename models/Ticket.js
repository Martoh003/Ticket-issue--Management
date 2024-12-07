const { DataTypes } = require('sequelize');
const sequelize = require('../src/config/database'); // Ensure correct path to sequelize instance

const Ticket = sequelize.define('Ticket', {
  issue_title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Pending'
  },
  priority: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Medium'
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'IT'
  }
}, {
  tableName: 'Tickets',  // Ensure this matches your DB table name
  timestamps: true  // Keeps createdAt and updatedAt columns if you want them
});

module.exports = Ticket;
