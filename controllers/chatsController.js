var chatsController = function (User) {
	var addChat = function (req, res) {
		var filter = {
			email: req.body.email
		};
		User.findOne(filter, function (err, addUser) {
			if (!addUser) {
				res.status(404).send('email does not exist');
			} else {
				filter = {
					email: req.body.myEmail
				};
				addUser.password = undefined;
				User.findOne(filter, function (err, curentUser) {
					if(curentUser.email === addUser.email) {
						res.status(404).send('cannot add your own email');
						return;
					}

					curentUser.chats.push({
	                    user: addUser,
	                    messages: []
                	});
                	curentUser.save(function (err) {
                		//TODO
                	});
                	res.status(201).send('chat added');
				});
			}
		});
	}

	var getChats = function (req, res) {
		var filter = {
			email: req.params.userEmail
		};
		User.findOne(filter, function (err, chatUser) {
			if (!chatUser) {
				res.status(404).send('email does not exist');
			} else {
				res.status(201).send(chatUser.chats);
			}
		});
	}

	return {
		addChat: addChat,
		getChats: getChats
	}
}

module.exports = chatsController;