---
title: 'MySQL: ユーザの追加とパスワード、権限の付加 - GRANT文'
date: 2008-10-10
authors: [yukun]
tags:
  - create
  - mysql
slug: create-user-grant-password
---

[前回](/blog/mysql-login-user-create-database "MySQL: ログインと新規データベースの作成 - Yukun's Blog")はCREATE DATABASEコマンドでbookshelfという名前のDBを作成し、SHOW DATABASESコマンドでそれを確認しました。 一連の操作はroot権限で行いましたがこれはセキュリティ上よろしくないので、今回はrootユーザへのパスワードの設定と、新しくユーザ（ここでは安直に"yukun"）を作成しbookshelfを操作する権限を付加してみます。 
<!-- truncate -->


## rootユーザのパスワードの設定

普通のコマンドプロンプト(Win)かターミナル(Mac)で以下のコマンドを用いてパスワードを設定します。

> `$ mysqladmin -u root password ＜パスワード＞`

もしくは、mysqlプロンプト上で、

> mysql> SET PASSWORD FOR root@localhost=PASSWORD('パスワード文字列');

## 新規ユーザの追加 - CREATE USER文

root権限で以下のコマンドを打ちます。 

```sql
 mysql> CREATE USER yukun IDENTIFIED BY 'ticktack'; Query OK, 0 rows affected (0.00 sec) mysql> 
```

 一般式

> `CREATE USER ＜ユーザ名＞ IDENTIFIED BY '＜パスワード＞';`

ユーザの追加はCREATE USERコマンドを使用します。上の例では、"yukun"という名前のユーザを作成し、"ticktack"というパスワードを設定しました。パスワードは本来もっと複雑なものにする必要がありますが今回はローカルでの開発用、と限定した環境での仕様を念頭においていますので、安直な単語にしました。 それでは一回MySQLをログアウトして、再度ユーザyukunとしてログインし、bookshelを使ってみましょう。 

```sql
 mysql> quit Bye C:\Users\yukun>mysql -u yukun -pticktack mysql> USE bookshelf； ERROR 1044 (42000): Access denied for user 'yukun'@'%' to database 'bookshelf' mysql> 
```

 USEコマンドでbookshelfを使用しようと試みていますが、ユーザyukunは操作権限が無いためエラーが出ていますね。それでは、このユーザyukunにデータベースbookshelfに対する全操作の権限を付加してみましょう。

## ユーザにDBを操作する権限を付加 - GRANT文

もう一度rootユーザでMySQLにログインし以下のコマンドを打ちます。 

```sql
 mysql> GRANT ALL PRIVILEGES ON bookshelf.* TO yukun@localhost IDENTIFIED BY 'ticktack'; Query OK, 0 rows affected (0.00 sec) mysql> 
```

 一般式

> `GRANT ＜操作名＞ ON ＜データベース名＞.＜テーブル名＞ TO ＜ユーザ名＞@＜ホスト名＞ IDENTIFIED BY '＜パスワード＞';`

さぁ、今度こそbookshelfを操作できるはずですので、もう一度先ほどのUSEコマンドを打ってみましょう。 

```sql
 C:\Users\yukun>mysql -u yukun -pticktack mysql> USE bookshelf; Database changed mysql> 
```

 おぉ、USEコマンドで使用するDBを選択できるようになっていますね(^-^)b
