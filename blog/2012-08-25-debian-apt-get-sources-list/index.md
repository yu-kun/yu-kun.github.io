---
title: 'Debian: パッケージのダウンロード元指定(DVD-&gt;Web) - sources.list'
date: 2012-08-25
authors: [yukun]
tags:
  - debian
  - linux
  - setting
slug: debian-apt-get-sources-list
---

先日(といってもずいぶん前だが)VMwareからインストールしたDebianでapt-getによるVimパッケージのインストールを試みたところ、DVDの挿入を促すメッセージが出力された。

```
root@debian:~# apt-get install vim
Reading package lists... Done
Building dependency tree
Reading state information... Done
The following extra packages will be installed:
  vim-runtime
Suggested packages:
  ctags vim-doc vim-scripts
The following NEW packages will be installed:
  vim vim-runtime
0 upgraded, 2 newly installed, 0 to remove and 0 not upgraded.
Need to get 0 B/7,122 kB of archives.
After this operation, 27.8 MB of additional disk space will be used.
Do you want to continue [Y/n]? Y
Media change: please insert the disc labeled
 'Debian GNU/Linux 6.0.5 _Squeeze_ - Official amd64 DVD Binary-1 20120512-14:34'
in the drive '/media/cdrom/' and press enter

```

パッケージはWebからダウンロードする予定であった為、aptのダウンロード元設定ファイル(sources.list)を編集。

```
vi /etc/apt/sources.list

```

```
# ↓下記の行をコメントアウトすることで、CD, DVDへの読み込みを回避
# deb cdrom:[Debian GNU/Linux 6.0.5 _Squeeze_ - Official amd64 DVD Binary-1 20120512-14:34]/ squeeze contrib main
deb http://ftp.riken.jp/Linux/debian/debian/ squeeze main
deb-src http://ftp.riken.jp/Linux/debian/debian/ squeeze main
deb http://security.debian.org/ squeeze/updates main contrib
deb-src http://security.debian.org/ squeeze/updates main contrib
# squeeze-updates, previously known as 'volatile'
deb http://ftp.riken.jp/Linux/debian/debian/ squeeze-updates main contrib
deb-src http://ftp.riken.jp/Linux/debian/debian/ squeeze-updates main contrib

```

以上で次回以降のapt-getでは指定のURLからパッケージをダウンロードするようになる。
