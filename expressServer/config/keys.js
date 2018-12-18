//figure out env
if(process.env.NODE_ENV==='production'){
  //production
  module.exports = require('./prod');
}else{
  //dev
  module.exports = require('./dev');
}
