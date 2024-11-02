const multer = require('multer');

// Настройка multer для хранения файлов в памяти
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Универсальный middleware для обработки FormData
const formDataHandler = () => {
  return (req, res, next) => {
    if (req.body && req.body.processed) {
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
          // Проверка поля photo (если это поле фото)
          if (file.fieldname === 'photo') {
            data.photo = {
              originalname: file.originalname,
              buffer: file.buffer,
              mimetype: file.mimetype,
            };
          }

          // Проверяем имя поля cover
          else if (file.fieldname === 'cover') {
            data.cover = {
              originalname: file.originalname,
              buffer: file.buffer,
              mimetype: file.mimetype,
            };
          }

          // Проверка на screens (массив скриншотов)
          else if (file.fieldname.startsWith('screens')) {
            if (!data.screens) {
              data.screens = [];
            }
            data.screens.push({
              originalname: file.originalname,
              buffer: file.buffer,
              mimetype: file.mimetype,
            });
          }
        });
      }

      // Убедимся, что все данные обработаны корректно
      data.cover = data.cover || null;
      data.screens = data.screens || [];
      data.photo = data.photo || null;

      data.processed = true;

      // Обновляем req.body
      req.body = data;

      next();
    });
  };
};

module.exports = { formDataHandler };
