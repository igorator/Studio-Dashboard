const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Media = sequelize.define('Media', {
  content: {
    type: DataTypes.BLOB,
    allowNull: false,
  },
});

module.exports = Media;
