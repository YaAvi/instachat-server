'use strict';
var q = require('q');
class chatsController {
    constructor(User) {
        this.User = User
    }

    findUserByEmail(email) {
        var filter = {
            email: email
        };
        return this.User.findOne(filter);
    }

    addChat(addUserEmail, myEmail) {
        var addUserPromise = this.findUserByEmail(addUserEmail);
        var curentUserPromise = this.findUserByEmail(myEmail);
        var promises = [addUserPromise, curentUserPromise];
        return q.all(promises)
            .then(function(results) {
                var addUser = results[0];
                var curentUser = results[1];
                if (!addUser) {
                    return q.reject('email does not exist');
                }
                if (addUser.email === curentUser.email) {
                    return q.reject('cannot add your own email');
                }

                curentUser.chats.push({
                    user: addUser.toJSON(),
                    messages: []
                });
                return curentUser.save(function(err) {
                    if (!err) {
                        return q('chat added');
                    }
                });
            })
    }

    getChats(email) {
        return this.findUserByEmail(email)
            .then(function(chatUser) {
                if (!chatUser) {
                    return q.reject('email does not exist');
                } else {
                    return q(chatUser.chats);
                }
            });
    }
}

module.exports = chatsController;