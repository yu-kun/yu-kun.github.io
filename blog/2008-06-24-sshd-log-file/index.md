---
title: 'sshdのログファイルの確認方法'
date: 2008-06-24
authors: [yukun]
tags:
  - command
  - linux
  - security
  - server
slug: sshd-log-file
---

サーバーでsshdサービスを使っていると、招かれざる人(大抵bot)も相応の頻度でアクセスしてくる。何時何処からどのようなアクセスがあるのかを把握する為にログファイルを確認することは大事。

sshd のログファイルのパスはCentOS / Fedora系ではデフォルトでは /var/log/secure となる。。

```
# cat /var/log/secure

```

尚、ssh のログインに失敗/成功したユーザ数は以下の様なコマンド等でカウントできる。

```
# grep -c invalid /var/log/secure
# grep -c Failed /var/log/secure
# grep -c Accepted /var/log/secure

```
