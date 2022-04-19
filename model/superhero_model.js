const { Schema, model, SchemaTypes } = require('mongoose');
const { ValidInfoSuperhero } = require('../config/constants');
const mongoosePaginate = require('mongoose-paginate-v2');

const superheroSchema = new Schema(
  {
    nickname: {
      type: String,
      // unique: true,
      required: [true, 'Set nickname for superhero'],
      min: ValidInfoSuperhero.MIN_NICKNAME_LENGTH,
      max: ValidInfoSuperhero.MAX_NICKNAME_LENGTH,
    },
    real_name: {
      type: String,
      required: [true, 'Set real_name for superhero'],
    },
    origin_description: {
      type: String,
      default: 'description',
    },
    superpowers: {
      type: String,
      default: 'superhero superpowers',
    },
    catch_phrase: {
      type: String,
      default: 'superhero catch phrase',
    },
    // images: {
    //   type: Array,
    //   set: data => (!data ? [] : data),
    // },
    image: {
      type: String,
      default: 'image superhero',
    },

    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  },
);

superheroSchema.path('nickname').validate(function (value) {
  const re = /[A-Z]\w+/;
  return re.test(String(value));
});

superheroSchema.plugin(mongoosePaginate);

const Superhero = model('superhero', superheroSchema);

module.exports = Superhero;
