---
title: 'Linux: sshd デーモンの設定、開始・終了・再起動コマンド'
date: 2013-11-26
authors: [yukun]
tags:
  - linux
  - security
slug: linux-sshd_config-command
---

sshdの設定と基本操作に関して復習した為、その結果を下記に纏める。

### sshd\_config設定ファイル

ファイルパスは通常/etc/ssh/sshd\_config 。設定記述と各項目の説明は下記リンクをご参照。自身がよく使う設定ディレクティブについて実際の設定ファイルの右記に説明を入れている。説明内容は参考サイトを元にサマライズしている。 [sshd\_config設定一覧](pathname:///files/sshd_config.htm) 尚、元となったconfigファイルはDebian 6に導入したOpenSSH\_5.5p1 (設定内容については一部修正)。 下記はデーモンの基本操作。（全てrootユーザー権限で実行。）

### デーモンの開始

```
# /usr/sbin/sshd

```

フルパスで実行。

### デーモンの終了

```
# kill `cat /var/run/sshd.pid`

```

インストール時のconfigure設定にもよるが、sshd.pidファイルにプロセスIDを書き込むため、これを利用。

### デーモンの再起動

```
# kill -HUP `cat /var/run/sshd.pid`

```

但し、既に実行されている子プロセスのssh接続は上記のコマンドでは終了されない。

### 参考サイト

- [OpenSSH Manual Pages](http://www.openssh.com/manual.html)
- SSHD\_CONFIG (5)
- SSH\_CONFIG (5)
