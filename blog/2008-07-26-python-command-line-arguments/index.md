---
title: 'Python: コマンドライン引数の取得 - sys.argv変数'
date: 2008-07-26
authors: [yukun]
tags:
  - command
  - file
  - module
  - python
  - read
slug: python-command-line-arguments
---

コマンドラインで与える引数によってプログラムの挙動を変えたいという場面はよくあります。Python ではコマンドライン引数は **sys モジュールの argv 属性に文字列を要素とするリスト**として格納されています。そして、リストの先頭要素(sys.argv\[0\])はスクリプトファイル名となっています。

## ソースコード


```python
# coding: Shift_JIS
import sys # モジュール属性 argv を取得するため
argvs = sys.argv  # コマンドライン引数を格納したリストの取得
argc = len(argvs) # 引数の個数
# デバッグプリント
print argvs
print argc
print
if (argc != 2):   # 引数が足りない場合は、その旨を表示
    print 'Usage: # python %s filename' % argvs[0]
    quit()         # プログラムの終了
print 'The content of %s ...n' % argvs[1]
f = open(argvs[1])
line = f.readline() # 1行読み込む(改行文字も含まれる)
while line:
    print line
    line = f.readline()
f.close
```


#### text.txt

```
It is meaningless only to think my long further aims idly.
It is important to set my aims but at the same time I should confirm my present condition.
Unless I set the standard where I am in any level, I'll be puzzled about what I should do from now on.

```

## 実行結果

### 引数を指定しない場合

```
$ python argv01.py
['argv01.py']
1
Usage: # python SCRIPTNAME.py filename

```

### 引数を指定した場合

```
$ python argv01.py text.txt
['argv01.py', 'text.txt']
2
The content of text.txt ...
It is meaningless only to think my long further aims idly.
It is important to set my aims but at the same time I should confirm my present condition.
Unless I set the standard where I am in any level, I'll be puzzled about what I should do from now on.

```

### リファレンス

- [10\. Brief Tour of the Standard Library](http://docs.python.org/2/tutorial/stdlib.html "10. Brief Tour of the Standard Library")
    - [10.3 Command Line Arguments](http://docs.python.org/2/tutorial/stdlib.html "10.3 Command Line Arguments")
