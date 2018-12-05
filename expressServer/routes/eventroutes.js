const mongoose = require('mongoose');
const axios= require('axios');
const eventTableSchema = require('../models/eventtable');


module.exports = (app)=>{
  app.post('/func/addevent', (req,res)=>{
    console.log(req.user);
    console.log(req.body);
    if(req.user===undefined){
      res.send('please login');
    }else{
      //insert the event into that particular user's table
      if(req.body.type==="homework"){

      }else{
        //class or events
            mongoose.connection.db.listCollections({name: req.user.id})
          .next((err, collinfo)=> {
              if (collinfo) {
                  // The collection exists
                  res.send(collinfo.name);

              }else{
                //create a new collection
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
              }
          });
      }



      //if not homework: resolved by express
      //const status: success, conflict
      //conflict: options

      //if homework
      //send to python for additional analysis
      //const status: success, conflict
      //specs: not able to finish, have to give up some events
      //if have to give up events: options
      //if not able to finish: fill up the blanks, don't add at all
    }
  });
};
