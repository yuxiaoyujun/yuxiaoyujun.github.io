---
title: 【转】docker的使用和简介
date: 2023-03-21 10:56:21
tags: 程序员的自我修养
---

## docker简介

### 1：docker定义

docker是一个用来装应用的容器，就像杯子可以装水，笔筒可以装笔，书包可以放书一样。你可以把“Hello World！”放到docker中，也可以把网站放到docker中，你可以把任何你想到的程序放到docker中。

### 2. docker目的

docker的主要目标是”Build,Ship and Run any App,Angwhere”,构建，运输，处处运行
构建：制作docker镜像，打包容器的所有系统目录文件
运输：下载docker镜像
运行：基于docker镜像提供的rootfs，启动容器
总结：只要能运行docker容器，那么docker镜像中已经安装好的软件也可以运行，所以说docker是一种件的打包技术。

最重要的优点在与docke环境的高度一致性。

#### Docker与虚拟机的区别：

容器时在linux上本机运行，并与其他容器共享主机的内核，它运行的一个独立的进程，不占用其他任何可执行文件的内存，非常轻量
虚拟机运行的是一个完整的操作系统，通过虚拟机管理程序对主机资源进行虚拟访问，相比之下需要的资源更多。

![](/images/image-20230321142649225.png)

### 3. docker的架构

#### docker三个基本概念：

+ 镜像（Image）：Build – 构建镜像 – [镜像 类比 集装箱]
Docker 镜像（Image），就相当于是一个 root 文件系统。比如官方镜像 ubuntu:16.04 就包含了完整的一套 Ubuntu16.04 最小系统的 root 文件系统。

+ 容器（Container）：Run – 运行镜像（运行的镜像就是一个容器）- [容器 就是 运行程序的地方]
镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的类和实例一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。

+ 仓库（Repository）：Ship – 运输镜像（从仓库和我们的主机上运输）- [仓库 类比 超级码头]
仓库可看着一个代码控制中心，用来保存镜像。

![](/images/image-20230321142727515.png)

### 4. docker的运行流程

+ （1）docker pull:
首先客户端client向Docker daemon发送命令docker pull，告诉Docker daemon要拉取哪个镜像，Docker daemon会先在本机检查这个镜像是否存在，如果存在并且版本一致，它不会做任何操作；如果不存在，它会到Docker的镜像仓库中寻找，如果找到了，就会把仓库中的镜像拉取到本地。

+ （2）docker run:
客户端将docker run命令发送到Docker deamon中，Docker deamon会先检查这个镜像是否在本地已经存在，如果不存在，它会到仓库中寻找，把镜像下载到本地，下载之后它会通过一定的方式把镜像运行起来，变成docker容器

![image-20230321142801734](/images/image-20230321142801734.png)

## 二、docker的安装

采用yum安装方式，但由自己选择安装版本，需要自己安装docker-ce仓库。
### 1. 检查系统的内核版本，内核需大于3.10即可
`uname -r`

### 2. 安装yum仓库管理工具yum-utils
`yum -y install yum-utils`
### 3. 安装docker-ce仓库
1： 国内docker-ce仓库：
```js
yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```
2：国外可直接用官方的docker-ce仓库：
```js
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```
安装后，在/etc/yum.repos.d/可以看到有了docker-ce.repo 文件，docker-ce仓库完成。

### 4. 查看docker版本并安装
可直接安装，也可选择版本安装，
1. 直接`yum -y install docker-ce` 安装，官方软件源默认启用了最新的软件。

2. 查看版本，选择自己的想要版本安装。
查看版本：
```js
yum list docker-ce --showduplicates|sort -r
```
安装自己的版本号：docker-ce-[VERSION]，如上图中的docker-ce-3:20.10.7-3.el8安装如下：
```js
yum -y install docker-ce-3:20.10.7-3.el8
```
安装完成，`docker version`可查看版本

## 三. docker的常用命令
启动docker：
```
systemctl start docker.service启动docker。
```

进入容器
```
docker exec -it docker-jenkins bash
```
<!--https://www.ywbj.cc/?p=151-->
