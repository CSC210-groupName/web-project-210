const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleid: String,
  userName: String,
  password: String,
  name: String
});

mongoose.model('users', userSchema);
