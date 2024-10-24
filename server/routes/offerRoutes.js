const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');

router.get('/', offerController.getAllOffers);
router.get('/:id', offerController.getOfferById);
router.post('/', offerController.createOffer);
router.post('/reorder', offerController.reorderOffers);
router.put('/:id', offerController.updateOffer);
router.delete('/:id', offerController.deleteOffer);

module.exports = router;
