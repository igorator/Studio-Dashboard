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
    onDelete: 'CASCADE', // Удаление записи в Media при удалении скриншота
  },
  project_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Projects', // Модель Project
      key: 'id',
    },
    onDelete: 'CASCADE', // Каскадное удаление скриншотов при удалении проекта
  },
});

ProjectScreen.belongsTo(Media, { foreignKey: 'media_id' }); // Связь с таблицей Media

module.exports = ProjectScreen;
