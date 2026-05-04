---
title: 'ユーザー管理に関するLinuxコマンド'
date: 2008-06-26
authors: [yukun]
tags:
  - command
  - linux
  - user
slug: linux-users
---

最近ファイルやディレクトリのパーミッション設定と合わせてよく使っているコマンドなので、備忘録を兼ねて使用例を書き出してみます。 ./app ディレクトリを someuser ユーザー、 apache グループに変更する。

```
# chown -R someuser:apache ./app
```

ユーザーのファイルやディレクトリ所有者がひょんなことから root に変わってしまったとき、例えば、スーパーユーザで一般ユーザのファイルやディレクトリを操作した場合等、に設定しなおす際は以下のように。

```
# chown -R hoge:hoge ./hoge
```

apache ユーザを nagios グループに所属させる。

```
# usermod -G nagios apache
```
