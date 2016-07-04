'use strict';
var _ = require('lodash');
class messageController {
	constructor(data, socket) {
		this.data = data;
		this.socket = socket;
		this.fromUser = '';
		this.chatEmail = '';
	}

	message(err, user) {
		if(user.email === this.data.from) {
			this.fromUser = user;
			this.chatEmail = this.data.to;
		} else {
			this.chatEmail = this.data.from;
		}
		var i = 0
		var chat = _.find(user.chats, {
			user: {
				email: this.chatEmail
			}
		});
		chat.messages.push({
			from: this.data.from,
			message: this.data.msg
		});
		if (i === user.chats.length) {
			var chat = {
	            user: this.fromUser.toJSON(),
	            messages: [{
					from: this.data.from,
					message: this.data.msg
				}]
	        };
			user.chats.push(chat);
			socket.broadcast.to(this.data.to).emit('new chat', {
				chat: chat
			});
		}
		user.save(function (err) {
			//TODO
		});
	}
}

module.exports = messageController;