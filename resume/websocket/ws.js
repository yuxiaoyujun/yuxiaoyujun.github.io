// // app.js
import WebSocketComponent from "./websocket";
const ws = new WebSocketComponent("ws://localhost:8080");
ws.connect();
ws.ws.onopen = () => {
	ws.send("Hello, world!");
	ws.close();
};
// ws.close();
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
