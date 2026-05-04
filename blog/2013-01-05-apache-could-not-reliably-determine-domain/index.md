---
title: 'Apache: 起動エラー - Could not reliably determine the server&#039;s fully qualified domain name'
date: 2013-01-05
authors: [yukun]
tags:
  - apache
  - centos
  - linux
slug: apache-could-not-reliably-determine-domain
---

### 事象

先日CentOS (v5.5)上でApache Webサーバをインストール直後に起動・再起動したところ、下記のエラーが発生した。

```
# apachectl restart
httpd: Could not reliably determine the server's fully qualified domain name, using localhost.localdomain for ServerName
httpd not running, trying to start

```

サーバのFQDNを確定できなかったと言うエラー。 
<!-- truncate -->


### 原因

httpd.confのServerNameディレクティブがコメントアウトされており、かつホスト名が指定されていなかった為。 下記の公式ドキュメントにはServerNameを指定しない場合の挙動までは記載が無いが、httpd.confのコメントには"we recommend you specify it explicitly to prevent problems during startup."とエラーを防止するためにServerNameの明示を推奨している。 [core - Apache HTTP サーバ バージョン 2.4](https://httpd.apache.org/docs/current/mod/core.html#servername)

> ServerName が指定されていないときは、 サーバは IP アドレスから逆引きを行なうことでホスト名を知ろうとします。 ServerName にポートが指定されていないときは、 サーバはリクエストが来ている ポートを使います。最高の信頼性と確実性をもたらすためには、 ServerName を使ってホスト名とポートを明示的に 指定してください。

↓httpd.conf

```
# ServerName gives the name and port that the server uses to identify itself.
# This can often be determined automatically, but we recommend you specify
# it explicitly to prevent problems during startup.
#
# If this is not set to valid DNS name for your host, server-generated
# redirections will not work.  See also the UseCanonicalName directive.
#
# If your host doesn't have a registered DNS name, enter its IP address here.
# You will have to access it by its address anyway, and this will make
# redirections work in a sensible way.

```

### 解決策

httpd.confのServerNameを明示してApacheサービスを起動し直すことで解決可能。 例) ServerName localhost:80

```
# service httpd start
Starting httpd:                                            [  OK  ]
# ps -ef | grep apache
apache    2687  2684  0 14:04 ?        00:00:00 /usr/sbin/httpd
apache    2688  2684  0 14:04 ?        00:00:00 /usr/sbin/httpd
apache    2689  2684  0 14:04 ?        00:00:00 /usr/sbin/httpd
apache    2690  2684  0 14:04 ?        00:00:00 /usr/sbin/httpd
apache    2691  2684  0 14:04 ?        00:00:00 /usr/sbin/httpd
apache    2692  2684  0 14:04 ?        00:00:00 /usr/sbin/httpd
apache    2693  2684  0 14:04 ?        00:00:00 /usr/sbin/httpd
apache    2694  2684  0 14:04 ?        00:00:00 /usr/sbin/httpd

```

### 補足 - Apacheの起動方法

RedHat系だと下記の3種類がある。

1. apachectl start
2. service httpd start
3. /etc/init.d/httpd start
