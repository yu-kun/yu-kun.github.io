---
title: 'Linux: PHP, MySQLのyum update - Remiレポジトリ'
date: 2013-08-04
authors: [yukun]
tags:
  - linux
  - mysql
  - php
slug: linux-php-mysql-yum-update-remi
---

CentOSを使用しているがデフォルトのyumリポジトリだとPHP, MySQLのバージョンが古いので、これまでサードパーティーのリポジトリ、[Remi](http://rpms.famillecollet.com/)を用いていた。当記事はRemiリポジトリを用いてのyum updateの覚え書きとなる。Remiのインストールや設定、PHP, MySQLのインストール、設定は割愛する。 
<!-- truncate -->


### PHPのupdate

バージョン確認とアップデートパッケージの確認。

```
# rpm -qa | grep php
php-cli-5.3.6-4.el5.remi
php-mysql-5.3.6-4.el5.remi
php-common-5.3.6-4.el5.remi
php-5.3.6-4.el5.remi
php-mbstring-5.3.6-4.el5.remi
php-pdo-5.3.6-4.el5.remi
php-mcrypt-5.3.6-4.el5.remi
# yum --enablerepo=remi info php
Loaded plugins: fastestmirror, priorities
Loading mirror speeds from cached hostfile
 * base: ftp.nara.wide.ad.jp
 * epel: ftp.iij.ad.jp
 * extras: ftp.nara.wide.ad.jp
 * remi: mirror.smartmedia.net.id
 * rpmforge: mirror.fairway.ne.jp
 * updates: ftp.nara.wide.ad.jp
remi                                                                                             | 2.5 kB     00:00
remi/primary_db                                                                                  | 480 kB     00:03
Excluding Packages from CentOS-5 - Base
Finished
608 packages excluded due to repository priority protections
Installed Packages
Name       : php
Arch       : x86_64
Version    : 5.3.6
Release    : 4.el5.remi
Size       : 3.6 M
Repo       : installed
Summary    : PHP HTML 埋め込みのスクリプト言語 (PHP: Hypertext Preprocessor)
URL        : http://www.php.net/
License    : PHP
Description: PHP is an HTML-embedded scripting language. PHP attempts to make it
           : easy for developers to write dynamically generated webpages. PHP also
           : offers built-in database integration for several commercial and
           : non-commercial database management systems, so writing a
           : database-enabled webpage with PHP is fairly simple. The most common
           : use of PHP coding is probably as a replacement for CGI scripts.
           :
           : The php package contains the module which adds support for the PHP
           : language to Apache HTTP Server.
Available Packages
Name       : php
Arch       : x86_64
Version    : 5.4.17
Release    : 2.el5.remi
Size       : 3.1 M
Repo       : remi
Summary    : PHP scripting language for creating dynamic web sites
URL        : http://www.php.net/
License    : PHP and Zend and BSD
Description: PHP is an HTML-embedded scripting language. PHP attempts to make it
           : easy for developers to write dynamically generated web pages. PHP also
           : offers built-in database integration for several commercial and
           : non-commercial database management systems, so writing a
           : database-enabled webpage with PHP is fairly simple. The most common
           : use of PHP coding is probably as a replacement for CGI scripts.
           :
           : The php package contains the module which adds support for the PHP
           : language to Apache HTTP Server.

```

Remiリポジトリをenableにして、アップデート。

```
# yum --enablerepo=remi update php

```

### MySQLのupdate

バージョン確認とアップデートパッケージの確認。

```
# rpm -qa | grep mysql
mysql-5.5.17-1.el5.remi
mysqlclient15-5.0.67-1.el5.remi
mysql-server-5.5.17-1.el5.remi
php-mysql-5.4.17-2.el5.remi
mysql-libs-5.5.17-1.el5.remi
mysql-devel-5.5.17-1.el5.remi
# yum --enablerepo=remi info mysql.x86_64
Loaded plugins: fastestmirror, priorities
Loading mirror speeds from cached hostfile
 * base: ftp.nara.wide.ad.jp
 * epel: ftp.iij.ad.jp
 * extras: ftp.nara.wide.ad.jp
 * remi: mirror.smartmedia.net.id
 * rpmforge: mirror.fairway.ne.jp
 * updates: ftp.nara.wide.ad.jp
Excluding Packages from CentOS-5 - Base
Finished
608 packages excluded due to repository priority protections
Installed Packages
Name       : mysql
Arch       : x86_64
Version    : 5.5.17
Release    : 1.el5.remi
Size       : 28 M
Repo       : installed
Summary    : MySQL のクライアントプログラムと共有ライブラリ。
URL        : http://www.mysql.com
License    : GPLv2 with exceptions
Description: MySQL is a multi-user, multi-threaded SQL database server. MySQL is a
           : client/server implementation consisting of a server daemon (mysqld)
           : and many different client programs and libraries. The base package
           : contains the MySQL client programs, the client shared libraries, and
           : generic MySQL files.
Available Packages
Name       : mysql
Arch       : x86_64
Version    : 5.5.33
Release    : 1.el5.remi
Size       : 7.5 M
Repo       : remi
Summary    : MySQL client programs and shared libraries
URL        : http://www.mysql.com
License    : GPLv2 with exceptions and LGPLv2 and BSD
Description: MySQL is a multi-user, multi-threaded SQL database server. MySQL is a
           : client/server implementation consisting of a server daemon (mysqld)
           : and many different client programs and libraries. The base package
           : contains the standard MySQL client programs and generic MySQL files.

```

Remiリポジトリをenableにして、アップデート。(x86\_64明記, mysql-server明記)

```
# yum --enablerepo=remi update mysql.x86_64 mysql-server.x86_64

```
