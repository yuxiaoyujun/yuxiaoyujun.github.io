---
title: '【chrome插件】Ajax Interceptor修改 ajax 请求的响应文本'
date: 2021-04-03 06:21:49
tags: 开发效率
categories:
  - 程序员的自我修养
---
  <meta name="referrer" content="no-referrer">

#### 一、介绍
Ajax Interceptor是一个用于修改 ajax 请求响应的 chrome 扩展，修改ajax请求并返回结果的chrome插件。你可以用该插件修改页面上Ajax请求的返回结果。

#### 二、安装
Ajax Interceptor下载安装地址：[点击跳转](https://chrome.google.com/webstore/detail/ajax-interceptor/nhpjggchkhnlbgdfcbgpdpkifemomkpg?hl=zh-CN)

#### 三、使用
1. 安装完成后，点击图标并展开
![](https://upload-images.jianshu.io/upload_images/20892169-a70b52f7a5a767e1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
2. 点击加号，在network中找到需要修改的请求
![](https://upload-images.jianshu.io/upload_images/20892169-21e15d48c92accc3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
3. 将从network获取到的地址和json数据粘贴至框中
![](https://upload-images.jianshu.io/upload_images/20892169-0cea7d65b83b5dc2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
4. 点击JSON Editor，即可编辑需要修改的字段
![](https://upload-images.jianshu.io/upload_images/20892169-b2f9a2de34dc01a1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
5. 刷新或重新请求后，即可生效。
![](https://upload-images.jianshu.io/upload_images/20892169-131b0c841a7cd5e7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
<br>
<br>

*✨注意：*

*1. 第一次安装完，请刷新你需要使用的页面，或者重启浏览器。*

*2. 当你不需要使用该插件时，建议把开关关上（插件icon变为灰色），以免对页面正常浏览造成影响。*

*3. 该插件只会在JS层面上对返回结果进行修改，即只会修改全局的XMLHTTPRequest对象和fetch方法里的返回值，进而影响页面展现。而你在chrome的devtools的network里看到的请求返回结果不会有任何变化。*
