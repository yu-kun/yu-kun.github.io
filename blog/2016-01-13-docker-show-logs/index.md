---
title: 'Docker: コンテナ内の標準出力の表示 - logs'
date: 2016-01-13
authors: [yukun]
tags:
  - docker
  - linux
slug: docker-show-logs
---

Dockerサブコマンドの一つである、[logs](https://docs.docker.com/engine/reference/commandline/logs/)はコンテナ内プロセスの標準出力及び標準エラー出力を表示する。

> Usage: docker logs \[OPTIONS\] CONTAINER Fetch the logs of a container -f, --follow=false Follow log output ＜後略＞

### 使用例

例として、下記のDockerfileで構築したコンテナの標準出力を確認する。当該Dockerfileは一つ誤りがあり、ビルドは成功しても実行時にエラーとなる。

```
FROM centos:centos7
RUN yum -y install httpd
CMD service httpd start && bash

```


<!-- truncate -->


### イメージのビルド

ここでは、build\_httpdディレクトリに保管した上記のDockerfileをビルドする際、-tオプションを用いて「リポジトリー名:タグ名」をyuukun/httpd:ver1.1と指定している。

```
$ docker build -t yuukun/httpd:ver1.1 /vagrant/build_httpd
＜中略＞
Successfully built a248e7f50217

```

### コンテナの実行

作成したイメージにweb01の名前を付け、ポート80をホストOS側の80番に紐づけて起動する。オプション-itで擬似端末への標準出力設定となり、-dでバックグラウンド起動となる。

```
$ docker run -itd -p 80:80 --name web01 yuukun/httpd:ver1.1
b738592e4c8a3817c590c51d768e552ab402df865124ae24611e8e4c80c13353

```

参考) [公式ドキュメント - run](https://docs.docker.com/engine/reference/commandline/run/)

> Usage: docker run \[OPTIONS\] IMAGE \[COMMAND\] \[ARG...\] Run a command in a new container -d, --detach=false Run container in background and print container ID -i, --interactive=false Keep STDIN open even if not attached -t, --tty=false Allocate a pseudo-TTY

その後、下記のコマンドでstatusを確認するがExited (127)で異常終了している。

```
$ docker ps -l
CONTAINER ID        IMAGE                 COMMAND                  CREATED             STATUS                        PORTS               NAMES
b738592e4c8a        yuukun/httpd:ver1.1   "/bin/sh -c 'service "   16 seconds ago      Exited (127) 15 seconds ago                       web01

```

### docker logsによる標準出力の確認

ここで、下記の通りコンテナ名を引数にdocker logsコマンドを使用すると、標準エラー出力が分かる。

```
$ docker logs web01
/bin/sh: service: command not found

```

結果として、CentOS7上では既にserviceコマンドが廃止されている為、command not foundエラーが発生し&&以降のbashが起動せずに異常終了したことが分かる。

### 補足

では仮に下記の通り、Dockerfileを下記の通り修正した場合は上手くいくかと言うと、別種のエラーが発生する。

```
CMD systemctl start httpd.service && bash

```

### Failed to get D-Bus connection: Operation not permittedエラー

```
$ docker run -itd -p 80:80 --name web01 yuukun/httpd:ver1.1
3de8195fa869b8507105d35b0fbd3249ae884f6f35d821494aea8efe4349d106
$ docker logs web01
Failed to get D-Bus connection: Operation not permitted
$

```

当該エラーに関わる対処法については下記のサイトに記述があるが、何れもDockerfile上でサービスの立ち上げまでは実現できてない。コンテナの起動後にコンテナを操作してサービスの立ち上げを実施している。この場合、Dockerfileのメリットを活かせていないので、使用コンテナをCentOS 6に変更するという考え方もある。

- [CentOS 7のDockerコンテナ内でsystemdを使ってサービスを起動する - Qiita](http://qiita.com/yunano/items/9637ee21a71eba197345)
- [\[Solved\] (Docker) Impossible to start any service with systemctl / System Administration / Arch Linux Forums](https://bbs.archlinux.org/viewtopic.php?id=194102)
