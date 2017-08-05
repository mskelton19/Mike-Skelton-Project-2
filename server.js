const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

const userController = require('./controllers/users.js');
app.use(userController);

mongoose.connect('mongodb://localhost:27017/users');
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
})

// Home page route--- leave this here
app.get('/', (req, res) => {
  res.render('index.ejs');
})


app.listen(3000, (req, res) => {
  console.log('listening');
})
