---
title: 'axios的基本使用'
date: 2019-11-12 15:20:18
tags: 
  - axios
categories:
  - 程序员的自我修养
---
  <meta name="referrer" content="no-referrer">

## 一、axios的发送类型和restful api一样
axios基于promise，它支持promiseapi

### 1\. 基本用法
```javascript
axios.post(url,{
    param: {
        // 请求参数
    }
}).then(function(res){
    console.log(res)
})
```
或
```javascript
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
```
***注1：还有增（post）删（delete）改（patch/put）查（get）这些，以及head和option。***

***注2：OPTIONS方法返回有关API 的信息（方法/内容类型）:***
```javascript
HTTP/1.1 200 OK
Allow: GET,HEAD,POST,OPTIONS,TRACE
Content-Type: text/html; charset=UTF-8
Date: Wed, 08 May 2013 10:24:43 GMT
Content-Length: 0
HEAD方法返回有关资源的信息（版本/长度/类型）
HTTP/1.1 200 OK
Accept-Ranges: bytes
Content-Type: text/html; charset=UTF-8
Date: Wed, 08 May 2013 10:12:29 GMT
ETag: "780602-4f6-4db31b2978ec0"
Last-Modified: Thu, 25 Apr 2013 16:13:23 GMT
Content-Length: 1270
```
### 2\. 并发
axios.all(iterable)
###3. axios.create()
###4\. axios可以拦截请求和响应
在请求和响应被then或catch之前做某些操作。比如请求前加入token，响应时如果返回数据错误，可以跳转到登录页
```javascript
axios.interceptor.request.use(function(config){
    // 在发送请求之前做些什么
    return config
},function(err) {
    // 对请求错误做些什么
})
```
```javascript
axios.interceptor.response.use(function(response){
    // 对响应数据做些什么
    return response
},function(err) {
    // 对响应错误做些什么
})
```
request的config里返回的，最后可以返回data以继续下面的请求
![](https://upload-images.jianshu.io/upload_images/20892169-520f3d4d9a958c19.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

response里面返回的，最后也是return以用于响应

![](https://upload-images.jianshu.io/upload_images/20892169-d4bffc0347ccdf86.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 5.客户端支持xsrf防御

### 6.axios常见的配置：
```javascript
axios({
    url: '/user'
    method: 'post',
    baseURL: 'https://www.xxx.html' // 自动加载url前面的
    'transformRequest':[function (data) {
    // 对 data 进行任意转换处理
    return data;
  }], //允许在向服务器发送前，修改请求数据，比如加入token。只能用在'PUT','POST'和'PATCH'这几个请求方法
    transformResponse:[function (data) {
    // 对 data 进行任意转换处理
    return data;
  }], // 在传递给 then/catch 前，允许修改响应数据
    timeout: 1000, // 超过1000ms就不再请求了
    headers: {
        // 自定义请求头
    },
    params: {
        // 发送请求数据
    },
}).then(function(res){
})
```