---
title: 'bodymovin使用'
date: 2021-08-11 18:48:34
tags: '实用开源代码or工具'
categories:
  - 程序员的自我修养
---
  <meta name="referrer" content="no-referrer">

最近要做一个复杂嘅年度报告交互动画，年底惊喜夜又要做年度报告又要做，时间只有一晚黑。。
搵了好耐终于畀我搵到一個bodymovin同埋lottie-web可以用嘅。捻住記下先la~

## Bodymovin 简介
Bodymovin是一个开源的JavaScript库，它用于将After Effects动画转换为可在Web上播放的HTML5动画。它使用Adobe After Effects的动画数据，将其转换为可在Web浏览器中播放的JSON文件。

## 使用Bodymovin的步骤：

1. 在After Effects中创建动画，确保它们满足Bodymovin的要求：所有元素都必须使用2D变换，而不是3D变换，并且不能使用任何第三方插件。

2. 在After Effects中安装Bodymovin插件，它可以从Github上下载。

3. 将动画导出为JSON文件。

4. 将JSON文件上传到您的网站，并使用Bodymovin JavaScript库在网页上播放动画。

5. 在网页上定制动画，以获得最佳效果。

## AE端：
#### 1. 官网下载bodymovin后，安装并打开
[github地址](https://github.com/airbnb/lottie-web)
![](https://upload-images.jianshu.io/upload_images/20892169-ea3e73c5d9863146.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
提示：mac m1系统请通过ZXP Installer安装。

#### 2. 左侧选择要导出json的图层，右侧选择导出json的文件夹。完成后点击"render"即可。

![](https://upload-images.jianshu.io/upload_images/20892169-c4c0e960e23036a2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

提示：若遇到写入不成功的问题，请检查是否开启脚本写入文件。
位置：After-Effect - 首选项 - 脚本和表达式

![](https://upload-images.jianshu.io/upload_images/20892169-a4de95cf6641153c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 详细代码（js）
#### webpack(5)中，处理图片和json
```js

				test: /\.(png|jpeg|jpg)$/,
				type: "asset/resource",
				generator: {
					filename: "static/images/[name][ext]"
				},
				parser: {
					dataUrlCondition: {
						// 位将小于10kb的图片转为base64
						maxSize: 10 * 1024
					}
				}
			},
			{
				test: /\.json$/,
				type: "asset/resource",
				generator: {
					filename: "static/[name][ext]"
				}
			}
```
webpack4用file-loader同埋url-loader处理，代码不写了。
#### 入口文件，安装并引入bodymovin同埋json同埋图片
如果图片较多，可以像我一样处理，用webpack的require.context方法，一次性引入所有图片（es6的按需引入也行，看自己呗。）
> require.context是webpack提供的一个函数，它可以接受三个参数：一个要搜索的文件夹目录，一个是否搜索子目录的布尔值，一个匹配文件的正则表达式。它可以返回一个函数，这个函数可以接受一个参数，这个参数是要引入的文件的相对路径，然后它就会返回这个文件的模块。require.context可以帮助我们实现按需引入模块的功能，从而减少代码体积。

```js
npm i bodymovin
```
```js
import bodymovin from "bodymovin";
import "./data.json";
const context = require.context("./images", false, /\.(png|jpg|jpeg|gif)$/);

context.keys().forEach((key) => {
	const component = context(key);
}); // 一次性将某文件夹下的所有图片引入
console.log(bodymovin);
bodymovin.loadAnimation({
	container: document.querySelector(".lottie"), // the dom element that will contain the animation
	renderer: "svg",
	loop: true,
	autoplay: true,
	path: "./static/data.json" // the path to the animation json
});
bodymovin.play();

```
扩展：(svg矢量图形转换为<svg>标签)[https://www.npmjs.com/package/svg2html]
完成。！。！。！。！。！。！。！。！。！。！。！。！。！。