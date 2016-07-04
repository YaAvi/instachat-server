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
        var reason;
        return this.User.findOne(filter)
            .then((dbUser) => {
                if (!dbUser) {
                    return q.reject('email does not exist');
                }
                if (user.password !== dbUser.password) {
                    return q.reject('forgot your password, mate?');
                }
                var returnUser = dbUser.toJSON(); 
                return q(returnUser);
            });
    }

    autoLogin(email) {
        var filter = {
            email: email
        };
        return this.User.findOne(filter)
            .then((dbUser) => {
                if (!dbUser) {
                    return q.reject('email does not exist');
                }
                var returnUser = dbUser.toJSON(); 
                return q(returnUser);
            });
    }
}

module.exports = userController;