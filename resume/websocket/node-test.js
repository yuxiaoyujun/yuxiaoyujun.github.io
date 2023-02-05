const WebSocketServer = require("ws").Server;
const wsServer = new WebSocketServer({ port: 8080 });
wsServer.on("connection", (ws) => {
	ws.on("message", (message) => {
		console.log("Received: " + message);
	});
});

// node端
const WebSocket = require("ws");
// 创建websocket服务器
const wss = new WebSocket.Server({ port: 8080 });
// 监听客户端连接
wss.on("connection", (ws) => {
	// 向客户端发送请求
	ws.send(
		JSON.stringify({
			type: "request",
			data: "hello world"
		})
	);
});

// 浏览器端
const ws = new WebSocket("ws://localhost:8080");

// 监听服务器发送的消息
ws.onmessage = (event) => {
	const data = JSON.parse(event.data);
	if (data.type === "request") {
		console.log(data.data); // hello world
	}
};
