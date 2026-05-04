---
title: 'Linux: apt-get 時の GPG error (NO_PUBKEY) の解決例'
date: 2014-01-01
authors: [yukun]
tags:
  - debian
  - linux
slug: linux-apt-get-gpg-error-no-pubkey
---

### 事象

Linux Debianで/etc/apt/sources.listに外部のリポジトリを指定した後にapt-get updateコマンドを実行したところ、下記のGPG errorが出力されupdateできない。

```
# apt-get update
Get:1 http://ftp.riken.jp squeeze-updates Release.gpg [836 B]
＜中略＞
Fetched 7,643 B in 0s (7,644 B/s)
Reading package lists... Done
W: GPG error: http://ftp.jp.debian.org wheezy Release: The following signatures couldn't be verified because the public key is not available: NO_PUBKEY 8B48AD6246925553 NO_PUBKEY 6FB2A1C265FFB764
W: GPG error: http://ftp.jp.debian.org wheezy-updates Release: The following signatures couldn't be verified because the public key is not available: NO_PUBKEY 8B48AD6246925553
#

```


<!-- truncate -->


### 原因

対象リポジトリの公開鍵を信頼していなかった為。

```
# apt-key list
/etc/apt/trusted.gpg
--------------------
pub   1024D/F42584E6 2008-04-06 [expired: 2012-05-15]
uid                  Lenny Stable Release Key 
pub   4096R/55BE302B 2009-01-27 [expired: 2012-12-31]
uid                  Debian Archive Automatic Signing Key (5.0/lenny) 
pub   2048R/6D849617 2009-01-24 [expired: 2013-01-23]
uid                  Debian-Volatile Archive Automatic Signing Key (5.0/lenny)
pub   4096R/B98321F9 2010-08-07 [expires: 2017-08-05]
uid                  Squeeze Stable Release Key 
pub   4096R/473041FA 2010-08-27 [expires: 2018-03-05]
uid                  Debian Archive Automatic Signing Key (6.0/squeeze) 

```

### 対策

鍵サーバより鍵をダウンロード・インポートしapt-keyにエクスポートする。

```
# gpg --keyserver subkeys.pgp.net --recv-keys 8B48AD6246925553
gpg: requesting key 46925553 from hkp server subkeys.pgp.net
gpg: key 46925553: "Debian Archive Automatic Signing Key (7.0/wheezy) " imported
gpg: no ultimately trusted keys found
gpg: Total number processed: 1
gpg:               imported: 1  (RSA: 1)
# gpg -a --export 8B48AD6246925553 | apt-key add -
OK
# gpg --keyserver subkeys.pgp.net --recv-keys 6FB2A1C265FFB764
gpg: requesting key 65FFB764 from hkp server subkeys.pgp.net
gpg: key 65FFB764: public key "Wheezy Stable Release Key " imported
gpg: no ultimately trusted keys found
gpg: Total number processed: 1
gpg:               imported: 1  (RSA: 1)
# gpg -a --export 6FB2A1C265FFB764 | apt-key add -
OK

```

下記の警告はこの場合は特に気にしなくて良い。

> (What does the "gpg: no ultimately trusted keys found" warning mean? --> The Warning: "no ultimately trusted keys found" means that gpg was not configured to ultimately trust a specific key. Trust settings are part of OpenPGPs Web-of-Trust which does not apply here. So there is no problem with this warning. In usual setups the users own key is ultimately trusted.) 引用元：[SecureApt - Debian Wiki](https://wiki.debian.org/SecureApt)

この後はapt-get updateコマンドは正常実行されるが、念の為、鍵リストが更新されていることを確認する。

```
# apt-key list
/etc/apt/trusted.gpg
--------------------
pub   1024D/F42584E6 2008-04-06 [expired: 2012-05-15]
uid                  Lenny Stable Release Key 
pub   4096R/55BE302B 2009-01-27 [expired: 2012-12-31]
uid                  Debian Archive Automatic Signing Key (5.0/lenny) 
pub   2048R/6D849617 2009-01-24 [expired: 2013-01-23]
uid                  Debian-Volatile Archive Automatic Signing Key (5.0/lenny)
pub   4096R/B98321F9 2010-08-07 [expires: 2017-08-05]
uid                  Squeeze Stable Release Key 
pub   4096R/473041FA 2010-08-27 [expires: 2018-03-05]
uid                  Debian Archive Automatic Signing Key (6.0/squeeze) 
pub   4096R/46925553 2012-04-27 [expires: 2020-04-25]
uid                  Debian Archive Automatic Signing Key (7.0/wheezy) 
pub   4096R/65FFB764 2012-05-08 [expires: 2019-05-07]
uid                  Wheezy Stable Release Key 

```

### 参考サイト

- [SecureApt - Debian Wiki](https://wiki.debian.org/SecureApt)
- [Debian - Apt-get : NO\_PUBKEY / GPG error](http://en.kioskea.net/faq/809-debian-apt-get-no-pubkey-gpg-error)
