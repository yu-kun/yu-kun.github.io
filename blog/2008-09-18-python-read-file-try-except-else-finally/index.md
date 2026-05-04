---
title: 'Python: ファイル読み込み時の例外の扱い例 - try、except、else、finallyブロック'
date: 2008-09-18
authors: [yukun]
tags:
  - command
  - exception
  - file
  - python
  - read
slug: python-read-file-try-except-else-finally
---

ファイルのパスや名前のミス、パーミッションの権限が無い等が原因でファイルを読み込めない場合がある。そのような場合、すなわち例外が発生した際にそこで処理を中断して、発生した例外に合わせた処理ブロックにジャンプする構文が、try:～except Error:～構文。 今回は、コマンドライン引数で英文テキストファイル名を指定し、スクリプト内でファイル内容を読み込み、単語数をカウントし出力するスクリプトを以って、オプションのelse、finallyブロックを含めた例外ブロックの扱いを確認する。 ただし、ここでの「単語」とは、簡単に考える為、１つの空白文字で区切られた文字列とする。

## ソースコード


```python
# -*- coding: UTF-8 -*-
import sys
script_name = sys.argv[0]
try:
    arg = sys.argv[1]
    f = open(arg, 'r')
except IndexError:
    print 'Usage: %s TEXTFILE' % script_name
except IOError:
    print '"%s" cannot be opened.' % arg
else:
    print arg, 'contains', len(f.read().split(' ')), 'words.'
    f.close()
finally:
    print 'n"%s" process end.' % script_name
    quit()
print 'Not reach this line.'
```


## コードの説明

### tryブロック

まず、例外を発生させる恐れのある行は、tryブロック内に書く。 ここで発生する可能性がある例外はコマンドライン引数が格納されているリストへのアクセス部分であるsys.argv\[1\]。\[\]演算子で存在しない要素を参照する例外。また、ファイルを開くopen(arg, 'r')も冒頭の理由で例外発生の可能性もある。

### exceptブロック

exceptブロックは、tryブロックで例外が発生した場合にのみ実行されるブロックです。その為、例外が発生しない場合は実行されない。 発生する可能性のある例外のタイプ毎にexceptブロックを書けば、そのタイプ毎の例外への対処処理を書くことが出来る。

```
except TYPE_AError:
    TYPE_AErrorが発生した際のとある処理...
except TYPE_BError:
    TYPE_BErrorが発生した際のとある処理...

```

### elseブロック　（オプション）

elseブロックは全てのexceptブロックの後に書く（任意なので書かなくても構わない）。 elseブロックはtryブロックで例外が発生**しなかった場合にのみ**実行されるブロック。今回は、ファイルの読み込みとクローズに使用している。

### finallyブロック　（オプション）

finallyブロックはtryブロックで例外が発生**するしないに関わらず**実行されるブロック（任意なので書かなくても構わない）。

## 実行結果

読み込むテキストファイルを以下の_aLine.txt_とする。 _aLine.txt_

```
Unless I set the standard where I am in any level, I'll be puzzled about what I should do from now on.

```

### コマンドラインで適切な引数を与えた場合

```
$ python excp01.py aLine.txt
aLine.txt contains 22 words.
"excp01.py" process end.

```

### 存在しないファイル名を引数を与えた場合

```
$ python excp01.py texfile.tex
"texfile.tex" cannot be opened.
"excp01.py" process end.

```

### コマンドライン引数を与えなかった場合

```
$ python excp01.py
Usage: excp01.py TEXTFILE
"excp01.py" process end.

```

## 例外オブジェクト名をpython処理系に聞いてみる

どんなメソッドや関数、演算子が、どのような例外を投げるのか予測が付かない場合もある。そんな場合、一旦はスクリプトを実行してエラーを確認する。 `SyntaxError: invalid syntax`以外のエラーがある場合、例えば、

```
$ python excp01.py
Traceback (most recent call last):
  File "excp01.py", line 5, in 
    arg = sys.argv[1]
IndexError: list index out of range

```

のような場合は、最終行の行頭のIndexErrorが例外名となる。

## 何でも例外任せにしていいの？

計算量が増える為、良くない。今プログラムのコマンドライン引数の確認を、 `if len(sys.argv) != 2: ホニャララ` とすると整数の比較ですむが、例外のキャッチに任せると、例外インスタンスを生成し送出という計算量の大きい処理が掛かる。ネットワーク接続やファイル読み書きなどのIOでは例外はイベント駆動で発生する為、例外制御が必須ですが、それ以外では使用しない。

## ドキュメント

- [2.3 Built-in Exceptions](http://docs.python.org/2/library/exceptions.html "2.3 Built-in Exceptions")
