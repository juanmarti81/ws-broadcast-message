const WebSocket = require('ws');

// Configuration: adapt to your environment
const WEB_SOCKET_PORT = 8080;

// Create & Start the WebSocket server
const server = new WebSocket.Server({ port : WEB_SOCKET_PORT });

// Register event for client connection
server.on('connection', async function connection(ws) {
  console.log("New client connected")
  // broadcast on web socket when receving a Redis PUB/SUB Event
  ws.on('message', (message) => {
    server.broadcast(JSON.stringify(message));
  })

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.send('You successfully connected to the websocket.');

});

console.log("WebSocket server started at ws://locahost:"+ WEB_SOCKET_PORT);