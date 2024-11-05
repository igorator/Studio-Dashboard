const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Media = require('./Media');

const ProjectCover = sequelize.define('ProjectCover', {
  media_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Media,
      key: 'id',
    },
    onDelete: 'CASCADE', // Удаление записи в Media при удалении кавера
  },
});

ProjectCover.belongsTo(Media, { foreignKey: 'media_id' }); // Связь с таблицей Media

module.exports = ProjectCover;
