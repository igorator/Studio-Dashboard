const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Offer = sequelize.define('Offer', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  animation: { type: DataTypes.STRING, allowNull: false },
  createdDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  expiredDate: { type: DataTypes.DATE, allowNull: false },
});

module.exports = Offer;
