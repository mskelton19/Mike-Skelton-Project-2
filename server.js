const express               = require('express');
const app                   = express();
const mongoose              = require('mongoose');
const bodyParser            = require('body-parser');
const methodOverride        = require('method-override');
const passport              = require('passport');
const localStrategy         = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const User                  = require('./models/users.js');


app.use(require('express-session')({
  secret: 'Stuck in a glass case of emotion',
  resave: false,
  saveUninitialized: false
}))

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// =================
// routes

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

app.get('/secret', isLoggedIn, (req, res) => {
  res.render('secret.ejs')
})

// Auth routes
// ****Use this moi
app.get('/register', (req, res) => {
  res.render('register.ejs');
})

// handling user sign up
app.post('/register', (req, res) => {
  req.body.username
  req.body.password
  User.register(new User({username: req.body.username}), req.body.password, function(err, user){
    if(err) {
      console.log(err);
      return res.render('/register');
    }
    passport.authenticate('local')(req, res, function(){
      res.redirect('/photos');
    })
  })
})

app.get('/login', function (req, res){
  res.render('login.ejs')
});

// Login logic
app.post('/login', passport.authenticate('local', {
  successRedirect: '/photos',
  failureRedirect: '/login'
}), function(req, res) {
})

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

const port = process.env.PORT || 3000

app.listen(port, (req, res) => {
  console.log('listening');
})
