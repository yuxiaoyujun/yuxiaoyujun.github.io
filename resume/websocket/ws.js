// // app.js

// // 导入websocket组件
// import WebSocket from "./websocket";

// // 创建websocket实例
// const ws = new WebSocket("ws://localhost:8080");

// // 设置websocket事件回调
// ws.onopen = () => {
// 	console.log("websocket connected");
// };

// ws.onmessage = (data) => {
// 	console.log("received data:", data);
// };

// ws.onerror = (error) => {
// 	console.log("websocket error:", error);
// };

// ws.onclose = () => {
// 	console.log("websocket disconnected");
// };

// // 连接websocket
// ws.connect();

// // 发送消息
// ws.send("hello world");

// 断开websocket;
// ws.disconnect();

var ws = new WebSocket("ws://127.0.0.1:8080");

ws.onopen = () => {
	console.log("WebSocket connected!");
};

ws.onmessage = (evt) => {
	console.log("Received message:", evt.data);
};

ws.onclose = () => {
	console.log("WebSocket closed!");
};

var ws = new WebSocket("ws://localhost:8080");
ws.onopen = function () {
	ws.send("Hello, server!");
};
