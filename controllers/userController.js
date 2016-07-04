'use strict';
var q = require('q');
class userController {
    constructor(User) {
        this.User = User;
    }

    register(newUser) {
        var filter = {
            email: newUser.email
        };
        var promise;
        return this.User.findOne(filter)
            .then((user) => {
                if (!user) {
                    var createUser = new this.User(newUser);
                    return createUser.save((err, savedUser) => {
                        var returnUser = savedUser.toJSON(); 
                        return q(returnUser);
                    });
                } else {
                    return q.reject('email already in system');
                }
            });
    }

    login(user) {
        var filter = {
            email: user.email
        };
        var returnUser;
        var reason;
        return this.User.findOne(filter)
            .then((dbUser) => {
                returnUser = dbUser;
                if (!returnUser) {
                    reason = {
                        msg: 'email does not exist',
                        status: 404
                    };
                    return q.reject(reason);
                }
                if (user.password !== returnUser.password) {
                    reason = {
                        msg: 'forgot your password, mate?',
                        status: 401
                    };
                    return q.reject(reason);
                }
                return q(returnUser);
            });
    }

    autoLogin(email) {
        var filter = {
            email: email
        };
        var returnUser;
        return this.User.findOne(filter)
            .then((dbUser) => {
                returnUser = dbUser;
                if (!returnUser) {
                    return q.reject('email does not exist');
                }
                return q(returnUser);
            });
    }
}

module.exports = userController;