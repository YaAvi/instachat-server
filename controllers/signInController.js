var signInController = function (User) {
	var register = function (req, res) {
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
	}

	var login = function (req, res) {
		var filter = {
			email: req.params.email
		}
		User.findOne(filter, function (err, user) {
			if (!user) {
				res.status(404).send('email does not exist');
			} else if (req.params.password !== user.password) {
				res.status(401).send('forgot your password, mate?');
			} else {
				user.password = undefined;
				res.status(201).send(user);
			}
		});
	}

	var autoLogin = function (req, res) {
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
	}

	return {
		register: register,
		login: login,
		autoLogin: autoLogin
	}
}

module.exports = signInController;