---
title: '在自己的网站中集成h5音乐播放器'
date: 2021-09-11 18:48:34
tags: '实用开源代码or工具'
categories:
  - 程序员的自我修养
---
  <meta name="referrer" content="no-referrer">

## 简介：
 APlayer 是一个可爱的 HTML5 音乐播放器。（官方原话）

地址：[点击访问](https://github.com/DIYgod/APlayer)

## 安装
使用 npm:
```js
npm install aplayer --save
```
使用 Yarn:
```js
yarn add aplayer
```
## 使用
```html
<link rel="stylesheet" href="APlayer.min.css">
<div id="aplayer"></div>
<script src="APlayer.min.js"></script>
```
```js
const ap = new APlayer({
    container: document.getElementById('aplayer'),
    audio: [{
        name: 'name',
        artist: 'artist',
        url: 'url.mp3',
        cover: 'cover.jpg'
    }]
});
```
使用模块管理器:
```js
import 'APlayer/dist/APlayer.min.css';
import APlayer from 'APlayer';

const ap = new APlayer(options);
```

## 参数介绍（可见官网）

<table>
<thead>
<tr>
<th>名称</th>
<th>默认值</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>container</td>
<td>document.querySelector('.aplayer')</td>
<td>播放器容器元素</td>
</tr>
<tr>
<td>fixed</td>
<td>false</td>
<td>开启吸底模式, <a href="https://aplayer.js.org/#/home?id=fixed-mode" target="_blank">详情</a></td>
</tr>
<tr>
<td>mini</td>
<td>false</td>
<td>开启迷你模式, <a href="https://aplayer.js.org/#/home?id=mini-mode" target="_blank">详情</a></td>
</tr>
<tr>
<td>autoplay</td>
<td>false</td>
<td>音频自动播放</td>
</tr>
<tr>
<td>theme</td>
<td>'#b7daff'</td>
<td>主题色</td>
</tr>
<tr>
<td>loop</td>
<td>'all'</td>
<td>音频循环播放, 可选值: 'all', 'one', 'none'</td>
</tr>
<tr>
<td>order</td>
<td>'list'</td>
<td>音频循环顺序, 可选值: 'list', 'random'</td>
</tr>
<tr>
<td>preload</td>
<td>'auto'</td>
<td>预加载，可选值: 'none', 'metadata', 'auto'</td>
</tr>
<tr>
<td>volume</td>
<td>0.7</td>
<td>默认音量，请注意播放器会记忆用户设置，用户手动设置音量后默认音量即失效</td>
</tr>
<tr>
<td>audio</td>
<td>-</td>
<td>音频信息, 应该是一个对象或对象数组</td>
</tr>
<tr>
<td>audio.name</td>
<td>-</td>
<td>音频名称</td>
</tr>
<tr>
<td>audio.artist</td>
<td>-</td>
<td>音频艺术家</td>
</tr>
<tr>
<td>audio.url</td>
<td>-</td>
<td>音频链接</td>
</tr>
<tr>
<td>audio.cover</td>
<td>-</td>
<td>音频封面</td>
</tr>
<tr>
<td>audio.lrc</td>
<td>-</td>
<td><a href="https://aplayer.js.org/#/home?id=lrc" target="_blank">详情</a></td>
</tr>
<tr>
<td>audio.theme</td>
<td>-</td>
<td>切换到此音频时的主题色，比上面的 theme 优先级高</td>
</tr>
<tr>
<td>audio.type</td>
<td>'auto'</td>
<td>可选值: 'auto', 'hls', 'normal' 或其他自定义类型, <a href="https://aplayer.js.org/#/home?id=mse-support" target="_blank">详情</a></td>
</tr>
<tr>
<td>customAudioType</td>
<td>-</td>
<td>自定义类型，<a href="https://aplayer.js.org/#/home?id=mse-support" target="_blank">详情</a></td>
</tr>
<tr>
<td>mutex</td>
<td>true</td>
<td>互斥，阻止多个播放器同时播放，当前播放器播放时暂停其他播放器</td>
</tr>
<tr>
<td>lrcType</td>
<td>0</td>
<td><a href="https://aplayer.js.org/#/home?id=lrc" target="_blank">详情</a></td>
</tr>
<tr>
<td>listFolded</td>
<td>false</td>
<td>列表默认折叠</td>
</tr>
<tr>
<td>listMaxHeight</td>
<td>-</td>
<td>列表最大高度</td>
</tr>
<tr>
<td>storageName</td>
<td>'aplayer-setting'</td>
<td>存储播放器设置的 localStorage key</td>
</tr>
</tbody>
</table>