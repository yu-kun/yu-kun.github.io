---
title: 'AIR: SQLiteでデータの挿入と検索 - SQLConnection、SQLStatementクラス'
date: 2008-12-22
authors: [yukun]
tags:
  - actionscript
  - air
  - gui
  - mysql
slug: air-actionscript-sqlite-statement
---

AIRアプリケーションからSQLiteのDBにアクセスするには主にSQLConnectionとSQLStatementクラスを用います。基本的な処理の流れは、

1. SQLConnection#openAsync(＜Fileオブジェクト＞, ＜モード＞)でDBに接続
2. SQLStatement#textプロパティにSQL文を代入しexecute()で実行
3. その際、フィールド値はSQLStatement#parameters\["@＜定義されたパラメータ＞"\]で代入する
4. SELECT文の検索結果データははSQLStatement#getResult()で取得
5. 結果データの型はSQLResultで、データそのものはdataプロパティ(Array型)に入っている。e.g. ＜SQLResult＞.data\[i\].＜フィールド名＞

下のプログラムはDBに接続してテーブルの作成、レコードの追加、検索を行うサンプルです。 
<!-- truncate -->


## ソースコード


```actionscript
 
```


## 実行結果

```
フィアルは存在しません。/Users/yukun/Desktop/test01.db
Connect DB
Can create table
Can insert data
Can select data
id=1, name=名無し, age=18

```

### リファレンス

- Adobe AIR 1.5 \* ローカル SQL データベースの操作
- Adobe AIR 1.5 \* データベースへの接続
