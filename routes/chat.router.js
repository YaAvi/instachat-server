function chatRouter(User) {
	var express = require('express'),
		chatRouter = express.Router(),
		chatsController = require('../controllers/chatsController')(User);

	chatRouter.route('/addChat')
		.post(chatsController.addChat);

	chatRouter.route('/getChats/:userEmail')
		.get(chatsController.getChats);

	return chatRouter;
}

module.exports = chatRouter;