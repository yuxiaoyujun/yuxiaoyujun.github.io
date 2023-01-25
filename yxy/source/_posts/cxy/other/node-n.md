---
title: 'npm相关'
date: 2019-06-03 11:11:11
tags: 
  - npm
  - node
categories:
  - 程序员的自我修养
---
  <meta name="referrer" content="no-referrer">

#### -S和-D的区别
npm i --save-dev xxx
同npm i -D xxx安装到开发环境
在package.json中：
```javascript
"devDependencies": {
    "snabbdom": "^3.5.1"
  }
```
npm i --save xxx
同npm i -S xxx
安装到正式环境
在package.json中：
```javascript
 "dependencies": {
    "snabbdom": "^3.5.1"
  }
```
#### package-lock.json的作用
比如你的packgae.json的依赖是"react": "^17.0.2"，因为有标识符^，所以如果react模块有在17大版本下更新的小版本17.0.3，npm install时候会自动安装17下的最新版本17.0.3
现象：
在前景情况下，你本地是"react": "^17.0.2"，如果这时候react更新"react": "^17.0.3"，别人npm install的时候，安装就是"react": "^17.0.3"。这样导致你们版本不一致，可能引起一些相关错误。
解决：
package-lock.json：简单来说就是锁定安装模块的版本号。
就是在npm install的时候，记录各个模块的版本信息和下载路径，这样别人拉项目npm install时候， 就会依据packgae-lock.json去安装"react": "^17.0.2"，保证大家依赖一致并且安装模块速度也能提高。