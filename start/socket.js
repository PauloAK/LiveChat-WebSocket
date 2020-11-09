const Ws = use("Ws");

Ws.channel('chat:*', 'WebsocketController')

// Ws.channel("ws", "WebsocketController");
// Ws.channel("chat/:id", "WebsocketController");