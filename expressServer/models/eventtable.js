const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema=new Schema({
  name: String,
  description: String,
  type: String,
  starttime: Date,
  endtime: Date,
});

module.exports = new Schema({
  date: Date,
  events: [eventSchema]
});
