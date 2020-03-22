---
layout: post
tree: passive
notes: active
projects: passive
title: Deploy Debsources
date: 2017-07-08
---

deploy debsources instance use docker

Dockerfile
----------

download dockerfile, and modify 'config.local.ini'

```sh
$ git clone https://github.com/matthieucan/Dockerfiles.git
$ cd Dockerfiles/debsources/
$ vim config.local.ini
----------------------
mirror_host: ftp.cn.debian.org
mirror_suites: wheezy
wtf_csrf_enabled: false
```

Build docker image
------------------

```sh
$ cd Dockerfiles/debsources/
$ sudo docker build -t="debsources" .
```

Run docker container
--------------------

```sh
$ sudo docker run -i -p=1992:80 -p=55667:22 -v /srv/debian:/opt/debsources/testdata -t debsources bash
```

Config debsources in container
------------------------------

```sh
$ cd /opt/debsources/bin
$ vim ./main
------------
CONFFILE="/opt/debsources/etc/config.ini"
${bin_dir}/update-debsources
```

Set up ssh in container
-----------------------

```sh
$ apt-get install openssh-server
$ service ssh start
```

Add user for ssh login
----------------------

```sh
$ useradd admin
$ echo "admin:admin" | chpasswd
```

Add root permission for admin
-----------------------------

```sh
$ apt-get install sudo
$ visudo
--------
admin   ALL=(ALL:ALL) ALL
```

Generate gnupg public key
-------------------------

```sh
$ apt-get install aptitude
$ aptitude update
$ aptitude safe-upgrade
$ wget http://ftp.us.debian.org/debian/pool/main/d/debian-archive-keyring/debian-archive-keyring_2012.4_all.deb
$ dpkg -x debian-archive-keyring_2012.4_all.deb ~
$ mkdir -p /var/data/keyrings/debian
$ gpg --keyring ~/usr/share/keyrings/debian-archive-keyring.gpg  --export | gpg --no-default-keyring --keyring /var/data/keyrings/debian/trustedkeys.gpg --import
$ gpg --keyring ~/usr/share/keyrings/debian-archive-keyring.gpg  --export | gpg --no-default-keyring --keyring /.gnupg/trustedkeys.gpg --import
```

Start postgresql
----------------

```sh
$ service postgresql start
```

Run script 'main'
-----------------

```sh
$ cd /opt/debsources/bin
$ ./main enable
$ ./main update &
```

Start Apache2
-------------

```sh
$ service apache2 start
```

