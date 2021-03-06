const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema=new Schema({
  name: String,
  description: String,
  type: String,
  starttime: Number,
    endtime: Number,
    color: String
});

module.exports = new Schema({
  date: Number,
  events: [eventSchema]
});
