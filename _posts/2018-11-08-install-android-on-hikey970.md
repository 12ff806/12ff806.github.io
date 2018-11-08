---
layout: post
tree: passive
notes: active
projects: passive
title: HiKey 970 安装 Android 系统
date: 2018-11-08
---


{::options auto_ids="false" /}


## 简介 ##

HiKey 970 开发板安装 Android 系统


## 硬件清单 ##

* HiKey 970 开发板
* 12V 供电电源
* USB Type-A (Linux) to USB Type-C (96Boards) cable


## 安装准备 ##

* 准备一台安装有Linux系统的电脑
* 在Linux系统上安装Android工具(adb/fastboot)

~~~sh
$ sudo apt-get install android-tools-adb android-tools-fastboot
~~~

* 下载烧录工具

~~~sh
$ git clone https://github.com/96boards-hikey/tools-images-hikey970.git
~~~

* 下载系统[镜像文件](https://github.com/96boards/documentation/tree/master/consumer/hikey/hikey970/downloads)
* 解压系统镜像文件, 并将解压后的所有文件移到tools-images-hikey970文件夹中


## 配置Hikey 970 ##

将Hikey 970拨码开关设置为 "ON/ON/ON/OFF" 来启动到RECOVERY MODE


## 安装 ##

* 用 USB Type-A to Type-C 线连接电脑和HiKey 970开发板
* 给HiKey 970开发板上电
* 在电脑上找到开发板的设备名(ttyUSBX)
* 更改烧录脚本"recovery-flash.sh"中的一些路径为自己电脑中的实际路径
* 运行烧录脚本(根据实际设备名修改ttyUSBX)

~~~sh
$ cd tools-images-hikey970
$ sudo ./recovery-flash.sh ttyUSBX
~~~


## 启动系统 ##

安装完成后, 将Hikey 970拨码开关设置为 "ON/OFF/OFF/OFF", 上电

