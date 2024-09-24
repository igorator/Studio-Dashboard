const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Project = sequelize.define('Project', {
  title_eng: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description_eng: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  title_ua: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description_ua: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  cover: {
    type: DataTypes.BLOB,
    allowNull: true,
  },
  screens: {
    type: DataTypes.ARRAY(DataTypes.BLOB),
    allowNull: true,
    defaultValue: [],
  },
  social_urls: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {},
  },
  isShowedOnSite: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  isOnHeroSlider: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Project;
