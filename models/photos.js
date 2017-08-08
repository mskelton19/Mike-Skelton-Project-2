const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;


const photoSchema = new mongoose.Schema ({
  username: {type: String},
  img: {type: String},
  username: {type: String},
  date: {type: Date},
  location: {type: String},
  type: {type: String},
  bait: {type: String}
})

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
