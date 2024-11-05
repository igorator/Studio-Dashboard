const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');

router.get('/', leadController.getAllLeads);
router.get('/:id', leadController.getLeadById);
router.post('/', leadController.createLead);
router.patch('/:id', leadController.checkLeadById);
router.delete('/:id', leadController.deleteLead);

module.exports = router;
