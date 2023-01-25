---
title: '【npm】常见参数的区别'
date: 2021-07-17 16:01:08
tags: 
  - node
  - npm
categories:
  - 程序员的自我修养
---
  <meta name="referrer" content="no-referrer">

#### dependencies 与 devDependencies的区别：

`dependencies`：它包含的依赖包是需要发布到生产环境中的，是项目正常运行必须依赖的包。
`devDependencies`：它包含的依赖包只在开发时使用，不用于生产环境，如果只需要项目正常运行，则不必安装这里面的包。
<hr>
## npm install packageName：安装某个包到项目中
默认情况下，不加参数。会安装包，并将依赖包的名称添加`package.json`中的`dependencies`字段。

#### 1. `--save`参数
```
npm install --save packageName
```
添加`--save`参数，与默认情况效果相同。会安装包，并将依赖包的名称添加到`package.json`中的`dependencies`字段。

#### 2. `--save-dev`参数
```
npm install --save-dev packageName
```
添加`--save-dev`参数，会安装包，并将依赖包的名称添加到`package.json`中的`devDependencies`字段。

## npm install： 初始化项目
####1. 无参数： 直接初始化
```
npm install 
```
我们常用`npm install`初始化项目，安装项目所需的依赖。但更深入的细节是：直接使用`npm install`时，项目`package.json`中`dependencies`字段和`devDependencies`字段中的依赖包都会被安装。
#### 2. --production参数
```
npm install --production
```
添加`--production`安装项目所需的依赖时，只有`dependencies`字段中的依赖包会被安装，`devDependencies`中的依赖包不会被安装。

#### 3. --only=dev参数
```
npm install --only=dev
```
添加`--only=dev`安装项目所需依赖时，只有`devDependencies`字段中的依赖包会被安装，`dependencies`字段中的依赖包不会被安装。与添加`--production`的效果刚好相反。