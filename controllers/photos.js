const express = require('express');
const router = express.Router();
const Photo = require('../models/photos.js');

router.get('/photos', (req, res) => {
  res.render('photos/index.ejs');
})


router.get('photos/:id', (req, res) => {
  res.render('photos/show.ejs')
})


router.get('/photos/:id', (req, res) => {
  User.findById(req.params.id, (error, User) => {
    res.render('photos/show.ejs', {
      photo: Photo
    })
  })
})

module.exports = router;
