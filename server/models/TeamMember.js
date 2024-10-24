const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const TeamMemberPhoto = require('./TeamMemberPhoto');

const TeamMember = sequelize.define('TeamMember', {
  name_ua: { type: DataTypes.STRING, allowNull: false },
  name_eng: { type: DataTypes.STRING, allowNull: false },
  job_title_ua: { type: DataTypes.STRING, allowNull: false },
  job_title_eng: { type: DataTypes.STRING, allowNull: false },
  photo_id: { type: DataTypes.INTEGER, allowNull: true },
  isOnSite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  order_number: { type: DataTypes.INTEGER, allowNull: true },
});

TeamMember.hasOne(TeamMemberPhoto, {
  foreignKey: 'photo_id',
  as: 'photo',
  onDelete: 'CASCADE',
});

module.exports = TeamMember;
