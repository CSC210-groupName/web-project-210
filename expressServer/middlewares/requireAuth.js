module.exports = (req, res, next)=>{
  if(!req.user){
    res.status(403).send('please login');
  }
  next();
}
