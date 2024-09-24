const multer = require('multer');

// Конфигурация multer для обработки FormData
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware для преобразования FormData в JSON
const formDataToJson = (req, res, next) => {
  upload.any()(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: 'Error processing FormData' });
    }

    req.body = req.body || {};
    req.files = req.files || [];

    // Обработка файлов
    req.body.screens = req.files
      .filter((file) => file.fieldname === 'screens') // Фильтруем только экраны
      .map((file) => file.buffer); // Сохраняем их в массиве

    // Преобразуем текстовые поля, если они есть
    Object.keys(req.body).forEach((key) => {
      try {
        req.body[key] = JSON.parse(req.body[key]);
      } catch (err) {
        // Оставляем как есть, если не JSON
      }
    });

    next();
  });
};

module.exports = formDataToJson;
