---
title: 'blender各种光源的设置'
date: 2022-07-25 06:21:49
tags: blender
categories:
  - 建模
---
  <meta name="referrer" content="no-referrer">

## 场景 - 世界自带光源与hdri光源。
首先，场景 - 世界中的自带光源，与hdri光源是互斥的，二者只能有一个生效。
当勾选 **视图着色方式 - 场景世界** 时，
将强度/力度调为0，且没有建立其他光源的话，则世界场景完全无光源。
将强度/力度调高世界场景也会亮。
所以一般如果不需要这个的话，在渲染前需要调为0。

![](https://upload-images.jianshu.io/upload_images/20892169-ceb5ff9a35885d1f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

场景世界若不勾选，可以显示hdri，世界不透明度改为0的时候就可以只显示物体上的hdri效果。
hdri图有360度的场景。相当于一个懒人全景打光，将场景中物体放入了已经定义好的一个360度的环境中。

![image.png](https://upload-images.jianshu.io/upload_images/20892169-0ab9c7cbe36dac5c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 各种光源的详细介绍
### 1. 点光源
颜色：调整颜色 
能量：调整瓦数
半径：半径越大，向周围发送的光就越散
点光源离物体越近，物体越亮。点光光源半径越大，阴影越散。

![点光大半径，离物体近的情况](https://upload-images.jianshu.io/upload_images/20892169-1883e0e4b9a0516f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![点光大半径，离物体远的情况](https://upload-images.jianshu.io/upload_images/20892169-f92db444578b98d7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![点光小半径，离物体远的情况](https://upload-images.jianshu.io/upload_images/20892169-5c829fdeaf3f5eff.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![点光小半径，离物体近的情况](https://upload-images.jianshu.io/upload_images/20892169-cea42044907a4d0a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

***注：当沿点光源像物体两边作切线，离物体越近的光源切线范围越大。所以点光光源离物体越远时，阴影反而越硬朗，*** 
### 2. 日光
日光本身建立在什么位置都无所谓，完全无所谓。
日光的位置不会影响影子的角度、影子的强度。
比如下图，日光在物体正上方，影子依旧向右。就算日光放到物体底下，影子依旧不会受日光的位置影响。

![日光在物体上方](https://upload-images.jianshu.io/upload_images/20892169-065000ffee1dea5c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![日光在物体下方](https://upload-images.jianshu.io/upload_images/20892169-c55a738eee448087.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

影响日光角度的只有这个调节手杆儿
![](https://upload-images.jianshu.io/upload_images/20892169-0a15053b4b5c67d5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

手杆儿角度越大，阴影越长

**角度和强度：**
![](https://upload-images.jianshu.io/upload_images/20892169-becf125bf0a67c14.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

太阳光强度一般1-3就很亮了。
角度0-180度，和手柄调节的角度不是一个概念。试下来感觉角度越大阴影越散越亮。
可以观察下面两张图的角度值，同时观察墙面的投影区别。

![角度值27.3](https://upload-images.jianshu.io/upload_images/20892169-68c38402253f5024.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![角度值86.3](https://upload-images.jianshu.io/upload_images/20892169-47d88031dd17338f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 3. 聚光灯
对物体的照射方式基本像点光，但它的角度可以调节，且只朝向一部分角度。就像是360度的点光截了几十度
（1）光源半径
光源半径越大，光越散，投影边缘越柔和，越暗。。
![小半径聚光](https://upload-images.jianshu.io/upload_images/20892169-b15015d5527db51c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![大半径聚光](https://upload-images.jianshu.io/upload_images/20892169-77174ca1cbf8e402.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
（2）光斑尺寸
越大的光斑尺寸，越大的光斑范围。
光斑尺寸不影响边缘模糊与否。
![光源半径相同，光斑尺寸大](https://upload-images.jianshu.io/upload_images/20892169-c8f638d083db6ed9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![光源半径相同，光斑尺寸小](https://upload-images.jianshu.io/upload_images/20892169-45f8a75fb8b469fb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

混合，数值 0 - 1，聚光灯下两个圆环
数值越接近1 ， 聚光灯底部在中间的小圆的半径越小，光的边缘越模糊，不怎么影响投影的边缘。

![image.png](https://upload-images.jianshu.io/upload_images/20892169-a73dc81be72f23d3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

###4. 面光
不具体说了，像一个有方向可调节大小和尺寸的太阳光。

## hdri
切换到world，点击颜色前面的点，点击图像纹理。
![image.png](https://upload-images.jianshu.io/upload_images/20892169-a55f01ae86ac33ec.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

勾选hdri后，就在左图设置hdri相关。
右边的设置基本就没什么用了。
![image.png](https://upload-images.jianshu.io/upload_images/20892169-04268ab2dfd15604.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

渲染时如果不想有hdri背景，勾上透明就不会渲染hdri了。
![渲染属性 - 胶片 - 透明](https://upload-images.jianshu.io/upload_images/20892169-c210344224557ede.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 用物体自发光来打光。
自发光的物体相当于一个点光源
在场景内新建一个球，为球指定自发光颜色及强度
![](https://upload-images.jianshu.io/upload_images/20892169-cebc7569cfebb0d8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
切换到渲染模式，就会发现球成为了一个光源照亮了周围的物体。

![](https://upload-images.jianshu.io/upload_images/20892169-4ab53e17b2e8d6f3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
####补充：在cycles模式下如何设置辉光？
现在只能在渲染层设置，没办法预览，所以需要渲染后才能看到效果。

![需要渲染后方能生效](https://upload-images.jianshu.io/upload_images/20892169-e2fed694ee367646.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 四、使用ies 纹理进行打光
ies纹理概念：ies纹理用于匹配基于IES文件(IES)的现实世界的灯光。IES文件存储光源的方向强度分布。
***常用的ies纹理免费下载网站：[点击下载](https://ieslibrary.com/en/home)***
![网站每一个ies纹理下方都有对该ies的描述，该参数用于将ies引入纹理中之后，灯光的瓦数及类型设置](https://upload-images.jianshu.io/upload_images/20892169-241501fa8a26d909.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

***下载的ies贴图对应的能量和建议的灯光类型。***

![](https://upload-images.jianshu.io/upload_images/20892169-24f53213f85355cc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/20892169-616e3dbbc9afe1e2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

举例：
第一张没有ies纹理。第二张有纹理。
![](https://upload-images.jianshu.io/upload_images/20892169-c0a90c28ffd9bd8e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
可以看到普通点光是均匀过度的。而用了有ies纹理的灯光是有可能不均匀的。接近现实世界的光。
<br>
着色器中有一个叫黑体节点，黑体值越大，越接近原本设置的颜色，越小，颜色越暖。

![](https://upload-images.jianshu.io/upload_images/20892169-b84cafd1629ebdc2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

黑体温度为1111111和为1的对比。

![](https://upload-images.jianshu.io/upload_images/20892169-b20b1ee246850e78.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)