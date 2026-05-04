---
title: 'MySQL: 同じ値のフィールドをグルーピング - GROUP BY句'
date: 2008-11-20
authors: [yukun]
tags:
  - mysql
  - order
  - select
slug: mysql-group-by-same-value-field
---

前回は[ソートした検索結果を出力](/blog/mysql-sort-record-order-by-asc-desc "MySQL: レコードを昇順・降順にソートして出力 - ORDER BY句 - Yukun's Blog")しましたね。今回は、フィールドの値が同じレコードをグルーピングし、そのレコード集の任意のカラムに対してAVG(),MIN(),MAX(),COUNT(),SUM()...などの関数計算を適応してみます。使用するレコードは以下のものを用います。 
<!-- truncate -->
 

```sql
mysql> SELECT * FROM product_list
    -> ORDER BY date, name;
+----+-----------+----------+------------+
| id | name      | quantity | date       |
+----+-----------+----------+------------+
| 10 | chocolate | 18       | 2009-11-17 |
|  7 | cake      | 35       | 2009-11-18 |
|  6 | candy     | 28       | 2009-11-18 |
|  3 | chocolate | 40       | 2009-11-18 |
|  8 | parfait   | 18       | 2009-11-18 |
|  4 | cake      | 29       | 2009-11-19 |
|  2 | candy     | 32       | 2009-11-19 |
|  1 | chocolate | 16       | 2009-11-19 |
|  5 | parfait   | 29       | 2009-11-19 |
|  9 | eclair    | 56       | 2009-11-20 |
+----+-----------+----------+------------+
```

 背景状況はとあるお菓子工場の11/17～20までの出荷製品とその個数の記録、とでもしておきましょう。さて、このレコード集から「_4日間で一番出荷されたお菓子_」を判別するクエリは以下のようになります。 

```sql
mysql> SELECT name, SUM(quantity)
    -> FROM product_list
    -> GROUP BY name
    -> ORDER BY SUM(quantity) DESC;
+-----------+---------------+
| name      | SUM(quantity) |
+-----------+---------------+
| chocolate |            74 |
| cake      |            64 |
| candy     |            60 |
| eclair    |            56 |
| parfait   |            47 |
+-----------+---------------+
```


> ＜SELECT文の前半(FROM,　WHERE句など)＞ GROUP BY ＜列名＞

まず、結果の列名がSUM(quantity)になっていることに注目してください。GROUP BY句によりnameフィールドが同じ値のレコードを集計します。例えばnameフィールドがcakeのレコードはidが7と4です。その二つのレコードは一つのグループとみなされます（同じ値なので）。そのグループ（レコード集）に対してSUM()関数を適応しています。SUM()は合計を返しますので、35+29=64と上の出力結果になります。他のフィールド値に対しても同様の計算を行うことで、「_4日間で一番出荷されたお菓子_」はchocolateと分かります（最後にLIMIT 1を付けてもいいです）。 同様に「_1日あたりの平均出荷量が最高のお菓子_」を求めるクエリは下のようになります。 

```sql
mysql> SELECT name, ROUND(AVG(quantity),0)
    -> FROM product_list
    -> GROUP BY name
    -> ORDER BY AVG(quantity) DESC;
+-----------+------------------------+
| name      | ROUND(AVG(quantity),0) |
+-----------+------------------------+
| eclair    |                     56 |
| cake      |                     32 |
| candy     |                     30 |
| chocolate |                     25 |
| parfait   |                     23 |
+-----------+------------------------+
```

 ROUND()関数は小数点の切捨てに使っています。 もしGROUP BY句を用いずに上述の関数（AVG,SUM）を用いると以下のようなエラーが出ます。 

```sql
mysql> SELECT name, ROUND(AVG(quantity),0)
    -> FROM product_list;
ERROR 1140 (42000): Mixing of GROUP columns (MIN(),MAX(),COUNT(),...)
with no GROUP columns is illegal if there is no GROUP BY clause
```

 グループカラム（＝同値のフィールドのレコード集）を渡さなければいけませんので、1つのカラムを渡しても意味無い、という解釈でいいのかな。 ちなみに、**COUNT()**関数は引数に列（カラム）名を取り、その**行（レコード）数を返します**。 

```sql
mysql> SELECT COUNT(name)
    -> FROM product_list;
+-------------+
| count(name) |
+-------------+
|          10 |
+-------------+
```

 この場合はGROUP BY句も必要ありません。 今記事では取り上げませんでしたがMIN(),MAX()はそれぞれ最小、最大値を返します（文字どおりですね）。

## リファレンス

- [MySQL :: MySQL 5.1 Reference Manual :: 7.2.15 GROUP BY Optimization](http://dev.mysql.com/doc/refman/5.1/en/group-by-optimization.html "MySQL :: MySQL 5.1 Reference Manual :: 7.2.15 GROUP BY Optimization")
- [MySQL :: MySQL 5.1 Reference Manual :: 11.12.1 GROUP BY (Aggregate) Functions](http://dev.mysql.com/doc/refman/5.1/en/group-by-functions.html "MySQL :: MySQL 5.1 Reference Manual :: 11.12.1 GROUP BY (Aggregate) Functions")
