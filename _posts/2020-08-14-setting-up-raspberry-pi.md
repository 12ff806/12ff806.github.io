---
layout: post
tree: passive
notes: active
projects: passive
title: 初次启动树莓派
date: 2020-08-14
---


{::options auto_ids="false" /}


## 简介 ##

在没有显示器的情况下启动树莓派


## 硬件清单 ##

* 树莓派3b+
* 5V 电流在2.5A之上的电源适配器
* 16GB micro sd
* 读卡器

## 往SD卡写操作系统 ##

按照官方教程将系统写入SD卡

## 开启树莓派SSH远程连接 ##

将写好系统的SD卡用读卡器连接电脑, 在MacOS下会将SD卡挂载到'/Volumes/boot'下, 进入此目录, 创建一个空文件'ssh':

~~~sh
cd /Volumes/boot/
touch ssh
~~~

## 写WIFI配置文件 ##

为了让树莓派启动时自动连上WIFI, 需要在'/Volumes/boot'目录下创建一个WIFI配置文件:

~~~sh
cd /Volumes/boot/
touch wpa_supplicant.conf
~~~


'wpa_supplicant.conf' 文件内容如下:

~~~sh
country=CN
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
network={
    ssid="360WiFi-C9A594"
    psk="ploft@2011020202"
    key_mgmt=WPA-PSK
}
~~~

树莓派在首次启动的时候会将此文件移动到'/etc/wpa_supplicant/'目录下

## 启动树莓派 ##

启动树莓派, ssh连接树莓派, 用户名为: pi, 密码为: raspberry

~~~sh
ssh -p 22 pi@raspberrypi.local
~~~

## 更新软件源 ##

修改配置'/etc/apt/sources.list':

~~~sh
deb http://mirrors.tuna.tsinghua.edu.cn/raspbian/raspbian/ buster main contrib non-free rpi
~~~

修改配置'/etc/apt/sources.list.d/raspi.list':

~~~sh
deb http://mirrors.ustc.edu.cn/archive.raspberrypi.org/debian/ buster main ui
~~~

## 配置frpc内网穿透服务 ##

参考frp文档

