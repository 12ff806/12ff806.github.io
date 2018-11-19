---
layout: post
tree: passive
notes: active
projects: passive
title: Mysql 的简单使用
date: 2018-11-16
---


{::options auto_ids="false" /}


## 简介 ##

简单使用mysql


## 在macos上使用mysql ##

安装

~~~sh
$ brew install mysql
~~~

默认安装完成就已经启动了mysql服务，但是mysql的data目录"/usr/local/var/mysql"的属主为当前的登录用户，mysql的专用系统账户"_mysql"没有权限去操作这个目录，会导致数据库不能用。需要更改目录的属主：

~~~sh
$ ps aux | grep mysql
$ sudo kill -9 <mysql_pid>
$ sudo chown -R _mysql /usr/local/var/mysql
$ sudo mysql.server start
~~~

查看状态

~~~sh
$ sudo mysql.server status
~~~

用brew方式安装，默认数据库管理账户为"root"，且在安装过程中不会提示输入root密码，首次登录不用密码：

~~~sh
$ mysql -uroot
~~~


## 在ubuntu上使用mysql ##

安装

~~~sh
$ sudo apt-get install mysql-server mysql-client
~~~

安装过程中不会提示输入管理账户密码。安装完成后，去配置文件中查找数据库管理账户和密码来登录数据库：

~~~sh
$ cd /etc/mysql/
$ sudo cat debian.cnf    # 默认账号和密码
$ mysql -udebian-sys-maint -p    # 登录 我这里的默认账户为"debian-sys-maint"
~~~

登录进去后更改密码：

~~~sh
mysql> use mysql;
mysql> UPDATE user SET authentication_string=PASSWORD('new_password') WHERE User='debian-sys-maint' and Host='localhost'; 
mysql> flush privileges;
~~~

创建新数据库"test"：

~~~sh
mysql> DROP DATABASE IF EXISTS test;
mysql> CREATE DATABASE test CHARACTER SET utf8 COLLATE utf8_general_ci;
~~~

创建新用户"test"：

~~~sh
mysql> DROP user IF EXISTS test;
mysql> CREATE user ‘test’@‘%’ IDENTIFIED BY ‘test’;    # 密码也为"test", Host设置为'%'则允许任意主机访问，如果只允许本地访问，改为‘localhost’
~~~

将新的数据库的权限赋予新用户：

~~~sh
mysql> GRANT ALL PRIVILEGES ON test.* TO ‘test’@‘%’;
~~~

开启远程访问数据库：

~~~sh
$ sudo vim /etc/mysql/mysql.conf.d/mysqld.cnf
注释掉 bind-address = 127.0.0.1 这行
~~~


