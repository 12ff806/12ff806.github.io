---
layout: post
tree: passive
notes: active
projects: passive
title: 在 archlinux 上安装 odoo11
date: 2018-04-09
---

{::options auto_ids="false" /}


## 创建系统用户

创建一个系统账户 odoo，用来运行 odoo 程序

~~~sh
# useradd --system -d /opt/odoo -m odoo
~~~


## 下载 odoo 源码

切换到 odoo 用户

~~~sh
$ sudo su - odoo -s /bin/bash
~~~

从 github 上下载 odoo 11 的源代码至系统用户 odoo 的家目录下

~~~sh
$ git clone https://www.github.com/odoo/odoo.git odoo11 -b 11.0 --depth=1
~~~


## 安装依赖

安装 nodejs

~~~sh
$ sudo pacman -S npm
$ sudo npm install -g less
~~~

安装 postgresql

~~~sh
$ sudo pacman -S postgresql
~~~

安装 python3 依赖包。在 odoo 源码包里找到 requirements.txt 文件

~~~sh
$ sudo pip3 install -r requirements.txt -i https://pypi.douban.com/simple
~~~

安装 wkhtmltopdf

~~~sh
$ sudo pacman -S wkhtmltopdf
~~~


## 配置 postgresql

初始化数据库并启动

~~~sh
$ sudo -u postgres -i
$ initdb --locale en_US.UTF-8 -E UTF8 -D '/var/lib/postgres/data'
# systemctl start postgresql.service
~~~

创建数据库用户 odoo，给 odoo 程序使用

~~~sh
$ sudo su - postgres
$ createuser --createdb --username postgres --no-createrole --no-superuser --pwprompt odoo
~~~


## 配置文件

启动 odoo，会在当前用户的家目录下自动生成 .odoorc 配置文件

~~~sh
$ sudo su - odoo -s /bin/bash
$ ~/odoo11/odoo-bin -s
~~~

将默认配置文件拷贝到 /etc/odoo 下

~~~sh
$ sudo -s
# mkdir /etc/odoo
# cp ~odoo/.odoorc /etc/odoo/odoo.conf
$ chown -R odoo /etc/odoo
~~~

添加日志文件

~~~sh
$ sudo mkdir /var/log/odoo
$ sudo chown odoo /var/log/odoo
$ sudo su - odoo -s /bin/bash
$ vim /etc/odoo/odoo.conf

logfile = /var/log/odoo/odoo.log
logrotate = True

~~~

重新运行 odoo

~~~sh
$ sudo su - odoo -s /bin/bash
$ ./odoo11/odoo-bin -c /etc/odoo/odoo.conf
~~~
