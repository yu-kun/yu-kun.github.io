---
title: 'Kali Linux: apt-getによるTerminatorのインストール'
date: 2014-09-10
authors: [yukun]
tags:
  - linux
slug: kali-linux-apt-get-install-terminator
---

kali-linux-1.0.9-amd64をインストール後にapt-getでterminatorコンソールを導入しようとしたところ下記のエラーが発生。

```
# apt-get install terminator
Reading package lists... Done
Building dependency tree
Reading state information... Done
E: Unable to locate package terminator

```

### 解決法

ソースリストを以下の通り編集。

```
# vim /etc/apt/sources.list
## Security updates
deb  kali/updates main contrib non-free
deb http://http.kali.org/kali kali main non-free contrib ←これを追加

```

以下のコマンドでインストール後、メニューのApplication→Accessoriesから使用可能となる。

```
# apt-get update
# apt-get install terminator
Reading package lists... Done
Building dependency tree
Reading state information... Done
The following extra packages will be installed:
  libart-2.0-2 libbonoboui2-0 libbonoboui2-common libgnomecanvas2-0
  libgnomecanvas2-common libgnomeui-0 libgnomeui-common libkeybinder0
  libvte-common libvte9 python-gconf python-gnome2 python-keybinder
  python-pyorbit python-vte
Suggested packages:
  python-gnome2-doc
The following NEW packages will be installed:
  libart-2.0-2 libbonoboui2-0 libbonoboui2-common libgnomecanvas2-0
  libgnomecanvas2-common libgnomeui-0 libgnomeui-common libkeybinder0
  libvte-common libvte9 python-gconf python-gnome2 python-keybinder
  python-pyorbit python-vte terminator
0 upgraded, 16 newly installed, 0 to remove and 7 not upgraded.
Need to get 4,667 kB of archives.
After this operation, 16.6 MB of additional disk space will be used.
Do you want to continue [Y/n]? Y
＜後略＞

```

### 参考サイト

- [Install terminator \[Archive\] - Kali Linux Forums](https://forums.kali.org/archive/index.php/t-19061.html)
