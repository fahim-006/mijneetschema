var self = module.exports = 
{
  instituteID:function(req) 
  {
    return req.session.institute_id;
  },
  institute:function(req,res,next) 
  {
    return req.session.institute;
  },
  beforeLogin:function(req,res,next) 
  {
    console.log("before===")
    if(typeof req.session.institute_id != 'undefined')
   
  	{
  	  return res.redirect('/institution/dashboard');
  	  next();
  	}
  	next();
  },
  afterLogin:function(req,res,next) 
  {
    console.log("after===",req.session.institute_id)
    if(typeof req.session.institute_id == 'undefined')
   
  	{
  	  return res.redirect('/institution/login');
  	  next();
  	}
  	next();
  }
}