---
title: 'Python: リストの要素の追加と削除、取出し - append()、extend()、pop()、remove()メソッド'
date: 2008-06-12
authors: [yukun]
tags:
  - list
  - python
  - stack
slug: python-list2
---

### ソースコード


```python
 #!/usr/bin/python # coding: UTF-8 # リストの要素の追加と削除(取出し) | append()、extend()、pop()、remove()メソッドの使い方 a = [3, 5, 7, 9, 11] print a a.append(13) # 引数のオブジェクトをリストの末尾に追加 print a a.extend([15, 17, 19, 21]) # 引数のシーケンスを展開して末尾に追加 print a elm = a.pop() # リストの末尾から要素を1つ取り出す print 'elm == %d' % elm print a elm = a.pop(4) # 引数にリストのインデックスを取り、その要素を取り出す print 'elm == %d' % elm print a a.remove(13) # 引数のオブジェクトをリスト要素から削除する print a 
```


### 実行結果

```
[3, 5, 7, 9, 11]
[3, 5, 7, 9, 11, 13]
[3, 5, 7, 9, 11, 13, 15, 17, 19, 21]
elm == 21
[3, 5, 7, 9, 11, 13, 15, 17, 19]
elm == 11
[3, 5, 7, 9, 13, 15, 17, 19]
[3, 5, 7, 9, 15, 17, 19]

```

### リファレンス

- [3.6 Sequence Types -- str, unicode, list, tuple, buffer, xrange](https://docs.python.org/2/library/stdtypes.html#typesseq)
- deque 型(参考)
    - [5.3.1 deque objects](http://docs.python.org/2/library/collections.html#deque-objects)
    - [5.3.1.1 Recipes](http://docs.python.org/2/library/collections.html#deque-recipes)

### チュートリアル

- [3\. An Informal Introduction to Python](https://docs.python.org/2/tutorial/introduction.html)
    - [3.1.4 Lists](https://docs.python.org/2/tutorial/introduction.html)
