const express = require('express');
const app = express();
const cookieSession = require('cookie-session');
const passport = require('passport');

const mongoose = require('mongoose');
const keys = require('./config/keys');
mongoose.connect(keys.mongoURI, {useNewUrlParser: true});
require('./models/Users');
require('./services/passport');

const bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies


app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookiekey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authroutes')(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT);
