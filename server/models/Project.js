const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Project = sequelize.define('Project', {
  url: { type: DataTypes.STRING, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  cover: { type: DataTypes.STRING, allowNull: false },
  screens: { type: DataTypes.ARRAY(DataTypes.STRING) },
  createdDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  editedAtDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  isSlider: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: true },
});

module.exports = Project;
