---
title: 'Python: リストの上位型であるシーケンス型の構文 - Sequence[X:Y:Z]'
date: 2008-08-05
authors: [yukun]
tags:
  - list
  - python
  - sequence
slug: python-sequence-list
---

データの順序が存在するデータ型としてシーケンス型があり、リストの上位型となっています。このシーケンス型には要素の抽出や操作を簡略化する分かりやすい構文がありますので、これを確認してみましょう。

## List\[X:\] はList\[X\]から末尾までの要素を持つリスト


```python
 #!/usr/bin/python # coding: UTF-8 a = [10, 20, 30, 40, 50] print 'a ', a print 'a[0:] ', a[0:] print 'a[1:] ', a[1:] print 'a[-1:] ', a[-1:] print 'a[-5:] ', a[-5:] 
```


### 実行結果

```
a       [10, 20, 30, 40, 50]
a[0:]   [10, 20, 30, 40, 50]
a[1:]   [20, 30, 40, 50]
a[-1:]  [50]
a[-5:]  [10, 20, 30, 40, 50]

```

## List\[:Y\] はListの先頭からList\[Y-1\]までの要素を持つリスト


```python
 a = [10, 20, 30, 40, 50] print 'a ', a print 'a[:3] ', a[:3] # a[0] a[1] a[2]まで print 'a[:-1] ', a[:-1] # Yは-1よりa[(-1)-1]→a[-2]までのリスト print 'a[:-5] ', a[:-5] 
```


### 実行結果

```
a       [10, 20, 30, 40, 50]
a[:3]   [10, 20, 30]
a[:-1]  [10, 20, 30, 40]
a[:-5]  []

```

## List\[::Z\] はListの先頭から末尾まで Z 間隔で要素を抽出したリスト


```python
 a = [10, 20, 30, 40, 50] print 'a ', a print 'a[::1] ', a[::1] # 1間隔なのでaと同じ print 'a[::2] ', a[::2] print 'a[::-1]', a[::-1] # 「-」を付けると逆順に辿っていきます 
```


### 実行結果

```
a       [10, 20, 30, 40, 50]
a[::1]  [10, 20, 30, 40, 50]
a[::2]  [10, 30, 50]
a[::-1] [50, 40, 30, 20, 10]

```

リストの**要素順序を逆順**にする処理を構文で賄えるのは良いですね。

## 上述の複合 - List\[X:Y:Z\]


```python
 a = [10, 20, 30, 40, 50] print 'a ', a print 'a[1:3] ', a[1:3] print 'a[:-1:2] ', a[:-1:2] print 'a[-1::-2]', a[-1::-2] print 'a[1:4:2] ', a[1:4:2] 
```


### 実行結果

```
a         [10, 20, 30, 40, 50]
a[1:3]    [20, 30]
a[:-1:2]  [10, 30]
a[-1::-2] [50, 30, 10]
a[1:4:2]  [20, 40]

```

### チュートリアル

- [5\. Data Structures](https://docs.python.org/2/tutorial/datastructures.html "5. Data Structures")
    - [5.3 Tuples and Sequences](https://docs.python.org/2/tutorial/datastructures.html "5.3 Tuples and Sequences")
    - [5.8 Comparing Sequences and Other Types](https://docs.python.org/2/tutorial/datastructures.html "5.8 Comparing Sequences and Other Types")

### リファレンス

- [3.6 Sequence Types -- str, unicode, list, tuple, buffer, xrange](https://docs.python.org/2/library/stdtypes.html#typesseq "3.6 Sequence Types -- str, unicode, list, tuple, buffer, xrange")
