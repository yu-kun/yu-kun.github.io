---
title: 'Vagrantで構築したCentOSにDocker Engineをインストール'
date: 2015-10-24
authors: [yukun]
tags:
  - centos
  - docker
  - vagrant
slug: install-docker-vagrant-centos
---

本記事はVagrantで構築したCentOS v7.1にDockerパッケージをインストールする手順。 
<!-- truncate -->


### VagrantでCentOS v7.1を構築

#### 前提環境

ホストOS：Mac OS X version 10.11.1 Vagrant Version： 1.7.4

#### Vagrantfileの作成とVMの作成

```
$ vagrant plugin install vagrant-vbguest
$ mkdir vagrant ← Vagrantfileの保管先フォルダの作成
$ cd vagrant/
$ vagrant init ← Vagrantfileの作成
$ vim Vagrantfile
↓をコメントアウト
#  config.vm.box = "base"
config.vm.box = "bento/centos-7.1"
↑と↓を追記
config.vbguest.auto_update = true
$ vagrant up ← VM (CentOS)の立ち上げ(初回はOS Imageのダウンロードが入る)
$ vagrant status
Current machine states:
default                   running (virtualbox)
$ vagrant ssh ← VMへログイン
[vagrant@localhost ~]$ cat /etc/redhat-release
CentOS Linux release 7.1.1503 (Core)

```

#### タイムゾーンをJSTに設定

```
[vagrant@localhost ~]$  date
2015年 10月 24日 土曜日 13:15:00 UTC
[vagrant@localhost ~]$ sudo cp -p /usr/share/zoneinfo/Japan /etc/localtime
[vagrant@localhost ~]$ date
2015年 10月 24日 土曜日 22:15:38 JST

```

#### 各種パッケージのアップデート・インストール

```
[vagrant@localhost ~]$ sudo yum update
[vagrant@localhost ~]$ sudo yum install vim
[vagrant@localhost ~]$ sudo yum install gcc
[vagrant@localhost ~]$ sudo yum install kernel-devel

```

#### firewalldサービスの停止

開発用との為、ここではfirewalldサービスを停止する。

```
[vagrant@localhost ~]$ sudo systemctl stop firewalld.service
[vagrant@localhost ~]$ sudo systemctl mask firewalld.service

```

maskサブコマンドを実行すると、当該サービスがmask化され、systemctl startで手動起動もできなくなる。

#### vboxadd setup

```
[vagrant@localhost ~]$ sudo /etc/init.d/vboxadd setup
Removing existing VirtualBox non-DKMS kernel modules       [  OK  ]
Building the VirtualBox Guest Additions kernel modules
Building the main Guest Additions module                   [  OK  ]
Building the shared folder support module                  [  OK  ]
Building the OpenGL support module                         [  OK  ]
Doing non-kernel setup of the Guest Additions              [  OK  ]
You should restart your guest to make sure the new modules are actually used

```

#### Guest AdditionsのVersion確認

ホストOSから下記のコマンドを実行。

```
$ vagrant vbguest
GuestAdditions 5.0.2 running --- OK.

```

#### VMの再起動

ホストOSから下記のコマンドを実行。

```
$ vagrant reload

```

以上で、Dockerをインストールするに際して必要なCentOS環境の作成が完了。

### Dockerのインストール

#### 前提環境

> Docker runs on CentOS 7.X. ＜中略＞ Docker requires a 64-bit installation regardless of your CentOS version. Also, your kernel must be 3.10 at minimum, which CentOS 7 runs. [Installation on CentOS](https://docs.docker.com/install/linux/docker-ce/centos/)より

#### kernel versionチェック

3.10以上であることを確認する。

```
[vagrant@localhost ~]$ uname -r
3.10.0-229.14.1.el7.x86_64

```

#### yum リポジトリを追加

```
[vagrant@localhost ~]$ sudo vim /etc/yum.repos.d/docker.repo
[dockerrepo]
name=Docker Repository
baseurl=https://yum.dockerproject.org/repo/main/centos/7
enabled=1
gpgcheck=1
gpgkey=https://yum.dockerproject.org/gpg

```

#### Dockerパッケージのインストールとデーモン起動、コンテナ起動確認

```
[vagrant@localhost ~]$ sudo yum install docker-engine
[vagrant@localhost ~]$ sudo service docker start
Starting docker (via systemctl):                           [  OK  ]
[vagrant@localhost ~]$ sudo docker run hello-world
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
b901d36b6f2f: Pull complete
0a6ba66e537a: Pull complete
Digest: sha256:517f03be3f8169d84711c9ffb2b3235a4d27c1eb4ad147f6248c8040adb93113
Status: Downloaded newer image for hello-world:latest
Hello from Docker.
This message shows that your installation appears to be working correctly.
To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.
To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash
Share images, automate workflows, and more with a free Docker Hub account:
 https://hub.docker.com
For more examples and ideas, visit:
 https://docs.docker.com/get-started/
[vagrant@localhost ~]$ sudo docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             VIRTUAL SIZE
hello-world         latest              0a6ba66e537a        10 days ago         960 B

```

#### Dockerグループの作成とユーザー追加

dockerデーモンがTCP portの代わりにUnix socketへbindしている為、デーモンはUnix socketのownerであるroot権限が常に必要となる。開発時に毎回dockerコマンドにsudoを付けるのを避ける為、dockerグループに開発ユーザーを追加する。これに伴う、セキュリティ上の考慮点は下記を参照。 [Docker security](https://docs.docker.com/articles/security/#docker-daemon-attack-surface)

```
[vagrant@localhost ~]$ id
uid=1000(vagrant) gid=1000(vagrant) groups=1000(vagrant) context=unconfined_u:unconfined_r:unconfined_t:s0-s0:c0.c1023
[vagrant@localhost ~]$ sudo usermod -aG docker vagrant
[vagrant@localhost ~]$ cat /etc/group
＜中略＞
docker:x:995:vagrant
[vagrant@localhost ~]$ exit
$ vagrant ssh
[vagrant@localhost ~]$ id
uid=1000(vagrant) gid=1000(vagrant) groups=1000(vagrant),995(docker) context=unconfined_u:unconfined_r:unconfined_t:s0-s0:c0.c1023
[vagrant@localhost ~]$ docker run hello-world
↑sudo無しでdockerコマンドが実行できることを確認

```

#### CentOS VM boot時にdockerデーモンを起動

```
[vagrant@localhost ~]$ sudo chkconfig docker on
情報:'systemctl enable docker.service'へ転送しています。
ln -s '/usr/lib/systemd/system/docker.service' '/etc/systemd/system/multi-user.target.wants/docker.service'
[vagrant@localhost ~]$ systemctl list-unit-files | grep docker
docker.service                                            enabled
docker.socket                                             disabled

```

vagrant reload後にdockerサービスが立ち上がっていればOK。

### 参考サイト

- [Vagrant box bento/centos-7.4](https://app.vagrantup.com/bento/boxes/centos-7.4)
- \[Vagrant\] VirtualBoxのバージョンとGuest additionsのバージョンが合わない場合の対処法 - Code Life
- [Vagrant の Box の Guest Additions を最新化する方法 | WEB ARCH LABO](http://weblabo.oscasierra.net/vagrant-vbguest-plugin-1/)
- [Installation on CentOS](https://docs.docker.com/install/linux/docker-ce/centos/)
