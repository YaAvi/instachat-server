function userRouter (User) {
	var express = require('express'),
		userRouter = express.Router(),
		userController = require('../controllers/userController'),
		controller = new userController(User);

	userRouter.post('/register', function (req, res) {
		controller.register(req, res);
	});

	userRouter.post('/login', function (req, res) {
		controller.login(req, res);
	});

	userRouter.get('/login/:email', function (req, res) {
		controller.autoLogin(req, res);
	});

	return userRouter;
}
module.exports = userRouter;