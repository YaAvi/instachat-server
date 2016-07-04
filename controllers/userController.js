'use strict';
class userController {
	constructor(User) {
		this.User = User;
	}

	register(req, res) {
		var filter = {
			email: req.body.email
		};
		this.User.findOne(filter, function(err, user) {
			if (user) {
				res.status(409).send('email already in system');
			} else {
				var user = new User(req.body);
				user.save(function(err, savedUser) {
					user.password = undefined;
					res.status(201).send(savedUser);
				});
			}
		});
	}

	login(req, res) {
		var filter = {
			email: req.body.email
		};
		this.User.findOne(filter, function(err, user) {
			if (!user) {
				res.status(404).send('email does not exist');
			} else if (req.body.password !== user.password) {
				res.status(401).send('forgot your password, mate?');
			} else {
				user.password = undefined;
				res.status(201).send(user);
			}
		});
	}

	autoLogin(req, res) {
		var filter = {
			email: req.params.email
		}
		this.User.findOne(filter, function(err, user) {
			if (!user) {
				res.status(404).send('email does not exist');
			} else {
				user.password = undefined;
				res.status(201).send(user);
			}
		});
	}
}

module.exports = userController;