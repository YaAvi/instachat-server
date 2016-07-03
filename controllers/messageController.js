var messageController = function (data, socket) {
	var fromUser, chatEmail;
	var message = function (err, user) {
		if(user.email === data.from) {
			fromUser = user;
			chatEmail = data.to;
		} else {
			chatEmail = data.from;
		}
		var i = 0
		for (i ; i < user.chats.length; i++) {
			if (user.chats[i].user.email === chatEmail) {
				user.chats[i].messages.push({
					from: data.from,
					message: data.msg
				});
				break;
			}
		}
		if (i === user.chats.length) {
			var chat = {
	            user: fromUser,
	            messages: [{
					from: data.from,
					message: data.msg
				}]
	        };
			user.chats.push(chat);
			socket.broadcast.to(data.to).emit('new chat', {
				chat: chat
			});
		}
		user.save(function (err) {
			fromUser.password = undefined;
		});
	}

	return {
		message: message
	}
}



module.exports = messageController;