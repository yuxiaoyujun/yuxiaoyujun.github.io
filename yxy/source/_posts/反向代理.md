---
title: 【反向代理】webpack-dev-server反向代理的原理及简介
date: 2023-05-08 14:21:19
tags:
  - webpack
categories:
  - 程序员的自我修养
---

在 Web 开发中，由于浏览器的安全机制限制，同源策略（Same-Origin Policy）会阻止来自不同源（协议、域名、端口）的 Web 应用程序之间的访问。这意味着如果你的 Web 应用程序试图从一个不同的域名请求数据，将会收到一个跨域请求错误。

在本地开发时，由于 api 从测试环境提供，而本地的域名为 localhost，会导致跨域。此时可以使用 webpack-dev-server 的反向代理功能去设置。

## 1. 什么是 webpack-dev-server

`webpack-dev-server`是一个开发环境下的服务器，它能够为我们提供一个本地的开发环境，实时重新加载页面，并且能够支持各种类型的静态资源。它内置了 webpack 编译器，可以自动编译项目代码并在浏览器中实时展示。

## 2. 什么是反向代理

在开发环境中，我们可能需要从本地访问远程的服务器接口，但是由于跨域的限制，我们无法直接访问远程服务器。这时候就需要借助反向代理服务器来实现。反向代理服务器可以在本地开启一个代理服务，将本地请求转发到远程服务器，从而解决跨域问题。

## 3. webpack-dev-server 实现反向代理的原理

webpack-dev-server 内置了 express 服务器，并且支持配置代理服务器。通过配置代理服务器，我们可以将本地的请求转发到远程服务器。具体的实现原理如下：

1. 在`webpack.config.js`中配置代理服务器相关的选项，比如`proxy`、`before`、`after`等。
2. 在启动 webpack-dev-server 时，会自动启动一个 express 服务器，并监听开发服务器的端口。
3. 当我们在浏览器中发起请求时，express 服务器会拦截请求，并判断该请求是否满足代理规则。
4. 如果请求满足代理规则，express 服务器会将该请求转发到代理服务器。
5. 代理服务器会将请求发送到远程服务器，并将响应返回给 express 服务器。
6. express 服务器收到远程服务器的响应后，将响应返回给浏览器。

## 4. 如何配置 webpack-dev-server 反向代理

在`webpack.config.js`文件中，我们可以通过`devServer.proxy`选项来配置反向代理服务器，其常见配置如下：

```js
module.exports = {
	// ...
	devServer: {
		proxy: {
			// 代理规则
			"/api": {
				target: "http://localhost:3000",
				pathRewrite: { "^/api": "" },
			},
		},
	},
};
```

上述配置的含义是：将以`/api`开头的请求转发到`http://localhost:3000`服务器上，并且去掉`/api`前缀。

其中，`target`选项表示需要转发的远程服务器地址，`pathRewrite`选项用于重写请求路径。

## 5. 使用案例

假设我们有一个 Vue.js 项目，需要通过反向代理来访问后端 API。后端 API 的地址为 `https://api.example.com`。

首先，我们需要安装 `webpack-dev-server` 和 `http-proxy-middleware`：

```bash
npm install webpack-dev-server http-proxy-middleware --save-dev
```

接下来，在 `vue.config.js` 中添加以下配置：

```js
const proxy = require("http-proxy-middleware");

module.exports = {
	devServer: {
		proxy: {
			"/api": {
				target: "https://api.example.com",
				changeOrigin: true,
				pathRewrite: {
					"^/api": "",
				},
			},
		},
	},
};
```

这个配置的意思是：所有以 `/api` 开头的请求都会被代理到 `https://api.example.com`，并且会在请求头中加上 `Origin: http://localhost:8080`，以模拟跨域请求。`changeOrigin` 选项表示是否改变请求头中的 `Origin` 字段，设为 `true` 可以解决一些跨域问题。`pathRewrite` 选项表示将请求路径中的 `/api` 替换为空，以便后端接收请求时不会包含 `/api`。

然后在前端代码中，我们可以这样来访问 API：

```js
axios.get("/api/some-api");
```

这样，`axios` 库会将请求发送到 `http://localhost:8080/api/some-api`，`webpack-dev-server` 会将这个请求转发到 `https://api.example.com/some-api`，最终将后端 API 的响应返回给前端。

需要注意的是，由于是通过代理服务器来访问后端 API，所以我们无法直接在浏览器中访问 `https://api.example.com`，必须通过代理服务器来访问。在开发环境下，我们可以使用 `webpack-dev-server` 提供的 `/webpack-dev-server/` 页面来访问代理服务器的相关信息。
