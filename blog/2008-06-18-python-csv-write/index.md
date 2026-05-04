---
title: 'Python: CSVファイルに書き込み - csv.writerオブジェクト'
date: 2008-06-18
authors: [yukun]
tags:
  - csv
  - file
  - python
  - write
slug: python-csv-write
---

試しにチャット履歴をCSVファイルに保存するという場合の例を取り上げます。まぁ実際はメッセンジャーアプリのXMLファイル等をコンバートして保存する例を持ってきた方が良いのかもしれませんが、そうするとコードが長くなり今記事の焦点が合わなくなるので割愛します。

### ソースコード


```python
#!/usr/bin/python
# coding: UTF-8
# CSVファイルに書き込み
import csv # CSVファイルを扱うためのモジュールのインポート
filename = "table02.csv"
writecsv = csv.writer(file(filename, 'w'), lineterminator='n') # 書き込みファイルの設定
writecsv.writerow(['2007/11/12 20:19:18', 'や、こんばんは。'])  # 1行(リスト)の書き込み
writecsv.writerow(['2007/11/12 20:19:39', 'おいーす'])
writecsv.writerow(['2007/11/12 20:19:53', '久しぶりだね'])
writecsv.writerow(['2007/11/12 20:20:02', 'そだね。'])
chatable = [['2007/11/12 20:42:58', 'そうだね'],
['2007/11/12 20:43:03', '色々ありがとう'],
['2007/11/12 20:43:12', 'いえ、こちらこそ。'],
['2007/11/12 20:43:21', 'それじゃあまた'],
['2007/11/12 20:43:27', 'うん、またねー。']]
writecsv.writerows(chatable) # 複数行(リストのリスト|テーブル)の書き込み
```


### 実行結果 (table02.csv)

```
2007/11/12 20:19:18,や、こんばんは。
2007/11/12 20:19:39,おいーす
2007/11/12 20:19:53,久しぶりだね
2007/11/12 20:20:02,そだね。
2007/11/12 20:42:58,そうだね
2007/11/12 20:43:03,色々ありがとう
2007/11/12 20:43:12,いえ、こちらこそ。
2007/11/12 20:43:21,それじゃあまた
2007/11/12 20:43:27,うん、またねー。

```

### リファレンス

- [9.1 csv -- CSV File Reading and Writing](http://docs.python.org/2/library/csv.html)
    - [9.1.4 Writer Objects](http://docs.python.org/2/library/csv.html)
    - [9.1.5 Examples](http://docs.python.org/2/library/csv.html#examples)
