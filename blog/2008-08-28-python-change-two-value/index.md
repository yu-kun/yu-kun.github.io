---
title: 'Python: 二値の交換'
date: 2008-08-28
authors: [yukun]
tags:
  - list
  - python
slug: python-change-two-value
---

ソート系のアルゴリズムを実装する際などに、_配列の任意の2つの要素を交換する_処理が必要な場合がありますので、以下にその手順の一例を示します。

### ソースコード


```python
 # coding: UTF-8 a = [10, 20] print '%d %d' % (a[0], a[1]) a[0], a[1] = a[1], a[0] print '%d %d' % (a[0], a[1]) 
```


### 実行結果

```
10 20
20 10

```

何だかperlの多重代入を思い出します。
