---
title: docker的使用和简介
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
1. `docker run`: **创建并启动**一个新的容器。 例如： `docker run nginx` 将在一个新的容器中运行Nginx。
2. `docker start`: 启动**已经存在**的容器，让其重新运行。
3. `docker stop`: 停止正在运行的容器。 例如： `docker stop container_name` 将停止名为“container_name”的容器。
4. `docker rm`: 删除一个或多个容器。 例如： `docker rm container_name` 将删除名为“container_name”的容器。
5. `docker images`: 列出本地的Docker镜像。 例如： `docker images` 将列出本地存储的所有Docker镜像。
6. `docker rmi`: 删除本地的Docker镜像。 例如： `docker rmi image_name` 将删除名为“image_name”的本地Docker镜像。
7. `docker pull`: 下载一个Docker镜像。 例如： `docker pull nginx` 将下载最新版本的Nginx镜像。
8. `docker push`: 将一个Docker镜像上传到Docker Hub。 例如： `docker push username/image_name` 将上传名为“image_name”的本地Docker镜像到Docker Hub上的用户名为“username”的仓库中。
9. `docker inspect`: 查看Docker容器的详细信息。 例如： `docker inspect container_name` 将显示名为“container_name”的容器的详细信息。
10. `docker exec`: 在正在运行的容器中执行命令。 例如： `docker exec -it container_name bash` 将在名为“container_name”的容器中打开一个Bash shell。
11. `docker ps`: 列出所有正在运行的容器。 例如： `docker ps` 将列出所有正在运行的容器的详细信息。`docker ps -a`列出所有正在运行的没在运行的容器。
12. `docker pull`: 拉取镜像，在Docker中，一般的使用流程是**先拉取镜像，然后使用镜像创建容器并启动**。就是先pull再run，之后再使用就进入容器然后docker start的用。
13. `docker search xxx`: 选择安装的镜像，如`docker search jenkins`,会列出所有的jenkins镜像，然后使用docker pull [name] 安装。

删除镜像后还能在容器中安装镜像，具体的命令就跟容器命令一样，比如说我拉了`docker pull jenkins`，它的容器是linux（这个自动生成的），然后rmi了镜像之后，可以使用shell命令在其中重新安装，就像在linux电脑里一样的。比如想安装apache的话，命令：
```
apt-get update
apt-get install apache2
```
删除容器就要重新pull了。
## 其他补充：

在一些情况下，Docker会自动完成拉取镜像、创建容器和启动容器的过程，具体取决于您使用的命令和Docker的配置。

例如，如果您使用的是 docker run 命令，则Docker将自动完成以下操作：

如果本地不存在指定的镜像，则从默认的镜像仓库（例如Docker Hub）拉取该镜像。

使用指定的镜像创建一个新的容器，并启动该容器。

但是，如果您使用的是 docker create 和 docker start 命令，则需要手动完成这些步骤。

在任何情况下，Docker都会自动完成一些基本的设置和配置，例如创建容器网络、分配IP地址和端口等。但是，一些高级设置和配置可能需要手动完成，例如挂载主机文件、配置容器卷等。

因此，对于每个具体的使用场景，您需要仔细检查Docker命令和配置，并根据需要手动完成必要的步骤。




