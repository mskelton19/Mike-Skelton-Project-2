const express = require('express');
const router = express.Router();
const User = require('../models/users.js');

router.get('/users', (req, res) => {
  User.find({}, (error, foundUser) => {
    res.render('users/index.ejs', {
      user: foundUser
    });
  });
});

router.get('/users/new', (req, res) => {
  res.render('users/new.ejs');
})

module.exports = router;
