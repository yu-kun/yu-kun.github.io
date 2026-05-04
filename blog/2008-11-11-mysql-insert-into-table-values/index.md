---
title: 'MySQL: データをテーブルに追加 - INSERT文、INTO、VALUES句'
date: 2008-11-11
authors: [yukun]
tags:
  - mysql
slug: mysql-insert-into-table-values
---

INSERT文を用いて1レコードを追加する練習をしてみます。 [前回まで](/blog/alter-table-add-drop-change-modify "MySQL: 既存テーブルの構造の変更 - ALTER TABLE文、ADD、DROP、CHANGE、MODIFY句 - Yukun's Blog")にテーブルの作成と構造の修正を行いましたが、これから使うテーブルは下記のものにします（少しフィールドを削りました）。 
<!-- truncate -->
 

```sql
mysql> DESC book_list;
+----------+--------------+------+-----+---------+----------------+
| Field    | Type         | Null | Key | Default | Extra          |
+----------+--------------+------+-----+---------+----------------+
| book_id  | int(11)      | NO   | PRI | NULL    | auto_increment |
| title    | varchar(128) | NO   |     | NULL    |                |
| author   | varchar(32)  | NO   |     | NULL    |                |
| price    | int(11)      | NO   |     | NULL    |                |
| comments | text         | NO   |     | NULL    |                |
+----------+--------------+------+-----+---------+----------------+
```

 テーブルへのデータの挿入は基本的には以下の構文を使います。

> `INSERT INTO ＜テーブル名＞ (＜列名1＞ , ＜列名2＞, ...) VALUES (＜列名1へのデータ＞, ＜列名2へのデータ＞, ...);`

実際にプロンプト上で打つと、 

```sql
mysql> INSERT INTO book_list
    -> (book_id, title, author, price, comments)
    -> VALUES
    -> (1, 'book_A', 'auth_A', 1500, 'good, bad, excellence');
```

 となります。最初の丸括弧「()」内で列名を列挙し、二つ目のVALUES句の丸括弧内で、挿入するレコード値を書きます。数値はそのまま書きますが、文字列はシングルクォート「'」で囲まなければいけません。仮に文字としてシングルクォート「'」を使いたい場合はその直前に「\\」をつける必要があります。すなわち、「\\'」と書きます。 また、主キーのフィールドに重複するデータを追加しようとすると下記のようなエラーがでます。 

```sql
ERROR 1062 (23000): Duplicate entry '1' for key 1
```

 ちなみに、INSERT文にはいくつか下記のような簡略化した書き方があります。

## (＜列名1＞ , ＜列名2＞, ...)句の省略

ただし、VALUES (...)句内のデータの順序はテーブルの列の順序に合わせなければいけません。

> `INSERT INTO ＜テーブル名＞ VALUES (＜列名1へのデータ＞, ＜列名2へのデータ＞, ...);`

今回のテーブルに使ってみると、 

```sql
mysql> INSERT INTO book_list
    -> VALUES
    -> (2, 'book_B', 'auth_B', 2900, 'not bad, good');
```

 これは手っ取り早くていいですね。

## (＜列名Y＞ , ＜列名X＞, ...)句とVALUES (＜列名Yへのデータ＞, ＜列名Xへのデータ＞, ...)句内の列順序の変更

二つの丸括弧内の「列名―代入するデータ」の対応が取れていれば、どんな順序で書いても良いです。 仮にテーブル内のフィールドがA, B, Cの順で並んでいても、

> `INSERT INTO ＜テーブル名＞ (＜列名C＞ , ＜列名A＞, ＜列名B＞, ...) VALUES (＜列名Cへのデータ＞ , ＜列名Aへのデータ＞, ＜列名Bへのデータ＞, ...);`

のように記述できます。試しに打ってみると、 

```sql
mysql> INSERT INTO book_list
    -> (author, title, book_id, comments, price)
    -> VALUES
    -> ('auth_C', 'book_C', 3, 'interesting, amazing', 1800);
```


## 一部のフィールド値の挿入を省略

二つの丸括弧内の「列名―代入するデータ」の対応が取れていれば、全列へのデータの代入をしなくてもOKです。 例えば、テーブルにA, B, CというフィールドがあったときA, Cだけにデータを追加するには、

> `INSERT INTO ＜テーブル名＞ (＜列名A＞, ＜列名C＞ , ...) VALUES (＜列名A＞, ＜列名C＞, ...);`

と書けます。このとき列Bには、デフォルト値が設定されているならばその値が、ないならばNULLが代入されます。 今回のテーブルでは、 

```sql
mysql> INSERT INTO book_list
    -> (title, author, price, comments)
    -> VALUES
    -> ('book_D', 'auth_D', 700, 'sad, depress');
```

 book\_idフィールドを省略しましたが、このフィールドはauto\_incrementを指定してあるので、前に挿入されたbook\_idフィールドの値を1増やした値が代入されます。

## 追加されたデータを確認（検索） - SELECT文

それでは最後に以下のコマンドを打ち、上述で追加されたレコードを確認してみましょう。 

```sql
mysql> SELECT * FROM book_list;
+---------+--------+--------+-------+-----------------------+
| book_id | title  | author | price | comments              |
+---------+--------+--------+-------+-----------------------+
|       1 | book_A | auth_A |  1500 | good, bad, excellence |
|       2 | book_B | auth_B |  2900 | not bad, good         |
|       3 | book_C | auth_C |  1800 | interesting, amazing  |
|       4 | book_D | auth_D |   700 | sad, depress          |
+---------+--------+--------+-------+-----------------------+
```

 確かにコマンドどおりのレコードが入っていますね。

## リファレンス

- [MySQL :: MySQL 5.7 Reference Manual :: 12.2.5 INSERT Syntax](http://dev.mysql.com/doc/refman/5.7/en/insert.html "MySQL :: MySQL 5.1 Reference Manual :: 12.2.5 INSERT Syntax")
