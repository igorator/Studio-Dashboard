const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Media = require('./Media');

const ProjectScreen = sequelize.define('ProjectScreen', {
  media_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Media,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  project_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Projects',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
});

ProjectScreen.belongsTo(Media, { foreignKey: 'media_id' });

module.exports = ProjectScreen;
