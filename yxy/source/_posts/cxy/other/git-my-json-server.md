---
title: '【github】使用my-json-server建立线上测试api库'
date: 2021-11-27 22:21:49
tags: 实用开源代码or工具
categories:
  - 程序员的自我修养
---
  <meta name="referrer" content="no-referrer">

#### my-json-server
点击访问：[my-json-server](https://my-json-server.typicode.com/)

#### 1. 创建db.json文件并提交至master/main
```
{
	"posts": [
		{ "id": 1, "title": "Post 1" },
		{ "id": 2, "title": "Post 2" },
		{ "id": 3, "title": "Post 3" }
	],
	"comments": [
		{ "id": 1, "body": "some comment", "postId": 1 },
		{ "id": 2, "body": "some comment", "postId": 1 }
	],
	"profile": {
		"name": "typicode"
	}
}
```
#### 2. 请求方式
访问 `https://my-json-server.typicode.com/[你的用户名]/[你的仓库名]`，可以获取到api列表
 
比如，我的地址为：[https://my-json-server.typicode.com/yuxiaoyujun/api](https://my-json-server.typicode.com/yuxiaoyujun/api) 
点击页面提供的链接就可以访问到对应的api
![](https://upload-images.jianshu.io/upload_images/20892169-a1695b0d2cf0ad44.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

posts接口数据
https://my-json-server.typicode.com/yuxiaoyujun/api/posts
profile接口数据
https://my-json-server.typicode.com/yuxiaoyujun/api/profile
![](https://upload-images.jianshu.io/upload_images/20892169-aa26d983fc5947a7.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
