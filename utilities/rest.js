var jwt = require('jsonwebtoken');
let config = require('../key/config');
//let Doctor = require("../models/Doctor");

module.exports.getTimeStamp = () => {
    return Date.now();
  };
  
module.exports.generateToken = (data) =>{
    return jwt.sign(data, config.secret, {expiresIn: '5h'} )
};

// module.exports.decodeToken = token => jwt.verify(token, config.app.jwtKey);
module.exports.authorization = async (request, h) => {
    let token = req.headers['authorization']
    console.log("too===",token)
}
    //   let token = request.headers['authorization'];
/*	
module.exports.verifyToken = (req, res, next)=> {
 
    var tok = req.body.token || req.query.token || req.headers['authorization'];
     let token = tok.split(' ')[1];
 //decode token
    if (token) {
        jwt.verify(token, config.secret, function(err, decoded) {
            if(err){
                return res.status(401).json({
                    success: false,
                    message: 'Failed to authenticate token.',
                    status: 401
                });
            } else {
              Doctor.findOne({token:token},(err,data)=>{
                // console.log("user===",data)
                req['credential'] ={ data,token}
                next();
              });
             
                //if everything is good, save to request for use in other routes
                // req.decoded = decoded;
                // next();
            }
        });

    } else {
        return res.status(403).json({
            success: false,
            message: 'No token provided.',
            status: 403
        });
     }
} */

module.exports.successAction = (data, message = 'OK') => ({
  statusCode: 200,
  message,
  data: data ? data : undefined
});
//function to generate random token
module.exports.generaterandom_Token = () =>{
    abc = "abcdefghijklmnopqrstuvwxyz1234567890".split("");
    var token=""; 
    for(i=0;i<32;i++){
         token += abc[Math.floor(Math.random()*abc.length)];
    }
    return token;
}