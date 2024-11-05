const TeamMember = require('../models/TeamMember');
const Media = require('../models/Media');
const { sequelize } = require('../config/database');
const handleMedia = require('../utils/mediaHandler');

// Получить всех участников команды
exports.getAllTeamMembers = async (req, res) => {
  try {
    const teamMembers = await TeamMember.findAll();
    res.json(teamMembers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Получить участника команды по ID
exports.getTeamMemberById = async (req, res) => {
  try {
    const teamMember = await TeamMember.findByPk(req.params.id);
    if (teamMember) {
      res.json(teamMember);
    } else {
      res.status(404).json({ message: 'Team member not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Создать участника команды
exports.createTeamMember = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const photoFile =
      req.files.find((file) => file.fieldname === 'photo') || null;

    const newTeamMember = await TeamMember.create(req.body, { transaction });

    if (photoFile) {
      await handleMedia(
        newTeamMember,
        { singleField: 'photo' },
        { photo: photoFile },
        transaction,
      );
    }

    await transaction.commit();
    res.status(201).json(newTeamMember);
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: error.message });
  }
};

// Обновить участника команды
exports.updateTeamMember = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const teamMember = await TeamMember.findByPk(req.params.id);
    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    await teamMember.update(req.body, { transaction });

    const photoFile = req.files.find((file) => file.fieldname === 'photo');

    if (req.body.photo === 'null') {
      if (teamMember.photo_id) {
        await Media.destroy({
          where: { id: teamMember.photo_id },
          transaction,
        });
      }
      await teamMember.update({ photo_id: null }, { transaction });
    } else if (photoFile) {
      await handleMedia(
        teamMember,
        { singleField: 'photo' },
        { photo: photoFile },
        transaction,
      );
      await teamMember.update({ photo_id: photoFile.id }, { transaction });
    }

    await transaction.commit();
    res.json(teamMember);
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: error.message });
  }
};

// Удалить участника команды
exports.deleteTeamMember = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const teamMember = await TeamMember.findByPk(req.params.id);
    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    if (teamMember.photo_id) {
      await Media.destroy({ where: { id: teamMember.photo_id }, transaction });
    }

    await teamMember.destroy({ transaction });
    await transaction.commit();
    res.status(204).send();
  } catch (err) {
    await transaction.rollback();
    res.status(500).json({ message: err.message });
  }
};

exports.reorderTeamMembers = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    let teamMembers = req.body;

    console.log('Received team members:', JSON.stringify(teamMembers));

    if (!Array.isArray(teamMembers) && typeof teamMembers === 'object') {
      const memberArray = Object.values(teamMembers).filter(
        (item) => typeof item === 'object' && item !== null,
      );
      console.log(
        'Converted team members to array:',
        JSON.stringify(memberArray),
      );
      teamMembers = memberArray;
    }

    if (!Array.isArray(teamMembers)) {
      return res
        .status(400)
        .json({ error: 'Invalid data format. Expected an array.' });
    }

    for (const member of teamMembers) {
      await TeamMember.update(
        { order_number: member.order_number }, // Предполагается, что order_number передается в запросе
        { where: { id: member.id }, transaction },
      );
    }

    await transaction.commit();
    res.status(200).json({ message: 'Order updated successfully' });
  } catch (error) {
    await transaction.rollback();
    console.error('Error updating team member order:', error);
    res.status(500).json({ error: 'Failed to update team member order' });
  }
};
