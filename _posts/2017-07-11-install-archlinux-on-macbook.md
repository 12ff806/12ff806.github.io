---
layout: post
tree: passive
notes: active
projects: passive
title: Macbook 安装 ArchLinux
date: 2017-07-11
---


{::options auto_ids="false" /}


## 1 制作启动u盘 ##

## 2 在mac中划出一块分区留给archlinux使用 ##

## 3 联网准备 ##
* 只有wifi网络，所以得考虑如何联网，无线网卡是Broadcom BCM4331。
* 在archlinux官方软件包页面搜索并下载b43-fwcutter软件包b43-fwcutter-019-1-x86_64.pkg.tar.xz
* 以及在aur中搜索b43-firmware并下载相应的firmware包。我下载的固件包是http://www.lwfinger.com/b43-firmware/broadcom-wl-6.30.163.46.tar.bz2。
* 把下载的这两个文件拷贝到另一个u盘备用。

## 4 启动到u盘上的archlinux系统 ##

## 5 连上wifi ##
* 挂载上面准备好文件的u盘，将两个文件拷贝到archlinux系统里。
* 安装b43-fwcutter: pacman -U ./b43-fwcutter-019-1-x86_64.pkg.tar.xz
* 解压firmware包: tar -xvj -f broadcom-wl-6.30.163.46.tar.bz2 会得到broadcom-wl-6.30.163.46.wl_apsta.o文件
* 安装固件到/usr/lib/firmware下: b43-fwcutter -w /usr/lib/firmware broadcom-wl-6.30.163.46.wl_apsta.o
* 关闭所有可能的驱动: modprobe -r b43 bcma; modprobe -r brcmsmac bcma; modprobe -r wl
* 启用b43驱动: modprobe b43
* 联网: wifi-menu

## 6 分区-cgdisk分四个分区 ##
* /boot: linux filesystem(8300) ext4
* swap: linux swap(8200) swap
* /: linux filesystem(8300) ext4
* /home: linux filesystem(8300) ext4

## 7 安装系统 ##
* 参考archwiki

## 8 安装引导-直接将grub安装到osx的efi分区上 ##
* 安装grub: pacman -S grub
* 在/boot下新建一个目录efi: mkdir -p /boot/efi
* 挂载osx的efi分区到/boot/efi: mount -t vfat /dev/sda1 /boot/efi
* 安装grub到/boot/efi: grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=arch_grub --recheck --debug
* 在/boot/grub下新建一个目录locale: mkdir -p /boot/grub/locale
* 将grub.mo复制到locale下: cp /usr/share/locale/en\@quot/LC_MESSAGES/grub.mo /boot/grub/locale/en.mo
* 生成grub配置文件: grub-mkconfig -o /boot/grub/grub.cfg
* 完成，系统会自动引导到grub，按住option键可进入osx系统

## 9 配置 ##
* 桌面管理 awesome
* 终端 urxvt
* 浏览器 firefox
* 中文输入法 fcitx
* 屏幕亮度 xbacklight -set 60
* 键盘背光 kbdlight set 100
* 屏幕锁定 slock
* 声音调节 alsamixer
* 触控板 mtrack
* pdf阅读器 evince
* 图片查看 feh
* 安装字体 ttf-inconsolata (~/.Xresources: "URxvt.font: xft:Inconsolata-Regular:size=18")
* 墙 shadowsocks sslocal -c configfile

## 10 参考 ##
* https://wireless.wiki.kernel.org/en/users/Drivers/b43/developers
* https://github.com/mbuesch/b43-tools
