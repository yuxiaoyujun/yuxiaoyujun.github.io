---
title: '【prettier】vscode + prettier自动格式化'
date: 2022-11-21 23:11:49
tags: babel
categories:
  - 程序员的自我修养
---
  <meta name="referrer" content="no-referrer">

**1. 搜索并安装`prettier`，并确定该插件是启用状态**
![](https://upload-images.jianshu.io/upload_images/20892169-9b4bd29b1519333d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**2. 在项目中安装prettier**

```
npm install --save-dev prettier
```

**3. 在项目根目录新建`.prettierrc`和`.prettierignore`文件**

`.prettierrc`: 配置格式化规则，如以下配置

```
{
  "semi": true,
  "singleQuote": false,
  "arrowParens": "always",
  "trailingComma": "all"
}
```

`.prettierrc`更多的配置内容可以[点击这里](https://prettier.io/docs/en/configuration.html)
<br>

`.prettierignore`: 配置不需要格式化的文件，如下：

```
# Ignore artifacts:
build
coverage
/node_modules
```

**4.打开`vscode`的`setting`(快捷键`command+,`)，搜索`Format`，并勾选`Editor: Format On Save`**
![](https://upload-images.jianshu.io/upload_images/20892169-020af7ba79614712.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**5. 随便打开一个项目中的js文件，右键，点击使用...格式化文档**

![](https://upload-images.jianshu.io/upload_images/20892169-89b40b6978d680e9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
**6. 在顶部点击配置默认格式化程序...，选择Prettier**

![](https://upload-images.jianshu.io/upload_images/20892169-90844185703105d0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
配置完成，改动文件并保存就可以生效了。