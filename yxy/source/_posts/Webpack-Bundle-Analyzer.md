---
title: 【性能优化】Webpack-Bundle-Analyzer
date: 2023-04-03 10:46:52
tags: 性能优化
categories: 程序员的自我修养
---

简单写一下，就是在开发时使用了它做性能分析，还是挺好用的。

[官网](https://blog.jakoblind.no/webpack-bundle-analyzer/)
 ## 简介
 Webpack Bundle Analyzer是一个Webpack插件，用于分析和可视化Webpack打包后的bundle文件。它可以帮助开发者找出打包文件中的性能瓶颈和优化机会，从而提高应用程序的性能和用户体验。

Webpack Bundle Analyzer可以生成一个可交互的可视化图表，展示打包后的bundle文件中各个模块的大小、依赖关系、文件类型等信息，还可以通过颜色区分出不同的模块类型，如应用代码、第三方库、webpack运行时等。开发者可以通过这个图表找出文件中占用空间最大的模块和文件，进一步分析和优化代码和依赖关系，减少文件大小和提高打包速度。

除了可视化图表外，Webpack Bundle Analyzer还可以生成详细的报告文件，包含了模块和文件的详细信息，开发者可以根据报告文件找出打包文件中的性能问题和优化机会。

在前端开发中，Webpack Bundle Analyzer可以帮助开发者分析和优化Webpack打包文件，从而提高应用程序的性能和用户体验。

## 在umi+react中的使用

umi是一个基于webpack和babel的可扩展企业级前端应用框架，可以帮助开发者快速构建React单页面应用或多页面应用。umi集成了Webpack，所以我们可以直接在umi项目中使用Webpack Bundle Analyzer插件来分析和优化打包文件。

首先，在项目中安装Webpack Bundle Analyzer插件：

```
npm install webpack-bundle-analyzer --save-dev
```
然后，在.umirc.js文件中配置Webpack Bundle Analyzer插件：

```js
export default {
  plugins: [
    ['umi-plugin-react', {
      // 配置Webpack Bundle Analyzer插件
      webpackBundleAnalyzer: {
        analyzerMode: 'server', // 在浏览器中显示分析报告
        analyzerHost: '127.0.0.1', // 分析报告的IP地址
        analyzerPort: 8888, // 分析报告的端口号
        openAnalyzer: true // 是否自动打开浏览器显示分析报告
      }
    }],
  ]
}

```

配置完成后，运行umi dev命令，Webpack Bundle Analyzer插件将自动启动并在浏览器中显示打包文件的分析报告。

通过Webpack Bundle Analyzer插件，开发者可以快速找出应用程序中占用空间最大的模块和文件，进一步分析和优化代码和依赖关系，提高应用程序的性能和用户体验。