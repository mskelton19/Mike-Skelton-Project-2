const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

const userController = require('./controllers/users.js');
app.use(userController);
const photoController = require('./controllers/photos.js');
app.use(photoController);

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/users'
mongoose.connect(mongoUri);

mongoose.connection.once('open', () => {
  console.log('connected to mongo');
})

// Home page route--- leave this here
app.get('/', (req, res) => {
  res.render('index.ejs');
})

const port = process.env.PORT || 3000

app.listen(port, (req, res) => {
  console.log('listening');
})
