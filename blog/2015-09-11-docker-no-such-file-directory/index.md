---
title: 'Docker: コマンドエラーの解決法 - dial unix /var/run/docker.sock: no such file or directory'
date: 2015-09-11
authors: [yukun]
tags:
  - docker
slug: docker-no-such-file-directory
---

### 事象

Docker Toolbox 1.8.1を用いてMac OSにdockerクライアント環境を導入、Linux VM (docker machine)を構築後にdockerコマンドを実行したところ、下記のエラーが発生。

### エラーメッセージ

```
$ docker ps
Post http:///var/run/docker.sock/v1.20/containers/create: dial unix /var/run/docker.sock: no such file or directory.
* Are you trying to connect to a TLS-enabled daemon without TLS?
* Is your docker daemon up and running?

```


<!-- truncate -->


### 原因

dockerクライアントに操作対象のdocker machineを指定していなかった為。

### 解決法

docer-machine env <対象machine>コマンドでdocker machine を指定。例えば、"default”というdocker machineを使用したい場合は、下記の通り。

```
$ docker-machine env default
export DOCKER_TLS_VERIFY="1"
export DOCKER_HOST="tcp://192.168.99.101:2376"
export DOCKER_CERT_PATH="/Users/yu/.docker/machine/machines/default"
export DOCKER_MACHINE_NAME="default"
# Run this command to configure your shell:
# eval "$(docker-machine env default)"

```

上記の通り各環境変数が設定される。最後のeval〜コマンドを.bash\_profileに追加しておけば、今後起動するshellでも同様の設定となる。

### 参考サイト

- 公式：[Installation on Mac OS X](https://docs.docker.com/engine/installation/mac/)
    
    > In an OS X installation, the docker daemon is running inside a Linux VM called default. The default is a lightweight Linux VM made specifically to run the Docker daemon on Mac OS X. The VM runs completely from RAM, is a small ~24MB download, and boots in approximately 5s.
    
    Linux VMはMac OS X上でDocker daemonを稼働させるために作られた軽量Linux。VMは全てメモリ上で稼働し、ダウンロードファイルは24MB以下。
    
    > If you have previously installed the deprecated Boot2Docker application or run the Docker Quickstart Terminal, you may have a dev VM as well. When you created default, the docker-machine command provided instructions for learning how to connect the VM.
    

因みに使われているOSのディストリビューションを確認したところCore Linuxだった。

```
$ docker-machine ssh default
                        ##         .
                  ## ## ##        ==
               ## ## ## ## ##    ===
           /"""""""""""""""""\___/ ===
      ~~~ {~~ ~~~~ ~~~ ~~~~ ~~~ ~ /  ===- ~~~
           \______ o           __/
             \    \         __/
              \____\_______/
 _                 _   ____     _            _
| |__   ___   ___ | |_|___ \ __| | ___   ___| | _____ _ __
| '_ \ / _ \ / _ \| __| __) / _` |/ _ \ / __| |/ / _ \ '__|
| |_) | (_) | (_) | |_ / __/ (_| | (_) | (__|   <  __/ |
|_.__/ \___/ \___/ \__|_____\__,_|\___/ \___|_|\_\___|_|
Boot2Docker version 1.8.1, build master : 7f12e95 - Thu Aug 13 03:24:56 UTC 2015
Docker version 1.8.1, build d12ea79
docker@default:~$ cat /etc/issue
Core Linux

```
