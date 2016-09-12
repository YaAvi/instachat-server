function chatRouter(User) {
    var express = require('express'),
        chatRouter = express.Router(),
        chatsController = require('../controllers/chatsController'),
        controller = new chatsController(User);

    chatRouter.post('/', function(req, res) {
        controller.addChat(req.body.email, req.body.myEmail)
            .then(function(msg) {
                res.status(201).send(msg);
            })
            .catch(function(err) {
                res.status(404).send(err);
            });
    });

    chatRouter.get('/:userEmail', function(req, res) {
        controller.getChats(req.params.userEmail)
            .then(function(chats) {
                res.status(201).send(chats);
            })
            .catch(function(err) {
                res.status(404).send(err);
            });
    });

    chatRouter.get('/:userEmail/:chatEmail', function(req, res) {
        controller.getChat(req.params.userEmail, req.params.chatEmail)
            .then(function(chat) {
                res.status(201).send(chat);
            })
            .catch(function(err) {
                res.status(404).send(err);
            });
    });

    return chatRouter;
}

module.exports = chatRouter;