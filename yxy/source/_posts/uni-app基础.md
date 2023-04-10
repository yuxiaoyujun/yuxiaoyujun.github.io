---
title: uni-app基础
date: 2023-04-09 16:09:55
tags: uni-app
categories: 程序员的自我修养
---

## 一、uni-app重点总结

### 1. uniapp 规范

+ 页面遵循vue语法，模板块、脚本块和样式块。
+ 页面遵循vue单文件组件规范（SFC）
+ 页面标签遵循小程序语法规范
+ 接口接近小程序规范
+ 数据绑定及事件处理遵循vue规范
+ 为兼容多端运行，遵循flex布局。

### 2. uniapp 特色

+ **条件编译**

```c
#ifdef APP-PLUS
	// 需要条件编译的代码
	// 此段表示：仅出现在APP平台下的代码
#endif
```

```c
#ifndef H5
 	// 需要条件编译的代码
	// 此段表示：除了h5平台，其他平台均存在的代码
#endif
```

```c
#ifndef H5 || MP-WEIXIN
 	// 需要条件编译的代码
	// 此段表示：在h5平台或微信小程序平台存在的代码
#endif
```

+ App端的Nvue开发

Nvue是native-vue的简写。是在uniapp中以.nvue结尾的文件，它为app提供了原生的渲染能力。

Nvue内置了weex的渲染引擎，所以在.nvue文件中，既可以使用weex内置的方法，也可以使用uni-app的内置方法。

<span style = "color: #00ffff">**只能在NATIVE端使用。**</span>

+ HTML5+ 

HTML5+引擎为应用提供了原生的安卓端和ios端的方法。有一些复杂功能在html5无法做到时，可以使用html5+引擎。

<span style = "color: #00ffff">**只能在NATIVE端使用**</span>



## 二、创建uniapp项目

### 1.  通过hbuilder创建

安装好hbuilder后，![image-20230409164610512](../images/image-20230409164610512.png)

![](../images/image-20230409164532726.png)

运行：

![image-20230409164759496](../images/image-20230409164759496.png)

![](../images/image-20230409165247195.png)

### 2.  通过vue命令行创建

### 环境安装

全局安装vue-cli

```javascript
npm install -g @vue/cli
```

### 创建uni-app

使用正式版（对应HBuilderX最新正式版）

```javascript
vue create -p dcloudio/uni-preset-vue my-project
```

使用alpha版（对应HBuilderX最新alpha版）

```javascript
vue create -p dcloudio/uni-preset-vue#alpha my-alpha-project
```



## 三、语法

### 1. 模板语法

和vue一样

```vue
<template>
	<view class="content" :class="className" @click="consoleTitle">
		{{title}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'uniapp',
				className: 'title'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.title {
		color: #00ff00;
	}
</style>

```



### 2. 数据绑定

在小程序中使用

```js
this.setData({
	title: 'title'
})
```

在uni-app中

```js
this.title = 'title'
```

其实就和vue是一样的。

### 3. 条件判断

```vue
	<view v-if="title==='uniapp'" class="content" :class="className" @click="consoleTitle">
		{{title}}
	</view>
```

注：v-show在uni-app非h5页面中会有坑。尽量不要把v-show放在组件上，在组件外层套一层view。

### 4. 列表渲染

```vue
	<view v-for = "(list,index) in lists">
		{{list.name}}
	</view>
```

### 5. 内置组件

`view`相当于`div`

`text`相当于`span`

`scroll-view`

`swiper`和`swiper-item`

`match-media`

`movable-area`和`movable-view`：即手指/鼠标按住`movable-view`拖动或双指缩放，但拖不出`movable-area`规定的范围。

`movable-view`必须在`movable-area`组件中，并且必须是直接子节点，否则不能移动。

`cover-view`和 `cover-image` : `cover-view`相当于

```position: fixed; ```

但在其中可以写自己的布局。

`cover-image`和`cover-view`用法相同，区别在于`cover-image`只可以放图片，它可以嵌套在`cover-view`中

```vue
<template>
	<view class="page">
		<video class="video" id="demoVideo" :controls="false" :enable-progress-gesture="false" :show-center-play-btn="true" src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126-lite.m4v">
			<cover-view class="controls-title">简单的自定义 controls</cover-view>
			<cover-image class="controls-play img" @click="play" src="/static/play.png"></cover-image>
			<cover-image class="controls-pause img" @click="pause" src="/static/pause.png"></cover-image>
		</video>
	</view>
</template>
```

`button`

`input`



### 6. 自定义组件的使用

### 7. 基础 api 用法

### 8. 条件编译

### 9. 页面布局



