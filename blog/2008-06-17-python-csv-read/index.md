---
title: 'Python: CSVファイルの読み込み - csv.readerオブジェクト'
date: 2008-06-17
authors: [yukun]
tags:
  - csv
  - file
  - python
  - read
slug: python-csv-read
---

### ソースコード


```python
#!/usr/bin/python
# coding: UTF-8
# CSVファイルの読み込み
import csv
filename = "table01.csv"
csvfile = open(filename)
print csvfile
for row in csv.reader(csvfile):
    print row        # 1行のリスト
    for elem in row:
        print elem,    # 行の中の要素
    print
csvfile.close()
print csvfile
```


#### CSVファイル (table01.csv) (番号,名前)

```
1,aki
2,hiro
3,norika
4,kaede

```

### 実行結果

```
<open file 'table01.csv', mode 'r' at 0x01BECCC8>
['1', 'aki']
1 aki
['2', 'hiro']
2 hiro
['3', 'norika']
3 norika
['4', 'kaede']
4 kaede
<closed file 'table01.csv', mode 'r' at 0x01BECCC8>

```

### リファレンス

- [9.1 csv -- CSV File Reading and Writing](http://docs.python.org/2/library/csv.html)
    - [9.1.1 Module Contents](http://docs.python.org/2/library/csv.html#module-contents)
    - [9.1.5 Examples](http://docs.python.org/2/library/csv.html#examples)
