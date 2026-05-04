---
title: 'Linux: sarコマンドで&quot;LINUX RESTART&quot;のみが表示される場合の対処'
date: 2013-07-23
authors: [yukun]
tags:
  - linux
slug: sar-linux-restart
---

sar (System Admin Reporter) コマンド実行後にパフォーマンス統計データが出力されず、以下のように"LINUX RESTART"のみが表示される場合がある。 

```bash
$ sar -r
Linux 2.6.32-358.14.1.el6.x86_64 (localhost.localdomain) 	07/21/2013 	_x86_64_	(2 CPU)
07:41:43 AM       LINUX RESTART
```

 原因はシステム起動、再起動直後〜最初のcrondによるsa1スクリプト(内部ではsadcコマンド)によるデータ収集がされていない為。 
<!-- truncate -->
 /etc/cron.d/sysstatにcron定義があるので確認すると以下の通り10分間隔で収集していることが分かる。

```
# Run system activity accounting tool every 10 minutes
*/10 * * * * root /usr/lib64/sa/sa1 1 1
# 0 * * * * root /usr/lib64/sa/sa1 600 6 &
# Generate a daily summary of process accounting at 23:53
53 23 * * * root /usr/lib64/sa/sa2 -A

```

システム起動後10分待ってから再度コマンドを実行すると以下のように統計データを表示可能。 

```bash
$ sar -r
Linux 2.6.32-358.14.1.el6.x86_64 (localhost.localdomain) 	07/21/2013 	_x86_64_	(2 CPU)
07:41:43 AM       LINUX RESTART
07:50:01 AM kbmemfree kbmemused  %memused kbbuffers  kbcached  kbcommit   %commit
08:00:01 AM    442448    570096     56.30     27584    260840    575160     18.89
08:10:01 AM    442044    570500     56.34     28000    261040    575168     18.89
Average:       442246    570298     56.32     27792    260940    575164     18.89
```

 当コマンドを覚え始めの時に"LINUX RESTART"しか出力されずに焦った経緯があったので、今回記事にしたもの。尚、下記の参考サイトはsarについて結構分かり易く書いてある。オススメ。

### 参考サイト

- [Linux管理者への道（7）：障害の兆候を見逃さないためのサーバ監視 (2/3) - ＠IT](http://www.atmarkit.co.jp/ait/articles/0303/15/news004_2.html)
