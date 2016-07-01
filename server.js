var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	User = require('./models/user.model');

var db = mongoose.connect('mongodb://localhost:27017/chat-users');

var chatRouter = require('./routes/chat.router')(User);

var signInRouter = require('./routes/signIn.router')(User);

var app = express();

var port = process.env.PORT || 1000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/chat', chatRouter);
app.use('/api/signIn', signInRouter);

var server = app.listen(port, function () {
	console.log("server running on port: " + port);
});

var io = require('socket.io')(server),
	ioInitiated = require('./socket.config')(io, User);