---
layout: post
notes: active
projects: passive
title: 安装 ArchLinux 系统
date: 2017-07-10
---


create a arch linux installer usb drive
---------------------------------------

find out the name of your usb drive with lsblk. make sure that it is not mounted. run the following command, replacing /dev/sdx with your drive, e.g. /dev/sdb. (do not append a partition number, so do not use something like /dev/sdb1)

```sh
# dd bs=4M if=/path/to/archlinux.iso of=/dev/sdx && sync
```

how to restore the usb drive
----------------------------

because the iso image is a hybrid which can either be burned to a disc or directly written to a usb drive, it does not include a standard partition table. after you install arch linux and you are done with the usb drive, you should zero out its first 512 bytes (meaning the boot code from the MBR and the non-standard partition table) if you want to restore it to full capacity:

```sh
# dd count=1 bs=512 if=/dev/zero of=/dev/sdx && sync
```

then create a new partition table (e.g. "msdos") and filesystem (e.g. ext4, fat32) using gparted, or from a terminal:

for ext2/3/4 (adjust accordingly), it would be:

```sh
# fdisk /dev/sdx
# mkfs.ext4 /dev/sdx1
# e2label /dev/sdx1 USB_STICK
```

for fat32, install the dosfstools package and run:

```sh
# fdisk /dev/sdx
# mkfs.vfat -F32 /dev/sdx1
# dosfslabel /dev/sdx1 USB_STICK
```

partition the disks
-------------------

there are two types of partition table:

 - MBR: Intended for BIOS systems (also referred to as "msdos")
 - GPT: Intended for UEFI systems

for my system(BIOS system), my partition scheme: 

 * / (100Gib) 
 * swap (4GiB)
 * /home (all remaining space)

```sh
# fdisk /dev/sdx
```

format the partitions
---------------------

except for swap partitions

```sh
# mkfs.ext4 /dev/sdxY
```

activate swap
-------------

```sh
# mkswap /dev/sdxY
# swapon /dev/sdxY
```

mount the partitions
--------------------

```sh
# mount /dev/sdxR /mnt
# mkdir -p /mnt/home
# mount /dev/sdxH /mnt/home
```

connect to the internet
-----------------------

```sh
# iw dev
# wifi-menu interface_name
```

select the mirrors
------------------

```sh
# nano /etc/pacman.d/mirrorlist

##
## Arch Linux repository mirrorlist
## Sorted by mirror score from mirror status page
## Generated on YYYY-MM-DD
##

Server = http://mirror.example.xyz/archlinux/$repo/os/$arch
...
```

install the base system
-----------------------

```sh
# pacstrap -i /mnt base base-devel
```

generate an fstab file
----------------------

use -U or -L to define by UUID or labels

```sh
# genfstab -U -p /mnt >> /mnt/etc/fstab
# nano /mnt/etc/fstab
```

the last field determines the order in which partitions are checked at start up: use 1 for the (non-Btrfs) root partition, which should be checked first; 2 for all other partitions you want checked at start up; and 0 means 'do not check'. All Btrfs partitions should have 0 for this field. normally, you will also want your swap partition to have 0.

change root into the new system
-------------------------------

```sh
# arch-chroot /mnt
```

configure the system
--------------------

set the hostname:

```sh
# echo computer_name > /etc/hostname
```

add the same hostname to /etc/hosts:

```sh
#<ip-address> <hostname.domain.org> <hostname>
127.0.0.1 localhost.localdomain localhost myhostname
::1   localhost.localdomain localhost myhostname
```

set the time zone:

```sh
# ln -sf /usr/share/zoneinfo/zone/subzone /etc/localtime
```

uncomment the needed locales in /etc/locale.gen, then generate them with:

```sh
# nano /etc/locale.gen
# locale-gen
```

set locale preferences in /etc/locale.conf and possibly $HOME/.config/locale.conf:

```sh
# echo LANG=your_locale > /etc/locale.conf
```

add console keymap and font preferences in /etc/vconsole.conf:

```sh
# nano /etc/vconsole.conf

KEYMAP=de-latin1
FONT=lat9w-16
```

set the hardware clock:

```sh
# hwclock --systohc --utc
```

configure the network
---------------------

wireless:

if your wireless adapter requires a firmware, install the package containing your firmware. most of the time, the linux-firmware package will contain the needed firmware.

install iw and wpa_supplicant which you will need to connect to a network:

```sh
# pacman -S iw wpa_supplicant
```

using wifi-menu, install dialog, which is required for wifi-menu:

```sh
# pacman -S dialog
```

after finishing the rest of this installation and rebooting, you can connect to the network with wifi-menu interface_name (where interface_name is the interface of your wireless chipset).

```sh
# wifi-menu interface_name
```

set the root password with:

```sh
# passwd
```

install and configure a bootloader
----------------------------------

for BIOS motherboard:

```sh
# pacman -S grub
# grub-install --target=i386-pc --recheck /dev/sda
```

automatically generate grub.cfg:

tip: to automatically search for other operating systems on your computer, install os-prober (pacman -S os-prober) before running the next command.

```sh
# grub-mkconfig -o /boot/grub/grub.cfg
```

exit from the chroot environment and reboot
-------------------------------------------

```sh
# exit
# reboot
```

applications
------------

add user:

```sh
# useradd -m username
# passwd username
```

install display driver:

my display driver is NVA8 GT218.

```sh
# pacman -S nvidia-340xx
```

install awesome:

```sh
# pacman -S xorg-server
# pacman -S xorg-server-utils
# pacman -S xorg-xinit
# pacman -S awesome
$ cp /etc/skel/.xinitrc ~
$ vim ~/.xinitrc

exec awesome
```

install browser:

```sh
# pacman -S firefox
```

install adobe flash plugin for firefox:

download the tar package and unzip, move the lib file to the mozilla plugins directory.

```sh
$ cp ./libfile ~/.mozilla/plugins/
```

sound configure:

```sh
# pacman -S alsa-utils
$ alsamixer
```

install pdf reader:

```sh
# pacman -S evince
```

install git:

```sh
# pacman -S git
```

install input method:

```sh
# pacman -S fcitx fcitx-configtool fcitx-gtk2 fcitx-googlepinyin
$ vim ~/.xinitrc

export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS=@im=fcitx
/usr/bin/fcitx &
```

install fonts:

```sh
# pacman -S ttf-dejavu wqy-microhei
# reboot
```

switch monitor:

```sh
# xrandr --output LVDS1 --mode 1024x768 --output VGA1 --mode 1024x768
# xrandr --output LVDS1 --mode 1366x768 --output VGA1 --off
```
