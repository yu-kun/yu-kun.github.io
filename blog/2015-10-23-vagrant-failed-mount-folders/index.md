---
title: 'Vagrant: 仮想マシンのホスト-ゲスト間フォルダ共有でエラーが出る場合の解決法'
date: 2015-10-23
authors: [yukun]
tags:
  - centos
  - vagrant
slug: vagrant-failed-mount-folders
---

### 事象

VagrantでCentOS 7.1のVMを構築後にkernel-develをupdate後にホストからVMの再起動をしたところ、下記のエラーが発生。 
<!-- truncate -->


```
$ vagrant reload
＜中略＞
==> default: Mounting shared folders...
    default: /vagrant => /Users/yu/vagrant
Failed to mount folders in Linux guest. This is usually because
the "vboxsf" file system is not available. Please verify that
the guest additions are properly installed in the guest and
can work properly. The command attempted was:
mount -t vboxsf -o uid=`id -u vagrant`,gid=`getent group vagrant | cut -d: -f3` vagrant /vagrant
mount -t vboxsf -o uid=`id -u vagrant`,gid=`id -g vagrant` vagrant /vagrant
The error output from the last command was:
/sbin/mount.vboxsf: mounting failed with the error: No such device
$

```

### 発生環境

Mac OS X version 10.11.1 Vagrant 1.7.4

### 解決法1 - ゲストOS上でvboxadd setupの再実行

```
[vagrant@localhost ~]$ sudo /etc/init.d/vboxadd setup
Removing existing VirtualBox non-DKMS kernel modules       [  OK  ]
Building the VirtualBox Guest Additions kernel modules
The gcc utility was not found. If the following module compilation fails then
this could be the reason and you should try installing it.
The headers for the current running kernel were not found. If the following
module compilation fails then this could be the reason.
The missing package can be probably installed with
yum install kernel-devel-3.10.0-229.14.1.el7.x86_64
Building the main Guest Additions module                   [失敗]
(Look at /var/log/vboxadd-install.log to find out what went wrong)
Doing non-kernel setup of the Guest Additions              [  OK  ]

```

gccとkernel-develがたりない旨のメッセージが出力されてる為、下記のコマンドを実行後に、vboxadd setupを再実行。

```
[vagrant@localhost ~]$ sudo yum install kernel-devel-3.10.0-229.14.1.el7.x86_64
[vagrant@localhost ~]$ sudo yum install gcc
[vagrant@localhost ~]$ sudo /etc/init.d/vboxadd setup
Removing existing VirtualBox non-DKMS kernel modules       [  OK  ]
Building the VirtualBox Guest Additions kernel modules
Building the main Guest Additions module                   [  OK  ]
Building the shared folder support module                  [  OK  ]
Building the OpenGL support module                         [  OK  ]
Doing non-kernel setup of the Guest Additions              [  OK  ]
Starting the VirtualBox Guest Additions                    [  OK  ]

```

その後、ゲストVMからログアウトし、ホストOSから以下のコマンドでVM再起動し、エラーメッセージが無ければOK。

```
$ vagrant reload
==> default: Attempting graceful shutdown of VM...
==> default: Checking if box 'bento/centos-7.1' is up to date...
==> default: A newer version of the box 'bento/centos-7.1' is available! You currently
==> default: have version '2.2.0'. The latest is version '2.2.2'. Run
==> default: `vagrant box update` to update.
==> default: Clearing any previously set forwarded ports...
==> default: Clearing any previously set network interfaces...
==> default: Preparing network interfaces based on configuration...
    default: Adapter 1: nat
==> default: Forwarding ports...
    default: 22 => 2222 (adapter 1)
==> default: Booting VM...
==> default: Waiting for machine to boot. This may take a few minutes...
    default: SSH address: 127.0.0.1:2222
    default: SSH username: vagrant
    default: SSH auth method: private key
    default: Warning: Connection timeout. Retrying...
==> default: Machine booted and ready!
GuestAdditions 5.0.2 running --- OK.
==> default: Checking for guest additions in VM...
==> default: Mounting shared folders...
    default: /vagrant => /Users/yu/vagrant
==> default: Machine already provisioned. Run `vagrant provision` or use the `--provision`
==> default: flag to force provisioning. Provisioners marked to run always will still run.

```

デフォルトの設定だと、ゲストVMの/vagrantがホストOSのVagrantfileが保管されているディレクトリ(上記では/Users/yu/vagrant)に紐付けられる。

### 解決法2 - sudo /etc/init.d/vboxadd setupコマンドが実行不可の場合

仮に上述のvboxadd setupコマンドの実行が不可の場合、及び下記のエラーメッセージが出力されている場合の解決法を記載する。

```
[vagrant@localhost ~]$ tail /var/log/vboxadd-install.log
Creating udev rule for the Guest Additions kernel module.
/tmp/vbox.0/Makefile.include.header:115: *** Error: unable to find the include directory for your current Linux kernel. Specify KERN_INCL= and run Make again.  Stop.
Creating user for the Guest Additions.
Creating udev rule for the Guest Additions kernel module.

```

ホストOS側からvagrant-vbguestプラグインをインストールする。

```
$ vagrant plugin install vagrant-vbguest
Installing the 'vagrant-vbguest' plugin. This can take a few minutes...
Installed the plugin 'vagrant-vbguest (0.11.0)'!

```

その後、ゲストVM上で下記の通りkernel、kernel-develをインストールする。

```
$ sudo yum install gcc kernel kernel-devel

```

再度ホストOS側に戻り下記のコマンドでGuestAdditions versionのupdateを行う。

```
$ vagrant vbguest
$ vagrant reload

```

### 参考書籍・サイト

- [JS+Node.jsによるWebクローラー/ネットエージェント開発テクニック](http://www.amazon.co.jp/gp/product/4883379930/ref=as_li_ss_tl?ie=UTF8&camp=247&creative=7399&creativeASIN=4883379930&linkCode=as2&tag=bitsmining-22)のp32。
- [Failed to mount folders in Linux guest. This is usually because the "vboxsf" file system is not available.を直す方法 - Qiita](http://qiita.com/DQNEO/items/2375dd8002a831268cb5)
- [Vagrantのフォルダ同期のエラーの対処 - Qiita](http://qiita.com/ystg/items/6eed1079fd26b0212286)
