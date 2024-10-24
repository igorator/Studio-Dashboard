const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const ProjectCover = require('./ProjectCover');
const ProjectScreen = require('./ProjectScreen');

const Project = sequelize.define(
  'Project',
  {
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
    isOnSite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isOnHeroSlider: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    social_urls: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {},
    },
    cover_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    screens_ids: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
      defaultValue: [],
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    order_number: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    hooks: {
      beforeCreate: (project) => {
        // Устанавливаем order_number равным id, когда проект создается
        project.order_number = project.id; // id будет доступен после сохранения
      },
      beforeSave: (project) => {
        // Устанавливаем order_number равным id, если он не был установлен
        if (project.order_number === null) {
          project.order_number = project.id; // id будет доступен после сохранения
        }
      },
    },
  },
);

// Связь "Один проект - один cover"
Project.hasOne(ProjectCover, {
  foreignKey: 'cover_id',
  as: 'cover',
  onDelete: 'CASCADE',
});

// Связь "Один проект - несколько скриншотов"
Project.hasMany(ProjectScreen, {
  foreignKey: 'project_id',
  as: 'screens',
  onDelete: 'CASCADE', // Каскадное удаление скриншотов при удалении проекта
});

module.exports = Project;
