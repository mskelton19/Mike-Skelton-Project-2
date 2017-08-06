const express = require('express');
const router = express.Router();
const Photo = require('../models/photos.js');

router.get('/photos', (req, res) => {
  res.render('photos/index.ejs');
})

router.get('/photos/new', (req, res) => {
  res.render('photos/new.ejs');
})

module.exports = router;
