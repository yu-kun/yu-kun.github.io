---
title: 'MySQL: 既存テーブルの構造の変更 - ALTER TABLE文、CHANGE COLUMN句'
date: 2008-11-07
authors: [yukun]
tags:
  - mysql
slug: alter-table-add-drop-change-modify
---

[前回までに](/blog/mysql-create-table-drop-describe "MySQL: 新規テーブルを作成・削除、構造の確認 - CREATE TABLE、DROP TABLE、DESCRIBEコマンド - Yukun's Blog")CREATE TABLE文を用いて以下のようなbook2テーブルを作成しました。 
<!-- truncate -->
 

```sql
 mysql> DESC book2; +-------------+-------------+------+-----+---------+----------------+ | Field | Type | Null | Key | Default | Extra | +-------------+-------------+------+-----+---------+----------------+ | id | int(11) | NO | PRI | NULL | auto_increment | | title | varchar(64) | YES | | NULL | | | author_name | varchar(32) | YES | | NULL | | | detail | text | YES | | NULL | | | price | int(11) | YES | | NULL | | | image | varchar(64) | YES | | NULL | | +-------------+-------------+------+-----+---------+----------------+ 
```

 今回はこのテーブルの構造を変えるALTER TABLE文の使い方を下の場合に分けて練習してみます。

- テーブル名の変更 - RENAME TOキーワード
- 新しい列や制約の追加 - ADD句
- 既存の列の構造(列名、型、制約)を変更 - CHANGE句
- 列名を変更せずに既存の列のデータ型・制約を変更 - MODIFY句
- 既存の列の削除 - DROP句
- テーブルの文字コードの変更

## テーブル名の変更 - RENAME TOキーワード

次の構文でテーブル名を変更できます。

> `ALTER TABLE ＜既存テーブル名＞ RENAME TO ＜新しいテーブル名＞;`

（↑勿論1行で書いて良いのですが、見やすくなるかなと思い改行を入れました。） 

```sql
 mysql> ALTER TABLE book2 RENAME TO book_list; mysql> SHOW TABLES; +---------------------+ | Tables_in_bookshelf | +---------------------+ | book_list | +---------------------+ mysql> 
```


## 新しい列や制約の追加 - ADD句

> - ALTER TABLE ＜テーブル名＞ ADD COLUMN ＜列名＞ ＜型名＞ \[＜制約＞\];
> - ALTER TABLE ＜テーブル名＞ ADD (＜列名＞ ＜型名＞ \[＜制約＞\]);

で既存のテーブルに新しい列を追加することが出来ます。 

```sql
 mysql> ALTER TABLE book_list -> ADD COLUMN price INT(11) DEFAULT 0 NOT NULL AFTER detail; mysql> 
```

 新しい列の挿入箇所はFIRSTやAFTER句で指定することが出来ます。 二つ目の書式でも試してみましょう。 

```sql
 mysql> ALTER TABLE book_list -> ADD (copyright VARCHAR(16) NOT NULL); mysql> 
```

 ADD句をカンマ「,」で繋ぐことにより一文で複数のカラムや制約を追加することが出来ます。これは他の句を用いたときも同様です。**複数の句(ADD、DROP、CHANGE、MODIFY)を繋ぐ際はカンマ「,」で繋ぐ**、と。 

```sql
 mysql> ALTER TABLE book_list -> ADD COLUMN related_books VARCHAR(256) NOT NULL, -> ADD COLUMN comments TEXT NOT NULL; mysql> 
```

 この段階でのテーブルの構造は下のようになります。 

```sql
 mysql> DESC book_list; +---------------+--------------+------+-----+---------+----------------+ | Field | Type | Null | Key | Default | Extra | +---------------+--------------+------+-----+---------+----------------+ | id | int(11) | NO | PRI | NULL | auto_increment | | title | varchar(64) | YES | | NULL | | | author_name | varchar(32) | YES | | NULL | | | detail | text | YES | | NULL | | | price | int(11) | NO | | 0 | | | image | varchar(64) | YES | | NULL | | | copyright | varchar(16) | NO | | NULL | | | related_books | varchar(256) | NO | | NULL | | | comments | text | NO | | NULL | | +---------------+--------------+------+-----+---------+----------------+ 
```


## 既存の列の構造(列名、型、制約)を変更 - CHANGE COLUMN句

一般文は次のようになります。

> `ALTER TABLE ＜テーブル名＞ CHANGE COLUMN ＜既存の列名＞ ＜新しい列名＞ ＜型名＞ ＜制約＞;`


```sql
 mysql> ALTER TABLE book_list -> CHANGE COLUMN id book_id INT(11) NOT NULL AUTO_INCREMENT; mysql> ALTER TABLE book_list -> CHANGE COLUMN author_name author VARCHAR(32) NOT NULL; mysql> 
```

 この段階でのテーブルの構造は下のようになります。 

```sql
 +---------------+--------------+------+-----+---------+----------------+ | Field | Type | Null | Key | Default | Extra | +---------------+--------------+------+-----+---------+----------------+ | book_id | int(11) | NO | PRI | NULL | auto_increment | | title | varchar(64) | YES | | NULL | | | author | varchar(32) | NO | | NULL | | | detail | text | YES | | NULL | | | price | int(11) | NO | | 0 | | | image | varchar(64) | YES | | NULL | | | copyright | varchar(16) | NO | | NULL | | | related_books | varchar(256) | NO | | NULL | | | comments | text | NO | | NULL | | +---------------+--------------+------+-----+---------+----------------+ 
```


## 列名を変更せずに既存の列のデータ型・制約を変更 - MODIFY句

CHANGE COLUMN句でもデータ型の変更は可能ですが、**列名を変更しない場合**はMODIFY句を使うことでより簡潔に書くことが可能です。 一般文は下記のようになります。

> `ALTER TABLE ＜テーブル名＞ MODIFY COLUMN ＜既存の列名＞ ＜新しいデータ型名＞ [＜制約＞];`

試しに、title、detail、image、related\_booksフィールドのデータ型や制約を書き換えてみましょう(ついでにpriceも)。 

```sql
 mysql> ALTER TABLE book_list MODIFY COLUMN title VARCHAR(128) NOT NULL; mysql> ALTER TABLE book_list -> MODIFY COLUMN detail TEXT NOT NULL, -> MODIFY COLUMN image VARCHAR(64) NOT NULL, -> MODIFY COLUMN related_books TEXT NOT NULL, -> MODIFY COLUMN price INT(11) DEFAULT NULL, -> MODIFY COLUMN price INT(11) NOT NULL; 
```

 複数行に分けると可読性が上がりますね。 ここまでの処理でテーブルの構造は下のようになります。 

```sql
 +---------------+--------------+------+-----+---------+----------------+ | Field | Type | Null | Key | Default | Extra | +---------------+--------------+------+-----+---------+----------------+ | book_id | int(11) | NO | PRI | NULL | auto_increment | | title | varchar(128) | NO | | NULL | | | author | varchar(32) | NO | | NULL | | | detail | text | NO | | NULL | | | price | int(11) | NO | | NULL | | | image | varchar(64) | NO | | NULL | | | copyright | varchar(16) | NO | | NULL | | | related_books | text | NO | | NULL | | | comments | text | NO | | NULL | | +---------------+--------------+------+-----+---------+----------------+ 
```

 第1正規形への変更はまたの時に（related\_book**s**やcomment**s**フィールドはデータ挿入以前に、名前からして怪しいというかだめだめですね）。

## 既存の列の削除 - DROP句

列の削除を行う構文は以下の通りです。

> `ALTER TABLE ＜テーブル名＞ DROP COLUMN ＜対象の列名＞;`

DROP キーワード自体はテーブルを削除する場合にも使用しますね。使われる文脈によって処理が変わるので個々の違いをしっかり区別しておこう。

## テーブルで使用する文字コードの変更

例えば、UTF-8に変更する際は以下のように書きます。

> `ALTER TABLE ＜テーブル名＞ CHARSET=utf8;`

## リファレンス

- [MySQL :: MySQL 5.1 Reference Manual :: 12.1.5 ALTER TABLE Syntax](http://dev.mysql.com/doc/refman/5.1/en/alter-table.html "MySQL :: MySQL 5.1 Reference Manual :: 12.1.5 ALTER TABLE Syntax")
