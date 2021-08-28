var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
console.log("Connection Successful!");
});