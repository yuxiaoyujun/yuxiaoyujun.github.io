---
title: '【blender+scatter5插件】两分钟做好一个漂亮的地形'
date: 2022-08-01 06:21:49
tags: blender
categories:
  - 建模
---
  <meta name="referrer" content="no-referrer">

想录个随风摇摆的动画视频，结果粒子系统卡死我

因为这个插件本质是生成一堆粒子系统，所以要对自己的配置有自信。
所需blender版本: 3.1及以上

##1. 安装Landscape插件
![landscape插件](https://upload-images.jianshu.io/upload_images/20892169-d54e01f4fd73f9ae.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##2. 新建地形，在网格 - Landscape中。
![image.png](https://upload-images.jianshu.io/upload_images/20892169-a4d3fe7b08cdf0ee.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
##3. 点击后，左侧下方有一个下拉菜单，点开后可以进行地形的详细设置
![image.png](https://upload-images.jianshu.io/upload_images/20892169-30f9d160f8d8f735.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
##4. 物体 - 应用 - 全部变换
![image.png](https://upload-images.jianshu.io/upload_images/20892169-9834e7d52506d164.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
或command + a 调出应用面板，也可以选择应用变换              。
##5. 下载安装 Scatter5 插件并启用
下载地址：[点击查看](https://blender.kim/61665.html)
下载后解压，通过插件引入，点击安装，导入解压后文件夹内的压缩包scatter5.2.zip，点击确定。
![image.png](https://upload-images.jianshu.io/upload_images/20892169-4682af74b62c950a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
点击展开，然后进入enter manager
![image.png](https://upload-images.jianshu.io/upload_images/20892169-ba99e51ab4dd47de.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
点击install a scatter package
![image.png](https://upload-images.jianshu.io/upload_images/20892169-f77f08855e689ca9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
选择解压文件夹中的另外三个文件，，点击install即可。
![image.png](https://upload-images.jianshu.io/upload_images/20892169-2a062090bf4fb309.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
##6.右侧n面板中，选择该插件，点击吸管，选择创建好的地形。
![image.png](https://upload-images.jianshu.io/upload_images/20892169-d77ab5a22d87c6e5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
点击后面板变为以下模样子。
![image.png](https://upload-images.jianshu.io/upload_images/20892169-6b3069452b0db092.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
然后点击图片，选择想要的预设。
![image.png](https://upload-images.jianshu.io/upload_images/20892169-19a83961ccd80e99.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
点击Biome Scatter，点击Open Biomes
![image.png](https://upload-images.jianshu.io/upload_images/20892169-2941c85ba4676d86.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
选择喜欢的地形。
![image.png](https://upload-images.jianshu.io/upload_images/20892169-a9a9ab0e69aca8d9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
加载完成后，会有很多粒子系统被自动导入，默认不开启。
点击每一个System List中的粒子系统，在下方wind中，开启Wind Waves
![image.png](https://upload-images.jianshu.io/upload_images/20892169-f442b70d52ae6d99.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](https://upload-images.jianshu.io/upload_images/20892169-197be147cc6f4349.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
<hr>

加载一个天空纹理
![image.png](https://upload-images.jianshu.io/upload_images/20892169-fe56efba4b70c86d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
点击渲染模式并播放即可。


###说明：
&ensp; &ensp; **1. 操作项预设**
&ensp; &ensp; &ensp; &ensp; 可以设置一些预设的地形，比如石头、湖泊、山等。

&ensp; &ensp; **2.SubdivisionsX / Y**
&ensp; &ensp;![](http://upload-images.jianshu.io/upload_images/20892169-67a9a938663d7fdd.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1080/q/50)

 &ensp; &ensp; 细分，细分自然是越高细节越多。但渲染也越慢。

&ensp; &ensp; **3. mesh SizeX / Y**
&ensp; &ensp; &ensp; &ensp; 设置平面的尺寸。

**其他的设置也有很多，可以多尝试**

##其他积累：
&ensp; &ensp; 1. scale 平面，之前只知道是按s，但不知道按下数字键可以直接按比例缩放，比如按s，向外拖，再按2，就是放大两倍。按s，向内拖，再按下2，就是缩小两倍了。