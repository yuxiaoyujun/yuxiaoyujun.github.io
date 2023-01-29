const WebSocketServer = require("ws").Server;
const wsServer = new WebSocketServer({ port: 8080 });
wsServer.on("connection", (ws) => {
	ws.on("message", (message) => {
		console.log("Received: " + message);
	});
});

// // 实现接口
// const ws = new WebSocket("ws://127.0.0.1:8080");

// ws.onopen = () => {
// 	console.log("WebSocket connected!");
// };

// ws.onmessage = (evt) => {
// 	console.log("Received message:", evt.data);
// };

// ws.onclose = () => {
// 	console.log("WebSocket closed!");
// };

// // 封装接口
// const WebSocketWrapper = {
// 	sendMessage: (message) => {
// 		ws.send(message);
// 	},

// 	setOnMessageCallback: (callback) => {
// 		ws.onmessage = (evt) => {
// 			callback(evt.data);
// 		};
// 	}
// };

// // 使用封装的接口
// WebSocketWrapper.sendMessage("Hello World!");
// WebSocketWrapper.setOnMessageCallback((message) => {
// 	console.log("Received message:", message);
// });
