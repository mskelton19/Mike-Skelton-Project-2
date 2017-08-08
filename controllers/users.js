const express               = require('express');
const router                = express.Router();
const User                  = require('../models/users.js');
const Photo                 = require('../models/photos.js');
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

router.get('/users', isLoggedIn, (req, res) => {
  User.find({}, (error, foundUser) => {
    res.render('users/index.ejs', {
      user: foundUser
    });
  });
});

router.put('/users/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, (error, updateModel) => {
    res.redirect('/users')
  })
})

router.post('/users', (req, res) => {
  User.create(req.body, (error, createdUser) => {
    res.redirect('/users')
  });
});

router.get('/users/new', (req, res) => {
  res.render('users/new.ejs');
})

router.get('/users/:id', (req, res) => {
  User.findById(req.params.id, (error, User) => {
    res.render('users/show.ejs', {
      user: User
    })
  })
})

router.get('/users/:id/edit', (req, res) => {
  User.findById(req.params.id, (error, editUser) => {
    res.render('users/edit.ejs', {
      user: editUser
    })
  })
})

router.delete('/users/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (error, foundUser) => {
    const photoIds = [];
    for(let i = 0; i < foundUser.photos.length; i++) {
      photoIds.push(foundUser.photos[i]._id);
    }
    Photo.remove(
      {
        _id: {
          $in: photoIds
        }
      },
      (err, data) => {
        res.redirect('/users');
      }
  );
});
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}


module.exports = router;
