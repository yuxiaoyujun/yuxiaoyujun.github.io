---
title: 'jsdelivr结合github搭建cdn图片仓库t'
date: 2020-01-11 14:34:08
tags: jsdelivr
categories:
  - 程序员的自我修养
---
  <meta name="referrer" content="no-referrer">

## jsdelivr简介
jsdelivr.net是著名的CDN服务提供商，可以加速前端静态资源访问速度。
## jsdelivr 使用
首先在github新建仓库，然后提交一张测试图片上传，点击release

![](https://upload-images.jianshu.io/upload_images/20892169-938ca577f04e9980.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

在这里新增一个版本号，点击Publish release

![](https://upload-images.jianshu.io/upload_images/20892169-88c33a78e2227b59.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

然后使用
https://cdn.jsdelivr.net/gh/你的用户名/你的仓库名@版本号/
就可以访问静态资源了