const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;


const photoSchema = new mongoose.Schema ({
  username: {type: String},
  img: {type: String},
  date: {type: Date},
  location: {type: String},
  species: {type: String},
  bait: {type: String},
  lat: {type: String},
  lng: {type: String}
})

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
