---
title: 'MySQL: データ検索クエリの基本 - SELECT文、WHERE句、LIKE、IN、BETWEENキーワード'
date: 2008-11-13
authors: [yukun]
tags:
  - mysql
  - select
  - where
slug: mysql-query-select-where-in-like-between
---

[前回まで](/blog/mysql-insert-into-table-values "MySQL: データをテーブルに追加 - INSERT文、INTO、VALUES句 - Yukun's Blog")にテーブルに一定のデータを追加しましたので、今回はそのデータを検索するクエリ文を以下の場合に分けて練習してみます。

- SELECT文の基本形 - WHERE句
- 比較文字列内にワイルドカードを指定 - LIKEキーワード、「%」、「\_」記号
- 比較範囲の指定 - BETWEENキーワード
- 複数のOR結合をIN句でまとめる
- NOTキーワードで条件の反転
- NULLフィールドの検索 - IS NULL、IS NOT NULL

まず、扱うテーブル内のレコードの一覧を下記に示します。 
<!-- truncate -->
 

```sql
 mysql> SELECT * FROM book_list; +---------+--------+--------+-------+-----------------------+ | book_id | title | author | price | comments | +---------+--------+--------+-------+-----------------------+ | 1 | book_A | auth_A | 1500 | good, bad, excellence | | 2 | book_B | auth_B | 2900 | not bad, good | | 3 | book_C | auth_C | 1800 | interesting, amazing | | 4 | book_D | auth_D | 700 | sad, depress | | 5 | book_E | auth_E | 1200 | good, funny | | 6 | book_F | auth_C | 3500 | bored, difficult | | 7 | book_G | auth_A | 400 | very good!, excellent | +---------+--------+--------+-------+-----------------------+ 
```


## SELECT文の基本形 - WHERE句

SELECT文では指定したテーブル（FROM句）に対して、検索条件（WHERE句）に**マッチするレコード（行）の指定フィールド（列）**を表示します。SELECTに続くのは列名、と覚えましょう。以下、具体例。

> SELECT ＜列名1＞\[, ＜列名2＞, ...\] FROM ＜テーブル名＞ WHERE ＜検索条件＞;

WHERE句は省略可能。 

```sql
 mysql> SELECT title, price FROM book_list -> WHERE -> author = 'auth_A'; +--------+-------+ | title | price | +--------+-------+ | book_A | 1500 | | book_G | 400 | +--------+-------+ 
```

 author列がauth\_Aに合致するレコードを検索し、そのtitle、price列を表示しています。「=」は等価演算子です（代入演算子ではありません）。ちなみに**非等価演算子は「<>」**です。 

```sql
 mysql> SELECT * FROM book_list -> WHERE -> price < 1500; +---------+--------+--------+-------+-----------------------+ | book_id | title | author | price | comments | +---------+--------+--------+-------+-----------------------+ | 4 | book_D | auth_D | 700 | sad, depress | | 5 | book_E | auth_E | 1200 | good, funny | | 7 | book_G | auth_A | 400 | very good!, excellent | +---------+--------+--------+-------+-----------------------+ 
```

 アスタリスク「\*」はワイルドカードで全ての列を返します。 

```sql
 mysql> SELECT title, price FROM book_list -> WHERE -> price >= 1800 -> AND -> author = 'auth_C'; +--------+-------+ | title | price | +--------+-------+ | book_C | 1800 | | book_F | 3500 | +--------+-------+ 
```

 WHERE句内の複数の条件を結合する際はAND、ORキーワードを用います。

## 比較文字列内にワイルドカードを指定 - LIKEキーワード、「%」、「\_」記号

WHERE句内の比較条件に用いる演算子の一種と捉えてもいいかもしれません。 

```sql
 mysql> SELECT title, author, comments FROM book_list -> WHERE -> comments LIKE '%excellen%'; +--------+--------+-----------------------+ | title | author | comments | +--------+--------+-----------------------+ | book_A | auth_A | good, bad, excellence | | book_G | auth_A | very good!, excellent | +--------+--------+-----------------------+ 
```

 「%」は**任意の文字列**にマッチします。対して「\_」任意の**1文字**にマッチします。

## 比較範囲の指定 - BETWEENキーワード

price >= 1000 AND price <= 2000の様な条件を簡潔に書くことが出来ます。 

```sql
 mysql> SELECT title, price FROM book_list -> WHERE -> price >= 1000 AND price <= 2000; +--------+-------+ | title | price | +--------+-------+ | book_A | 1500 | | book_C | 1800 | | book_E | 1200 | +--------+-------+ 
```

 これを書き直すと、 

```sql
 mysql> SELECT title, price FROM book_list -> WHERE -> price BETWEEN 1000 AND 2000; +--------+-------+ | title | price | +--------+-------+ | book_A | 1500 | | book_C | 1800 | | book_E | 1200 | +--------+-------+ 
```

 確かに実行結果は合致していますね。

## 複数のOR結合をIN句でまとめる


```sql
 mysql> SELECT title, author, price FROM book_list -> WHERE -> author IN ('auth_A', 'auth_C'); +--------+--------+-------+ | title | author | price | +--------+--------+-------+ | book_A | auth_A | 1500 | | book_C | auth_C | 1800 | | book_F | auth_C | 3500 | | book_G | auth_A | 400 | +--------+--------+-------+ 
```


## NOTキーワードで条件の反転

LIKE、BETWEEN、IN句と共にも使用することが出来ます。その場合は通常比較フィールドの直前に書きます。 

```sql
 mysql> SELECT title, author, price FROM book_list -> WHERE -> NOT author IN ('auth_A', 'auth_C'); +--------+--------+-------+ | title | author | price | +--------+--------+-------+ | book_B | auth_B | 2900 | | book_D | auth_D | 700 | | book_E | auth_E | 1200 | +--------+--------+-------+ 
```

 だだし、INキーワードではINの直前に書いてもOKです。 

```sql
 mysql> SELECT title, author, price FROM book_list -> WHERE -> author NOT IN ('auth_A', 'auth_C'); +--------+--------+-------+ | title | author | price | +--------+--------+-------+ | book_B | auth_B | 2900 | | book_D | auth_D | 700 | | book_E | auth_E | 1200 | +--------+--------+-------+ 
```


## NULLフィールドの検索 - IS NULL、IS NOT NULL


```sql
 mysql> SELECT * FROM book_list -> WHERE title IS NULL; Empty set (0.00 sec) 
```

 

```sql
 mysql> SELECT * FROM book_list -> WHERE title IS NOT NULL; +---------+--------+--------+-------+-----------------------+ | book_id | title | author | price | comments | +---------+--------+--------+-------+-----------------------+ | 1 | book_A | auth_A | 1500 | good, bad, excellence | | 2 | book_B | auth_B | 2900 | not bad, good | | 3 | book_C | auth_C | 1800 | interesting, amazing | | 4 | book_D | auth_D | 700 | sad, depress | | 5 | book_E | auth_E | 1200 | good, funny | | 6 | book_F | auth_C | 3500 | bored, difficult | | 7 | book_G | auth_A | 400 | very good!, excellent | +---------+--------+--------+-------+-----------------------+ 
```


## リファレンス

- [MySQL :: MySQL 5.7 Reference Manual :: 12.2.9 SELECT Syntax](http://dev.mysql.com/doc/refman/5.7/en/select.html "MySQL :: MySQL 5.1 Reference Manual :: 12.2.9 SELECT Syntax")
