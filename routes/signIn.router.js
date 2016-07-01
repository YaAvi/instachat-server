function signInRouter (User) {
	var express = require('express'),
		signInRouter = express.Router(),
		signInController = require('../controllers/signInController')(User);

	signInRouter.route('/register')
		.post(signInController.register);

	signInRouter.route('/login/:email/:password')
		.get(signInController.login);

	signInRouter.route('/autoLogin/:email')
		.get(signInController.autoLogin);

	return signInRouter;
}
module.exports = signInRouter;