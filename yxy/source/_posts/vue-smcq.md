---
title: 【复习整理】vue生命周期
date: 2023-02-07 11:30:34
categories: 程序员的自我修养
---
<meta name="referrer" content="no-referrer">

## 一、vue2的生命周期
vue生命周期分别有创建、初始化数据、编译模板、挂在DOM、渲染-更新-渲染、卸载利用钩子函数完成对应的项目效果
#### beforeCreate( 创建前 )
在实例初始化之后,进行数据侦听和事件/侦听器的配置之前同步调用。
此时组件的选项对象还未创建，**el 和 data 并未初始化**，因此**无法访问methods， data， computed等上的方法和数据**
#### created ( 创建后）
在实例创建之后使用，意味着以下内容已被配置完毕：数据侦听、计算属性、方法、事件/侦听器的回调函数。**完成了data 数据的初始化**。因为未挂载，所以**el不可用**。 可以**使用数据，更改数据**，在这里更改数据**不会触发updated函数**。
#### beforeMount (挂载前)
在挂载开始之前被调用,在这个阶段是**获取不到dom操作**的,把data里面的数据和模板**生成html**，完成了data等初始化,注意此时还**没有挂在html到页面上**
#### mounted (挂载后)
用于挂载之后使用，这时 el 被新创建的 vm.\$el 替换了。在这个时候**可以获取到dom操作**，也可以通过vm.\$el获取元素。比如可以获取到ref等，操作dom，
在这个时候只能调用一次ajax，在这个时候**el和data都可以获取的到**
注意这个不能保证所有子元素挂载完成了！
vm.$el：vue实例使用的dom根元素。
#### beforeUpdate (更新前)
在**数据发生改变后，DOM 被更新之前**被调用。这里适合在现有 DOM 将要被更新之前访问它，比如**移除手动添加的事件监听器**。
#### updated (更新后)
在由于**数据更改导致地虚拟DOM重新渲染并更新完毕之后会调用**，调用时，组件DOM已经更新，所以可以执行依赖于DOM的操作，然后在大多是情况下，应该**避免在此期间更改状态，因为这可能会导致更新无限循环**，但是在服务器端渲染期间不被调用，可以用于监听某些数据的时候使用钩子
#### beforeDestroy（销毁前）
实例销毁之前调用。在这一步，实例仍然完全可用。
可以用于销毁计时器时候使用，为了防止跳转到其它页面该事件还在执行，还可以清除dom事件等
#### destroy（销毁后）
实例销毁后调用。该钩子被调用后，对应 Vue 实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁。
#### activated
被 keep-alive 缓存的组件激活时调用。
#### deactivated
被 keep-alive 缓存的组件失活时调用。

## 二、vue3的生命周期
大多相同，只是将beforeCreate和created合并成了setup，并且新增了renderTracked与renderTriggered，并且将destroy和beforeDestory改成了unmounted和beforeUnmounted
#### renderTracked
在一个响应式依赖被组件的渲染作用追踪后调用。
这个钩子仅在开发模式下可用，且在服务器端渲染期间不会被调用。
#### renderTriggered
在一个响应式依赖被组件触发了重新渲染之后调用。
这个钩子仅在开发模式下可用，且在服务器端渲染期间不会被调用。
#### serverPrefetch
当组件实例在服务器上被渲染之前要完成的异步函数。
### Vue2--------------vue3
`beforeCreate` -> `setup()`
`created` -> `setup()`
`beforeMount` -> `onBeforeMount`
`mounted` -> `onMounted`
`beforeUpdate` -> `onBeforeUpdate`
`updated` -> `onUpdated`
`beforeDestroy` -> `onBeforeUnmount`
`destroyed` -> `onUnmounted`
`activated` -> `onActivated`
`deactivated` -> `onDeactivated`
`errorCaptured` -> `onErrorCaptured`
### 父子组件生命周期的调用顺序
created：先初始化父组件，再初始化子组件
mounted：先渲染子组件，再渲染父组件
beforeupdated：先调用父组件，再调用子组件
updated：先更新子组件，再更新父组件
beforedestroy：先调用父组件，再调用子组件
destroy：先调用子组件，再调用父组件

实测的图
![](https://upload-images.jianshu.io/upload_images/20892169-f8d9c42d63cf20e9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
