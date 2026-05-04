---
title: 'Nginx: Let’s Encrypt (certbot)のTLS/SSL証明書をcronで定期自動更新する設定'
date: 2019-02-04
authors: [yukun]
tags:
  - certification
  - cron
  - nginx
  - tls
slug: cron-certbot-renew
---

本記事は[前回](/blog/nginx-lets-encrypt-certificate-update)の続きで、Let’s Encrypt認証局のTLS/SSL証明書の入手・更新クライアントであるcertbotを用いた証明書の自動更新設定を記載している。


<!-- truncate -->


### 前提

実行環境はLinux (CentOS7)。crondは下記のコマンドを用いて正常稼働していることを確認しておく。以降の作業は全てroot権限で実施。

```
# systemctl status crond
* crond.service - Command Scheduler
   Loaded: loaded (/usr/lib/systemd/system/crond.service; enabled; vendor preset: enabled)
   Active: active (running) since Sat 2018-11-10 02:16:46 JST; 2 weeks 0 days ago
 Main PID: 569 (crond)
   CGroup: /system.slice/crond.service
           `-569 /usr/sbin/crond -n

Nov 10 02:16:46 localhost.localdomain systemd[1]: Started Command Scheduler.
Nov 10 02:16:46 localhost.localdomain systemd[1]: Starting Command Scheduler...
Nov 10 02:16:46 localhost.localdomain crond[569]: (CRON) INFO (Syslog will be used instead of s...l.)
Nov 10 02:16:46 localhost.localdomain crond[569]: (CRON) INFO (RANDOM_DELAY will be scaled with...d.)
Nov 10 02:16:47 localhost.localdomain crond[569]: (CRON) INFO (running with inotify support)
Hint: Some lines were ellipsized, use -l to show in full.

```

### cronへの設定方法

エディタ(Vim, nanoなど)でcron用の設定ファイルを作成する。crontab -eオプションでも編集は可能だが、crontab -rオプションで設定を削除してしまうオペミスがまれにある為、別名で設定ファイルを作成の上、ファイルをcronに読み込ませる手法が安全牌。

```
# nano cron.txt ← nanoエディタを起動。後述のcrontab -lの出力結果をコピペ保存して閉じる
# crontab cron.txt ← cron.txtファイル内容で設定
# crontab -l　← 設定状態を出力
PATH=/usr/local/bin:/usr/bin:/bin
PYTHONIOENCODING='utf-8'

0 0,12 * * * python -c 'import random; import time; time.sleep(random.random() * 3600)' && certbot renew --post-hook "systemctl reload nginx"

```

処理内容は、0〜1時間(ランダム)のsleep後、certbot renewコマンドを実行。--post-hookオプションにより、certbot renew実行後にnginxの設定ファイルのリロードを実行(証明書の再読み込みの為)。尚、当該コマンドの実行間隔(0 0,12 \* \* \*)の意味は、毎日0時と12時に実行。sleep間隔を踏まえると、毎日00:00:00~00:59:59と12:00:00~12:59:59の間に実行する。

以下にcronの実行間隔の書式を引用する。

```
# Example of job definition:
# .---------------- minute (0 - 59)
# | .------------- hour (0 - 23)
# | | .---------- day of month (1 - 31)
# | | | .------- month (1 - 12) OR jan,feb,mar,apr ...
# | | | | .---- day of week (0 - 6) (Sunday=0 or 7) OR sun,mon,tue,wed,thu,fri,sat
# | | | | |
# * * * * * user-name command to be executed

```

### 稼働確認方法

cronの実行ログはデフォルトで下記に/var/log/cronに出力される為、最新ログは下記のコマンドで確認可能。

```
# tail /var/log/cron
や
# tail -200 /var/log/cron | grep certbot
Jun 26 00:00:02 150-95-200-203 CROND[11487]: (root) CMD 
(python -c 'import random; import time; time.sleep(random.random() * 3600)' && certbot renew)

他にもletsencrypt.logを確認するのも手。
# cat /var/log/letsencrypt/letsencrypt.log

```

### 公式ドキュメント

- [Certbot Nginx on CentOS/RHEL 7](https://certbot.eff.org/lets-encrypt/centosrhel7-nginx) セットアップから自動更新設定まで記載。ただしreloadの記述はなし。
- [User Guide — Certbot 0.31.0.dev0 documentation](https://certbot.eff.org/docs/using.html#renewal) standaloneプラグインの場合はrenewの更新前にnginxのサービス停止、完了後に起動のステップとしている。前回の記事ベースで設定している場合、nginxサービスを落とすと、httpを用いたファイル存置認証も出来なくなるため、今回はこちらの手法は採っていない。
