const webSocket = require('ws');
const webSocketServer = new webSocket.Server
const ws = new webSocketServer({ port: 3001 });
ws.on('connection', function connection(ws) {
    console.log('connected');
})