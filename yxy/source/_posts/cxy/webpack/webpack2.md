---
title: '【webpack5】进阶部分总结（一）'
date: 2021-05-31 08:31:49
tags: webpack
categories:
  - 程序员的自我修养
---
  <meta name="referrer" content="no-referrer">

## SourceMap
#### 1. 解决问题：
报错时，报错的是编译后的代码，不好调试。
#### 2. SourceMap是什么：
**源代码映射**，包含源代码和构建后代码每一行每一列的代码映射关系。
它会生成一个```xxx.map```，当构建后代码出错了，会通过```xxx.map```从构建后代码出错位置，找到映射后源代码出错位置。
#### 3. 使用方法：
在webpack的devTool文档中，souceMap的值有很多种情况，但实际开发只关心两种情况
##### · 开发环境：cheap-module-source-map
只包含行映射，打包编译速度快。
```javascript
module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map'
}
```
##### · 生产环境：source-map
包含行列映射，打包编译速度慢
```javascript
module.exports = {
  mode: 'production',
  devtool: 'source-map'
}
```
生产环境下必须得关注列，因为生成模式下代码就压缩成一行了，不关注列根本不知道在哪里报错。
![生成的map文件](https://upload-images.jianshu.io/upload_images/20892169-d58c436d3e0b7a24.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## HMR：热模块替换
**hot module replacement**：提升打包构建速度
**解决痛点**：如果只修改了某个模块代码，webpack会将所有模块重新打包，那会很慢。当项目很大的时候，打包速度会越来越慢，所以需要更快些。
配置方法：其实是默认的，不需要去写hot:true也可以。

```javascript
    devServer: {
        hot:true
    },
```

当设置了hot: false时，那么在修改文件时（css），其实整个文件是会重新打包的（浏览器会刷新）。
js即使开启了热模块替换（HMR），修改了还是会整个重新加载
## one of：每个文件只能被其中一个loader处理
webpack的loader会被每个文件匹配一遍，性能会很慢。当确认某个文件只会被一种loader处理时，那么设置匹配到一个loader之后，就不再处理下面的loader。这样也可以提升性能。
写法：
```javascript
module: {
        rules: [
            // loader的配置
            { 
                oneOf: {
                  { test: /\.ts$/, use: 'ts-loader' },
                }
             }
        ]
}
```
## include exclude
开发时会使用第三方的库或插件，比如echarts、lodash等。他们是已经编译好的，在node_modules中，所以处理js文件时，要排除node_modules的文件。
```javascript
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/, // 排除什么文件夹不处理
              // include: path.resolve(__dirname,'../src') // 只处理src下的文件。include和exclude不能并存。
                use: {
                  loader: 'babel-loader',
                //   options: {
                //     presets: ['@babel/preset-env']
                //   }
                }
            }   
```
## ESlint和Babel的缓存：
每次打包都要重新检查eslint和babel编译会损耗性能，所以可以开启缓存。只有第一次打包需要检查eslint和编译babel，之后再次修改只检查和编译修改过的文件即可了。
```javascript
           
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  },
                  cacheDirectory: true, // 开启babel缓存
                  cacheCompression: false // 关闭缓存文件压缩
```
```javascript
  new ESLintPlugin({
      context: path.resolve(__dirname, '../src'),
      exclude: 'node_modules', //不处理node_modules下的文件
      cache: true, // 是否开启缓存
      cacheLocation: path.resolve(__dirname,'../node_modules/.cache/eslintcache') // 缓存到哪里
  }),
```
## Thread 多进程
现在处理js文件，基本都是用eslint先检查，在用babel编译，再用terser压缩。文件大的时候会比较慢。
现在的cpu都是多核的，可以启动多进程。
###1. 安装thread
sudo cnpm i thread-loader
###2. 引入thread-loader
位置放在需要处理的loader的前面，比如babel-loader前面。
works: threads
```javascript
const os = require("os")
const threads = os.cpus().length; //cpu核数```
```
```javascript
          use: [
                  {
                    loader: 'thread-loader',
                    options: {
                      works: threads
                    }
                  },
                  {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env'],
                      cacheDirectory: true, // 开启babel缓存
                      cacheCompression: false // 关闭缓存文件压缩
                    },
                  }
                ]
```
eslint 中
```javascript
        new ESLintPlugin({
            context: path.resolve(__dirname, '../src'),
            exclude: 'node_modules', //不处理node_modules下的文件
            cache: true, // 是否开启缓存
            cacheLocation: path.resolve(__dirname,'../node_modules/.cache/eslintcache'), // 缓存到哪里
            threads // 开启多进程和设置进程数量
        }),
```
压缩代码使用的terser虽然是默认的，但如果想用多线程处理，就也需要写出来
```javascript
        const terserWebpackPlugin = require('tearser-webpack-plugin')
```
optimization中（or plugins中）
```javascript
        new terserWebpackPlugin({
          parallel: threads // 开启多进程和设置进程数量
        })
```
文件少的时候没有必要开启，反而更慢的。因为进程启动也是需要时间的。
### Tree Shaking
tree shaking依赖js模块化，不能用于commonjs，**用于描述和移除没有用到的js代码**
自动配置，无需手动配置。

## 减少Babel生成文件的体积 babel-runtime
[点击查看](https://zhuanlan.zhihu.com/p/394783228)
babel对一些公共方法使用了辅助代码，默认情况下辅助代码会被添加到每一个需要它的文件中，这样会使打包体积非常大。
为了避免这样的情况，可以将这些辅助函数提出到一个npm包中，然后在用到的时候，再单独引入，这样就做到了复用。
这个包就是@babel/runtime，之后每次需要用辅助代码转换时，require进去这个包，就可以减少代码体积。

如：
下面这段代码是class语法被转译时加入的辅助代码，如果每个需要转译的class就这么长，代码体积就会很大。
```javascript
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

```
下面是使用@babel/runtime包后，用require引入的方式，替代了上面的辅助代码片段，可以看到使用这种方式代码比较简洁。
```javascript
  var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");
  var _defineProperties = require("@babel/runtime/helpers/defineProperties");
  var _createClass = require("@babel/runtime/helpers/createClass");
```
但如果每个用到的地方都去手动替换这个包引入，出错几率大，所以就有了`@babel/plugin-transform-runtime`这个包。可以帮我们自动在需要的地方引入。
`@babel/plugin-transform-runtime`：禁用了babel自动对每个文件的runtime注入，并且使所有辅助代码从这个包引入

## 压缩图片
一个插件。
## CodeSplit多入口
### 1. 配置方法
`entry`改为对象，`output`的`filename`换成`[name].js`
```javascript
    entry: {
        app: './src/js/app.js',
        main: './src/js/main.js'
    },
    output: {
        path: path.resolve(__dirname,'./dist'),
        filename: '[name].js',
        clean: true
    },
```
### 2. 提取公共模块
如果所有的js都在一个文件中，体积太大了。如果只需要渲染首页js，其他文件不应该加载。
所以进行代码分割，生成多个js文件，渲染哪个文件就用哪个js。

单入口：
```javascript
        // 单入口时候的配置，影响的只有node_modules引入的第三方代码和动态加载的代码会单独生成
        optimization: {
          splitChunks: {
              chunks: 'all', // all/async/initial, 
              // all: 既处理动态引入的模块 import('')，也处理直接引入的模块 import xxx from ''
              // async: 只处理动态引入的模块
              // initial: 这个值表示项目中被直接引入的模块将会被用于优化。


          }
        }
```
多入口：
```javascript
    optimization: {
        splitChunks: {
            chunks: 'async', // all/async
            minSize: 20000, // 分割代码最小的大小
            minRemainingSize: 0, // minSize，最后确保读取的文件大小不为零 
            minChunks: 1, // 至少被引用的次数
            maxAsyncRequests: 30, // 按需加载时并行加载的最大数量
            maxInitialRequests: 30, // 入口js文件最大并行请求数量
            enforceSizeThreshold: 50000, // 超过该值一定会单独打包（此时忽略minRemainingSize、maxAsyncRequests、maxInitialRequests）
            cacheGroups: { // 哪些模块打包到一个组
              defaultVendors: { // 组名
                test: /[\\/]node_modules[\\/]/,  // 需要打包到一起的模块
                priority: -10, // 权重（越大越优先）
                reuseExistingChunk: true, // 如果当时chunk已经包含从主bundle中拆分出的模块，则被重用而不是生成新模块
              },
              default: {    // 其他没有写的配置会使用上面的默认值
                minChunks: 2, // 这里的minchunks权重更大
                priority: -20,
                reuseExistingChunk: true,
              },
            },
          },
    },
```
打包出来如图：
![](https://upload-images.jianshu.io/upload_images/20892169-6c2bf3132c984613.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 3. 按需加载js
有些暂时不需要加载的文件，如果一出来就加载，会阻塞之后的资源。
所以可以在需要的时候再加载。

#### 我新建了一个count文件，内容如下：
```javascript
export let count = 1
```
在入口文件中动态加载count。
```javascript
document.querySelector('.button').addEventListener('click',function(){
    import('./count') // 动态加载的模块会单独打包
    .then((res)=>{ 
        console.log('succeed!',res.count)
    })
    .catch((res)=>{
        console.log('failed!',res)
    })
    console.log(count)
})
```
#### 效果：原本是七个js文件

![](https://upload-images.jianshu.io/upload_images/20892169-2f048649a96409b7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
####点击后加载第八个js文件

![](https://upload-images.jianshu.io/upload_images/20892169-e7790e6714154eee.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
####内容是`count`
![](https://upload-images.jianshu.io/upload_images/20892169-03618487580c249a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
#### 如果动态导入的是函数的话，用`res.函数名`调用
### 4. 为动态导入的模块在编译时重命名
webpack默认是可以给动态模块命名的，但有点丑。
![](https://upload-images.jianshu.io/upload_images/20892169-f383556105a961a4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
如果想自己命名的话可以使用**内联注释**
```javascript
 /* webpackChunkName: "my-chunk-name" */
```
#### 具体的方法：
##### （1） 动态引入的时候这样写
```javascript
  import(/* webpackChunkName: "printString" */'./printString')

```
##### （2） 在output中配置`chunkFilename`
```javascript
    output: {
        path: path.resolve(__dirname,'./dist'),
        filename: '[name].js',
        // 为打包输出的其他文件命名
        chunkFilename: 'static/js/[name].js',
        clean: true
    },
```
##### （3）再次打包，名字就会变成自己的命名了
![](https://upload-images.jianshu.io/upload_images/20892169-5bd94dae34918b27.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### 5. codesplit 统一命名
对入口文件来说，可以叫main.js，为了方便开发，像chunk文件可以加一个.chunk.js，然后所有的媒体文件，如果每一个loader里面都去单独指定一遍，会比较麻烦。
此时可以在output中配置
```javascript
assetModuleFilename: 'static/media/[hash:10][ext][query]',  // 所有loader编译的静态资源的打包名字

```
### 6. preload与prefetch
#### 共同点：
* 两者的概念都是预加载，缓存下来资源
* 只加载不执行
* 都有缓存
* 兼容性都很差
####区别：
* preload：告诉浏览器立即加载资源
* prefetch：告诉浏览器在空闲时加载资源
* preload优先级高，prefetch优先级低。
* preload只能加载当前页面用的，prefetch可以加载之后页面用的。
现阶段使用[`preload-webpack-plugin`](https://www.npmjs.com/package/preload-webpack-plugin)插件

## 7. network cache

## 8. Core.js
babel可以转箭头函数、...这样的，但无法转换async、await、promise，这时就需要core.js。
### 1. 什么是corejs?
core-js 它是JavaScript标准库的 polyfill（垫片/补丁）, 新功能的es'api'转换为大部分现代浏览器都可以支持
运行的一个'api' 补丁包集合。
### 2. 使用方法
#### （1）直接引进
首先安装corejs
```javascript
sudo cnpm install core-js
```
然后在入口引入
import 'core-js'
这种方法的坏处是会将core-js全部引入，会使得包体积很大。所以一般不会这样引。
#### （2）按需引进
将需要的引进去即可。
比如用promise，那么就写
```javascript
import 'core-js/es6/promise'
```
安装后是有提示的，不用背。
![](https://upload-images.jianshu.io/upload_images/20892169-3d7e0d3573d23bac.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
#### （3）智能引进
配合babel使用。
在babel.config.js中配置
```javascript
  {
    "presets": [
      [
        "@babel/preset-env",
        {
          "useBuiltIns": "entry",
          "corejs": 3,
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
## PWA 渐进式网络应用程序
基于serviceworker实现，但也有很严重的兼容性问题
点击访问[官网](https://webpack.docschina.org/guides/progressive-web-application/#conclusion)
项目离线时候也可以访问。

### 1. 安装
```javascript
sudo cnpm install workbox-webpack-plugin --save-dev
```
### 2. 在入口文件引入
```javascript
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').then(registration => {
        console.log('SW registered: ', registration);
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
    });
  }
```
### 3. 配置webpack插件
```javascript
const WorkboxPlugin = require('workbox-webpack-plugin');
plugins: [

        new WorkboxPlugin.GenerateSW({
          // 这些选项帮助快速启用 ServiceWorkers
          // 不允许遗留任何“旧的” ServiceWorkers
          clientsClaim: true,
          skipWaiting: true,
        }),
]
```
### 4. 重新打包
会自动在dist目录下生成service相关文件如图
![](https://upload-images.jianshu.io/upload_images/20892169-2bd8bf911730ed27.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### 5. 看效果
（1）由于service在dist目录下，所以需要在dist目录部署时才能使用。
（2）使用http-server在dist目录下可以模拟启动一个服务器。
![](https://upload-images.jianshu.io/upload_images/20892169-86b0852d67b1ab18.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
（3）在network这里调成ofline，可以模拟断网，刷新后，会发现页面还是会加载。
![](https://upload-images.jianshu.io/upload_images/20892169-fc5a5c47b69b013d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
由于兼容性差，所以现在的普及率不大。

## module chunk bundle的区别
Module：能被import的文件，都是模块，无论是js、图片或者别的。在webpack中一切都是模块。
Chunk：是多个模块组合而成的，如entry、splitChunk。
entry是入口文件，入口文件中import的模块可能不止一个，所以是多个模块组合而成。
splitChunk是提取公共代码，很多需要提取的代码被import，所以是多个模块组合而成的。
Bundle：最终的输出文件。
