import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (socket, request) => {
  const ip = request.socket.remoteAddress;
  console.log(`🚀 New Tunnel Open: ${ip}`);

  socket.on('message', (rawData) => {
    const message = rawData.toString();
    console.log(`📩 Received: ${message}`);

    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(`Server Broadcast: ${message}`);
      }
    });
  });

  socket.on('close', () => console.log('👋 Client disconnected.'));
});

console.log('WebSocket Server is live on ws://localhost:8080');
