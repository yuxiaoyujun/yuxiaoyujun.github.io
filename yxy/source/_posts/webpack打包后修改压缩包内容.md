---
title: 【webpack】自动化修改已经打包好的代码
date: 2023-05-09 16:42:28
tags: node
categories: 程序员的自我修养
---

今天有一个项目，对接时看 `readme` 里写

> 打包出来的 vendor 有存在 cookie，目前还没有查清楚引用的哪个包导致的。只能打包完成后手工删除一下 Cookie 相关的信息。

每次都需要修改已经打包好的代码，感觉很麻烦，就写了个小脚本`replace.js`

## 使用 `Node.js` 中的 `fs` 模块和正则表达式实现文件内容的替换

```js
// 打包后，根据 readme ## 部署现场线上环境安全要求 部分，自动替换相关脚本

const fs = require('fs')
const path = require('path')

function replaceInFile(filePath, searchValue, replaceValue) {
  const fileContents = fs.readFileSync(filePath, 'utf-8')
  const updatedFileContents = fileContents.replaceAll(searchValue, replaceValue)
  fs.writeFileSync(filePath, updatedFileContents, 'utf-8')
}

function searchAndReplaceInDir(dirPath, searchValue, replaceValue) {
  const files = fs.readdirSync(dirPath)

  files.forEach(file => {
    const filePath = path.join(dirPath, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      searchAndReplaceInDir(filePath, searchValue, replaceValue)
    } else {
      const fileContents = fs.readFileSync(filePath, 'utf-8')
      if (typeof searchValue === 'string') {
        if (fileContents.includes(searchValue)) {
          replaceInFile(filePath, searchValue, replaceValue)
        }
      } else if (searchValue instanceof RegExp) {
        const regex = new RegExp(searchValue, 'g')
        if (regex.test(fileContents)) {
          replaceInFile(filePath, regex, replaceValue)
        }
      }
    }
  })
}

// 注：searchValue可以传入字符串或正则。
// node版本16 以下不兼容 replaceAll 方法，若版本不兼容可传入正则修改。

// 1. 使用 'xsrfTestName' 替换 'xsrfCookieName'
searchAndReplaceInDir('industry-dev', /xsrfCookieName/g, 'xsrfTestName')

// 2. 移除 ',document.cookie=%d.join("; ")'
searchAndReplaceInDir('industry-dev', /\,document\.cookie\=.\.join\(\"; \"\)/g, '')

// 3. 使用 'test' 替换 'set-cookie'
searchAndReplaceInDir('industry-dev', 'set-cookie', 'test')

// 4. 移除 '%d?decodeURIComponent(%d[3]):'
searchAndReplaceInDir('industry-dev', /.\?decodeURIComponent\(.\[3\]\)\:/g, '')
```

打包后，使用`node replace.js`测试成功。

不嫌麻烦的话打包完后手动`node replace.js`就行了。

嫌麻烦的话。。。

于是下一步加入到 webpack 构建中，每次打包后自动执行脚本：

## 加入到自动构建步骤

1. 在 webpack 配置文件中引入 Node.js 的 child_process 模块：

```js
const { execSync } = require("child_process");
```

2. `plugins` 中加入

```js
const plugins = [
  new (class ReplacePlugin {
    apply(compiler) {
      compiler.hooks.done.tap("ReplacePlugin", () => {
        execSync("node replace.js");
      });
    }
  })(),
];
```


### 简单解释：

我定义了一个名为 `ReplacePlugin` 的 webpack 插件。插件是一个类，它包含一个名为 `apply` 的方法。这个方法接受一个 `compiler` 对象作为参数，用于访问 webpack 编译器的 API。

在 `apply` 方法中，我使用 `compiler.hooks.done.tap` 方法注册了一个回调函数。这个回调函数会在 webpack 编译完成后执行。

回调函数中使用了 `execSync` 函数来执行 `node replace.js` 命令。也就是说在 webpack 编译完成后，会运行名为 `replace.js` 的 Node.js 脚本。

### 关于`child_process`模块

`child_process` 是 Node.js 的一个内置模块，它提供了一组用于创建和管理子进程的 API。子进程是由另一个进程（在这种情况下是 Node.js 进程）创建的进程。

`execSync` 函数是从 `child_process` 模块中导入的。因此这个函数可以用来同步地执行一个 shell 命令，并返回命令的输出。

***注：它会阻塞 Node.js 事件循环，直到子进程退出。***

### 关于apply

`apply` 是一个方法，它是 webpack 插件的一个重要组成部分。当你在 webpack 配置中注册一个插件时，webpack 会自动调用插件的 `apply` 方法。

`apply` 方法接受一个 `compiler` 对象作为参数。`compiler` 对象代表了 webpack 编译器，它提供了一组 API，允许插件在编译过程中的不同阶段执行自定义操作。

我这里的 `apply` 方法使用了 `compiler.hooks.done.tap` 方法来注册一个回调函数。这个回调函数会在 `webpack` 编译完成后执行。也就是说，插件通过 `apply` 方法向 webpack 编译器注册了一个钩子函数，用于在编译完成后执行自定义操作。

完成以上配置后，每次打包就会自动完成。

## vue3 以上版本：

本来其实是想在`vue.config.js` 中添加一个 `configureWebpack` 钩子，在其中使用 `webpack-plugin-replace` 插件进行替换。比这种写脚本方法简单多了。

不过这个方法仅适用于 vue3 以上版本，而上面的方法适用于任何版本。

首先，需要在项目中安装 `webpack-plugin-replace`：

```bash
npm install webpack-plugin-replace --save-dev
```

然后，在 `vue.config.js` 中加入以下代码：

```js
const ReplacePlugin = require("webpack-plugin-replace");
const path = require("path");

module.exports = {
  configureWebpack: {
    plugins: [
      new ReplacePlugin({
        include: [path.resolve(__dirname, "dist")], // 替换范围
        values: {
          // 使用 xsrfTestName 替换 xsrfCookieName
          xsrfCookieName: "xsrfTestName",

          // 移除 ',document.cookie=a.join("; ")'
          ',document.cookie=a.join("; ")': "",

          // 使用 'set-cookie' 替换 'test'
          "set-cookie": "test",

          // 移除 'decodeURIComponent(t[3]):'
          "decodeURIComponent(t[3]):": "",
        },
      }),
    ],
  },
};
```

其中，`include` 配置了需要进行替换的文件夹路径，`values` 则配置了需要替换的字符串和对应的替换值。在执行 `yarn run build` 后，这些字符串将会被替换掉。

需要注意的是，`vue.config.js` 中的配置是在构建时读取的，因此如果想要修改这些配置，需要重新运行 `yarn run build` 才能生效。

完成。
