const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Project = sequelize.define("Project", {
  url: { type: DataTypes.STRING, allowNull: false },
  title_ua: { type: DataTypes.STRING, allowNull: false },
  title_eng: { type: DataTypes.STRING, allowNull: false },
  description_ua: { type: DataTypes.TEXT, allowNull: false },
  description_eng: { type: DataTypes.TEXT, allowNull: false },
  cover: { type: DataTypes.STRING, allowNull: false },
  screens: { type: DataTypes.ARRAY(DataTypes.STRING) },
  created_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  edited_at_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  is_slider: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: true },
});

module.exports = Project;
