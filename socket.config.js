var socket = function (io, User) {
	io.on('connection', function (socket) {
		socket.on('message', function (data) {
			var filter = {
				email: data.from
			}
			User.findOne(filter, function (err, curentUser) {
				for (var i = 0; i < curentUser.chats.length; i++) {
					if (curentUser.chats[i].user.email === data.to) {
						curentUser.chats[i].messages.push({
							from: data.from,
							message: data.msg
						});
						break;
					}
				}
	        	curentUser.save(function (err) {
	        		//TODO
	        	});
			});

			filter = {
				email: data.to
			};
			User.findOne(filter, function (err, toUser) {
				for (var i = 0; i < toUser.chats.length; i++) {
					if (toUser.chats[i].user.email === data.from) {
						toUser.chats[i].messages.push({
							from: data.from,
							message: data.msg
						});
						break;
					}
				}
	        	toUser.save(function (err) {
	        		//TODO
	        	});
			});
			socket.broadcast.to(data.to).emit('message received');
	  	});
	  	socket.on('get room', function (data) {
	  		socket.join(data.room);
	  	});
	});
	return io;
}

module.exports = socket;