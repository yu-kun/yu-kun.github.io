---
title: 'CentOS: postfix/smtpd[xxxxx]: fatal: in parameter smtpd_relay_restrictions or smtpd_recipient_restrictions, specify at least one working... エラーの解決法'
date: 2019-12-16
authors: [yukun]
tags:
  - centos
  - linux
  - postfix
slug: postfix-smtpd-restrictions-error
---

表題のエラーは先日Postfixをv2.10.1からv3.4.7へアップグレードし移行対応した際に発生した事象の一つ。

### 事象 - エラーログ内容 ( /var/log/maillog )

閲覧性の向上の為、適時改行を入れて掲載する。


<!-- truncate -->


```bash
 Dec 16 17:46:15 tk2-228-23559.vs.sakura.ne.jp systemd[1]: Starting Postfix Mail Transport Agent… Dec 16 17:46:16 tk2-228-23559.vs.sakura.ne.jp postfix/master[28257]: daemon started -- version 3.4.7, configuration /etc/postfix Dec 16 17:46:16 tk2-228-23559.vs.sakura.ne.jp systemd[1]: Started Postfix Mail Transport Agent. Dec 16 17:46:31 tk2-228-23559.vs.sakura.ne.jp postfix/smtpd[28279]: fatal: in parameter smtpd_relay_restrictions or smtpd_recipient_restrictions, specify at least one working instance of: reject_unauth_destination, defer_unauth_destination, reject, defer, defer_if_permit or check_relay_domains Dec 16 17:46:32 tk2-228-23559.vs.sakura.ne.jp postfix/master[28257]: warning: process /usr/libexec/postfix/smtpd pid 28279 exit status 1 
```


### 発生環境

CentOS 7, Postfix v3.4.7

### 原因

エラーメッセージに記載の通り、smtpd\_relay\_restrictions か smtpd\_recipient\_restrictionsに有効なパラメーターを指定してなかった為。

### 解決法

下記のファイル各々にrestrictions設定を追加。

#### /etc/postfix/main.cf

```
smtpd_recipient_restrictions =
    permit_mynetworks,
    permit_sasl_authenticated,
    reject_unauth_destination
```

#### /etc/postfix/master.cf

```
#  -o smtpd_relay_restrictions=permit_sasl_authenticated,reject ← コメントアウト
  -o smtpd_relay_restrictions=permit_sasl_authenticated,reject_unauth_destination
```

編集終了後に下記のコマンドでシンタックスチェックの上、サービスの再起動を行う。


```bash
 # postfix check # systemctl restart postfix # systemctl status postfix -l * postfix.service - Postfix Mail Transport Agent Loaded: loaded (/usr/lib/systemd/system/postfix.service; enabled; vendor preset: disabled) Active: active (running) since Mon 2019-12-16 18:03:07 JST; 14s ago Process: 28630 ExecStop=/usr/sbin/postfix stop (code=exited, status=0/SUCCESS) Process: 28647 ExecStart=/usr/sbin/postfix start (code=exited, status=0/SUCCESS) Process: 28644 ExecStartPre=/usr/libexec/postfix/chroot-update (code=exited, status=0/SUCCESS) Process: 28641 ExecStartPre=/usr/libexec/postfix/aliasesdb (code=exited, status=0/SUCCESS) Main PID: 28722 (master) CGroup: /system.slice/postfix.service |-28722 /usr/libexec/postfix/master -w |-28723 pickup -l -t unix -u `-28724 qmgr -l -t unix -u

Dec 16 18:03:07 tk2-228-23559.vs.sakura.ne.jp systemd[1]: Starting Postfix Mail Transport Agent... Dec 16 18:03:07 tk2-228-23559.vs.sakura.ne.jp postfix/master[28722]: daemon started -- version 3.4.7, configuration /etc/postfix Dec 16 18:03:07 tk2-228-23559.vs.sakura.ne.jp systemd[1]: Started Postfix Mail Transport Agent. 
```


再起動後に同様のエラーメッセージが表示されていなければ問題なし。
