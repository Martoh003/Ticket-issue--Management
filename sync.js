const sequelize = require('./src/config/database');
const User = require('./models/Ticket');
const Ticket = require('./models/User');

(async () => {
  try {
    await sequelize.sync({ force: true }); // WARNING: This will drop the tables and recreate them
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error('Error syncing models:', error);
  } finally {
    await sequelize.close();
  }
})();
