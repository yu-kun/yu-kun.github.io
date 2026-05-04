---
title: 'Python: SQLiteにデータを格納、検索、出力 - pysqlite'
date: 2008-07-14
authors: [yukun]
tags:
  - module
  - mysql
  - python
slug: python-sqlite-insert
---

レコードの検索や格納処理性能がオープンソースのDBで間に合う程度の問題であれば、積極的に使っていきたいです。それによって、他のロジックのコーディングに傾注できます。また、DBという共通のプラットフォームは複数言語から扱えますので、データの再利用がしやすいです。 さて、今回はPythonからSQLiteを扱うサンプル(pysqliteの使い方)を書いてみます。

### ソースコード


```python
 # coding: UTF-8 from pysqlite2 import dbapi2 as sqlite # データベースに接続(作成) con = sqlite.connect('test1.db') # テーブルの列要素: 名前、性別(male or female)、年齢 con.execute('CREATE TABLE people (name TEXT, sex TEXT, age INTEGER)') # テストデータの挿入(1行はタプルで) con.execute('INSERT INTO people VALUES ("Taro", "male", 22)') con.execute('INSERT INTO people VALUES ("Hanako", "female", 38)') con.execute('INSERT INTO people VALUES ("Ranka", "female", 17)') con.execute('INSERT INTO people VALUES ("Ozuma", "male", 40)') con.commit() # DBに反映 # データの検索 cur = con.execute('SELECT * FROM people') # データの出力 print 'NAMEt SEXt AGE' for row in cur: print '%-8s %-6s %2d' % row # 1行のデータ構造はタプル con.close() 
```


### 実行結果

```
NAME      SEX     AGE
Taro      male    22
Hanako    female  38
Ranka     female  17
Ozuma     male    40

```
