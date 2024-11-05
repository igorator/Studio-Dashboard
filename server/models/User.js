const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: 'Username must be unique',
    },
    validate: {
      notEmpty: {
        msg: 'Username is required',
      },
      len: {
        args: [3, 30],
        msg: 'Username must be between 3 and 30 characters',
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: 'Email must be unique',
    },
    validate: {
      notEmpty: {
        msg: 'Email is required',
      },
      isEmail: {
        msg: 'Email must be valid',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Password is required',
      },
      len: {
        args: [6, 100],
        msg: 'Password must be at least 6 characters long',
      },
    },
  },
});

module.exports = User;
