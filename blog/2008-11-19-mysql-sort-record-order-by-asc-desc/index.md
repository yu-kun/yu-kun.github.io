---
title: 'MySQL: レコードを昇順・降順にソートして出力 - ORDER BY句'
date: 2008-11-19
authors: [yukun]
tags:
  - mysql
  - order
  - select
  - sort
  - where
slug: mysql-sort-record-order-by-asc-desc
---

前回は[UPDATE文とDELETE文](/blog/mysql-update-delete-record "MySQL: レコードの更新と削除 - UPDATE、DELETE文 - Yukun's Blog")を扱いました。今回は下記のレコードを含むテーブルに対して、SELECT文のORDER BY句を用いて任意のレコードをソートして出力する例を示します。 
<!-- truncate -->
 

```sql
 mysql> SELECT * FROM book_list_auto; +----+------------------------------------+---------+-------+------------+ | id | title | author | price | date | +----+------------------------------------+---------+-------+------------+ | 1 | eu, | Brody | 2330 | 2004-06-09 | | 2 | rutrum. Fusce dolor quam, | James | 2150 | 2006-02-25 | | 3 | ultrices sit amet, risus. | Wang | 2495 | 2009-11-12 | | 4 | placerat, augue. Sed molestie. | Lev | 2752 | 2005-05-02 | | 5 | Proin mi. | Dante | 1155 | 2004-07-23 | | 6 | sed, | Porter | 4566 | 2006-05-14 | | 7 | onec sollicitudin adipiscing | Sader | 2503 | 2004-04-28 | | 8 | tortor. Integer aliquam adipiscing | Desiree | 2810 | 2002-08-24 | | 9 | Mauris eu | Maggy | 3843 | 2001-04-21 | | 10 | eget metus. In nec orci. | Rhea | 4820 | 2002-11-05 | +----+------------------------------------+---------+-------+------------+ 
```

 ランダムに生成した10レコード（ブックリスト）を使います。 まず、値段の安い順、すなわちpriceフィールドを昇順で出力するSQL文は下のようになります。 

```sql
 mysql> SELECT title, price -> FROM book_list_auto -> ORDER BY price; +------------------------------------+-------+ | title | price | +------------------------------------+-------+ | Proin mi. | 1155 | | rutrum. Fusce dolor quam, | 2150 | | eu, | 2330 | | ultrices sit amet, risus. | 2495 | | onec sollicitudin adipiscing | 2503 | | placerat, augue. Sed molestie. | 2752 | | tortor. Integer aliquam adipiscing | 2810 | | Mauris eu | 3843 | | sed, | 4566 | | eget metus. In nec orci. | 4820 | +------------------------------------+-------+ 
```


> ＜SELECT文の前半(FROM,　WHERE句など)＞ ORDER BY ＜列名1＞ \[, ＜列名2＞, ...\]

ORDER BYの後ろにフィールド名を指定することで、そのフィールド基準にソートしたレコードを返します。デフォルトでは昇順(**asc**ending)ソートでそれを明示的に示す場合は、ASCキーワードをフィールド名の後ろに付け足します。上の例では、最終行をORDER BY price ASC;しても結果は同じです。 対して、あるフィールドを降順(**desc**ending)にソートする場合はフィールド名の後ろにDESCキーワードを付け足します。以下の例で確認してみましょう。 

```sql
 mysql> SELECT title, price -> FROM book_list_auto -> ORDER BY price DESC -> LIMIT 3; +--------------------------+-------+ | title | price | +--------------------------+-------+ | eget metus. In nec orci. | 4820 | | sed, | 4566 | | Mauris eu | 3843 | +--------------------------+-------+ 
```

 確かに、降順、ここで例では値段の高い順にソートされていますね。

## LIMIT句で表示行数を指定

さて、ここで使われているLIMIT句は出力する行数を指定することが出来ます。上の例では

> LIMIT ＜表示行数＞

より3行（値段の高い本ベスト3）を表示しています。LIMIT句には他にも、

> LIMIT ＜表示開始インデックス＞,＜表示行数＞

という書き方があり、以下のSQL文は上と同じ結果を出力します。ちなみにインデックスは**0から**数え始めます。 

```sql
 mysql> SELECT title, price -> FROM book_list_auto -> ORDER BY price DESC -> LIMIT 0, 3; 
```

 最後に、ORDER BY句では複数のフィールドを指定できますが、その際のソートの適応順序は指定した順（書いた順）になります。次の例で確認してみましょう。 

```sql
 mysql> SELECT title, author, date -> FROM book_list_auto -> ORDER BY date DESC, author ASC -> LIMIT 5; +--------------------------------+--------+------------+ | title | author | date | +--------------------------------+--------+------------+ | ultrices sit amet, risus. | Wang | 2009-11-12 | | sed, | Porter | 2006-05-14 | | rutrum. Fusce dolor quam, | James | 2006-02-25 | | placerat, augue. Sed molestie. | Lev | 2005-05-02 | | Proin mi. | Dante | 2004-07-23 | +--------------------------------+--------+------------+ 
```

 上の例では、dateフィールドでソートして、その中で同じ値があった場合はauthorをソートして順序を決めています。うーん、このレコード集ではちょっと分かり難いですね。

## リファレンス

- [MySQL :: MySQL 5.7 Reference Manual :: 7.2.14 ORDER BY Optimization](http://dev.mysql.com/doc/refman/5.7/en/order-by-optimization.html "MySQL :: MySQL 5.1 Reference Manual :: 7.2.14 ORDER BY Optimization")
