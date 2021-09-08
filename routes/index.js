var express = require('express');
var emails = require('../models/NewsLetter')
var router = express.Router();
import axios from 'axios';
var __dirname = 'views'
var email = emails.find({});
import {API} from '../utilities/config'

axios.get(`${API}/api/newsletter`, function(req, res, next){
    email.exec(function(err, data){
        console.log(data);
        if(err) throw err;
        res.render('views/dashboard', {title: "Emails: ", records: data});
    });
});