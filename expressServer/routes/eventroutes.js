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
    addAssignment(req).then(function (result) {
      res.send(result);
    });
  })

  // gets all the events for the given day
  app.post('/func/getevents', requireAuth, (req, res) => {
    getEvents(req.user.id, Date.parse(req.body.date)).then(function (result) {
      res.send(result);
    });
  });
};

async function getEvents(id, date) {
  var datesDB = mongoose.model(id, eventTableSchema); 
  var query = datesDB.find({"date": { 
        '$gte': date,
        '$lte': date + 86400000
       }});

  var events = await query.exec();

  const result = [];
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
  return result;
}

async function addAssignment(req) {

  //var events = await getEvents(req.user.id, duedate etc etc )

  var assignment = req.body;
  var numDaysBetween = getNumDaysBetween(new Date(), new Date(req.body.dueDate));
  var numHoursPerDay = Math.ceil(req.body.estimateTime/numDaysBetween);
  var numHoursLeft = req.body.estimateTime;
  while (numHoursLeft > 0) {
    for (var day = 0; day < numDaysBetween; day++) {
      var schedulingDay = req.body.dueDate + 86400000;
      var dailyHoursLeft = numHoursPerDay;
      while (dailyHoursLeft > 0) {

      }
    }
  }
  return {"value": numDaysBetween};
}

//Took this function from https://www.geeksforgeeks.org/find-number-of-days-between-two-given-dates/
function countLeapYears(d) { 
    var years = d.getYear(); 
  
    // Check if the current year needs to be considered 
    // for the count of leap years or not 
    if (d.getMonth() <= 1) 
        years--; 
  
    // An year is a leap year if it is a multiple of 4, 
    // multiple of 400 and not a multiple of 100. 
    return years / 4 - years / 100 + years / 400; 
} 

function getNumDaysBetween(date1, date2) {
  console.log(date1);
  console.log(date2);
  console.log(date1.getMonth());
  console.log(date2.getMonth()); 

  var monthDays = [31, 28, 31, 30, 31, 30, 
                           31, 31, 30, 31, 30, 31]; 
    
  // initialize count using years and day 
  var n1 = date1.getYear()*365 + date1.getDay(); 

  // Add days for months in given date 
  for (var i=0; i<date1.getMonth() - 1; i++) 
      n1 += monthDays[i]; 

  // Since every leap year is of 366 days, 
  // Add a day for every leap year 
  n1 += countLeapYears(date1); 

  // SIMILARLY, COUNT TOTAL NUMBER OF DAYS BEFORE 'dt2' 

  var n2 = date2.getYear()*365 + date2.getDay(); 
  for (var i=0; i<date2.getMonth() - 1; i++) 
      n2 += monthDays[i]; 
  n2 += countLeapYears(date2); 

  // return difference between two counts 
  return (n2 - n1 - 1);   
}
