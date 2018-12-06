const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema=new Schema({
  name: String,
  description: String,
  type: String,
<<<<<<< HEAD
  starttime: Number,
    endtime: Number,
});

module.exports = new Schema({
  date: Number,
=======
  starttime: String,
  endtime: String,
});

module.exports = new Schema({
  date: String,
>>>>>>> 06a5e784fd272705c269ab7bc2b13dcfae534255
  events: [eventSchema]
});
