const mongoose = require('mongoose');
const axios= require('axios');
const eventTableSchema = require('../models/eventtable');
const requireAuth = require('../middlewares/requireAuth');

module.exports = (app)=>{
  app.post('/func/addevent',requireAuth,(req,res)=>{
    console.log(req.body);



      //insert the event into that particular user's tabl
      //asumming NO CONFLICT
          mongoose.connection.db.listCollections({name: req.user.id})
          .next((err, collinfo)=> {
              mongoose.model(req.user.id, eventTableSchema);
              const eventT = mongoose.model(req.user.id);
              new eventT({
                date: req.body.date,
                events: [{
                  name: req.body.name,
                  description: req.body.description,
                  type: req.body.type,
                  starttime: req.body.starttime,
                  endtime: req.body.endtime,
                }]
              }).save().then(event=>res.send("success"));
          });

      //if not homework: resolved by express
      //const status: success, conflict
      //conflict: options

      //if homework
      //send to python for additional analysis
      //const status: success, conflict
      //specs: not able to finish, have to give up some events
      //if have to give up events: options
      //if not able to finish: fill up the blanks, don't add at all
  });

  app.post('/func/addassignment', requireAuth, (req, res)=>{
    
  })

  // gets all the events for the given day
  app.post('/func/getevents', requireAuth, (req, res) => {
    var datesDB = mongoose.model(req.user.id, eventTableSchema);
    var query = datesDB.find({"date": { 
        '$gte': Date.parse(req.body.date),
        '$lte': Date.parse(req.body.date) + 86400000
       }});
    const result = [];
    query.exec(function(err,events){
      if(err)
        return console.log(err);
      events.forEach(function(event){
        var eventData = {
          eName: event.events[0].name,
          sTimeHour: new Date(event.events[0].starttime).getHours(),
          sTimeMinute: new Date(event.events[0].starttime).getMinutes(),
          eTimeHour: new Date(event.events[0].endtime).getHours(),
          eTimeMinute: new Date(event.events[0].endtime).getMinutes()
        };
        result.push(eventData);
      });
      res.send(result);
    });
  });
};
