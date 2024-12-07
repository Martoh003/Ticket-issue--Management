const { Sequelize } = require('sequelize');

// Database connection
const sequelize = new Sequelize('enhanced_ticket_system', 'root', '#2586Quavixx', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log,
});

module.exports = sequelize;
