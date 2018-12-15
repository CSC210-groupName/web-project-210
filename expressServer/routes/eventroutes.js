const mongoose = require('mongoose');
const axios= require('axios');
const eventTableSchema = require('../models/eventtable');
const requireAuth = require('../middlewares/requireAuth');

module.exports = (app)=>{
  app.post('/func/addevent', requireAuth, (req,res)=>{
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
            color: req.body.color
          }]
        }).save().then(event=>res.send("success"));
    });
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
    var sTime = new Date(event.events[0].starttime),
        eTime = new Date(event.events[0].endtime);
    var eventData = {
      eName: event.events[0].name,
      sTimeHour: sTime.getHours(),
      sTimeMinute: sTime.getMinutes(),
      eTimeHour: eTime.getHours(),
      eTimeMinute: eTime.getMinutes(),
      color: event.events[0].color
    };
    result.push(eventData);
  });
  return result;
}

function createTimeInMilli(date, min) {
  return date + (min * 60000);
}


function createTimeInMins(hour, min) {
  return hour * 60 + min;
}

function createDate(hour, min, day) {
  var date = new Date(day);
  date.setHours(hour, min, 0, 0);
  return date;
}

async function addAssignment(req) {

  var assignmentColor = req.body.color;
  var assignmentName = req.body.name;
  var homeworkEvents = [];
  var d = new Date(req.body.dueDate); d.setHours(0,0,0,0); var dueDate = Date.parse(d);
  var today = new Date(); today.setHours(0,0,0,0);
  var numDaysBetween = getNumDaysBetween(today, d);
  var numMinsPerDay = (req.body.estimateTime/numDaysBetween)*60;
  var numMinsLeftTotal = req.body.estimateTime*60;
  var schedulingDay = new Date(); schedulingDay.setHours(0,0,0,0); schedulingDay = Date.parse(schedulingDay);
  var leftoverMins = 0;
  var restarted = false;
  // while we have not yet spent enough time on the assignment
  while (numMinsLeftTotal > 0) {
    
    // for every day between the day added until the due date
    for (var day = 0; day <= numDaysBetween; day++) {
      if (day === numDaysBetween && numMinsLeftTotal > 0) {
        day = 0;
        restarted = true;
        schedulingDay = schedulingDay - (numDaysBetween)*86400000;
        continue;
      }
      schedulingDay = schedulingDay + 86400000; // this should get the current day
      console.log(new Date(schedulingDay));
      // get all of the events occuring during that day
      await getEvents(req.user.id, schedulingDay).then((result) => {
        var events = [];
        // for each of those events, get the start and end times of them
        for (var i = 0; i < result.length; i++) {
          var event = {
            name: result[i].eName,
            sTime: createTimeInMins(result[i].sTimeHour, result[i].sTimeMinute),
            eTime: createTimeInMins(result[i].eTimeHour, result[i].eTimeMinute)
          }
          events.push(event);
        }
        // sort the events by when they start
        events.sort((obj1, obj2) => obj1.sTime - obj2.sTime);

        console.log(events);
        // initialize how many minutes you must spend on the homework this day
        if (restarted) {
          dailyMinLeft = numMinsLeftTotal;
        } else {
          var dailyMinLeft = numMinsPerDay + leftoverMins;
        }
        var timeBlock = req.body.maxTimeConsecutive * 60;

        // find all of the free times during the day
        var freeTimes = timeBetweenEvents(events);
        var f = 0;
        while (dailyMinLeft > 0) {
          console.log("minutes left to schedule "+dailyMinLeft);
          console.log(freeTimes);
          console.log("scheduling blocks of minutes " + timeBlock);
          console.log("f-value " + f);
          console.log("number of free times available "+freeTimes.length);
            if (f > freeTimes.length-1 && freeTimes.length > 1) {
              if (timeBlock > 60) {
                timeBlock -= 60;
                f = 0;
              }
              if (timeBlock <= 60) {
                timeBlock-=10;
                f = 0;
              }
            }
            if (freeTimes[f].length > timeBlock) {
              homeworkEvent = {
                date: schedulingDay,
                starttime: createTimeInMilli(schedulingDay, freeTimes[f].sTime),
                endtime: createTimeInMilli(schedulingDay, freeTimes[f].sTime+timeBlock),
                name: assignmentName,
                type: 'homework',
                description: '',
                color: assignmentColor
              };
              homeworkEvents.push(homeworkEvent);
              if (f != freeTimes.length-1) {
                var additionalFreeTime = {
                  sTime: freeTimes[f].sTime+timeBlock+timeBlock,
                  eTime: freeTimes[f+1].sTime,
                  length: freeTimes[f+1].sTime-(freeTimes[f].sTime+timeBlock+timeBlock)
                }
                if (additionalFreeTime.length > 0) {
                  freeTimes.push(additionalFreeTime);
                }
              } else {
                var additionalFreeTime = {
                  sTime: freeTimes[f].sTime+timeBlock+timeBlock,
                  eTime: freeTimes[f].eTime,
                  length: freeTimes[f].eTime - (freeTimes[f].sTime+timeBlock+timeBlock)
                }
                if (additionalFreeTime.length > 0) {
                  freeTimes.push(additionalFreeTime);
                }
              }
              dailyMinLeft-=timeBlock;
              numMinsLeftTotal-=timeBlock;
              if (dailyMinLeft < timeBlock) {
                timeBlock = dailyMinLeft;
              }
            }
            f++;
          }
      });
    }
    numMinsLeftTotal = 0;
  }
  return homeworkEvents;
}

function timeBetweenEvents(events) {
  var times = [];
  var wake = createTimeInMins(7, 0);
  var sleep = createTimeInMins(23, 59)
  if (events.length === 0 ) {
    var freeTime = {
      sTime: wake,
      eTime: sleep,
      length: sleep - wake
    }
    times.push(freeTime);
  }
  if (events.length === 1) {
    var freeTime = {
      sTime: wake,
      eTime: events[0].sTime-10,
      length: events[0].sTime-wake-10
    }
    times.push(freeTime);
    freeTime = {
      sTime: events[0].eTime+10,
      eTime: sleep,
      length: sleep - events[0].eTime-10
    }
    times.push(freeTime);
  }
    for (var i = 0; i < events.length-1; i++) {
      if (i === 0) {
        var freeTime = {
          sTime: wake,
          eTime: events[i].sTime-10,
          length: events[i].sTime-wake-10
        }
        if (freeTime.length > 0) {
          times.push(freeTime);
        }
      }
      if (events[i+1].sTime - events[i].eTime > 0) {
        var freeTime = {
          sTime: events[i].eTime+10,
          eTime: events[i+1].sTime-10,
          length: events[i+1].sTime-10 - events[i].eTime - 20
        }
        if (freeTime.length > 0) {
          times.push(freeTime);
        }
      }
      if (i+1 === events.length-1) {
        var freeTime = {
          sTime: events[i+1].eTime+10,
          eTime: sleep,
          length: sleep - events[i+1].eTime - 10
        }
        if (freeTime.length > 0) {
          times.push(freeTime);
        }
      }
    }
  return times;
}

function getNumDaysBetween(date1, date2) {

  //Get 1 day in milliseconds
  var one_day=1000*60*60*24;

  // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();

  // Calculate the difference in milliseconds
  var difference_ms = date2_ms - date1_ms;
    
  // Convert back to days and return
  return Math.round(difference_ms/one_day)-1; 
}
