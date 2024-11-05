const express = require('express');
const router = express.Router();
const teamMemberController = require('../controllers/teamController');

router.get('/', teamMemberController.getAllTeamMembers);
router.get('/:id', teamMemberController.getTeamMemberById);
router.post('/', teamMemberController.createTeamMember);
router.post('/reorder', teamMemberController.reorderTeamMembers);
router.put('/:id', teamMemberController.updateTeamMember);
router.delete('/:id', teamMemberController.deleteTeamMember);

module.exports = router;
