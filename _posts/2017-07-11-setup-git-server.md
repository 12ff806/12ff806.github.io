---
layout: post
tree: passive
notes: active
projects: passive
title: Set Up Git Server
date: 2017-07-11
---


{::options auto_ids="false" /}


Install git
-----------

```sh
$ sduo apt-get install git
```

Add an user
-----------

```sh
# adduser anonymous
```

Add ssh public key
------------------

add user ssh public key to file authorized_keys on server.

```sh
$ ssh-copy-id -i id_rsa.pub anonymous@server
```

or 

```sh
cat /path/to/id_rsa.pub >> ~anonymous/.ssh/authorized_keys
```

Create repository
-----------------

```sh
# git init --bare sample.git
# chown -R git:git sample.git
```

Shutdown shell login
--------------------

```sh
# vim /etc/passwd
-----------------
anonymous:x:1001:1001:,,,:/home/git:/usr/bin/git-shell
```

Clone repository
----------------

```sh
$ git clone anonymous@server:/path/to/sample.git
```

