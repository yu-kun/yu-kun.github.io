---
title: 'Apacheでよく使うコマンドと設定項目'
date: 2008-12-25
authors: [yukun]
tags:
  - apache
  - command
  - linux
  - server
  - setting
slug: how-to-write-apache-conf
---

設置環境はFedoraを想定。 注：ソースからインストールした場合や他の環境だと一部ファイルのパスが違うところがある。 機会があれば今後も少しずつ書き足し・修正していく。

## コマンド

起動

\# /etc/rc.d/init.d/httpd start または、 # service httpd start

終了

\# /etc/rc.d/init.d/httpd stop または、 # service httpd stop

再起動

\# /etc/rc.d/init.d/httpd restart または、 # service httpd restart

自動起動に設定

\# chkconfig httpd on

自動起動の確認(Run level 3:on)

\# chkconfig --list httpd

設定の反映

\# /etc/rc.d/init.d/httpd reload

ディレクトリの所有者の変更

\# chown ＜ユーザ名＞. /var/www/html/

ディレクトリをApache実行ユーザに変更

\# chown -R apache:apache /var/www/html/cgi-bin/

## httpd.confの設定

設定ファイルhttpd.confのパス

/etc/httpd/conf/httpd.conf

外部設定ファイル\*.confを置くパス

/etc/httpd/conf.d/\*.conf ・起動時に読み込まれる ・AliasとDirectoryを合わせて用いる場合が多い

DocumentRoot

ルートディレクトリの設定 e.g. DocumentRoot "/var/www/html" で www.example.com/へのアクセスは/var/www/htmlのインデックスページとなる。

Alias

Alias ＜ドメイン以下のURLパス＞ ＜サーバ内のディレクトリパス＞ _e.g._ Alias /blog /var/www/blog の場合は、http://www.example.com/blog/にアクセスした際、サーバの/var/www/blog/内の既定のインデックスファイルが読み込まれる。

Directoryタグ

e.g. 

```html
〜
```

 属性にディレクトリパスを指定している。

.htaccessを許可する場合

AllowOverride All

IPアドレスによるアクセス制限

```
Order Deny,Allow
Deny from all
Allow from 127.0.0.1
Allow from 192.168.1.0/24

```

↑はlocalhost、イントラネット以外からのアクセスを拒否

## .htaccessによるパスワード認証

### .htaccessファイル内の設定例

```
SSLRequireSSL # SSL経由のアクセス
AuthUserFile ＜認証するユーザリストのパス＞
AuthGroupFile ＜パス＞
AuthName "＜ページ名＞"
AuthType Basic # 認証タイプ
require valid-user

```

### 認証するユーザの登録

初回は # htpasswd -b -c ＜保存先＞ ＜ユーザ名＞ ＜パスワード＞ 二件目以降は既にファイルが作成されているので-cを抜く # htpasswd -b ＜保存先＞ ＜ユーザ名＞ ＜パスワード＞ ここで作成したファイルのパスを上のAuthUserFile項目に書く。
