const io = require('socket.io')({
    cors: {
      origin: "http://127.0.0.1:5500",
      methods: ["GET", "POST"]
    }
  });
  
  io.attach(3000);

const users = {}

io.on('connection', (socket) => {
    
    socket.on('new-user', user => {
        users[socket.id] = user
        socket.broadcast.emit('user-connected', user); //=> Emit Passes inforfmation
    })

    socket.on('send-chat-message', message => {
        // console.log(message);
        socket.broadcast.emit('chat-message', {message: message, name: users[socket.id]}); //=> Emit Passes inforfmation
    });
    
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete users[socket.id]
    })
    
    
    
    
    
    //on error
    socket.on('error', (err) => {
        console.error('Socket error:', err);
    });
});
