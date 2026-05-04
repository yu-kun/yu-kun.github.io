---
title: 'MySQL: ログインと新規データベースの作成・削除 - CREATE DATABASE、DROP DATABASE文'
date: 2008-10-09
authors: [yukun]
tags:
  - create
  - mysql
slug: mysql-login-user-create-database
---

Windowsに開発用のMySQLを新規にインストールとパス設定した環境で進めていきます。まず、プロンプト上で以下のコマンドを一行打ちMySQLに接続してみます。 
<!-- truncate -->


## rootユーザでログイン


```sql
C:\Users\yukun>mysql -u root
mysql>
```

 まだrootユーザにパスワードを設定してないので、 `>mysql -u root` でログインできます。仮にパスワードが設定されていると次行のプロンプトでパスの入力を求められます。

## 新規データベース(DB)の作成 - CREATE DATABASEコマンド

さて、MySQLに接続したことでプロンプトが>からmysql>に変わっています。次に以下のコマンドで新しいデータベースを作成してみましょう。 

```sql
mysql> CREATE DATABASE bookshelf;
mysql>
```

 CREATE DATABASEコマンドでbookshelfという名前のDBを作成しています。コマンドは大文字で打っていますが、別に小文字でも構いません。これは「コマンドである」ことを分かりやすくするための措置です。 また、ここで文字コードを指定する場合は以下のように打ちます。 

```sql
mysql> CREATE DATABASE bookshelf DEFAULT CHARACTER SET utf8;
```

 実際にデータベースが作成されているか、SHOW DATABASESコマンドで確認してみましょう。 

```sql
mysql> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| bookshelf          |
| cdcol              |
| mysql              |
| phpmyadmin         |
| test               |
| webauth            |
+--------------------+
mysql>
```

 おぉ、確かにbookshelfが作成されています。

## ログアウトはquitコマンドを打てばOK


```sql
mysql> quit
Bye
C:\Users\yukun>
```


## データベースの削除 - DROP DATABASE文

データベースの削除の文は、

> `DROP DATABASE ＜データベース名＞;`

です。
