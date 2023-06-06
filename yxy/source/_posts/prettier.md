---
title: 【prettier】vscode项目配置prettier
date: 2018-04-26 11:29:40
tags: prettier 
categories:
  - 程序员的自我修养
---

### 1. 项目中安装prettier

npm i prettier --save-dev

### 2. 在vsocde中安装prettier插件

![](/images/image-20230426113405622.png)

注：虽然在项目中安装了 Prettier 以后，可以通过命令行或其他工具来进行代码格式化，但在 VS Code 中使用 Prettier 插件可以使代码格式化更加便捷，而且可以在保存文件时自动格式化代码。因此，建议还是在 VS Code 中安装 Prettier 插件。

### 3. 设置配置规则

在项目根目录新建.prettierrc文件，配置规则

![](/images/image-20230426113907920.png)

### 4. 设置.prettierrc的读取

![](/images/image-20230426113555877.png)

![](/images/image-20230426113023587.png)

### 5. 设置保存时自动格式化

![](/images/image-20230426114118275.png)

### 6. 配置格式化程式

![](/images/image-20230426114437094.png)

![](/images/image-20230426114709495.png)

然后选择`prettier`即可。

### 7. 完成

此时保存，就可以自动格式化了。
