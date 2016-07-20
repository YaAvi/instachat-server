var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    User = require('./models/user.model');

var db = mongoose.connect('mongodb://admin:87713775AY@ds023315.mlab.com:23315/insta-chat');

var chatRouter = require('./routes/chat.router')(User);

var userRouter = require('./routes/user.router')(User);

var app = express();

var port = process.env.PORT || 1000;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/api/chat', chatRouter);
app.use('/api/user', userRouter);

var server = app.listen(port, function() {
    console.log('server running on port: ' + port);
});

var io = require('socket.io')(server),
    ioInitiated = require('./socket.config')(io, User);
