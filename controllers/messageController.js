'use strict';
var _ = require('lodash');
class messageController {
    constructor(data, socket) {
        this.data = data;
        this.socket = socket;
        this.fromUser = '';
        this.chatEmail = '';
    }

    isNewChat() {
        return this.newChat;
    }

    message(err, user) {
        if (user.email === this.data.from) {
            this.fromUser = user;
            this.chatEmail = this.data.to;
        } else {
            this.chatEmail = this.data.from;
        }
        var chat = _.find(user.chats, {
            user: {
                email: this.chatEmail
            }
        });
        if(chat) {
            this.newChat = false;
            chat.messages.push({
                from: this.data.from,
                message: this.data.msg
            });
        }
        if (!chat) {
            this.newChat = true;
            var chat = {
                user: this.fromUser.toJSON(),
                messages: [{
                    from: this.data.from,
                    message: this.data.msg
                }]
            };
            user.chats.push(chat);
            this.socket.broadcast.to(this.data.to).emit('new chat', {
                from: this.data.from
            });
        }
        user.save(function(err) {
            //TODO
        });
    }
}

module.exports = messageController;