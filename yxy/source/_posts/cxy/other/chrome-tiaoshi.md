---
title: '【chrome调试】使用chrome调试已发布页面的文件代码'
date: 2022-03-12 15:01:49
tags: 开发效率
categories:
  - 程序员的自我修养
---
  <meta name="referrer" content="no-referrer">

让这个脚本跑了一晚上，并顺便水了一个视频，骗了两个硬币。
熬了一整夜剧都没掉下去

<iframe width="560" height="315"  src="//player.bilibili.com/player.html?aid=213624485&bvid=BV1aa411e74z&cid=585957393&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

已经编译上线的代码，在需要进行浏览器调试的时候，改文件会相当不方便，有时候只是改一些小条件也需要繁杂的操作，并且浏览器一刷新就又要重新改。<br>
为了解决这个问题，可以使用chrome的snippets调试已发布页面的文件，通过拦截network
1. 打开sources - Snippets

![](https://upload-images.jianshu.io/upload_images/20892169-7cc7e59cd2fd40fd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
2. 点击Select folder for overrides，选择一个文件夹，用于存储需要调试的在线文件。

![](https://upload-images.jianshu.io/upload_images/20892169-cdc56f8712588f6e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
3. 上方点击“允许”，可以看见文件夹就显示在Overrides里了。

![](https://upload-images.jianshu.io/upload_images/20892169-ebee6b64b9f35234.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/20892169-1938b54b69b97a56.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
4. 比如在google首页，打开network，随便选择一张图，右键 - Save for Overrides
![](https://upload-images.jianshu.io/upload_images/20892169-8597f38e5290e5e5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
5. 回到source，就可以在你的文件夹中看见这张图了
![](https://upload-images.jianshu.io/upload_images/20892169-e3db37ed9076c760.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
6. 现在可以把它替换成其他logo，比如百度
![](https://upload-images.jianshu.io/upload_images/20892169-61c3ca9abfdf8142.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
7. 也可以去调试代码，搞些有意思的小事情~
比如很久之前有段时间很流行的b站风叶穿行游戏，我是用这种方法改脚本自动跑的成绩
![](https://upload-images.jianshu.io/upload_images/20892169-314dc6b621ccf4a8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/20892169-d1281e2091743458.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


使用chrome的Snippets比较省事的是，即使刷新很多次，只要勾选了Enable Local Overrides就会一直生效，有时候本地未经过编译的代码怎么测试都没有问题，但放到线上就是有奇奇怪怪的问题，如果能调试压缩后的代码也会比较直观~我是一直很喜欢这个方法拉。