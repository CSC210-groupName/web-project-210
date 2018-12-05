const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema=new Schema({
  name: String,
  description: String,
  type: String,
  starttime: String,
  endtime: String,
});

module.exports = new Schema({
  date: String,
  events: [eventSchema]
});
