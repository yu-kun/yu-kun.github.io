---
title: 'Python: 文字列の検索 - index()、reindex()メソッド'
date: 2008-07-02
authors: [yukun]
tags:
  - exception
  - python
  - string
slug: python-string
---

### ソースコード


```python
 #!/usr/bin/python # coding: UTF-8 # 文字列の検索 | index(), reindex()の使い方 s1 = 'Hello, Jan !' # 引数（パターン）が1文字の文字列 try: i = s1.index('l') # 引数で与えられた文字列を先頭から探索した場合の出現位置を返す except ValueError: i = None # 存在しない場合は例外ValueErrorがなげれられる print i, s1[i] try: i = s1.rindex('l') # 末尾から探索した場合の最初の出現位置を返す except ValueError: i = None print i, s1[i] print # 引数（パターン）が2文字以上の文字列 str = 'lo' try: i = s1.index(str) except ValueError: i = None print i, s1[i] try: i = s1.rindex(str) except ValueError: i = None print i, s1[i] print # 引数で与えられた文字列（パターン）が存在しない場合 try: i = s1.index('Max') except ValueError: i = None print i 
```


### 実行結果

```
2 l
3 l
3 l
3 l
None

```

### リファレンス

- [2.3 Built-in Exceptions](http://docs.python.org/2/library/exceptions.html)
- [3.6 Sequence Types -- str, unicode, list, tuple, buffer, xrange](https://docs.python.org/2/library/stdtypes.html#typesseq)
    - [3.6.1 String Methods](http://docs.python.org/2/library/stdtypes.html#string-methods)

### チュートリアル

- [3\. An Informal Introduction to Python](https://docs.python.org/2/tutorial/introduction.html)
    - [3.1.2 Strings](https://docs.python.org/2/tutorial/introduction.html)
