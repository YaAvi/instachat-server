function userRouter(User) {
    var express = require('express'),
        userRouter = express.Router(),
        userController = require('../controllers/userController'),
        controller = new userController(User);

    userRouter.post('/register', function(req, res) {
        controller.register(req.body)
            .then(function(user) {
                res.status(201).send(user);
            })
            .catch(function(err) {
                res.status(401).send(err);
            });
    });

    userRouter.post('/login', function(req, res) {
        controller.login(req.body)
            .then(function(user) {
                res.status(201).send(user);
            })
            .catch(function(err) {
                res.status(401).send(err);
            });
    });

    userRouter.get('/login/:email', function(req, res) {
        controller.autoLogin(req.params.email)
            .then(function(user) {
                res.status(201).send(user);
            })
            .catch(function(err) {
                res.status(401).send(err);
            });
    });

    return userRouter;
}
module.exports = userRouter;