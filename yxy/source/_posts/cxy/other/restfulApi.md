---
title: 'restfulAPI设计规范'
date: 2019-07-10 15:20:18
tags: 
  - api
categories:
  - 程序员的自我修养
---
  <meta name="referrer" content="no-referrer">


1.协议遵守https协议
2.api应该有单独域名
3.加上版本号
4.由于restfulapi中url表示一种资源的集合，而不再是一个功能一个url，所以网址中不能有动词，应该全是名词，且与数据库的表名一一对应，也由于是一种集合，所以api的名词尽量为复数
5.用http动词去表示资源的具体操作类型，如put/patch/post/get/delete/增删改查等
6.如果涉及分页这种返回结果相当多的情况，api也可以提供一些参数，如?limit=10&page=2
7.有单独的状态码