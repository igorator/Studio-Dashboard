const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Media = require('./Media');

const TeamMemberPhoto = sequelize.define('TeamMemberPhoto', {
  media_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Media,
      key: 'id',
    },
    onDelete: 'CASCADE', // Удаление записи в Media при удалении фотографии
  },
});

TeamMemberPhoto.belongsTo(Media, { foreignKey: 'media_id' }); // Связь с таблицей Media

module.exports = TeamMemberPhoto;
