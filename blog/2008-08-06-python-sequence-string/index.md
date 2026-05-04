---
title: 'Python: 文字列の上位型であるシーケンス型の構文 - Sequence[X:Y:Z]'
date: 2008-08-06
authors: [yukun]
tags:
  - python
  - sequence
  - string
slug: python-sequence-string
---

データの順序が存在するデータ型としてシーケンス型があり、文字列型の上位型となっています。このシーケンス型には文字列中の文字の抽出や操作を簡略化する分かりやすい構文がありますので、これを確認してみましょう。

## String\[X:\] はString\[X\]から末尾までの文字を持つ文字列


```python
 #!/usr/bin/python # coding: UTF-8 s = 'abcdefg' print 's ', s print 's[0:] ', s[0:] print 's[1:] ', s[1:] print 's[-1:] ', s[-1:] print 's[-5:] ', s[-5:] 
```


### 実行結果

```
s       abcdefg
s[0:]   abcdefg
s[1:]   bcdefg
s[-1:]  g
s[-5:]  cdefg

```

## String\[:Y\] は文字列の先頭からString\[Y-1\]までの文字を持つ文字列


```python
 s = 'abcdefg' print 's ', s print 's[:3] ', s[:3] # s[0] s[1] s[2]まで print 's[:-1] ', s[:-1] # Yは-1よりs[(-1)-1]→s[-2]までの文字列 print 's[:-5] ', s[:-5] 
```


### 実行結果

```
s       abcdefg
s[:3]   abc
s[:-1]  abcdef
s[:-5]  ab

```

## String\[::Z\] は文字列の先頭から末尾まで Z 間隔で文字を抽出した文字列


```python
 s = 'abcdefg' print 's ', s print 's[::1] ', s[::1] # 1間隔なのでsと同じ print 's[::2] ', s[::2] print 's[::-1]', s[::-1] # 「-」を付けると逆順に辿っていきます 
```


### 実行結果

```
s       abcdefg
s[::1]  abcdefg
s[::2]  aceg
s[::-1] gfedcba

```

**文字列の文字順序を逆順にする**処理を構文で賄えるのは良いですね。汎用性があって。

## 上述の複合 - String\[X:Y:Z\]


```python
 s = 'abcdefg' print 's ', s print 's[1:3] ', s[1:3] print 's[:-1:2] ', s[:-1:2] print 's[-1::-2]', s[-1::-2] print 's[1:4:2] ', s[1:4:2] 
```


### 実行結果

```
s         abcdefg
s[1:3]    bc
s[:-1:2]  ace
s[-1::-2] geca
s[1:4:2]  bd

```

### チュートリアル

- [5\. Data Structures](https://docs.python.org/2/tutorial/datastructures.html "5. Data Structures")
    - [5.3 Tuples and Sequences](https://docs.python.org/2/tutorial/datastructures.html "5.3 Tuples and Sequences")
    - [5.8 Comparing Sequences and Other Types](https://docs.python.org/2/tutorial/datastructures.html "5.8 Comparing Sequences and Other Types")

### リファレンス

- [3.6 Sequence Types -- str, unicode, list, tuple, buffer, xrange](https://docs.python.org/2/library/stdtypes.html#typesseq "3.6 Sequence Types -- str, unicode, list, tuple, buffer, xrange")
