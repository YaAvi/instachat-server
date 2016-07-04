function chatRouter(User) {
	var express = require('express'),
		chatRouter = express.Router(),
		chatsController = require('../controllers/chatsController'),
		controller = new chatsController(User);

	chatRouter.post('/chats', function(req, res) {
		controller.addChat(req, res);
	});

	chatRouter.get('/chats/:userEmail', function(req, res) {
		controller.getChats(req, res);
	});

	return chatRouter;
}

module.exports = chatRouter;