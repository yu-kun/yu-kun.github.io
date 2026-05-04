---
title: 'Linux: Apacheの設定ファイル(httpd.conf)の検索 - BackTrack'
date: 2012-12-30
authors: [yukun]
tags:
  - apache
  - backtrack
  - linux
slug: linux-find-apache-httpd-conf
---

BackTrack上のhttpd.confを開こうと思い、/etc/httpd/へ探しに行ったら当該ディレクトリが無いとのこと(ディストリビューションやビルド方法によってよくある。。)。そういった場合は以下のように検索する。 メニューからApacheを起動後、下記のコマンドを実行する。

### コマンド

```
# ps -ef | grep apache　← apacheのパスを確認
# /usr/sbin/apache2 -V　← parametersを確認

```

### 実行結果

```
root@bt:~# ps -ef | grep apache
root      1965     1  0 13:27 ?        00:00:00 /usr/sbin/apache2 -k start
www-data  1969  1965  0 13:27 ?        00:00:00 /usr/sbin/apache2 -k start
www-data  1970  1965  0 13:27 ?        00:00:00 /usr/sbin/apache2 -k start
www-data  1971  1965  0 13:27 ?        00:00:00 /usr/sbin/apache2 -k start
www-data  1972  1965  0 13:27 ?        00:00:00 /usr/sbin/apache2 -k start
www-data  1973  1965  0 13:27 ?        00:00:00 /usr/sbin/apache2 -k start
www-data  2015  1965  0 13:27 ?        00:00:00 /usr/sbin/apache2 -k start
root      2138  2020  0 13:55 pts/0    00:00:00 script apache_conf_path.txt
root      2139  2138  0 13:55 pts/0    00:00:00 script apache_conf_path.txt
root      2154  2140  0 13:57 pts/1    00:00:00 grep --color=auto apache
root@bt:~# /usr/sbin/apache2 -V
Server version: Apache/2.2.14 (Ubuntu)
Server built:   Nov 18 2010 21:19:09
Server's Module Magic Number: 20051115:23
Server loaded:  APR 1.3.8, APR-Util 1.3.9
Compiled using: APR 1.3.8, APR-Util 1.3.9
Architecture:   64-bit
Server MPM:     Prefork
  threaded:     no
    forked:     yes (variable process count)
Server compiled with....
 -D APACHE_MPM_DIR="server/mpm/prefork"
 -D APR_HAS_SENDFILE
 -D APR_HAS_MMAP
 -D APR_HAVE_IPV6 (IPv4-mapped addresses enabled)
 -D APR_USE_SYSVSEM_SERIALIZE
 -D APR_USE_PTHREAD_SERIALIZE
 -D SINGLE_LISTEN_UNSERIALIZED_ACCEPT
 -D APR_HAS_OTHER_CHILD
 -D AP_HAVE_RELIABLE_PIPED_LOGS
 -D DYNAMIC_MODULE_LIMIT=128
 -D HTTPD_ROOT=""
 -D SUEXEC_BIN="/usr/lib/apache2/suexec"
 -D DEFAULT_PIDLOG="/var/run/apache2.pid"
 -D DEFAULT_SCOREBOARD="logs/apache_runtime_status"
 -D DEFAULT_LOCKFILE="/var/run/apache2/accept.lock"
 -D DEFAULT_ERRORLOG="logs/error_log"
 -D AP_TYPES_CONFIG_FILE="/etc/apache2/mime.types"
 -D SERVER_CONFIG_FILE="/etc/apache2/apache2.conf"
root@bt:~#

```

結果、設定ファイルのパスは/etc/apache2/apache2.confと分かる。
