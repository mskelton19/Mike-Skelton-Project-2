const express = require('express');
const router = express.Router();
const Photo = require('../models/photos.js');

router.get('/photos', (req, res) => {
  Photo.find ({}, (error, allPhotos) => {
    res.render('photos/index.ejs', {
      photo: allPhotos
    });
  })
})

router.post('/photos', (req, res) => {
  Photo.create(req.body, (error, createPhoto) => {
    res.redirect('/photos')
  });
});

router.get('/photos/new', (req, res) => {
  res.render('photos/new.ejs');
})


router.get('photos/:id', (req, res) => {
  Photo.findById(req.params.id, (error, foundPhoto) => {
    res.render('photos/show.ejs', {
      photo: foundPhoto
    });
  });
})


router.get('/photos/:id', (req, res) => {
  Photo.findById(req.params.id, (error, Photo) => {
    res.render('photos/show.ejs', {
      photo: Photo
    })
  })
})

module.exports = router;
