---
title: 'Python: リスト中の文字列を大文字⇔小文字に変換'
date: 2008-08-03
authors: [yukun]
tags:
  - character
  - list
  - loop
  - python
  - string
slug: python-upper-lower-case-letters-converted
---

文字列を比較する際に、大文字・小文字を区別したくない場合があります。その時は、比較する文字列を大/小文字列のどちらかに統一しておく、という手があります。Pythonでは大文字・小文字変換メソッドlower()、upper()はstringオブジェクトに組み込まれています。 今回は、その使い方と実際に使用する状況に近いデータ構造、ここでは変換対象文字列がリスト中の要素である場合を想定し、for文とリストコンプリヘンション(リスト内包表記)の両表記を以下に示します。

### ソースコード


```python
 #!/usr/bin/python # coding: UTF-8 # リスト中の文字列要素を大文字⇔小文字変換 str_atog = "ABCDEFG" str_hton = "hijklmn" # lower(), upper()メソッドの使い方 print "大文字(列) %s を小文字(列) %s に変換" % (str_atog, str_atog.lower()) print "小文字(列) %s を大文字(列) %s に変換" % (str_hton, str_hton.upper()) print arr = ['And', 'Begin', 'Code', 'Double'] arr2 = ['end', 'flag', 'gem', 'halt'] # for文で小文字[大文字](列)を要素とするリストを生成 n_arr = [] for str in arr: n_arr.append(str.lower()) print n_arr n_arr2 = [] for str in arr2: n_arr2.append(str.upper()) print n_arr2, 'n' # リストコンプリヘンションで小文字[大文字](列)を要素とするリストを生成 print [str.lower() for str in arr] print [str.upper() for str in arr2] 
```


### 実行結果

```
大文字(列) ABCDEFG を小文字(列) abcdefg に変換
小文字(列) hijklmn を大文字(列) HIJKLMN に変換
['and', 'begin', 'code', 'double']
['END', 'FLAG', 'GEM', 'HALT']
['and', 'begin', 'code', 'double']
['END', 'FLAG', 'GEM', 'HALT']

```

List Comprehensions なら**ワンライナー**で書けるってのは地味に良いですね。 話変わりますが、Rubyにもイテレータやブロックを用いた簡略記法がありましたね。アレはアレで、応用しやすいものです。

### チュートリアル

- [5\. Data Structures](https://docs.python.org/2/tutorial/datastructures.html)
    - [5.1.4 List Comprehensions](https://docs.python.org/2/tutorial/datastructures.html)

### リファレンス

- [4.1 string -- Common string operations](http://docs.python.org/2/library/string.html "4.1 string -- Common string operations")
    - [4.1.1 String constants](http://docs.python.org/2/library/string.html "4.1.1 String constants")
    - [4.1.4 Deprecated string functions](http://docs.python.org/2/library/string.html "4.1.4 Deprecated string functions")
