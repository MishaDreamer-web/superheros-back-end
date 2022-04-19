const res = require('express/lib/response');
const Superhero = require('../model/superhero_model');

const listSuperheros = async (userId, query) => {
  const { limit = 5, page = 1 } = query;
  const searchOptions = { owner: userId };
  const results = await Superhero.paginate(searchOptions, {
    limit,
    page,
    sort: { nickname: 1 },
  });
  const { docs: superheros } = results;
  delete results.docs;
  return { ...results, superheros };
};

const getSuperheroById = async (id, userId) => {
  const result = await Superhero.findOne({ _id: id, owner: userId });
  return result;
};

const removeSuperhero = async (id, userId) => {
  const result = await Superhero.findOneAndRemove({ _id: id, owner: userId });

  return result;
};

const addSuperhero = async body => {
  const result = await Superhero.create(body);
  return result;
};

const updateSuperhero = async (id, body, userId) => {
  const result = await Superhero.findOneAndUpdate(
    { _id: id, owner: userId },
    { ...body },
    { new: true },
  );

  return result;
};

const updateImage = async (id, image) => {
  return await Superhero.updateOne({ _id: id }, { image });
};

module.exports = {
  listSuperheros,
  getSuperheroById,
  removeSuperhero,
  addSuperhero,
  updateSuperhero,
  updateImage,
};
