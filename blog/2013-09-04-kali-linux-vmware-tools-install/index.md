---
title: 'Kali LinuxへのVMWare Toolsのインストール'
date: 2013-09-04
authors: [yukun]
tags:
  - linux
  - vmware
slug: kali-linux-vmware-tools-install
---

[前回](/blog/linux-backtrack-vmware-tools-install "Linux: BackTrack5 RC3にVMWare Toolsをインストール")に引き続きBackTrackの後継であるKali LinuxへのVMWare Toolsのインストール方法を記載する。BTと比較してKaliは下記の2コマンドでインストールでき、Kaliを再起動すれば反映・起動が完了する。 

```bash
# apt-get install open-vm-tools
# apt-get install open-vm-toolbox
```


### 追記 (2014-09-07)

kali 1.0.9では上記のコマンドでのインストールが出来ない為、VMWareメニューのVirtual Machine→Install VMware Toolを実行し、/media/cdrom0から適当なフォルダにVMwareTools\*.tar.gzファイルを解凍しperlスクリプトを実行する。

```
# tar zxvf VMwareTools-9.6.2-1688356.tar.gz
# cd vmware-tools-distrib/
# ./vmware-install.pl

```

### 参考サイト

- [Installing VMWare Tools on Kali 1.0.4](http://forums.kali.org/showthread.php?18468-Installing-VMWare-Tools-on-Kali-1-0-4)
- VMware Tools in a Kali Guest | Kali Linux Official Documentation
