---
title: 'Python: リストの初期化・出力・代入・要素数'
date: 2008-06-01
authors: [yukun]
tags:
  - list
  - python
slug: python-list
---

### ソースコード


```python
#!/usr/bin/python
# coding: UTF-8
# リストの初期化
numbers = [1, 4, 7, 12, 23]
strings = ['Jon', 'Mery', 'Sun', 'Ren']
empty   = []       # 空リスト
inilist = [0] * 4  # 0で初期化された要素が4つのリスト
# 型は?
print type(numbers)
print type(strings)
print type(empty)
print
# リストの全ての要素を表示
print numbers
print strings
print empty
print inilist
print
# for文で全要素を表示
for i in range(len(numbers)):  # lenでリストの要素数を求める, rangeにループ回数(回数分の要素のリストが戻り値), inはリストをとる
    print '%d, ' % (numbers[i]), # print文の末尾に「,」を付けると改行しない
print '\n'
# リストの要素の1つを表示
print numbers[0]  # 要素は0から始まる
print numbers[3]
print strings[-1] # 最末尾の要素
print strings[-3]
print
# リスト要素に代入
numbers[2] = 1000
strings[1] = 'Micky'
# 代入の確認
print numbers[2]
print strings[1]
```


#### 実行結果

```
<type 'list'>
<type 'list'>
<type 'list'>
[1, 4, 7, 12, 23]
['Jon', 'Mery', 'Sun', 'Ren']
[]
[0, 0, 0, 0]
1,  4,  7,  12,  23,
1
12
Ren
Mery
1000
Micky
```

### リファレンス

- [3.6 Sequence Types -- str, unicode, list, tuple, buffer, xrange](https://docs.python.org/2/library/stdtypes.html#typesseq)

### チュートリアル

- [3\. An Informal Introduction to Python](https://docs.python.org/2/tutorial/introduction.html)
    - [3.1.4 Lists](https://docs.python.org/2/tutorial/introduction.html)
