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



app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookiekey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authroutes')(app);
require('./routes/eventroutes')(app);

if(process.env.NODE_ENV==="production"){
  app.use(express.static('client/build'));

  const path= require('path');
  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
