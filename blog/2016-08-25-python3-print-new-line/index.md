---
title: 'Python3: print文内に改行を入れる'
date: 2016-08-25
authors: [yukun]
tags:
  - python
slug: python3-print-new-line
---

Python 3系のprint文内で改行を出力する場合は下記の様に、改行コード "\\n" (バックスラッシュ+n)を入れる。 
<!-- truncate -->
 

```python
 print("it's the new \n line. ") 
```

 Mac OS X のJISキーボードを使用している場合のバックスラッシュの入力方法はOptionキーを押しながら¥キーを押下する。Optionキーの押下要否についてはキーボード設定で変えることが可能。

### 実行結果

```
it's the new
 line.

```

以前、久々にPython 3系でコーディングする際、本件に関して検索したところ、一発で記事がヒットしなかったので、投稿した次第。

### 参考サイト

公式ドキュメントには勿論確り書いてある。

- [2\. Built-in Functions — Python 3.5.2 documentation](https://docs.python.org/3/library/functions.html?highlight=print#print)
