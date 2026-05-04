---
title: 'Python: テキストファイルに書き込み - write()、writelines()メソッド'
date: 2008-09-06
authors: [yukun]
tags:
  - file
  - python
  - write
slug: python-file-write-writelines
---

テキストファイルへの書き込み処理はFileオブジェクトの以下のメソッドを用いる。

- write() - 文字列を引数に取り、ファイルに書き込む。
- writelines() - シーケンス型を引数に取り、ファイルに書き込む。


<!-- truncate -->


## write() - 文字列を引数に取り、ファイルに書き込む

### ソースコード


```python
#!/usr/bin/python
# coding: UTF-8
# 書き込む文字列
str1 = """It is meaningless only to think my long further aims idly.
It is important to set my aims but at the same time I should confirm my present condition.
Unless I set the standard where I am in any level, I'll be puzzled about what I should do from now on."""
f = open('text.txt', 'w') # 書き込みモードで開く
f.write(str1) # 引数の文字列をファイルに書き込む
f.close() # ファイルを閉じる
```


### 実行結果

_text.txt_

```
It is meaningless only to think my long further aims idly.
It is important to set my aims but at the same time I should confirm my present condition.
Unless I set the standard where I am in any level, I'll be puzzled about what I should do from now on.

```

## writelines() - シーケンス型を引数に取り、ファイルに書き込む

### ソースコード


```python
#!/usr/bin/python
# coding: UTF-8
str2 = """It is meaningless only to think my long further aims idly.
It is important to set my aims but at the same time I should confirm my present condition.
Unless I set the standard where I am in any level, I'll be puzzled about what I should do from now on."""
strs = str2.split('¥n') # 一行が一要素(文字列)のリスト
f = open('text2.txt', 'w') # 書き込みモードで開く
f.writelines(strs) # シーケンスが引数。
f.close()
```


### 実行結果

_text.txt_

```
It is meaningless only to think my long further aims idly.It is important to set my aims but at the same time I should confirm my present condition.Unless I set the standard where I am in any level, I'll be puzzled about what I should do from now on.

```

書き込む際は、シーケンスの各要素の文字列を単に連結するのみ。間には改行も空白文字も含まれない。

尚、csv.writerオブジェクトを用いたCSVファイル書き込みにはlineterminatorオプション引数に、任意の連結文字列(行の終端文字)を代入できる。主に、環境に合わせた改行文字を代入するのに使用する。→[Python: CSVファイルに書き込み - csv.writerオブジェクト](/blog/python-csv-write "Python: CSVファイルに書き込み - csv.writerオブジェクト - Yukun's Blog")

### リファレンス

- [2.1 Built-in Functions](https://docs.python.org/3/library/functions.html "2.1 Built-in Functions")
- [3.9 File Objects](https://docs.python.org/3/library/stdtypes.html#bltin-file-objects "3.9 File Objects")
