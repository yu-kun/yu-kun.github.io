---
title: 'Python: if/for文でのin演算子の各オブジェクト毎の評価'
date: 2008-08-02
authors: [yukun]
tags:
  - list
  - loop
  - number
  - python
  - string
slug: python-if-for-in
---

if/for文中で使われるin演算子の評価はオブジェクトごとに微妙に変化します。あやふやなままにしておくのもなんですし、ここで、以下のオブジェクトに対するif/for文中の評価を実際に確認してみましょう。

- 文字列
- リスト
    - 数値のリスト
    - 文字列のリスト
    - 辞書のリスト
- 辞書

## if/for文 + in 文字列


```python
#!/usr/bin/python
# coding: UTF-8
str1 = "abcdefghijklmn" # 文字列
# if 「検索する文字列」 in 「検索される文字列」:
elem = 'def'
if elem in str1:
    print '文字列 "%s" に "%s" は存在する。' % (str1, elem)
print
# for 「要素(文字)」 in 「文字列」:
for ch in str1:
    print ch, # str1の先頭の文字から順に繰り返す
```


### 実行結果

```
文字列 "abcdefghijklmn" に "def" は存在する。
a b c d e f g h i j k l m n

```

## if/for文 + in リスト


```python
#!/usr/bin/python
# coding: UTF-8
nums = [1, 2, 3, 4, 5] # 数値のリスト
chs  = ['a', 'b', 'c', 'd'] # 文字列のリスト
dics = [{'one':1}, {'two':2}, {'three':3}, {'four':4}] # 辞書のリスト
# if 「検索する要素」 in 「検索されるリスト」:
elem = 3
if elem in nums:
    print 'リスト  %s に要素の %d は存在する。' % (nums,  elem)
elem = 'b'
if elem in chs:
    print 'リスト2 %s に要素の %s は存在する。' % (chs, elem)
elem = {'two':2}
if elem in dics:
    print 'リスト3 %s に要素の %s は存在する。' % (dics, elem)
print
# for 「リストの要素」 in 「リスト」:
for e_num in nums:
    print e_num,
print
for e_ch in chs:
    print e_ch,
print
for e_dic in dics:
    print e_dic,
```


### 実行結果

```
リスト  [1, 2, 3, 4, 5] に要素の 3 は存在する。
リスト2 ['a', 'b', 'c', 'd'] に要素の b は存在する。
リスト3 [{'one': 1}, {'two': 2}, {'three': 3}, {'four': 4}] に要素の {'two': 2} は存在する。
1 2 3 4 5
a b c d
{'one': 1} {'two': 2} {'three': 3} {'four': 4}

```

## if/for文 + in 辞書


```python
#!/usr/bin/python
# coding: UTF-8
dic  = {'one':1, 'two':2, 'three':3, 'four':4} # 辞書
# if 「検索するキー」 in 「検索される辞書」:
elem = 'three'
if elem in dic: # 辞書のキーの検索
    print '辞書 %s に要素の「キー」 %s は存在する。' % (dics, elem)
print
# for 「辞書のキー」 in 「辞書」:
for key in dic: # for key in dic.keys(): と同じ
    print key,
print
for v in dic.values(): # 値を要素として繰り返す
    print v,
print
for (k, v) in dic.items(): # (キー, 値)のタプルを要素として繰り返す
    print "%s:%s, " % (k, v),
```


### 実行結果

```
辞書 [{'one': 1}, {'two': 2}, {'three': 3}, {'four': 4}] に要素の「キー」 three は存在する。
four three two one
4 3 2 1
four:4,  three:3,  two:2,  one:1,

```

### チュートリアル

- [4\. More Control Flow Tools](http://docs.python.org/2/tutorial/controlflow.html "4. More Control Flow Tools")

### リファレンス

- [7\. Compound statements](http://docs.python.org/2/reference/compound_stmts.html "7. Compound statements")
    - [7.1 The if statement](http://docs.python.org/2/reference/compound_stmts.html#the-if-statement "7.1 The if statement")
    - [7.3 The for statement](http://docs.python.org/2/reference/compound_stmts.html#the-for-statement "7.3 The for statement")
