'use strict';
var q = require('q');
class chatsController {
	constructor(User) {
		this.User = User
	}
		
	findUserByEmail(email) {
		var filter = {
			email: email
		};
		return this.User.findOne(filter);
	}

	addChat(req, res) {
		var addUserPromise = this.findUserByEmail(req.body.email);
		var curentUserPromise = this.findUserByEmail(req.body.myEmail);
		var promises = [addUserPromise, curentUserPromise];
		q.all(promises)
			.then(function (results) {
				var addUser = results[0];
				var curentUser = results[1]; 
				if (!addUser) {
					res.status(404).send('email does not exist');
				} else {
					if(addUser.email === curentUser.email) {
						res.status(404).send('cannot add your own email');
						return;
					}

					curentUser.chats.push({
		                user: addUser.toJSON(),
		                messages: []
		        	});
		        	curentUser.save(function (err) {
		        		if (!err) {
		            		res.status(201).send('chat added');
		        		}
		        	});
				}
			})
	}

	getChats(req, res) {
		this.findUserByEmail(req.params.userEmail)
			.then(function (chatUser) {
				if (!chatUser) {
					res.status(404).send('email does not exist');
				} else {
					res.status(201).send(chatUser.chats);
				}
			});
	}
}

module.exports = chatsController;