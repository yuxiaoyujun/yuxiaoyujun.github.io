---
title: '【github】私有仓库如何避免每次pull都要输入用户名密码'
date: 2022-12-25 06:21:49
tags: 
categories:
  - 程序员的自我修养
---
  <meta name="referrer" content="no-referrer">

#### 一. 使用https提交方式：

###### 1. 使用git config命令在本地全局设置用户名和邮箱

``git config --global user.name "username"``：全局添加用户名
``git config --global user.email “someone@mail.com”``：全局添加邮箱
``git config --global credential.helper store``： 该命令用于为credential.helper设置值，避免重复输入用户名密码

###### 2. 执行完成以上后，运行
``cat ~/.gitconfig``
会发现.gitconfig多出了以下代码
![image.png](https://upload-images.jianshu.io/upload_images/20892169-6f69db560ee3dce8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

###### 3. 再次git pull，只需输入一次密码，之后就可以不再输入密码了。
![image.png](https://upload-images.jianshu.io/upload_images/20892169-e7f7b35931f8b774.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 二、使用ssh提交方式：
###### 1. 生成秘钥
执行``ssh-keygen``。
如果原本没有秘钥，就一路回车。如果有秘钥且秘钥关联了其他网站的项目，比如gitlab什么的，那就需要重新指定目录。
![](https://upload-images.jianshu.io/upload_images/20892169-c34eb67d9e738fb0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
###### 2. 获取公钥
执行 ``cat 你指定的目录/id_rsa.pub``获取公钥（如果没指定，就是 ``~/.ssh/id_rsa.pub``）
###### 3. github中，新建ssh
![](https://upload-images.jianshu.io/upload_images/20892169-2cbe3ed2d34e88e0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
###### 4. 复制公钥粘贴保存即可。
![](https://upload-images.jianshu.io/upload_images/20892169-7603f2c0488cab4c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


