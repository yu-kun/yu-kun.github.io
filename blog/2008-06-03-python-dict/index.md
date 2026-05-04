---
title: 'Python: 辞書の初期化・出力・代入'
date: 2008-06-03
authors: [yukun]
tags:
  - python
slug: python-dict
---

### ソースコード


```python
#!/usr/bin/python
# coding: UTF-8
# 辞書とは: リストに似たデータ型で、要素(値)を指定するのに数値以外のデータ型(key)を使用することが出来る。
#           key(キー)とそれに対応するvalue(値)のペアが「辞書の一要素」となる。ハッシュみたい
# 辞書の初期化
dic1 = { 1:'robot', 'two':'AI' , 3:['Maya', 'Shade']}
dic2 = { (1, 3):'tuple' }
dicE = {}          # 空の状態で初期化
# ↑書式 {key1:VALUE, key2:VALUE, ...} keyの重複はNG, valueはOK
# keyとvalueはコロン「:」で繋ぐ
#   辞書中のkeyの型は混在してもOK
#   keyになれる型はimmutableな整数、文字列、タプルなど
#   valueの型は何でもOK
print type(dic1)   # データ型は？
print dic1         # 要素の順序が代入通りに出力されるとは限らない(決まっていない)
print type(dic2)
print dic2
print type(dicE)
print dicE
print
# もちろん、辞書の中のvalueに辞書が入っていてもOK
dic3 = { 'taro':{'age':15, 'hight':171}, 'jun':{'age':19, 'hight':178} }
print dic3
print
# 値(value)の出力
print dic1[3]      # keyを[大括弧]で指定(×波括弧)
print dic3['jun']
print
# 辞書全体を出力
for k, v in dic1.items(): # for/if文では文末のコロン「:」を忘れないように
    print k, v
print
# 辞書にキーと値の代入
dic4 = {}
dic4[1] = 'Python'
dic4['well'] = 'Java'
dic4['hate'] = ['remissness', 4, 9, 13]
print dic4
print 'It is %s to make full use of %s.' % ('good', dic4['well'])
print
# 値の上書き
dic4['well'] = 'Python' # 指定したキーに既に値が存在してる場合、その値を上書きする
print 'It is %s to make full use of %s.' % ('good', dic4['well'])
```


### 実行結果

```
<type 'dict'>
{1: 'robot', 3: ['Maya', 'Shade'], 'two': 'AI'}
<type 'dict'>
{(1, 3): 'tuple'}
<type 'dict'>
{}
{'jun': {'age': 19, 'hight': 178}, 'taro': {'age': 15, 'hight': 171}}
['Maya', 'Shade']
{'age': 19, 'hight': 178}
1 robot
3 ['Maya', 'Shade']
two AI
{1: 'Python', 'well': 'Java', 'hate': ['remissness', 4, 9, 13]}
It is good to make full use of Java.
It is good to make full use of Python.

```

### リファレンス

- [3.8 Mapping Types -- dict](https://docs.python.org/2/library/stdtypes.html#typesmapping)

### チュートリアル

- [5\. Data Structures](https://docs.python.org/2/tutorial/datastructures.html)
    - [5.5 Dictionaries](https://docs.python.org/2/tutorial/datastructures.html)
