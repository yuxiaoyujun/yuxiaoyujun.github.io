---
title: '微信小程序相关'
date: 2019-07-21 19:39:12
tags: 微信小程序
categories:
  - 程序员的自我修养
---
  <meta name="referrer" content="no-referrer">

## 初始化项目文件
![image.png](https://upload-images.jianshu.io/upload_images/20892169-236fc1b747f54b96.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### 根目录：
`app.json`：项目配置文件，可以配置页面
包括：page、tabbar、window、plugin等等
app.js：每个页面都会去处理的方法。比如判断当前版本是否最新，还有是否有登录信息等等。
`app.wxss`：全局的样式文件
`project.config.json`：项目配置文件。可以设置一些编辑器的样式，设置一些js编译为es5是否禁用严格模式、上传时是否压缩、分包分不分等，是开发时的设置，在小程序侧边可以直接打钩设置。
`project.private.config.json`：
很多时候我们需要进行开发调试，利用微信开发者工具的预览功能在真机上查看实现效果。为了方便调试，我们会设置编译模式。但是编译模式的改动会写入 project.config.json 文件的 condition 字段中，而项目只有一份 project.config.json 文件。所以在团队协作的时候，每个人都在往里加入自己的编译模式，这给团队造成了一点麻烦。解决方案如下：

1. 在 .gitignore 文件中添加 project.config.json、project.private.config.json
2. 为项目引入 project.config.json.example 文件作为项目配置文件统一模板
3. 团队成员使用 project.private.config.json 作为个人配置（此配置文件会优先使用）

`sitemap.json`：是否允许微信索引（爬虫相关）
pages文件夹：存储页面。
##wxss wxml js
skyline WXSS和webview：skyline的性能更好些，不支持css animation
###wxss的常用组件
####视图容器
swiper
swiper-item

<hr>

moveable-area
moveable-view

<hr>

scroll-view
match-media
root-portal（position: fixed）
view
block
#### 基础内容
grid-view
list-view
icon
progress
rich-text
text
#### 表单组件
button
checkbox
checkbox-group
form
input
slide
picker
picker-view
radio
radio-group
switch
textarea
image
map
## 小程序框架
### 小程序生命周期
[点击查看文档](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onHide)
`onLaunch`：全局app.js中的，他的触发比`page`中的`onLoad`要高
`onLoad`：页面加载时触发。一个页面只会调用一次，可以在 onLoad 的参数中获取打开当前页面路径中的参数。
`onShow`：页面显示/切入前台时触发。
`onReady`：页面初次渲染完成时触发。一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。
`onHide`：页面隐藏/切入后台时触发。如 [wx.navigateTo](https://developers.weixin.qq.com/miniprogram/dev/  api/route/wx.navigateTo.html) 或底部 `tab` 切换到其他页面，小程序切入后台等。[](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onUnload)
`onUnload`：页面卸载时触发。如[wx.redirectTo](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.redirectTo.html)或[wx.navigateBack](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateBack.html)到其他页面时。

## [](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#%E9%A1%B5%E9%9D%A2%E4%BA%8B%E4%BB%B6%E5%A4%84%E7%90%86%E5%87%BD%E6%95%B0)

### 其他page内的事件
onPullDownRefresh
onReachBottom
onShareAppMessage
onPageScroll
##事件
用bind或catch绑定（catch阻止向上冒泡）
capture-bind（捕获）
bindtap
bind:touchstart
bind: longpress
还有一些单独组件的事件可以看看文档，比如swiper的
bindtransition
bindanimationfinish
等等等吖吖吖
##常用api整理
this.setData
wx.request
```javascript
wx.request({
      url: _this.data.host + '/mobile/singleFeed?feedId=' + feedId,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        orderPrice: _this.data.totalFee
      },
      success: function (res) {
        console.log(res);
        _this.setData({
          feedInfo: res.data.data
        })
      }
    })
```
wx.navigateTo：保留当前页面，跳转到应用内的某个页面。使用 [wx.navigateBack](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateBack.html) 可以返回到原页面。小程序中页面栈最多十层。

```javascript
wx.navigateTo({
  url: 'test?id=1',
  events: {
    // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
    acceptDataFromOpenedPage: function(data) {
      console.log(data)
    },
    someEvent: function(data) {
      console.log(data)
    }
    ...
  },
  success: function(res) {
    // 通过 eventChannel 向被打开页面传送数据
    res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
  }
})
```
wx.redirectTo：重定向。使用 [wx.navigateBack](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateBack.html) 不可以返回到原页面
```javascript
wx.redirectTo({
  url: 'test?id=1'
})
```
wx.createVideoContext('xxx');
xxx是video标签的id
```javascript
    <video 
        id='feedVideo'
        src='{{feedInfo.feedVod.videoUrl}}' poster='{{feedInfo.feedVod.coverUrl}}'
    ></video>
```
```javascript
    const VideoContext = wx.createVideoContext('feedVideo');
    VideoContext.play(); // 播放
    VideoContext.pause(); // 暂停
```
wx.showToast
```javascript
wx.showToast({
      title: '视频播放异常，请稍后重试',
      icon: 'none',
      duration: 2000
    })
```
wx.getStorage
wx.setStorage
wx.clearStorage()
```javascript
    wx.getStorage({   //获取提示分享气泡是否显示过
      key: 'showShareTip',
      success(res) {
        console.log('success');
        console.log(res);
        _this.setData({
          showShareTip: res.data
        })
      }
    })
```
wx.showShareMenu
```javascript
wx.showShareMenu({
      withShareTicket: true
    })
```
wx.canIUse
```javascript
upDataApp: function () {//版本更新
    if (wx.canIUse('getUpdateManager')) {//判断当前微信版本是否支持版本更新
      const updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) { // 请求完新版本信息的回调
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          });
          updateManager.onUpdateFailed(function () {
            wx.showModal({// 新的版本下载失败
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
            })
          })
        }
      })
    } else {
      wx.showModal({// 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
```
wx.hideNavigationBarLoading() //在当前页面隐藏导航条加载动画
wx.stopPullDownRefresh() //停止下拉刷新

<hr>

## 面试题
### 1、简单描述下微信小程序的相关文件类型?
### 2、小程序的双向绑定和vue哪里不一样?
### 3、小程序页面间有哪些传递数据的方法?
#### 使用全局变量实现数据传递
app.js中定义globalData，然后在单独的文件中使用
```javascript
const app = getApp()
app.globalData.xxx
```
#### 使用navigateTo
navigateTo的url后面跟?参数也可以实现数据传递，在新页面onLoad方法中使用
```javascript
wx.navigateTo({
  url: 'aaaa?name=xxx'
})
```
在新页面中
```javascript
onLoad(option) {
  console.log(option) // {name:xxx}
}
```
### wxs
定义公共工具类，比如叫utils，可以使用import引入
```javascript
import base64 from '../../utils/base64';
```
wxs也可以导出模块
```javascript
<wxs module="utils">
var judgeHttp = function(str){
  return str.indexOf('http')
}
module.exports = {
  judgeHttp: judgeHttp
}
</wxs>
```
#### 使用getStorage
本地缓存的清理时机跟代码包一样，只有在代码包被清理的时候本地缓存才会被清理。
### 4、小程序的生命周期

### 5、如何下拉刷新
在`app.json`中，或者在对应的json中设置
```
enablePullDownRefresh: true
```
在钩子函数`onPullDownRefresh`中，监听下拉刷新，调用setData去更新数据，设置flag，让更新不会多次给重复触发中。
请求成功后，调用wx.stopPullDownRefresh去停止下拉刷新。
### 6、bindtap和catchtap
停止冒泡
### 7、wx.navigateTo(), wx.redirectTo(), wx.switchTab(), wx.navigateBack(), wx.reLaunch()的区别?
wx.navigateTo()：保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面
wx.redirectTo()：关闭当前页面，跳转到新的页面（类似重定向）。但是不允许跳转到 tabbar 页面
wx.switchTab()：跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
wx.navigateBack():关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages() 获取当前的页面栈，决定需要返回几层
wx.reLaunch()：关闭所有页面，打开到应用内的某个页面
###8、登录的流程
点击查看：[登录流程描述](https://cloud.tencent.com/developer/article/1797514
)
### 9、app.json  全局配置文件描述
pages  :  用于存放当前小程序的所有页面路径
window : 小程序所有页面的顶部背景颜色，文字颜色配置。
tabBar  :  小程序底部的Tab ,最多5个，最少2个。
### 10、小程序运行机制
热启动 ：假如用户已经打开了某个小程序，在一定时间内再次打开小程序的话，这个时候我们就不再需要重新启动了，这需要把我们的后台打开的小程序切换到前台来使用。
冷启动：用户首次打开小程序或被微信主动销毁再次打开的情况，此时小程序需要重新加载启动。
### 11、小程序什么时候会主动销毁？
小程序在进入后台之后，客户端会帮我们在一定时间内维持我们的一个状态，超过五分钟后，会被微信主动销毁.

官方也没有明确说明 什么时候销毁， 在不同机型表现也不一样，

2019年开发时：时间官方文档没有说明，但是经过询问一般指5分钟内

2020年开发时：时间官方文档没有说明，实测安卓没有固定时间，内存足够情况下，有时候一天了还在，有时候几分钟就没了。
### 12、小程序怎么跟随事件传值
在  页面标签上通过 绑定 dataset-key = value ， 然后绑定点击通过e.currentTarget.dataset.key   来获取标签上绑定的值。 

### 13、小程序支付
小程序有一个统一下单的api接口。
[点击查看：微信支付](https://pay.weixin.qq.com/wiki/doc/apiv3/open/pay/chapter2_8_0.shtml)
[点击查看：云支付](https://developers.weixin.qq.com/miniprogram/dev/wxcloudrun/src/development/pay/order/)
1.  小程序或公众号调用微信云托管，在微信云托管中调用统一下单接口，参数中带上接收异步支付结果的服务名称和其所在云环境ID
2.  统一下单接口返回的成功结果对象中有 payment 字段，该字段即是小程序端发起支付的接口（wx.requestPayment）所需的所有信息
3.  小程序端拿到后端结果，调用 wx. requestPayment 发起支付
4.  支付完成后，在统一下单接口中配置的云托管服务将收到支付结果通知，具体详见[结果回调](https://developers.weixin.qq.com/miniprogram/dev/wxcloudrun/src/development/pay/callback/)
## 开发中遇到的问题
热启动和冷启动的问题。
http://qiutianaimeili.com/html/page/2021/04/20347wh9zpbtkre.html