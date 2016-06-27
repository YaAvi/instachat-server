function signInRouter (User) {
	var express = require('express'),
		signInRouter = express.Router();

	signInRouter.route('/register')
		.post(function (req, res) {
			var filter = {
				email: req.body.email
			}
			User.findOne(filter, function (err, user) {
				if (user) {
					res.status(409).send('email already in system');
				} else {
					var user = new User(req.body);
					user.save(function(err, savedUser){
						user.password = undefined;
						res.status(201).send(savedUser);
					});
				}
			});
		});

	signInRouter.route('/login')
		.post(function (req, res) {
			var filter = {
				email: req.body.email
			}
			User.findOne(filter, function (err, user) {
				if (!user) {
					res.status(404).send('email does not exist');
				} else if (req.body.password !== user.password) {
					res.status(401).send('forgot your password, mate?');
				} else {
					user.password = undefined;
					res.status(201).send(user);
				}
			});
		});

	signInRouter.route('/autoLogin/:email')
		.get(function (req, res) {
			var filter = {
				email: req.params.email
			}
			User.findOne(filter, function (err, user) {
				if (!user) {
					res.status(404).send('email does not exist');
				} else {
					user.password = undefined;
					res.status(201).send(user);
				}
			});
		});

	return signInRouter;
}
module.exports = signInRouter;