---
title: 'Vagrant: VMに固定IPアドレスを割り振る - config.vm.network'
date: 2015-12-28
authors: [yukun]
tags:
  - linux
  - vagrant
slug: vagrant-static-ip-address
---

### 目的

Vagrantで作成したVM (Linux \[CentOS\])にプライベートな固定IPアドレスをVagrantfileを用いて設定する。

### 背景用途

VMで構築したApache webサーバー用Dockerコンテナの稼働確認としてホストOS側のブラウザからVMに対してHTTPアクセスしたい為。 
<!-- truncate -->


### 実行環境

#### ホストOS側

OS X EI Capitan Vagrant 1.7.4

#### VM側

CentOS Linux release 7.2.1511 (Core)

### Vagrantfileの編集

Vagrantfileファイル中程にある「config.vm.network "private\_network"〜」の行頭コメントアウトを削除。

```
  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  config.vm.network "private_network", ip: "192.168.33.10"

```

この場合、「ip: 〜」以降のアドレスが設定される。

### 固定IPアドレスの設定確認

Vagrantfileの編集後、下記コマンドにてVMを再起動。

```
$ vagrant reload

```

VM上でIPが設定されていることを確認。

```
[vagrant@localhost ~]$ ip addr
＜中略＞
3: enp0s8:  mtu 1500 qdisc pfifo_fast state UP qlen 1000
    link/ether 08:00:27:c2:ef:c2 brd ff:ff:ff:ff:ff:ff
    inet 192.168.33.10/24 brd 192.168.33.255 scope global enp0s8
       valid_lft forever preferred_lft forever
    inet6 fe80::a00:27ff:fec2:efc2/64 scope link
       valid_lft forever preferred_lft forever
＜後略＞

```

因みにホスト側にもVM用のIFとルーティングが追加されいてる。

```
$ ifconfig
＜中略＞
vboxnet1: flags=8943 mtu 1500
	ether 0a:00:27:00:00:01
	inet 192.168.33.1 netmask 0xffffff00 broadcast 192.168.33.255
＜後略＞
$ netstat -rn | grep vbox
192.168.33         link#17            UC              3        0 vboxnet
192.168.33.255     link#17            UHLWbI          1        9 vboxnet
192.168.99         link#12            UC              4        0 vboxnet
192.168.99.100     8:0:27:ce:de:b3    UHLWIi          1       14 vboxnet   1059
192.168.99.255     link#12            UHLWbI          1        9 vboxnet
$ ping 192.168.33.10
PING 192.168.33.10 (192.168.33.10): 56 data bytes
64 bytes from 192.168.33.10: icmp_seq=0 ttl=64 time=0.403 ms
64 bytes from 192.168.33.10: icmp_seq=1 ttl=64 time=0.329 ms
64 bytes from 192.168.33.10: icmp_seq=2 ttl=64 time=0.328 ms
＜後略＞

```

### 参考サイト

- [Private Networks - Networking - Vagrant Documentation](https://www.vagrantup.com/docs/networking/private_network.html)
