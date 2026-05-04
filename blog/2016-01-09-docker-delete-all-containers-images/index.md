---
title: 'Docker: 全コンテナの一括停止・削除とイメージ削除 - rm, rmi'
date: 2016-01-09
authors: [yukun]
tags:
  - docker
slug: docker-delete-all-containers-images
---

### コンテナの一括停止

```
$ docker stop $(docker ps -q)

```

### コンテナの一括削除

Docker管理のコンテナで停止中(stop)のコンテナを一括削除するコマンドは下記の通り。

```
$ docker rm $(docker ps -aq)

```


<!-- truncate -->
 参考) 公式ドキュメント (rm) : [Docker Docs - rm](https://docs.docker.com/engine/reference/commandline/rm/) docker ps の -qオプションはコンテナIDのみ出力するオプション。 [Docker - Docs - ps](https://docs.docker.com/engine/reference/commandline/ps/)

### イメージの一括削除

イメージの場合は下記の通り。($で括る書き方でも良い。)

```
$ docker rmi `docker images -aq`

```

Dockerfileの修正・ビルドを繰り返している場合、中間イメージが肥大している場合があり、ゴミ掃除の際に使用する。

### docker rmコマンドの使用例

```
$ docker ps -a
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                      PORTS               NAMES
aaca56341c4d        0312f126b0ad        "/bin/sh -c 'sudo sys"   44 hours ago        Exited (127) 44 hours ago                       naughty_albattani
9882855ddde7        0312f126b0ad        "/bin/sh -c 'systemct"   44 hours ago        Exited (1) 44 hours ago                         sleepy_mclean
16ed7ce048d3        da7b5d470577        "/bin/sh -c 'systemct"   44 hours ago        Exited (1) 44 hours ago                         ecstatic_spence
e86de205fb0b        centos:latest       "/bin/bash"              8 days ago          Exited (0) 8 days ago                           gigantic_newton
d22d9e23d4e2        centos              "/bin/bash"              8 days ago          Exited (0) 8 days ago                           loving_mcnulty
4320c7d41f5b        hello-world         "/hello"                 10 weeks ago        Exited (0) 10 weeks ago                         focused_thompson
a9718fd17766        hello-world         "/hello"                 11 weeks ago        Exited (0) 11 weeks ago                         romantic_turing
0a893bac3374        hello-world         "/hello"                 11 weeks ago        Exited (0) 11 weeks ago                         high_lalande
75dd8f42dc00        hello-world         "/hello"                 11 weeks ago        Exited (0) 11 weeks ago                         stupefied_panini
$ docker rm `docker ps -aq`
aaca56341c4d
9882855ddde7
16ed7ce048d3
e86de205fb0b
d22d9e23d4e2
4320c7d41f5b
a9718fd17766
0a893bac3374
75dd8f42dc00
$

```

### 参考サイト

- [Docker の未使用コンテナとイメージを削除 - Qiita](http://qiita.com/rerofumi/items/c540bfbfe663a0dd6777)
- [dockerイメージを効率的に運用するためにやっていること - Qiita](http://qiita.com/devneko/items/aaf858d7267bde82d012)
- [Dockerで<none>なイメージを一括で削除するワンライナー - Qiita](http://qiita.com/DQNEO/items/e3a03a14beb616630032) → このワンライナーはdocker v1.9.1では機能しなかった。。
