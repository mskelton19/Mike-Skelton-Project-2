const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Photo = require('../models/photos.js');

const userSchema = new mongoose.Schema ({
  username: {type: String},
  location: {type: String},
  photos: [Photo.schema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
