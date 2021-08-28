var User = require("../../../models/User");
var md5 = require('md5');
const { validationResult } = require ('express-validator');
//var generate_token =require("../../../utilities/rest");
//var Mail = require('../../../utilities/mail');
var fs = require('fs');
var util =require('util');
var path = require('path');
const timestamp = require('time-stamp');
created_date = timestamp.utc('YYYY-MM-DD HH:mm:ss');

module.exports.login = async (req,res)=>{
  
    if(typeof req.flash('formdata')=='undefined')
    {
        var formdata = {email:'',
            password:''
        };
        req.flash("formdata",formdata);
    }
        if(req.cookies)
        {
        var formdata = {email:req.cookies.email,
                password:req.cookies.password};
                req.flash("formdata",formdata);
        }

    //   Create a User

// const Users = new User({
//     email:'admin@mijneetschema.com',
//     mobile_number:'9898878456',
//     role:1,
//     status:0,
//     token:'767ghghjgh878',
//     fullname:'admin',
//     password: md5('mijNeet@Admin'),
//     password_reset_code:0,
//     profile_img:'user.png',
//     created_at:created_date,
//     updated_at:created_date
// });


//     Users.save()
//     .then(data => {
//     res.send(data);
//     }).catch(err => {
//     res.status(500).send({
//     message: err.message || "Some error occurred while creating the user."
//     });
//     })

     res.render('login/login',{formdata: req.flash('formdata'),errors:req.flash('errors'),reset:req.flash("reset")});
}

module.exports.loginPost = (req,res)=>{
    // Validate request
    const errors = validationResult(req)
    var formdata = {email:req.body.email,
        password: req.body.password,    
    };
    console.log(req.body);

    if (!errors.isEmpty()) {
        let errorsData = {email:'' ,password:''};
        if (errors.array().length > 0)
        { 
            errors.array().forEach((value)  => 
            {
            errorsData[value.param] = value.msg;    
            });
            req.flash("errors",errorsData); 
            req.flash("formdata",formdata); 
            return res.redirect('/login');
        }
    }
    //console.log(req.oldInput);
    
    if(!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
 let rember_me = req.body.inputCheckbox;

    $where = {email:req.body.email, password: md5(req.body.password), role:1};
    // console.log("login request", $where);
    // Save User in the database
    User.findOne($where,function(err, user) 
    {
        
        if(user)
       {
        req.session.user_data = {user_id:user._id,profile_img:user.profile_img,fullname:user.fullname};
        if(rember_me){
            res.cookie('email',req.body.email);
            res.cookie('password',req.body.password);  
          }
          else{
              //console.log("cookie is not set")
              res.clearCookie('email');
              res.clearCookie('password');
          }
        
    //    console.log("user:", user);
        return res.redirect('/dashboard');
       
       }
       else{
           console.log("Error occured at the time of login");
            $errors = { message:'Either Email or Password Incorrect!' };
            req.flash('errors', $errors);
            req.flash('formdata', (formdata)?formdata:'undefined');
            return res.redirect('/login');
       }
    });
}

module.exports.logout = (req,res)=>{
    req.session.destroy();
    res.redirect("/login");

}

