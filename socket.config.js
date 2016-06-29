var socket = function (io, User) {
	io.on('connection', function (socket) {
		console.log('connected');
		socket.on('message', function (data) {
			var fromUser;
			var filter = {
				email: data.from
			};
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
				fromUser = curentUser;
	        	curentUser.save(function (err) {
	        		//TODO
	        	});
			});

			filter = {
				email: data.to
			};
			User.findOne(filter, function (err, toUser) {
				var i = 0
				for (i ; i < toUser.chats.length; i++) {
					if (toUser.chats[i].user.email === data.from) {
						toUser.chats[i].messages.push({
							from: data.from,
							message: data.msg
						});
						break;
					}
				}
				if (i === toUser.chats.length) {
					fromUser.password = undefined;
					var chat = {
		                user: fromUser,
		                messages: [{
							from: data.from,
							message: data.msg
						}]
	                };
					toUser.chats.push(chat);
					socket.broadcast.to(data.to).emit('new chat', {
						chat: chat
					});
				}
	        	toUser.save(function (err) {
	        		//TODO
	        	});
			});
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