---
layout: post
notes: active
projects: passive
title: problem with debmirror
date: 2017-07-09
---


{::options auto_ids="false" /}


I used debmirror for mirroring Debian repositories, on a Debian server in docker


problem: 'gpgv: can't check signature: public key not found'
------------------------------------------------------------

when running debmirror script, it fails with a error similar to this one

```sh
[GNUPG:] ERRSIG AED4B06F473041FA 1 2 00 1374050431 9
[GNUPG:] NO_PUBKEY AED4B06F473041FA
[GNUPG:] ERRSIG 8B48AD6246925553 1 2 00 1374050431 9
[GNUPG:] NO_PUBKEY 8B48AD6246925553
gpgv: Signature made Mon 25 Aug 2014 04:40:31 PM CST using RSA key ID 473041FA
gpgv: Can't check signature: public key not found
gpgv: Signature made Mon 25 Aug 2014 04:40:31 PM CST using RSA key ID 46925553
gpgv: Can't check signature: public key not found
Release signature does not verify.
```

solution
--------

update the repository and import the new keys

```sh
$ aptitude update
$ aptitude safe-upgrade
$ gpg --keyring /usr/share/keyrings/debian-archive-keyring.gpg  --export | gpg --no-default-keyring --keyring /var/data/keyrings/debian/trustedkeys.gpg --import
```

sidenote: if no keys were added, download the latest debian-archive-keyring package from the repositories, extract it and use those keyrings

```sh
$ wget http://ftp.us.debian.org/debian/pool/main/d/debian-archive-keyring/debian-archive-keyring_2012.4_all.deb
$ dpkg -x debian-archive-keyring_2012.4_all.deb  ~
$ gpg --keyring ~/usr/share/keyrings/debian-archive-keyring.gpg  --export | gpg --no-default-keyring --keyring /var/data/keyrings/debian/trustedkeys.gpg --import
```

reference
---------

[debmirror problem: gpgv: can't check signature: public key not found]

[how to build debian and ubuntu mirrors using debmirror]

[debmirror problem: gpgv: can't check signature: public key not found]: http://lgallardo.com/en/2013/11/12/problema-de-debmirror-gpgv-cant-check-signature-public-key-not-found
[how to build debian and ubuntu mirrors using debmirror]: http://lgallardo.com/en/2012/12/06/como-crear-un-mirror-de-debian-y-ubuntu-con-debmirror
