const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
  // googleid: String,
  // userName: String,
  // password: String,
  // name: String

  name: String,
  description: String,
  type: String,
  // date: ,
  // starttime: ,
  // endtime: ,
});
