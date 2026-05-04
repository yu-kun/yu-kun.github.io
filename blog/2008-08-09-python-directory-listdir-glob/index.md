---
title: 'Python: 指定したパスのディレクトリ中のファイル一覧を出力'
date: 2008-08-09
authors: [yukun]
tags:
  - file
  - python
  - read
slug: python-directory-listdir-glob
---

あるディレクトリから特定のファイルを検索したい場合、探索対象ディレクトリ内のファイルを全て取得する必要があります。今回は、引数にディレクトリを指すパスを指定することによって、そのディレクトリの内容を取得する関数を2つ示します。

### ソースコード


```python
 # coding: Shift_JIS import os # osモジュールのインポート # os.listdir('パス') # 指定したパス内の全てのファイルとディレクトリを要素とするリストを返す files = os.listdir('C:\Python25\') for file in files: print file 
```


### 実行結果の一例

```
DLLs
Doc
include
Lib
libs
LICENSE.txt
lxml-wininst.log
NEWS.txt
PIL-wininst.log
pysqlite-wininst.log
pysqlite2-doc
python.exe
pythonw.exe
README.txt
Removelxml.exe
RemovePIL.exe
Removepysqlite.exe
Scripts
tcl
Tools
w9xpopen.exe

```

### ワイルドカードでリスティング対象を指定

globモジュールのglob()関数の引数内にワイルドカード「\*」を含めることが出来ます。これによって、より手軽に目的のファイルを探索することが出来ます。

### ソースコード


```python
 # coding: Shift_JIS import glob # パス内の全ての"指定パス+ファイル名"と"指定パス+ディレクトリ名"を要素とするリストを返す files = glob.glob('C:\Python25\*.*') # ワイルドカードが使用可能 for file in files: print file 
```


os.listdir()と異なり、glob.glob()は取得したファイル文字列には先頭に探査ディレクトリ(引数)のパスが付いています。

### 実行結果の一例

`C:Python25LICENSE.txt C:Python25lxml-wininst.log C:Python25NEWS.txt C:Python25PIL-wininst.log C:Python25pysqlite-wininst.log C:Python25python.exe C:Python25pythonw.exe C:Python25README.txt C:Python25Removelxml.exe C:Python25RemovePIL.exe C:Python25Removepysqlite.exe C:Python25w9xpopen.exe`

### リファレンス

- [11.7 glob -- Unix style pathname pattern expansion](http://docs.python.org/2/library/glob.html "11.7 glob -- Unix style pathname pattern expansion")
- [14.1.4 Files and Directories](http://docs.python.org/2/library/os.html#os-file-dir "14.1.4 Files and Directories")
