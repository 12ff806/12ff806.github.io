set up git server
=================

install git
-----------

```sh
$ sduo apt-get install git
```

add an user
-----------

```sh
# adduser anonymous
```

add ssh public key
------------------

add user ssh public key to file authorized_keys on server.

```sh
$ ssh-copy-id -i id_rsa.pub anonymous@server
```

or 

```sh
cat /path/to/id_rsa.pub >> ~anonymous/.ssh/authorized_keys
```

create repository
-----------------

```sh
# git init --bare sample.git
# chown -R git:git sample.git
```

shutdown shell login
--------------------

```sh
# vim /etc/passwd
-----------------
anonymous:x:1001:1001:,,,:/home/git:/usr/bin/git-shell
```

clone repository
----------------

```sh
$ git clone anonymous@server:/path/to/sample.git
```
