var socket = function(io, User) {
    io.on('connection', function(socket) {
        socket.on('message', function(data) {
            var messageController = require('./controllers/messageController');
            var controller = new messageController(data, socket);
            var filter = {
                email: data.from
            };
            User.findOne(filter, controller.message.bind(controller));

            filter = {
                email: data.to
            };

            User.findOne(filter, controller.message.bind(controller));
            socket.broadcast.to(data.to).emit('message received', {
                msg: {
                    from: data.from,
                    message: data.msg,
                    time: Date.now()
                }
            });
        });
        socket.on('get room', function(data) {
            socket.join(data.room);
        });
    });
    return io;
}

module.exports = socket;