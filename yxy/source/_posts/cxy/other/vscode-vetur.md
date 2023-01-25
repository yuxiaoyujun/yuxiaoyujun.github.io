---
title: '【vscode】vetur插件在vue3中报错'
date: 2022-12-30 11:31:49
tags: 开发效率
categories:
  - 程序员的自我修养
---
  <meta name="referrer" content="no-referrer">

vetur是vue2支持的插件，volar(vue language features)可以支持vue3。
可以直接搜索安装
![](https://upload-images.jianshu.io/upload_images/20892169-cc43f5ac6ad7cef6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
然后禁用vetur，重启vscode即可。

<hr>

如果不想禁用vetur，又想启用volar，可以在当前项目中的.vscode文件夹的settings.json文件中配置禁用如下：
```javascript
{
    "vetur.validation.template": false,
    "vetur.validation.script": false,
    "vetur.validation.style": false,
}
```
重启即可。