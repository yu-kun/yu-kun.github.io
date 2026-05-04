---
title: 'Python: リストの抽出・連結・要素の追加'
date: 2008-06-02
authors: [yukun]
tags:
  - list
  - python
  - sequence
slug: python-sequence
---

### ソースコード


```python
 #!/usr/bin/python # coding: UTF-8 # リストの初期化 num1 = [1, 4, 7, 12, 23, 41, 88, 96] num2 = [100, 130, 255, 1000] str1 = ['Jon', 'Mery', 'Sun', 'Ren'] str2 = ['hi', 'hello', 'hey', 'bye', 'ya'] # リストの要素を出力 print num1[3] print num2[-2] print # リストの範囲を指定して抽出(シーケンス型に備わっている操作) extr_n1 = num1[:-3] # 先頭から最末尾の3つ手前の要素までのリストを抽出 print extr_n1 extr_n2 = num1[2:] # 添え字の2から末尾までの要素のリストを抽出 print extr_n2 extr_s1 = str2[1:-2] # 添え字の1から末尾の2つ手前の要素までのリストを抽出 print extr_s1 extr_n3 = num1[1:6:2] # 1から5まで2つとびのリストを抽出 print extr_n3 extr_n4 = num1[1:6] print extr_n4 print # リストの連結 cmbn = num1 + num2 # 2項演算子'+'で連結 print cmbn cmbs = str1 + str2 print cmbs cmbhy = num1 + str1 # 中の要素が異なっていてもOK print cmbhy print # リストの連結(データ型を文字列に変更)(文字列のメソッド) print cmbs ch = ',' cmb1 = ch.join(cmbs) # joinの引数にはstring要素のリストを。cmbnだとエラー print type(cmb1) print cmb1 print # リストに要素の追加(注:データそのものを書き換える) num3 = [1100, 1130, 1255, 1300] print num3 num3.append(3) print num3 str3 = ['hi', 'hello', 'hey', 'bye', 'ya'] print str3 str3.append('Yap') print str3 print 
```


### 実行結果

```
12
255
[1, 4, 7, 12, 23]
[7, 12, 23, 41, 88, 96]
['hello', 'hey']
[4, 12, 41]
[4, 7, 12, 23, 41]
[1, 4, 7, 12, 23, 41, 88, 96, 100, 130, 255, 1000]
['Jon', 'Mery', 'Sun', 'Ren', 'hi', 'hello', 'hey', 'bye', 'ya']
[1, 4, 7, 12, 23, 41, 88, 96, 'Jon', 'Mery', 'Sun', 'Ren']
['Jon', 'Mery', 'Sun', 'Ren', 'hi', 'hello', 'hey', 'bye', 'ya']
<type 'str'>
Jon,Mery,Sun,Ren,hi,hello,hey,bye,ya
[1100, 1130, 1255, 1300]
[1100, 1130, 1255, 1300, 3]
['hi', 'hello', 'hey', 'bye', 'ya']
['hi', 'hello', 'hey', 'bye', 'ya', 'Yap']

```

### リファレンス

- [3.6 Sequence Types -- str, unicode, list, tuple, buffer, xrange](https://docs.python.org/2/library/stdtypes.html#typesseq)

### チュートリアル

- [3\. An Informal Introduction to Python](https://docs.python.org/2/tutorial/introduction.html "3. An Informal Introduction to Python")
    - [3.1.4 Lists](https://docs.python.org/2/tutorial/introduction.html)
