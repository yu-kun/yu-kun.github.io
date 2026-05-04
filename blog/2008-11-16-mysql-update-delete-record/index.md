---
title: 'MySQL: レコードの更新と削除 - UPDATE、DELETE文'
date: 2008-11-16
authors: [yukun]
tags:
  - mysql
  - set
  - update
  - where
slug: mysql-update-delete-record
---

[前回はレコードの検索クエリの作成方法](/blog/mysql-query-select-where-in-like-between "MySQL: データ検索クエリの基本 - SELECT文、WHERE句、LIKE、IN、BETWEENキーワード - Yukun's Blog")を扱いましたが、今回は既存のレコードのフィールド値を更新するUPDATE文と、レコードを削除するDELETE文の練習をしてみます。 
<!-- truncate -->
 まず、扱うテーブル内のレコードの一覧を下記に示します。これは前回と同じです。 

```sql
 mysql> SELECT * FROM book_list; +---------+--------+--------+-------+-----------------------+ | book_id | title | author | price | comments | +---------+--------+--------+-------+-----------------------+ | 1 | book_A | auth_A | 1500 | good, bad, excellence | | 2 | book_B | auth_B | 2900 | not bad, good | | 3 | book_C | auth_C | 1800 | interesting, amazing | | 4 | book_D | auth_D | 700 | sad, depress | | 5 | book_E | auth_E | 1200 | good, funny | | 6 | book_F | auth_C | 3500 | bored, difficult | | 7 | book_G | auth_A | 400 | very good!, excellent | +---------+--------+--------+-------+-----------------------+ 
```


## UPDATE文でレコードの更新

それでは試しに、「_値段が1000円を超え2000円未満の本を100円値下げする_」SQL文を書いてみます。最初は念のため修正するレコードをSELECT文で出力してみます。 

```sql
 mysql> SELECT * FROM book_list -> WHERE price > 1000 -> AND price < 2000; +---------+--------+--------+-------+-----------------------+ | book_id | title | author | price | comments | +---------+--------+--------+-------+-----------------------+ | 1 | book_A | auth_A | 1500 | good, bad, excellence | | 3 | book_C | auth_C | 1800 | interesting, amazing | | 5 | book_E | auth_E | 1200 | good, funny | +---------+--------+--------+-------+-----------------------+ 
```

 次に、UPDATE文で上の本を100円値下げしましょう。 

```sql
 mysql> UPDATE book_list -> SET price = price - 100 -> WHERE price > 1000 -> AND price < 2000; Query OK, 3 rows affected (0.00 sec) Rows matched: 3 Changed: 3 Warnings: 0 
```

 上手くいったようですね。UPDATE文の一般構文は以下のようになります。

> UPDATE ＜テーブル名＞ SET ＜更新する列名1＞ = ＜代入する値1＞ \[, ＜更新列名2＞ = ＜代入値2＞, ...\] WHERE ＜条件式＞;

WHERE句は省略可能です。**SET句内のイコール「=」は代入**演算子です（**WHERE句の「=」は等価**演算子）。複数のフィールドを書き換える際はSET句内の個々の代入式をカンマ**「,」で区切り**ます。UPDATE文は条件に合致する**全ての**レコードをSET句で**書き換え**ます。実際に書き変わったか確認してみましょう。 

```sql
 mysql> SELECT title, price FROM book_list -> WHERE price + 100 > 1000 -> AND price + 100 < 2000; +--------+-------+ | title | price | +--------+-------+ | book_A | 1400 | | book_C | 1700 | | book_E | 1100 | +--------+-------+ 
```

 確かに、100円値下げしてありますね。

## DELETE文でレコードを削除

一般構文は、

> DELETE FROM ＜テーブル名＞ WHERE ＜条件式＞;

です。条件に合致する**全ての**レコードを削除します。 

```sql
 mysql> DELETE FROM book_list -> WHERE title = 'book_G'; Query OK, 1 row affected (0.00 sec) mysql> SELECT title FROM book_list; +--------+ | title | +--------+ | book_A | | book_B | | book_C | | book_D | | book_E | | book_F | +--------+ 
```

 確かに、book\_Gが削除されていますね。

## リファレンス

- [MySQL :: MySQL 5.7 Reference Manual :: 12.2.12 UPDATE Syntax](http://dev.mysql.com/doc/refman/5.7/en/update.html "MySQL :: MySQL 5.1 Reference Manual :: 12.2.12 UPDATE Syntax")
- [MySQL :: MySQL 5.7 Reference Manual :: 12.2.2 DELETE Syntax](http://dev.mysql.com/doc/refman/5.7/en/delete.html "MySQL :: MySQL 5.1 Reference Manual :: 12.2.2 DELETE Syntax")
