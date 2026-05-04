---
title: 'MySQL: 新規テーブルを作成・削除、構造の確認 - CREATE TABLE、DROP TABLE、DESCRIBE文'
date: 2008-11-01
authors: [yukun]
tags:
  - create
  - mysql
slug: mysql-create-table-drop-describe
---

[前回](/blog/create-user-grant-password "MySQL: ユーザの追加とパスワード、権限の付加 - GRANT文 - Yukun's Blog")までにCREATE USERとGRANTコマンドでbookshelfデータベースを作成し、それを扱う全権限を持つユーザyukunを追加しました。 今回はCREATE TABLEコマンドでデータベースに新しいテーブルを作成し、それをDESCRIBEコマンドで確認してみます。また、それらに関連する他のコマンドも取り上げてみます。 
<!-- truncate -->


## 新規テーブルの作成 - CREATE TABLE コマンド

以下のコマンドを打つと、 

```sql
 mysql> CREATE TABLE book -> ( -> id INT(11), -> category_id INT(11), -> title VARCHAR(64), -> author_name VARCHAR(32), -> detail TEXT, -> price INT(11), -> image VARCHAR(64) -> ); Query OK, 0 rows affected (0.09 sec) mysql> 
```

 次のようなテーブルを作成します。

| id | category\_id | title | author\_name | detail | price | image |
| --- | --- | --- | --- | --- | --- | --- |

このコマンドを一般化すると、

> `CREATE TABLE ＜テーブル名＞ ( ＜列名1＞ ＜データ型＞, ＜列名2＞ ＜データ型＞, ... );`

です。 ちなみに、ここでのidやtitleは列名といいテーブルの**縦1列**の属性名で、この**列はフィールド、カラム(column)**とも言います。また、テーブルの**横1列**は**行**と言い、この**行はレコード、ロウ(row)**とも言います。 ＜テーブル名＞の前に**IF NOT EXISTS**を付けると、DB中に＜テーブル名＞が**ない場合**にのみ作成します。

### 主キーを設定してテーブルを作成する


```sql
 mysql> CREATE TABLE book2 -> ( -> id INT(11) NOT NULL AUTO_INCREMENT, -> title VARCHAR(64), -> author_name VARCHAR(32), -> detail TEXT, -> image VARCHAR(64), -> PRIMARY KEY (id) -> ); Query OK, 0 rows affected (0.02 sec) mysql> 
```

 NOT NULLを指定することによってそのレコードを挿入する際にidフィールドが空であることを防止し、AUTO\_INCREMENTを指定することによってレコードが追加されると（その際idフィールに代入指定が無い場合）idフィールドに1を代入し、その後もレコード追加の度に**前挿入レコードのidに+1した値**を代入していきます。余談ですが、SQLiteではINTEGER型のフィールドを主キーとするとデフォルトでauto incrementされます。 ちなみに、データベース内で既に作成されているテーブルと同じ名前のテーブルを再度作成しようとすると以下のようなエラーを返します。 

```sql
 mysql> CREATE TABLE book ...＜中略＞ ERROR 1050 (42S01): Table 'book' already exists mysql> 
```


## テーブルの情報を出力するコマンド

### データベース内のテーブルを表示 - SHOW TABLES コマンド

さて、上で作成したテーブルが本当に出来ているのかSHOW TABLES コマンドで確認してみましょう。 

```sql
 mysql> SHOW TABLES; +---------------------+ | Tables_in_bookshelf | +---------------------+ | book | | book2 | +---------------------+ 2 rows in set (0.00 sec) mysql> 
```

 しっかり出来ていますね。

### テーブルの構造を表示 - DESCRIBE（DESC）コマンド

それでは、テーブル内の構造はどうでしょうか。book2はオプションで色々設定しましたので、DESCRIBE（DESC）コマンドで確認してみましょう。 

```sql
 mysql> DESC book2; +-------------+-------------+------+-----+---------+----------------+ | Field | Type | Null | Key | Default | Extra | +-------------+-------------+------+-----+---------+----------------+ | id | int(11) | NO | PRI | NULL | auto_increment | | title | varchar(64) | YES | | NULL | | | author_name | varchar(32) | YES | | NULL | | | detail | text | YES | | NULL | | | image | varchar(64) | YES | | NULL | | +-------------+-------------+------+-----+---------+----------------+ 6 rows in set (0.00 sec) mysql> 
```

 DESCでも同じ結果が返ってきます。

### 既存テーブルを再作成できるCREATE TABLE文を出力 - SHOW CREATE TABLE コマンド

別の環境でもう一度作成したい場合等に使えます。 

```sql
 mysql> SHOW CREATE TABLE book2; CREATE TABLE `book2` ( `id` int(11) NOT NULL auto_increment, `title` varchar(64) default NULL, `author_name` varchar(32) default NULL, `detail` text, `image` varchar(64) default NULL, PRIMARY KEY (`id`) ) ENGINE=MyISAM DEFAULT CHARSET=utf8 
```

 上述のCREATE TABLE文では省いていたオプションが明示されていますが、確かにこの文でbook2を作成できます。

## 既存テーブルの削除 - DROP TABLE コマンド

最後に、テーブルの削除を試してみます。 

```sql
 mysql> DROP TABLE book; Query OK, 0 rows affected (0.00 sec) mysql> SHOW TABLES; +---------------------+ | Tables_in_bookshelf | +---------------------+ | book2 | +---------------------+ 1 row in set (0.00 sec) mysql> 
```

 一般化すると、

> `DROP TABLE ＜テーブル名＞;`

ですね。 SHOW TABLESで削除されていることが確認できています。削除したテーブルは復元できませんので、このコマンドは気をつけて打ちましょう。

## リファレンス

- [MySQL :: MySQL 5.1 Reference Manual :: 12.1.13 CREATE TABLE Syntax](http://dev.mysql.com/doc/refman/5.1/en/create-table.html "MySQL :: MySQL 5.1 Reference Manual :: 12.1.13 CREATE TABLE Syntax")
- [MySQL :: MySQL 8.0 Reference Manual :: 12.5.6.11 SHOW CREATE TABLE Syntax](https://dev.mysql.com/doc/refman/8.0/en/show-create-table.html "MySQL :: MySQL 5.1 Reference Manual :: 12.5.6.11 SHOW CREATE TABLE Syntax")
