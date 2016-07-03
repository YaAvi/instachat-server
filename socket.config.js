var socket = function (io, User) {
	io.on('connection', function (socket) {
		socket.on('message', function (data) {
			var messageController = require('./controllers/messageController')(data, socket);
			var fromUser;
			var filter = {
				email: data.from
			};
			User.findOne(filter, messageController.message);

			filter = {
				email: data.to
			};
			User.findOne(filter, messageController.message);
			socket.broadcast.to(data.to).emit('message received', {
				msg: {
					from: data.from,
					message: data.msg,
					time: Date.now()
				}
			});
	  	});
	  	socket.on('get room', function (data) {
	  		socket.join(data.room);
	  	});
	});
	return io;
}

module.exports = socket;