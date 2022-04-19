const Superheros = require('../repository/superheros_methods');
const path = require('path');
const mkdirp = require('mkdirp');
const { CustomError } = require('../helpers/custom_error');
const { HttpCode } = require('../config/constants');
const UploadService = require('../services/file-upload');
require('dotenv').config();

const getSuperheros = async (req, res) => {
  const userId = req.user._id;
  const data = await Superheros.listSuperheros(userId, req.query);
  res.json({ status: 'success', code: 200, data: { ...data } });
};

const getSuperhero = async (req, res, next) => {
  const userId = req.user._id;
  const superhero = await Superheros.getSuperheroById(req.params.id, userId);

  if (superhero) {
    return res
      .status(200)
      .json({ status: 'success', code: 200, data: { superhero } });
  }

  throw new CustomError(404, 'Not found');
};

const createSuperhero = async (req, res, next) => {
  const userId = req.user._id;
  const superhero = await Superheros.addSuperhero({
    ...req.body,
    owner: userId,
  });

  res.status(201).json({ status: 'success', code: 201, data: { superhero } });
};

const removeSuperhero = async (req, res, next) => {
  const userId = req.user._id;
  const superhero = await Superheros.removeSuperhero(req.params.id, userId);
  if (superhero) {
    return res
      .status(200)
      .json({ status: 'success', code: 200, data: { superhero } });
  }
  throw new CustomError(404, 'Not found');
};

const updateSuperhero = async (req, res, next) => {
  const userId = req.user._id;
  const superhero = await Superheros.updateSuperhero(
    req.params.id,
    req.body,
    userId,
  );
  if (superhero) {
    return res
      .status(200)
      .json({ status: 'success', code: 200, data: { superhero } });
  }
  throw new CustomError(404, 'Not found');
};

// const updateImagesSuperhero = async (req, res, next) => {
//   const userId = req.user._id;
//   const superhero = await Superheros.updateSuperhero(
//     req.params.id,
//     req.body,
//     userId,
//   );
//   if (superhero) {
//     return res
//       .status(200)
//       .json({ status: 'success', code: 200, data: { superhero } });
//   }
//   throw new CustomError(404, 'Not found');
// };

const uploadImage = async (req, res, next) => {
  const id = req.params.id;
  const file = req.file;

  const SUPERHEROS_IMAGES = process.env.SUPERHEROS_IMAGES;
  const destination = path.join(SUPERHEROS_IMAGES, id);

  await mkdirp(destination);

  const uploadService = new UploadService(destination);

  const imageUrl = await uploadService.save(file, id);
  await Superheros.updateImage(id, imageUrl);

  // try {
  //   await fs.unlink(file.path);
  // } catch (err) {
  //   console.log(err.message);
  // }

  return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: {
      image: imageUrl,
    },
  });
};

module.exports = {
  getSuperheros,
  getSuperhero,
  createSuperhero,
  removeSuperhero,
  updateSuperhero,
  // updateImagesSuperhero,
  uploadImage,
};
