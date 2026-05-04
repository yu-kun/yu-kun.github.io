---
title: 'Python: リスト内包表記(リストコンプリヘンション)をfor文に書き換える'
date: 2008-06-16
authors: [yukun]
tags:
  - list
  - loop
  - python
slug: python-list-comprehension
---

リスト内包表記を知ることでコードのリーディングとライティングを早めることが出来ます(パフォーマンスもfor文より良いです)。そこでリスト内包表記とfor文の書き換え方を以下に紹介。

### ソースコード


```python
 #!/usr/bin/python # coding: UTF-8 # リスト内包表記(リストコンプリヘンション)をfor文に書き換える # List Comprehensions print [a for a in range(10)] # 0～9の数値を要素とするリスト a2 = [] for i in range(10): a2.append(i) print a2 print [b*2 for b in range(10)] # ループのパラメータに演算を行う # 0～9の数値の×2の結果を要素とするリスト b2 = [] for i in range(10): b2.append(i*2) print b2 print [c for c in range(10) if c % 2 == 1] # 条件を指定してリストを生成 # in の被演算子を評価後、取り出された要素cをif文にかける。if文が偽のときは、とばして次のループに入る # 結果として、0～9の数値の中で条件「c % 2 == 1」を満たす、すなわち奇数を要素とするリスト c2 = [] for i in range(10): if (i % 2 == 1): c2.append(i) print c2 print '\n', b2 print [d+1 for d in b2] d2 = [] for i in b2: d2.append(i+1) print d2 e = 'It is important to set my aims but at the same time I should confirm my present condition.' print '\n', e print [wd for wd in e.split(' ')] e2 = [] for i in e.split(' '): e2.append(i) print e2 
```


### 実行結果

```
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
[0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
[0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
[1, 3, 5, 7, 9]
[1, 3, 5, 7, 9]
[0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
[1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
[1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
It is important to set my aims but at the same time I should confirm my present condition.
['It', 'is', 'important', 'to', 'set', 'my', 'aims', 'but', 'at', 'the', 'same', 'time', 'I', 'should', 'confirm', 'my', 'present', 'condition.']
['It', 'is', 'important', 'to', 'set', 'my', 'aims', 'but', 'at', 'the', 'same', 'time', 'I', 'should', 'confirm', 'my', 'present', 'condition.']

```

### 一般化

`[新しいリストに格納する要素(*1) for OLD_ELEMENT in OLD_LIST if 条件式]   *1: 式を書く`

### 追記(2008-6-17): 文字列の1文字ごとの処理


```python
 >>> str = 'hello! hello!' >>> ' '.join([c.upper() for c in str]) 'H E L L O ! H E L L O !' >>> 
```

 ここでの処理内容は、upper()メソッドによる英小文字→大文字の変換です。

### チュートリアル

- [5\. Data Structures](https://docs.python.org/2/tutorial/datastructures.html)
    - [5.1.4 List Comprehensions](https://docs.python.org/2/tutorial/datastructures.html)
