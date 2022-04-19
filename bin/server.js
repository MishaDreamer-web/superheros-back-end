const db = require('../config/db');
const app = require('../app');
require('dotenv').config();
const UPLOAD_DIR = process.env.UPLOAD_DIR;
const SUPERHEROS_IMAGES = process.env.SUPERHEROS_IMAGES;
const mkdirp = require('mkdirp');

const PORT = process.env.PORT || 3000;

db.then(() => {
  app.listen(PORT, async () => {
    await mkdirp(UPLOAD_DIR);
    await mkdirp(SUPERHEROS_IMAGES);
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch(err => {
  console.log(`Server not run. Error: ${err.message}`);
});
