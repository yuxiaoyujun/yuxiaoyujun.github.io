// var ws = new WebSocket("ws://127.0.0.1:8080");

// ws.onopen = () => {
// 	console.log("WebSocket connected!");
// };

// ws.onmessage = (evt) => {
// 	console.log("Received message:", evt.data);
// };

// ws.onclose = () => {
// 	console.log("WebSocket closed!");
// };

// var ws = new WebSocket("ws://localhost:8080");
// ws.onopen = function () {
// 	ws.send("Hello, server!");
// };

// // 使用HTML5 WebSocket API
// var ws = new WebSocket("ws://localhost:8080");
// ws.onopen = function () {
// 	ws.send("Hello, server!");
// };

// 可以使用WebSocket客户端，如HTML5 WebSocket API、Socket.IO、WebSocket-Node等，来连接到WebSocket服务器，并发送消息给服务器。例如：

// // 使用HTML5 WebSocket API
// var ws = new WebSocket("ws://localhost:8080");
// ws.onopen = function() {
//     ws.send("Hello, server!");
// };

// // 使用Socket.IO
// var socket = io.connect("http://localhost:8080");
// socket.on("connect", function() {
//     socket.emit("message", "Hello, server!");
// });

// // 使用WebSocket-Node
// var WebSocketClient = require("websocket").client;
// var client = new WebSocketClient();
// client.on("connect", function(connection) {
//     connection.send("Hello, server!");
// });
// client.connect("ws://localhost:8080");
class WebSocket {
	constructor(url) {
		this.url = url;
		this.connection = null;
		this.onopen = null;
		this.onmessage = null;
		this.onerror = null;
		this.onclose = null;
	}

	// 连接websocket
	connect() {
		this.connection = new WebSocket(this.url);

		// 设置websocket事件回调
		this.connection.onopen = this.onopen;
		this.connection.onmessage = this.onmessage;
		this.connection.onerror = this.onerror;
		this.connection.onclose = this.onclose;
	}

	// 断开websocket
	disconnect() {
		this.connection.close();
	}

	// 发送消息
	send(data) {
		this.connection.send(data);
	}
}

// 导出websocket组件
export default WebSocket;
