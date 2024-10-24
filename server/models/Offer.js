const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const OfferCover = require('./OfferCover');

const Offer = sequelize.define('Offer', {
  title_ua: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Title in Ukrainian is required',
      },
    },
  },
  title_eng: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Title in English is required',
      },
    },
  },
  description_ua: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Description in Ukrainian is required',
      },
    },
  },
  description_eng: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Description in English is required',
      },
    },
  },
  cover_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      isInt: {
        msg: 'Cover ID must be an integer',
      },
    },
  },
  created_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    validate: {
      isDate: {
        msg: 'Created Date must be a valid date',
      },
    },
  },
  expired_date: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: {
        msg: 'Expired Date must be a valid date',
      },
      isAfter: {
        args: new Date().toISOString(),
        msg: 'Expired Date must be in the future',
      },
    },
  },
  order_number: { type: DataTypes.INTEGER, allowNull: true },
});

Offer.hasOne(OfferCover, {
  foreignKey: 'cover_id',
  as: 'cover',
  onDelete: 'CASCADE',
});

module.exports = Offer;
