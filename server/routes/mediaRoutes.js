const express = require('express');
const router = express.Router();
const Media = require('../models/Media'); // Проверьте путь к модели Media

router.get('/:id', async (req, res) => {
  try {
    const media = await Media.findByPk(req.params.id);
    if (!media) return res.status(404).json({ message: 'Media not found' });

    res.send(media.content); // Предполагается, что media.content содержит изображение
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
