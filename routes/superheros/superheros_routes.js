const express = require('express');
const router = express.Router();
const {
  getSuperheros,
  getSuperhero,
  createSuperhero,
  removeSuperhero,
  updateSuperhero,
  updateImagesSuperhero,
  uploadImage,
} = require('../../controllers/superheros_controllers');
const {
  validateSuperhero,
  validateImagesSuperhero,
  validateId,
} = require('./superheros_validation');
const guard = require('../../helpers/guard');
const wrapError = require('../../helpers/error_handler');
const upload = require('../../helpers/uploads');

router.get('/', guard, wrapError(getSuperheros));

router.get('/:id', guard, validateId, wrapError(getSuperhero));

router.post('/', guard, validateSuperhero, wrapError(createSuperhero));

router.delete('/:id', guard, validateId, wrapError(removeSuperhero));

router.put(
  '/:id',
  guard,
  [(validateId, validateSuperhero)],
  wrapError(updateSuperhero),
);

// router.patch(
//   '/:id/images/',
//   guard,
//   [(validateId, validateImagesSuperhero)],
//   wrapError(updateImagesSuperhero),
// );

router.patch(
  '/:id/images/',
  guard,
  validateId,
  upload.single('image'),
  uploadImage,
);

module.exports = router;
