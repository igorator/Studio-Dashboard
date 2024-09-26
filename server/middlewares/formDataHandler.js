const multer = require('multer');

// Настройка multer для хранения файлов в памяти
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Универсальный middleware для обработки FormData
const formDataHandler = () => {
  return (req, res, next) => {
    if (req.body && req.body.processed) {
      // Если данные уже были обработаны, пропускаем этот шаг
      return next();
    }

    upload.any()(req, res, (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: 'File upload error', error: err });
      }

      const data = { ...req.body };

      // Обработка загруженных файлов
      if (req.files) {
        req.files.forEach((file) => {
          // Проверяем имя поля
          if (file.fieldname === 'cover') {
            // Если это поле cover
            data.cover = {
              originalname: file.originalname,
              buffer: file.buffer, // Преобразуем в base64
              mimetype: file.mimetype,
            };
          } else if (file.fieldname.startsWith('screens')) {
            // Если это screens (добавляем в массив screens)
            if (!data.screens) {
              data.screens = [];
            }
            data.screens.push({
              originalname: file.originalname,
              buffer: file.buffer, // Преобразуем в base64
              mimetype: file.mimetype,
            });
          }
        });
      }

      // Убедимся, что поля cover и screens присутствуют
      data.cover = data.cover || null;
      data.screens = data.screens || [];

      // Флаг, чтобы указать, что данные уже обработаны
      data.processed = true;

      // Обновляем req.body
      req.body = data;

      next();
    });
  };
};

module.exports = { formDataHandler };
