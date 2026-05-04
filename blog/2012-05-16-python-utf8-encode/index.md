---
title: 'Python: ソースコード中でのUTF-8文字(日本語等)のエンコーディング指定'
date: 2012-05-16
authors: [yukun]
tags:
  - python
slug: python-utf8-encode
---

Pythonスクリプトの実行(コンパイル→実行)の際に下記のエラーが発生した場合、

```
SyntaxError: Non-ASCII character '\ABC' in file C:\XXX\YYY\ZZZ.py on line MM,
but no encoding declared; see http://www.python.org/peps/pep-0263.html for details

```

ソースコード中にASCII以外の文字(日本語など)が含まれているがエンコードの指定が無いことが原因となる。 対処法はスクリプトの先頭行に下記の何れかの1行記述することでUTF-8文字の使用を宣言する。

```
# coding: utf-8

```

```
# -*- coding: utf-8 -*-

```

### 参考サイト

- [PEP 0263 -- Defining Python Source Code Encodings](http://www.python.org/dev/peps/pep-0263/)
