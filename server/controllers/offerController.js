const Offer = require('../models/Offer');
const Media = require('../models/Media');
const { sequelize } = require('../config/database');
const handleMedia = require('../utils/mediaHandler');

// Получить все предложения
exports.getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.findAll();
    res.json(offers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Получить предложение по ID
exports.getOfferById = async (req, res) => {
  try {
    const offer = await Offer.findByPk(req.params.id);
    if (offer) {
      res.json(offer);
    } else {
      res.status(404).json({ message: 'Offer not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Создать предложение
exports.createOffer = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const coverFile =
      req.files.find((file) => file.fieldname === 'cover') || null;

    const newOffer = await Offer.create(req.body, { transaction });

    if (coverFile) {
      await handleMedia(
        newOffer,
        { singleField: 'cover' },
        { cover: coverFile },
        transaction,
      );
    }

    await transaction.commit();
    res.status(201).json(newOffer);
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: error.message });
  }
};

// Обновить предложение
exports.updateOffer = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const offer = await Offer.findByPk(req.params.id);
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    await offer.update(req.body, { transaction });

    const coverFile = req.files.find((file) => file.fieldname === 'cover');

    if (req.body.cover === 'null') {
      if (offer.cover) {
        await Media.destroy({ where: { id: offer.cover.id }, transaction });
      }
      await offer.update({ cover_id: null }, { transaction });
    } else if (coverFile) {
      await handleMedia(
        offer,
        { singleField: 'cover' },
        { cover: coverFile },
        transaction,
      );
      await offer.update({ cover_id: coverFile.id }, { transaction });
    }

    await transaction.commit();
    res.json(offer);
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: error.message });
  }
};

// Удалить предложение
exports.deleteOffer = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const offer = await Offer.findByPk(req.params.id);
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    if (offer.cover_id) {
      await Media.destroy({ where: { id: offer.cover_id }, transaction });
    }

    await offer.destroy({ transaction });
    await transaction.commit();
    res.status(204).send();
  } catch (err) {
    await transaction.rollback();
    res.status(500).json({ message: err.message });
  }
};

exports.reorderOffers = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    let offers = req.body;

    //console.log('Received offers:', JSON.stringify(offers));

    if (!Array.isArray(offers) && typeof offers === 'object') {
      const offerArray = Object.values(offers).filter(
        (item) => typeof item === 'object' && item !== null,
      );
      console.log('Converted offers to array:', JSON.stringify(offerArray));
      offers = offerArray;
    }

    if (!Array.isArray(offers)) {
      return res
        .status(400)
        .json({ error: 'Invalid data format. Expected an array.' });
    }

    for (const offer of offers) {
      await Offer.update(
        { order_number: offer.order_number }, // Предполагается, что order_number передается в запросе
        { where: { id: offer.id }, transaction },
      );
    }

    await transaction.commit();
    res.status(200).json({ message: 'Order updated successfully' });
  } catch (error) {
    await transaction.rollback();
    console.error('Error updating offer order:', error);
    res.status(500).json({ error: 'Failed to update offer order' });
  }
};
