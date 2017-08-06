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
  User.findByIdAndRemove(req.params.id, (error, data) => {
    res.redirect('/users');
  });
});


module.exports = router;
