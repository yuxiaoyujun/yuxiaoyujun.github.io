---
title: '【webpack5】基础部分总结'
date: 2021-05-25 06:21:49
tags: webpack
categories:
  - 程序员的自我修养
---
  <meta name="referrer" content="no-referrer">

## 一、五大核心概念
mode：开发模式development/生产模式production
entry：入口，从哪个文件开始编译
output：出口
plugin：插件
loader：写在module中，加载器
## 二、基本配置
固定在根目录，新建一个文件名为```webpack.config.js```内容如下：
```javascript
const path = require("path")

module.exports = {
    mode: 'development',
    entry: './src/main.js', // 相对路径
    output: {
        path: path.resolve(__dirname, 'dist'),//输出路径，绝对路径
        // __dirname: nodejs的变量，代表当前文件的文件夹目录
        filename: 'main.js',//文件名
    },
    module: {
        rules: [
            // loader的配置
        ]
    },
    plugins: [],
    devServer: {
        port: 8082,
        compress: true,
        static: path.join(__dirname,'dist','index.html')
    }
}
```
新建src文件夹，在src文件夹下建立main.js，然后执行npx webpack就会自动打包。
## 三、处理资源
**注：多个loader配合使用时，处理顺序是：从下到上，从右到左 的顺序**
### 1. css
因为webpack只能识别js资源，所以要处理css需要用loader
如加一个css-loader，先安装css-loader在开发环境中，然后在module中加载rules
```javascript
    module: {
        rules: [
            // loader的配置
            { test: /\.css$/, use: 'css-loader' },
        ]
    },
```
对于一条规则，也可以使用多个loader，在use中配置。
```javascript
// 对后缀名为css的文件，使用多个loader处理
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // [style-loader](/loaders/style-loader)
          { loader: 'style-loader' },
          // [css-loader](/loaders/css-loader)
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          // [sass-loader](/loaders/sass-loader)
          { loader: 'sass-loader' }
        ]
      }
    ]
  }
};
```
### 常见的处理样式文件的loader：
`css-loader `：处理css文件
`less-loader `
`sass-loader `
`style-loader`：处理style标签内的样式 
`stylus-loader`：使用模块化的方法去写css代码
[`stylus`](https://www.stylus-lang.cn/)：是一种写css的方式，没有花括号没有分号，用缩进的方式去代替大括号，后缀名为styl
### 2. 图片资源
webpack4使用file-loader和url-loader处理图片
`file-loader`:将图片转换为webpack能识别的资源。
`url-loader`:将小于某个大小的图片转换为base64
处理图片并不需要loader，webpack5自带默认处理图片，只需要在loader中配置
### 3. 修改打包资源的路径
像输出时，默认js、图片等等都会在一个目录中，现在想要配置成其他目录。
```javascript
    output: {
        path: path.resolve(__dirname, 'dist'),//所有文件的输出路径，绝对路径
        // __dirname: nodejs的变量，代表当前文件的文件夹目录
        filename: 'js/main.js',//打包入口文件js的文件名，所以如果指定了js/xxx.js，那么入口js文件都会被打包到js目录下
    },
```
重新npx webpack就变成了这样
![](https://upload-images.jianshu.io/upload_images/20892169-d8351f778a8d920a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
######图片资源路径的修改：在module/rules的对应loader中配置generator
```javascript
generator: {
    //输出图片名称及目录，hash：唯一id，10代表hash值只取前十位，ext：文件扩展名    
    filename: 'static/images/[hash][ext]',
},
```
打包效果：
![](https://upload-images.jianshu.io/upload_images/20892169-6f01c6e5729878cf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### 4. 自动清空上次打包资源
webpack不会自动删除上次打包内容，可能会造成重叠，文件很多，可以配置每次打包自动删除之前的打包结果。
配置方法：clean：true
```javascript
    output: {
        path: path.resolve(__dirname, 'dist'),//所有文件的输出路径，绝对路径
        // __dirname: nodejs的变量，代表当前文件的文件夹目录
        filename: 'js/main.js',//打包入口文件js的文件名，所以如果指定了js/xxx.js，那么入口js文件都会被打包到js目录下
        clean: true 
        // 自动清空上次打包的内容
        // 原理：在打包前，将path整个目录清空，在进行打包输出
    },
```
### 5.处理其他资源
如视频、字体、excel等等，想统一处理的话，可以如下配置：
```javascript
{
    test: /\.(mp3?4|ttf|avi|doc|rmvb)/,
    type: 'assert/resource',
    generator: {
        filename: 'static/images/[hash:10][ext]',
     }
},  
```
官网对于type: assert的几个值的介绍：

>asset/resource 发送一个单独的文件到输入目录并导出 URL。之前通过使用 file-loader 实现。
asset/inline 导出一个资源的 data URI（如，base64）。之前通过使用 url-loader 实现。
asset/source 导出资源的源代码。之前通过使用 raw-loader 实现。
asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体积限制实现。

### 6. ESLINT
**eslint**：用来检测js和jsx语法，可以管理缩进、规则是否正确，让代码更加健壮。
**配置文件**：eslintrc.js
在**webpack4**中使用`loader`处理。
在**webpack5**中使用`plugins`去处理。
#### 如何使用？
根目录新建`eslintrc.js`，然后在`webpack.config.js`中配置`plugin`
官网文档：[点击查看](https://webpack.docschina.org/plugins/eslint-webpack-plugin/#root)
plugins要用require引入。
```javascript
const ESLintPlugin = require('eslint-webpack-plugin');

    plugins: [
        new ESLintPlugin({
            context: path.resolve(__dirname, 'src')
// 开发时是只需要检查源代码，打包的dist代码是不用检查的。
        })
    ],
```
简单的eslintrc.js的配置
```javascript
module.exports = {
    // 继承eslint规则
    extends: ["eslint: recommended"],
    env: {
        node: true, // 启用node中的全局变量
        browser: true, // 启用浏览器的全局变量
    },
    parserOptions: {
        ecmaVersion: 6, // es6 模块
        sourceType: 'module'
    },
    rules: {
        "no-var": 2, //不能使用var定义变量
    }
}
```
如果有不需要检查的文件，新建`eslintignore`可以不检查。
### 7. babel
还是一样，webpack官网搜babel，就会出来babel-loader的配置，复制过来根据自己的需要做修改。
根目录新建babel.config.json，其中配置babel
```javascript
{
    "presets": [
      [
        "@babel/preset-env",
        {
          "targets": {
            "edge": "17",
            "firefox": "60",
            "chrome": "67",
            "safari": "11.1"
          },
          "useBuiltIns": "usage",
          "corejs": "3.6.5"
        }
      ]
    ]
  }
```
```javascript
{
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
}
```
如果不写上面的options，那么会用babel.config.json中的配置去转换代码的。
`@babel/preset-env`：智能预设，允许使用最新的js
`@babel/preset-react`：用来编译jsx
`@babel/preset-typescript`：用来编译ts。

targets：需要兼容的浏览器版本，可以用这些属性 ：
`
android, chrome, deno, edge, electron, firefox, ie, ios, node, opera, rhino, safari, samsung`
也可以设置成一个string，比如` > 0.5%, last 2 versions, not dead` 意思是有大于百分之零点五的人使用，前两个版本，并且没有废弃

`useBuiltIns`有几个值
`false`：默认值，不做任何语法转换
`usage Babel`：将检查你的所有代码，以便查找targets环境中缺失的功能，然后只把必须的 polyfill 包含进来
`entry`：引入所有的polyfill包，必须在入口文件加入 import "core-js/stable" 才会生效

`useBuiltIns` 需要搭配 `core-js`，并且需要在配置文件里面声明。目前`core-js`最新版本是`3.x`，也可以指定`2.x`。
npm i core-js -S
 "corejs": "3.6.5"

### 8. 处理html
[点击查看](https://webpack.docschina.org/plugins/html-webpack-plugin/#root)
首先js打包文件可能名字是动态生成的，需要自动引入js到html，才会确保不出错的
所以可以自动生成index.html文件，插件为`HtmlWebpackPlugin`
```
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
  },
  plugins: [new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'index.html')
        })],
};
```
首先插件会自动生成一个index.html，template中写的index.html意思是通过template里的这个index.html生成一个index.html到dist目录中，所以两个不是一个意思。
## 三、搭建开发服务器
安装```webpack-dev-server```
```javascript
    devServer: {
        port: 8082,
        compress: true,
        static: path.join(__dirname,'dist','index.html')
    }
```
## 四、生产模式的搭建
生产模式也就是线上实际使用的代码，会被压缩。因为体积小，加载就快。
一般会新建一个`config/webpack.dev.js`做开发环境的搭建。
一般会新建一个`config/webpack.prod.js`做线上环境的搭建。
然后建立`webpack.config.js`，将两个配置引入。
#### 改动的主要地方
1、如果配置文件新建一个文件夹放起来，那么需要将所有绝对路径改为上层路径。
2、mode的更改
3、开发模式删除output，生产模式删除devServer
#### 常见打包命令：
`npx webpack`：自动打包命令
`npx webpack serve --config ./config/webpack.dev.js`  ：运行./config/目录下的`webpack.dev.js`配置文件，并启动服务
`npx webpack --config ./config/webpack.prod.js` ： 运行./config/目录下的`webpack.prod.js`配置文件
## 五、css处理
### 1. css单独提取
#### 之前处理css的方法：
是将css用`css-loader`变为webpack可识别的文件后
在入口文件`main.js`使用`imort`引入css
再使用`style-loader`将css转换为网页中的style内联标签
####使用`MiniCssExtractPlugin`：
将`style-loader`生成的style标签内的css单独提取为css文件，注意必须要安装`style-loader`
```javascript
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};
```
入口文件main.js中：
```javascript
import "./style.css";
```
**注：**
+ 要生成页面内style标签的形式，那么`css-loader`和`style-loader`要同时使用。
+ 要生成单独的css文件，那`css-loader`和`miniCssExtractPlugin.loader`要同时使用。（不用style-loader）
### 2. 兼容性处理
`postcss-loader`：兼容性处理，需要安装`postcss`与`postcss-loader`，配置在css-loader和style-loader之后，在less和sass的前面，这个是固定的噢
在package.json中，配置
```javascript
  "browserslist": [
    "ie >= 8" // 需要兼容ie8以上的兼容

  ]
```
然后按照官网去配置loader
```javascript
use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // 其他选项
                    },
                  ],
                ],
              },
            },
          },
        ],
```
```javascript
  "browserslist": [
    "last 2 version", // 兼容所有浏览器厂商的最近两个版本
    "> 1%", // 覆盖99%浏览器
    "not dead" // 已经kill的版本
  ]
```
### 3.CssMinimizerPlugin压缩css
一般来说，压缩操作在webpack5中都放进optimization中，虽然放在plugins中也可以，不太规范拉。~
```javascript
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
optimization: {
        minimizer: [
          // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
          // `...`,
          new CssMinimizerPlugin(),
        ],
    },
}
```
<hr>

## 常见的loader总结：

*   [`raw-loader`](https://v4.webpack.js.org/loaders/raw-loader/) 将文件导入为字符串
*   [`url-loader`](https://v4.webpack.js.org/loaders/url-loader/) 将文件作为 data URI 内联到 bundle 中
*   [`file-loader`](https://v4.webpack.js.org/loaders/file-loader/) 发送一个单独的文件并导出 URL
*   各种`css-loader`
*  `postcss-loader`：兼容性处理，需要安装`postcss`与`postcss-loader`，配置在css-loader和style-loader之后，在less和sass的前面，这个是固定的噢
##常见的plugin总结：
* `MiniCssExtractPlugin`：将style-loader生成的style标签内的css单独提取为文件，注意必须要安装style-loader
* `CssMinimizerWebpackPlugin`: 压缩css
* `ESLintPlugin`：eslint检查
* `terserWebpackPlugin`：压缩代码
<hr>
