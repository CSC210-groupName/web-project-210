const mongoose = require('mongoose');
const axios= require('axios');
const eventTableSchema = require('../models/eventtable');


module.exports = (app)=>{
  app.post('/func/addevent', (req,res)=>{
    if(req.user==""){
      res.redirect('/');
    }else{
      //insert the event into that particular user's table
      if(req.data.type==="homework"){

      }else{
        //class or events
            mongoose.connection.db.listCollections({name: req.user.id})
          .next((err, collinfo)=> {
              if (collinfo) {
                  // The collection exists
                  
              }else{
                //create a new collection
                  mongoose.model(req.user.id, eventTableSchema).then(()=>{
                    mongoose.model(req.user.id).then((eventT)=>{
                        new eventT({
                          name: req.data.name,
                          description: req.data.description,
                          type: req.data.type,
                        }).save().then(event=>res.send("success"));
                      }
                    );
                  }
                );
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
