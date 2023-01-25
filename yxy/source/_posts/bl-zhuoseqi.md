---
title: '【blender】着色器基础'
date: 2022-11-11 15:21:08
tags: blender
categories:
  - 建模
---
  <meta name="referrer" content="no-referrer">

着色器部分国内文档太少，这段时间翻了很久的国外文档，请教了几位油管及discord大神，自己也做了不少东西后做出的总结。

## 不同颜色节点的含义
首先，着色器节点固定从左向右流动。
**绿色节点**：着色器本身
如各类bsdf
![](https://upload-images.jianshu.io/upload_images/20892169-55547ef4d8900f65.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
**黄色节点**：颜色信息
如：基础色、次表面色
![](https://upload-images.jianshu.io/upload_images/20892169-a959ff512e84e321.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
表面并不是一定只能连接一个颜色。
新建一个平面，切换到shading，新建一个材质槽。
shift a新建一个图像纹理，添加一张图片，连接到bsdf的基础色，就可以将这张彩色图片的颜色信息显示在平面上。
（其实可以直接拖进去，但不知道为什么自从我更新了3.3我就再也拖不进去了。）
![](https://upload-images.jianshu.io/upload_images/20892169-ae4e6923eb4128c9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
**灰色节点**：值，bsdf的很多设置都是值
![](https://upload-images.jianshu.io/upload_images/20892169-da43946283048655.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
着色器上的值与颜色一样，很多时候表面是不想用同一个值来设置所有位置的。如糙度，很多情况下表面的材质并不是同一糙度，所以这时候需要一张描述表面糙度的图，通过0（黑色）至1（白色）之间的值，使用黑白或灰度着色，将值映射到不同的表面位置。<br>
即：pbr贴图中的粗糙度文件。<brr>
如以下这张就是一张粗糙度描述图片，它黑色的地方表示完全不粗糙（0）白色的地方表示粗糙度满点（1），其余灰色的地方，灰色越深，越接近于零，也就越不粗糙。

![Roughness](https://upload-images.jianshu.io/upload_images/20892169-62f089488a9fb5f0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

如图，将上面的粗糙度文件连接至糙度后，可以看到表面有不同程度的粗糙纹理。
![](https://upload-images.jianshu.io/upload_images/20892169-17bbec7cf22db9d8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
**紫色节点**：矢量信息。
![矢量运算](https://upload-images.jianshu.io/upload_images/20892169-95f7aa80396b1d9c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![着色器上的矢量](https://upload-images.jianshu.io/upload_images/20892169-e3542d92e4fd350c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**蓝色节点**：表示属性，多和几何节点结合使用，不属于这里的讨论范围。

当然，不同颜色节点之间可以互相转换，只是会丢失读取不出来的信息。将粗糙度图片连接到黄色节点，如基础色，由于粗糙度图片只有黑白灰的值，基础色无法读出其他颜色信息，所以无法显示彩色。
![image.png](https://upload-images.jianshu.io/upload_images/20892169-809f78a87ee2f46a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
次表面：光穿透过表面后，在其下方散射发生的情况。最常见的就是人体皮肤。
![当光足够强烈，在皮肤下的散射特别是明暗交界线附近，就会看的很清楚，一般会使得皮肤接近明暗交界线的部位饱和度急剧升高](https://upload-images.jianshu.io/upload_images/20892169-2612a7b2abcbd6a6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

透射&&投射粗糙度
透射：决定多少光可以通过材料，而不是从材料反射光。
透射值越大，透过材料的光越多。
透射粗糙度：透射光的粗糙度，只有cycles下可以使用，且分布为GGX。
说简单点儿，透射粗糙度的高低差别就是镜面玻璃和磨砂玻璃的区别。
![上平面透射值为1，光源为绿色，光从上平面向下打，上平面无法受到光源影响，所有光都通过它照射到了下平面，所以下平面为绿色](https://upload-images.jianshu.io/upload_images/20892169-9bb123e5c346f036.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![上平面透射值为0，点光无法通过上平面，所以直接打在上平面，下平面几乎不受影响](https://upload-images.jianshu.io/upload_images/20892169-471b4b79fccdc892.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


自发光（发射）：从材料实际发出的光，拥有自己的颜色和强度。
![在一个大立方体的里面放入一个自发光的小立方体，小立方体会形成一个光源照亮大立方体内部。相当于一个点光](https://upload-images.jianshu.io/upload_images/20892169-2b7a607ce22fff7c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
alpha：材料透明度。


以上这些值都是可以通过为不同位置传入不同的值来做不同的设置，就如同上述说的粗糙度设置。
![如，我对下平面的alpha值传入了一个马氏分形纹理，表面就会因为传入的不同值而显示不同的alpha状态](https://upload-images.jianshu.io/upload_images/20892169-b2b3c8574cb99660.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

法向：用于法线贴图，在不用更改网格几何形状的情况下，伪造材质的深度与阴影。
![法线贴图一般是这样的一张图片，它描述了物体表面的深度和阴影，命名方式为xx_normal](https://upload-images.jianshu.io/upload_images/20892169-c53af5159f384551.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![将法线贴图连接至法向的效果](https://upload-images.jianshu.io/upload_images/20892169-1403c256cded68af.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##着色器节点
![image.png](https://upload-images.jianshu.io/upload_images/20892169-ccb11092d3ec3de8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

不多叙述，分为表面着色器和体积着色器两类。原理化bsdf着色器理论是可以做出所有表面着色器的效果。但使用其他的表面着色器可以更快捷的实现想实现的效果。比如玻璃、透明、半透、毛发等。
以玻璃bsdf举例
![image.png](https://upload-images.jianshu.io/upload_images/20892169-93709468fce74934.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

折射率：当bsdf为玻璃或半透明时，物体内部可以进行折射，折射的情况就由ior设置。
水、不同厚度的玻璃、塑料瓶都有不同的折射率。
![折射率可以使不同的材料以不同的角度反射光线](https://upload-images.jianshu.io/upload_images/20892169-3864e432698c1072.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
粗糙度：物体表面粗糙度越高，越不容易进行折射。
而这两个参数都是可以在原理化bsdf中进行设置，所以理论上来说原理化bsdf可以实现玻璃的效果，但使用玻璃bdsf来制作单纯的玻璃会更加的便捷。

体积着色器可以连接至体积输出，有原理化体积、体积散射、体积吸收。原理化体积理论上是可以实现体积散射和体积吸收，且可以综合二者进行设置，但直接使用体积散射和体积吸收可以更快捷的实现对应的效果。
体积吸收：表示光线穿过物体时，体积会吸收光线 
体积散射：更接近于雾的效果，通过体积散射，光会撞击物体体积并进行反弹。
![体积着色器](https://upload-images.jianshu.io/upload_images/20892169-e8e0776cd2dc8504.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

体积着色器经常用于实现一些场景的烟雾、或者表现场景的空气透视感时会很常用。
如下面这张我建立了两个立方体，对外层大一些的立方体使用了体积散射，在两边设置了两个不同颜色的光源，就会有这种透光的烟雾效果。
![体积散射](https://upload-images.jianshu.io/upload_images/20892169-d95939e3e4824ef1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
我做的这张小场景的练习，为了表现出远处的空气透视感，也在中间加了一个体积散射的平面。

![小场景练习](https://upload-images.jianshu.io/upload_images/20892169-548933ed2ac3c376.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
体积bsdf的实际运用也可以和噪波纹理相结合，生成不同形状的烟雾，也可以用噪波纹理增加噪点等效果。
![体积bsdf与噪波纹理](https://upload-images.jianshu.io/upload_images/20892169-ec549747af20846f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



混合bsdf：
现在我将两个原理化bsdf使用混合bsdf连接，混合bsdf拥有上下两个叫混合器的插槽和一个系数插槽。
我将红色bsdf放在下面的混合器插槽，蓝色bsdf放在上面的混合器插槽，若系数为0.5，即上下着色器等比混合，正常情况下物体表面应该为紫色。如下图
![image.png](https://upload-images.jianshu.io/upload_images/20892169-17f68892c17355a6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
系数越大，混合结果越偏向于下面的着色器。

若混合bsdf系数给一个灰度描述，如马氏分形纹理，那么表面就会因为不同的系数而做不同的着色器显示。将顶部着色器放在有黑色的地方（0），将底部着色器放在有白色的地方（1）。而灰色的地方进行两个着色器颜色的混合
![](https://upload-images.jianshu.io/upload_images/20892169-68df64794580e9a7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##纹理节点
blender自带的一些材质节点，可以根据不同材质节点生成不同的灰度纹理。
![](https://upload-images.jianshu.io/upload_images/20892169-fa610fcd97b30068.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

以马氏分形纹理做简单说明
![](https://upload-images.jianshu.io/upload_images/20892169-871e8f5e1947127d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
简单说一下3d和4d的区别，4d比3d多了一个w值，w可以使纹理随时间推移改变w，一般用于设置动画。（按i可以设置关键帧，或在节点上右键 - 插入关键帧）
![](https://upload-images.jianshu.io/upload_images/20892169-f0faa4bab4329411.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
如果将纹理直接连接着色器的基础色，那么就是灰度显示，因为材质节点本质就是生成不同位置的灰度信息。
如果想让其显示彩色，可以连接一个colorRamp，也就是渐变
![](https://upload-images.jianshu.io/upload_images/20892169-1b72dcd4616f4492.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

沃罗诺伊纹理是一种很常用的纹理，可以生成漂亮的图案及形状。
就我个人而言，连接颜色时感觉很像一堆马赛克做了变换的纹理
![随机性为1](https://upload-images.jianshu.io/upload_images/20892169-5411d1c934309471.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![随机性为0](https://upload-images.jianshu.io/upload_images/20892169-0536071be645690b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

其他像砖墙纹理、棋盘格纹理就不再多说，纹理与纹理可以相互连接，组合生成不同的有意思的图案，需要多加尝试。
除了纹理与纹理之间相互连接外，还有另一种方法，使用mixRgb（混合rgb）
混合rgb与混合着色器的使用方法相当像，区别是混合rgb用于颜色输出，而混合着色器用于着色器输出。混合rgb可以控制灰度的信息，所以当两个纹理连接到混合rgb时，可以通过混合rgb去控制两个纹理的强弱。
混合方式可以点击自己调节，不详细介绍了，如果用过ps应该是熟悉的。
![将马氏分形纹理与砖墙纹理进行混合，调节系数。系数为0时显示上面的马氏分形纹理，系数为1时显示下面的砖墙纹理，中间则相互混合。](https://upload-images.jianshu.io/upload_images/20892169-33ae49ebcac2a1c5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

还有一些不太常用于着色器表面信息的纹理节点，比如ies纹理（用于描述灯光）环境纹理（用于描述环境）等，之后我会再整理。

##如何将纹理映射到对象上？
与几个节点息息相关。
1. 纹理坐标节点：用不同方式告诉纹理如何在blender中进行映射，不同的用途可以有不同的输出。
常用的两个是物体和生成，生成是默认的形状，物体适合生成程序化的纹理。
![纹理坐标](https://upload-images.jianshu.io/upload_images/20892169-c7fb176496920cf1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
2. 映射节点，可以调节纹理的位置、旋转和缩放
![映射](https://upload-images.jianshu.io/upload_images/20892169-26bf0f7bd472cb77.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
3. 运算节点，可以使两个值做对应运算
![image.png](https://upload-images.jianshu.io/upload_images/20892169-0a16f38b102d6122.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![很常见的连接方式，可以通过上述几个节点去操作纹理的映射方法。](https://upload-images.jianshu.io/upload_images/20892169-66bd294b4b41dd4a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
