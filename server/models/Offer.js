const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Offer = sequelize.define("Offer", {
  title_ua: { type: DataTypes.STRING, allowNull: false },
  title_eng: { type: DataTypes.STRING, allowNull: false },
  description_ua: { type: DataTypes.TEXT, allowNull: false },
  description_eng: { type: DataTypes.TEXT, allowNull: false },
  animation: { type: DataTypes.STRING, allowNull: false },
  created_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  expired_date: { type: DataTypes.DATE, allowNull: false },
});

module.exports = Offer;
