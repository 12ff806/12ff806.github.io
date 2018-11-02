---
layout: post
tree: passive
notes: active
projects: passive
title: 在 VirtualBox 中安装 ArchLinux
date: 2018-11-02
---


{::options auto_ids="false" /}


## 简介 ##

在 VirtualBox 中安装 ArchLinux


## 准备 ##

* 下载系统镜像文件
* 安装VirtualBox
* 通过虚拟光驱启动到Archlinux


##  分区 ##

用 fdisk 进行磁盘分区:

* /boot: linux filesystem(8300) ext4
* swap: linux swap(8200) swap
* /: linux filesystem(8300) ext4
* /home: linux filesystem(8300) ext4


## 安装系统及引导 ##

* 参考archwiki


## 启动dhcpcd ##

~~~sh
# systemctl enable dhcpcd
~~~


## 安装VirtualBox扩展包 ##

~~~sh
$ sudo pacman -S virtualbox-guest-utils
~~~

如果是默认的linux kernel的话, 选择 "virtualbox-guest-modules-arch" 这个包


## 加载VirtualBox的内核模块 ##

手动加载

~~~sh
# modprobe -a modprobe -a vboxguest vboxsf vboxvideo
~~~

自动加载

~~~sh
# systemctl enable vboxservice.service
~~~


## 运行VirtualBox guest services ##

~~~sh
$ VBoxClient --clipboard --draganddrop --seamless --display --checkhostversion
~~~

or

~~~sh
$ VBoxClient-all
~~~

也可以将此命令配在 .xinitrc 中, 每次启动桌面的时候就会自动运行


## Awesome modkey 失效问题 ##

平铺式窗口管理器 awesome 安装启动后，只有右边的command键(mac)是有效的mod4, 左边的command键失效了。这是因为VirtualBox将左边的command键作为快捷键，所以只需要在VirtualBox中将快捷键取消掉就可以了。

