class WebSocketComponent {
	constructor(url, isWebsocket) {
		this.url = url;
		this.ws = null;
		this.isWebsocket = true;
	}
	send(msg) {
		this.ws.send(msg);
	}

	close() {}
	connection() {
		if (isWebsocket) {
			this.ws.onopen(() => {
				console.log("websocket is opened");
			});
			this.ws.onmessage(() => {
				console.log("websocket is received!");
			});
			this.ws.onerror(() => {
				console.log("websocket is error");
				this.isWebsocket = false;
			});
			this.ws.onclosed(() => {
				// 被動關閉
				console.log("websocket is closed!");
				this.isWebsocket = false;
			});
		} else {
			axios({
				param: {},
				method: "post",
				callback: (event) => {
					if (event.flag) {
						this.connection();
					}
				}
			});
		}
	}
	close(callback) {
		let promise = new Promise((resolve, reject) => {
			if (callback) {
				resolve();
			} else {
				reject();
			}
		});
		promise.then((callback) => {});
		return new Promise((resolve, reject) => {
			if (callback) {
				this.ws.onclosed(() => {
					// 主動關閉嘅
					console.log("websocket is closed!");
					this.isWebsocket = false;
					resolve(callback);
				});
			} else {
				// 論询（？）嘅
				reject();
			}
		});
	}
}
