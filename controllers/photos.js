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

router.put('/photos/:id', (req, res) => {
  Photo.findByIdAndUpdate(req.params.id, req.body, (error, updatePhoto) => {
    res.redirect('/photos');
  })
})

router.post('/photos', (req, res) => {
  Photo.create(req.body, (error, createdPhoto) => {
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

router.get('/photos/:id/edit', (req, res) => {
  Photo.findById(req.params.id, (error, editPhoto) => {
    res.render('photos/edit.ejs', {
      photo: editPhoto
    })
  })
})

router.delete('/photos/:id', (req, res) => {
  Photo.findByIdAndRemove(req.params.id, (error, data) => {
    res.redirect('/photos');
  });
});

module.exports = router;
