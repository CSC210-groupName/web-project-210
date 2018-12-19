
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const axios= require('axios');

module.exports = (app)=>{
  // app.use(function(req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //   next();
  // });

  app.get('/auth/google', passport.authenticate('google', {
    scope : ['profile', 'email']
  })
  );

  app.get('/auth/google/callback', passport.authenticate('google'),
  (req, res) => {
  res.redirect('/cal');
}
  );

  app.get('/auth/current_user',(req,res)=>{
    res.send(req.user);
  });

  app.get('/auth/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
  });

  //app.post('/auth/logindefault', passport.authenticate('local', {successRedirect: '/cal', failureFlash: "Invalid Username or password", successFlash: "success"}));
  // , (req, res)=>{
  //   res.send("success");
  // })
  app.post('/auth/logindefault', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.send('failure'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send('success');
    });
  })(req, res, next);
});

  app.post('/auth/signupdefault',(req,res)=>{
      const name=req.body.name;
      const username = req.body.username;
      const password = req.body.password;
      var bcrypt = require('bcryptjs');
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(password, salt);
      User.findOne({
        userName: username
      }).then(existingUser=>{
        if(existingUser){
          res.send('UserName already existed');
        }else{
          console.log("creating new");
          new User({
            userName: username,
            name: name,
            password: hash,
            googleid: null
          }).save().then(
            user=>res.send({username: user.userName, password: user.password}));
        }
      });

  });
}
