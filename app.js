require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
// const multer = require('multer');
// var up = multer();
var cookieParser = require('cookie-parser')
var session = require('express-session')
var flash  = require('req-flash');
var oldInput = require('old-input');
var dateFormat = require('dateformat');
const jwt = require('jsonwebtoken');
const { getUserDataByToken } = require("./helpers/helper");
const User = require('./models/User')
const NotificationService = require("./components/api/notification/services/index");


// var http = require('http').createServer(app);


var cors = require('cors')

var app = express();

app.use(cors())
app.use(cookieParser())
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(flash());
app.use(oldInput);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
//start newsletter
const newsletterRouter = require('./routes/newsletterRouter')
app.use('/api/newsletter', newsletterRouter)
//end of newsletter

//start filtering trainer
const filterTrainers = require('./routes/filterTrainerRoute');
app.use('/api/users/fetch-trainer/',filterTrainers)
//end filtering trainer

//start editTrainerInformation
const editTrainerInformation = require('./routes/editTrainerRoute')
app.use('/api/edit-trainer', editTrainerInformation)
//end of editTrainerInformation

app.use(express.urlencoded({ extended: false }));
//app.use(up.array());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join('client', 'build')));
app.use(express.static(path.join( 'upload')));


// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
 
// // parse application/json
// app.use(bodyParser.json())
//
app.get('/version',(req,res)=>{
  res.send("version: 1.0.0")
});

app.use(function(req, res, next) {
	res.locals.user = req.session.user_data;
	next();
});
app.use(function(req, res, next) 
{
	res.locals.institution = req.session.auth;
	next();
});

require('./config/database');

require('./routes/router')(app);

app.get('/*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });



let server = app.listen(4333, () => console.log('App successfully started on port 4333'));
var io = require('socket.io')(server);

io.use(function(socket, next){
	if (socket.handshake.query && socket.handshake.query.token){
		console.log("token--------",socket.handshake.query.token.split(' ')[1])
	 
		jwt.verify(socket.handshake.query.token.split(' ')[1], 'vnrvjrekrke', function(err, decoded) {
		if (err) {
			console.log("error-------1-",err)
			return next(new Error('Authentication error'));
		}
		socket.decoded = decoded;
		next();
	  });
	}
	else {
	  next(new Error('Authentication error'));
	}    
  }).on('connection',async (socket) => {
	
	console.log('a user connected',socket.id)
	const updateSocketId= await User.findOneAndUpdate({token:socket.handshake.query.token.split(' ')[1]},{socketId:socket.id},{returnNewDocument:true})
	console.log("updateSocketId============>",updateSocketId)
	socket.emit('connection_created',{socketId:socket.id})	
		
	socket.on('send-contact-request',async (data,cb)=>{
		if(!data.receiverId){
			cb("Error: receiverId is required")
		}
		if(!data.content){
			cb("Error: content is required")
		}
		if(!data.token){
			cb("Error: token is required")
		}

		console.log("data.token=====<",data.token)

		jwt.verify(data.token, 'vnrvjrekrke', async function(err, decoded) {
			if (err) {
				console.log("error------2--",err)
				cb(new Error('Authentication error'));
			}
			socket.decoded = decoded
		
			let trainerData= await User.findOne({_id:data.receiverId})
			console.log("trainerData====>",trainerData)
			if(!trainerData){
				cb("Error: Inavlid triner id")
			}
	
			let userdata = await getUserDataByToken(socket.handshake.query.token.split(" ")[1])
	
			const notidata = await NotificationService.createNotification(userdata._id,data.receiverId,data.content,2)
			if (data.status != 200) {
				cb(new Error(data.message));
			}
			
			const notidata2 = await NotificationService.fetchNotification(data.receiverId,1)
			socket.to(trainerData.socketId).emit('new-notification',{notidata2})
			socket.to(trainerData.socketId).emit('new-notification-2',{notidata2}) //test 

		});
	})

	socket.on('updateNotificationStatus',async (data,cb)=>{
		if(!data.receiverId){
			cb("Error: receiverId is required")
		}
		if(!data.notificationId){
			cb("Error: notificationId is required")
		}
		if(!data.notificationStatus){
			cb("Error: notificationStatus is required")
		}
		if(!data.token){
			cb("Error: token is required")
		}

		console.log("data.token=====<",data.token)

		jwt.verify(data.token, 'vnrvjrekrke', async function(err, decoded) {
			if (err) {
				console.log("error------2--",err)
				cb(new Error('Authentication error'));
			}
			socket.decoded = decoded
		
			let receiverData= await User.findOne({_id:data.receiverId})
			console.log("userDataOfNewReceiver====>",receiverData)
			if(!receiverData){
				cb("Error: Inavlid receiverId")
			}
	
			let userdata = await getUserDataByToken(socket.handshake.query.token.split(" ")[1])
			console.log("request userData======>",userdata)

			const notidata = await NotificationService.updateStatus(data.notificationId,data.notificationStatus)
			if (data.status != 200) {
				cb(new Error(data.message));
			}

			//creating new notification for the contact-request sender 
			if(data.notificationStatus==2){
				data.content=`${userdata.fullname} has accepted your contact request.`
			}
			else{
				data.content=`${userdata.fullname} has rejected your contact request.`
			}
			const notidata3 = await NotificationService.createNotification(userdata._id,data.receiverId,data.content,1)
			if (notidata3.status != 200) {
				cb(new Error(data.message));
			}

			const notidata2 = await NotificationService.fetchNotification(data.receiverId,1)
			socket.to(receiverData.socketId).emit('new-notification',{notidata2})
			socket.to(receiverData.socketId).emit('new-notification-2',{notidata2})

		});
	})

});


module.exports = app;
