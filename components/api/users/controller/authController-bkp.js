const User = require('./../../../../models/User');
const Video = require('./../../../../models/Video');
const {getUserDataByToken} = require('../../../../helpers/helper');
const timestamp = require('time-stamp');
created_date = timestamp.utc('YYYY-MM-DD HH:mm:ss');
const { validationResult } = require ('express-validator');
var md5 = require('md5');
const ejs = require('ejs');
const jwt = require('jsonwebtoken');

module.exports.login = async(req,res)=>{
    console.log(req.body.email);
      var params = req.body;
    var privateKey = "vnrvjrekrke";
    var token_key = jwt.sign({ user: 'user' }, privateKey, {expiresIn: '14h'});
   
     var isExist = await User.findOne({email: params.email}).exec();
     
     
        if(!isExist){
            return res.json({
                status: 404,
                message:"User not found"
            })
        }
        else if(isExist.password !== md5(params.password)){
           return res.json({
               status: 403,
               message:"Incorrect password"
           })
        }
        else if(Number(params.role) !== Number(isExist.role)){
           return res.json({
               status: 402,
               message:"You are not authurize role"
           })
        }else{
   
        await User.findOneAndUpdate({email: params.email},{token: token_key}).exec();
        
          user = {
              name: isExist.fullname,
              email: isExist.email,
              mobile_number:isExist.mobile_number,
              role:isExist.role,
              _id: isExist._id,
              token: token_key
          }
           return res.json({
               status: 200,
               message:"Login successfully",
               user: user
           })
        }
   
   }

module.exports.registerUser =async (req,res)=>{
  
    
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        let errorsData = {email:'',
                password:'',
                name:'',
                mobile_number:''
            };
        if (errors.array().length > 0)
        { 
            errors.array().forEach((value)  => 
            {
            errorsData[value.param] = value.msg;    
            });
            console.log(errorsData);

            return res.json({status:400,
                message: 'validation error',
                errors: errorsData})
        }
    }
  
    try{
        $where = {email:req.body.email}
        await User.findOne($where,function(err, user){
         if(user)
         {
           return res.json({
               status: 400,
               message: 'Email already exit'
        })
         }
         else{
           // Create a User
        const Users = new User({
            fullname:req.body.name,
            email:req.body.email,
            mobile_number:req.body.mobile_number,
            added_by:0,
            role:req.body.role,
            password:md5(req.body.password),
            created_at:created_date,
            updated_at:created_date
        });

        Users.save()
        .then(data => {
       
       return res.send({ status: 200,
         message: 'User added successfully'});

        }).catch(err => {
          return res.json({
    status: 500,
    message: 'something went wrong',
    errors:err
    })
        })

         }
        })
    }catch(err){
        return res.json({
            status: 404,
            message: 'Error occured'})
     } 

  }

  module.exports.updateUser = async (req,res)=>{
    
    let bearer_token =req.headers['token'];
    let token = bearer_token.split(' ')[1];
    var userData = await getUserDataByToken(token) ;

          ///////////// Validate request//////////////////////////
          const errors = validationResult(req);
         
          let errorsData = {name:'' ,mobile_number:'' };
          if (errors.array().length > 0)
          { 
            errors.array().forEach((value)  => 
            {
              errorsData[value.param] = value.msg;    
            });
  
            return res.json({status:400,
                message: 'validation error',
                errors: errorsData})
         }
        ////////////////////////////////////////////////////////////
        if(!req.body) {
         return res.status(400).send({
             message: "Note content can not be empty"
         });
     }
     var where = { fullname:req.body.name, mobile_number:req.body.mobile_number};
  User.findByIdAndUpdate({ _id: userData._id },where,{new: true}, function(err, result) 
  {
      if (err) 
      {
        return res.json({
            status: 400,
            errors: err,
            message: 'Something went wrong !'
      });
      } 
      else 
      {
        return res.send({ status: 200,
            message: 'User updated successfully',
            data: result
        
         });
      }
    });
  }


  module.exports.addVideo =async (req,res)=>{
  
    let bearer_token =req.headers['token'];
    let token = bearer_token.split(' ')[1];
    var userData = await getUserDataByToken(token) ;

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        let errorsData = {video_type:''
            };
        if (errors.array().length > 0)
        { 
            errors.array().forEach((value)  => 
            {
            errorsData[value.param] = value.msg;    
            });
            console.log(errorsData);

            return res.json({status:400,
                message: 'validation error',
                errors: errorsData})
        }
    }
  
   
    if(req.file)
    {
       // Create a Video
       var Videos =  new Video({
        video_type:req.body.video_type,
        video:req.file.filename,
        added_by:userData._id,
        created_at:created_date,
        updated_at:created_date
    });
console.log(Videos);
    Videos.save()
        .then(data => {
       
       return res.send({ status: 200,
         message: 'Video added successfully'});

        }).catch(err => {
          return res.json({
    status: 500,
    message: 'something went wrong',
    errors:err
    })
        })
    }
    else{
        // Create a Video
        var Videos =  new Video({
            video_type:req.body.video_type,
            video_url:req.body.video_url,
            added_by:userData._id,
            created_at:created_date,
            updated_at:created_date
        });

        console.log(Videos);

        Videos.save()
        .then(data => {
       
       return res.send({ status: 200,
         message: 'Video added successfully'});

        }).catch(err => {
          return res.json({
    status: 500,
    message: 'something went wrong',
    errors:err
    })
        })
    }
          
}

module.exports.listVideo =async (req,res)=>{

    let bearer_token =req.headers['token'];
    let token = bearer_token.split(' ')[1];
    var userData = await getUserDataByToken(token) ;
 
     $where={added_by:userData._id}
     var videoExist = await Video.find($where).exec();
                                       
     if(videoExist)
          {
            return res.json({
                status: 200,
                data: videoExist
          })
          }else{
             return res.json({
                 status: 400,
                 message: "No video available"
           })
          }
 
    }

    module.exports.subscriptionPayment = async (req,res)=>{
    
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            let errorsData = {price:'',description:''
                };
            if (errors.array().length > 0)
            { 
                errors.array().forEach((value)  => 
                {
                errorsData[value.param] = value.msg;    
                });
                console.log(errorsData);
    
                return res.json({status:400,
                    message: 'validation error',
                    errors: errorsData})
            }
        }

    await   mollieClient.payments.create({
      amount: {
        value:    req.body.price,
        currency: 'USD'
      },
      description: req.body.description,
      redirectUrl: 'https://yourwebshop.example.org/order/123456',
      webhookUrl:  'https://yourwebshop.example.org/webhook'
    })
      .then(payment => {
            var paymentData ={
                      id:payment.id,
                      checkout_url:payment.getCheckoutUrl()
                      }
        return res.json({
            status: 200,
            data: paymentData
      })
        // Forward the customer to the payment.getCheckoutUrl()
      })
      .catch(error => {
        return res.json({
            status: 400,
            errors: error
      })
      });

}


module.exports.subscriptionComplete = async (req,res)=>{
     
    var privateKey = "vnrvjrekrke";
    var token_key = jwt.sign({ user: 'user' }, privateKey, {expiresIn: '14h'});

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        let errorsData = {payment_id:'',user_id:'',plan_name:'',start_date:'',end_date:'',payment_amount:''
            };
        if (errors.array().length > 0)
        { 
            errors.array().forEach((value)  => 
            {
            errorsData[value.param] = value.msg;    
            });
            console.log(errorsData);

            return res.json({status:400,
                message: 'validation error',
                errors: errorsData})
        }
    }

    let params = req.body;

 let payment_status= await   mollieClient.payments.get(params.payment_id)
        .then(payment => {
            if(payment.isPaid())
            {
                return true;
            }else{
                return false;
            }
            // E.g. check if the payment.isPaid()
        })
        .catch(error => {
            return res.json({status:400,
                message: 'error',
                errors: error})
        });

        if(payment_status)
        {
            
            
            
            var where = { payment_id:params.payment_id,
                          plan_name: params.plan_name,
                          start_date:params.start_date,
                          end_date:params.end_date,
                          payment_amount:params.payment_amount,
                          payment_status:true,
                          token:token_key
                        };
            User.findByIdAndUpdate({ _id: params.user_id },where,{new: true}, function(err, result) 
            {
                if (err) 
                {
                  return res.json({
                      status: 400,
                      errors: err,
                      message: 'Something went wrong !'
                });
                } 
                else 
                {
                  return res.send({ status: 200,
                      message: 'Subscribed successfully',
                      data: result
                  
                   });
                }
              });

        }

}