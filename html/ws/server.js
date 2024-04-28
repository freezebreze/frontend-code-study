const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;
const port = 3001;
const ws = new WebSocketServer({
    port: port
});
console.log('websockets server started');
ws.on('connection', function (socket) {
    console.log('client connection established');
    socket.on('message', function (msg) {
        let timer = setInterval(function () {
            socket.send('傻逼编程我玩你妈')
        }, 1000);
    })
});