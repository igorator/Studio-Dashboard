const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const TeamMember = sequelize.define("TeamMember", {
  name_ua: { type: DataTypes.STRING, allowNull: false },
  name_eng: { type: DataTypes.STRING, allowNull: false },
  job_title_ua: { type: DataTypes.STRING, allowNull: false },
  job_title_eng: { type: DataTypes.STRING, allowNull: false },
  photo: { type: DataTypes.STRING, allowNull: false },
});

module.exports = TeamMember;
