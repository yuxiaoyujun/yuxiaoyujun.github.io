---
title: '【node】path.join和path.resolve的区别'
date: 2021-05-11 12:01:08
tags: node
categories:
  - 程序员的自我修养
---
  <meta name="referrer" content="no-referrer">

#### 参数拼接 path.join([path1][, path2][, ...])
**`path.join()`方法可以连接任意多个路径字符串。要连接的多个路径可做为参数传入。**

path.join()方法的参数为string，可以加多个参数，最后会拼在一起形成一个地址，若不是string则报错
```javascript
// 用法
const path = require('path'); 
path.join('https://', 'www.', 'aaa', '.com', '/','aaa') 
'https://www.aaa.com/aaa' 

// 传入的不为字符串则报错
path.join('aaa',{},'bbb') 
// 抛出的异常 TypeError: Arguments to path.join must be strings'
```

#### 路径解析：path.resolve([from ...], to)
**path.resolve()方法可以将多个路径解析为一个规范化的绝对路径。**
其处理方式类似于对这些路径逐一进行cd操作，但resolve在未执行时不会校验其合法性（就是可以不存在这个地址）
```javascript
path.resolve('foo/bar', '/tmp/file/', '..', 'a/../truefile')
```
相当于
```javascript
cd foo/bar
cd /tmp/file/
cd ..
cd a/../truefile
pwd
```
举例：
```javascript
path.resolve('/foo/bar', './baz') 
// 输出结果为 '/foo/bar/baz' 
path.resolve('/foo/bar', '/tmp/file/') 
// 输出结果为 '/tmp/file' 

path.resolve(__dirname, 'static_files/png/', '../gif/image.gif') 
// 当前的工作路径是 /home/itbilu/node，则输出结果为 
// '/home/itbilu/node/wwwroot/static_files/gif/image.gif'

```