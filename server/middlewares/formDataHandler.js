const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const formDataHandler = () => {
  return (req, res, next) => {
    upload.any()(req, res, (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: 'File upload error', error: err });
      }

      const data = { ...req.body };

      if (req.files) {
        req.files.forEach((file) => {
          console.log(`Processing file: ${file.fieldname}`);

          if (data[file.fieldname] === undefined) {
            data[file.fieldname] = [];
          }

          if (Array.isArray(data[file.fieldname])) {
            data[file.fieldname].push({
              originalname: file.originalname,
              buffer: file.buffer,
              mimetype: file.mimetype,
            });
          } else {
            data[file.fieldname] = {
              originalname: file.originalname,
              buffer: file.buffer,
              mimetype: file.mimetype,
            };
          }
        });
      }
      req.body = data;

      next();
    });
  };
};

module.exports = { formDataHandler };
