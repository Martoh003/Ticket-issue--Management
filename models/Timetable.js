const { DataTypes } = require('sequelize');
const sequelize = require('../src/config/database'); // Adjust path as needed

const Timetable = sequelize.define(
  'Timetable',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    event_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    tableName: 'timetable', // Ensure the table name matches your database table
    timestamps: false // Disable automatic `createdAt` and `updatedAt` fields
  }
);

module.exports = Timetable;
