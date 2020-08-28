// Required dependencies 
const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const es6Renderer = require('express-es6-template-engine');
const app = express();
const mongoose = require('mongoose');
const keys = require('./config/keys');
const passport = require('passport');
const cookieSession = require('cookie-session');
const profileRoutes = require('./routes/profileRoutes');
const userRoutes = require('./routes/user-routes');

//connecting to DB
mongoose.connect(keys.mongodb.dbUri, () => {
    console.log("connected to mongoDB");
})
const cors = require('cors');
// view engine setup
app.engine('html', es6Renderer);
app.set('views', 'views');
app.set('view engine', 'html');

// setting up session cookie
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));


//initializing passport
app.use(passport.initialize());
//initializing session
app.use(passport.session());

// Body parser
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json


//setting cors issue
app.use(cors({
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
  }));

//set routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/user', userRoutes);


//create home route
app.get('/', (req, resp, next) => {
    resp.render('index', { locals: { title: 'Welcome!' } })
})


app.listen(3000, () => {
    console.log('Server Started! and listening to port numeber 3000');
});