class WebSocketComponent {
	constructor(url) {
		this.url = url;
		this.ws = null;
	}

	connect() {
		this.ws = new WebSocket(this.url);
		this.ws.onopen = () => {
			console.log("WebSocket connection opened.");
		};

		this.ws.onmessage = (event) => {
			console.log("Message received: ", event.data);
		};

		this.ws.onclose = () => {
			console.log("WebSocket connection closed.");
		};
	}

	send(message) {
		this.ws.send(message);
	}

	close() {
		this.ws.close();
	}
}

export default WebSocketComponent;
