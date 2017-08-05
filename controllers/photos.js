const express = require('express');
const router = express.Router();
const Photo = require('../models/photos.js');

router.get('/photos', (req, res) => {
  res.render('photos/index.ejs');
})


module.exports = Photo;
