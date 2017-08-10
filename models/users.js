const mongoose              = require('mongoose');
const Schema                = mongoose.Schema;
const Photo                 = require('../models/photos.js');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema ({
  username: {type: String},
  password: {type: String},
  location: {type: String},
  profilePic: {type: String},
  photos: [Photo.schema]
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;
