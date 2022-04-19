const multer = require('multer');
require('dotenv').config();
const UPLOAD_DIR = process.env.UPLOAD_DIR;
const { CustomError } = require('./custom_error');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now().toString()}_${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      return cb(null, true);
    }

    cb(new CustomError(400, 'Wrong format for image'));
  },
});

module.exports = upload;
