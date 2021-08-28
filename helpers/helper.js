var validator = require('validator');
var in_array = require('in_array');
var path = require("path");
require('dotenv').config();
const User = require('../models/User');
 
var self = module.exports = 
{
getUserDataByToken :async function(token,res)
{
    $where = {token: token}
    var userData =await User.findOne($where).exec();
     if(!userData)
     {
      return res.json({
        status: 400,
        message: 'Token is not valid or expired'
  })
     }else{
       return userData;
     }
}

};


