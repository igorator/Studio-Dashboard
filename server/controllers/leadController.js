const Lead = require('../models/Lead');

// Получить всех лидов
exports.getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.findAll();
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Получить лид по ID
exports.getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findByPk(req.params.id);
    if (lead) {
      res.json(lead);
    } else {
      res.status(404).json({ message: 'Lead not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Создать нового лида
exports.createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Обновить статус isChecked для лида
exports.checkLeadById = async (req, res) => {
  try {
    const lead = await Lead.findByPk(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    lead.is_checked = req.body.is_checked;

    await lead.save();
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Удалить лида
exports.deleteLead = async (req, res) => {
  try {
    const deleted = await Lead.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.json({ message: 'Lead deleted' });
    } else {
      res.status(404).json({ message: 'Lead not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
