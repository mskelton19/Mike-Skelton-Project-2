const express = require('express');
const router = express.Router();
const Photo = require('../models/photos.js');
const User = require('../models/users.js');
const passport              = require('passport');
const localStrategy         = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const bodyParser            = require('body-parser');
const methodOverride        = require('method-override');

router.use(require('express-session')({
  secret: 'Stuck in a glass case of emotion',
  resave: false,
  saveUninitialized: false
}))

router.use(bodyParser.urlencoded({extended: false}));
router.use(methodOverride('_method'));
router.use(passport.initialize());
router.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
  User.findById(req.body.userId, (err, foundUser) => {
    foundUser.photos.push(createdPhoto);
    foundUser.save((err, data) => {
      res.redirect('/photos');
    });
  })
  });
});

router.get('/photos/new', isLoggedIn, (req, res) => {
  User.find({}, (error, allUsers) => {
    res.render('photos/new.ejs', {
      users: allUsers
    });
  });
})

router.get('/photos/:id', isLoggedIn, (req, res) => {
  Photo.findById(req.params.id, (error, foundPhoto) => {
    User.findOne({'photos._id':req.params.id}, (err, foundUser) => {
      res.render('photos/show.ejs', {
        photo: foundPhoto,
        user: foundUser
    })
  });
})
})

router.get('/photos/:id/edit', isLoggedIn, (req, res) => {
  Photo.findById(req.params.id, (error, editPhoto) => {
    res.render('photos/edit.ejs', {
      photo: editPhoto
    })
  })
})

router.delete('/photos/:id', isLoggedIn, (req, res) => {
  Photo.findByIdAndRemove(req.params.id, (error, data) => {
    res.redirect('/photos');
  });
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

module.exports = router;
