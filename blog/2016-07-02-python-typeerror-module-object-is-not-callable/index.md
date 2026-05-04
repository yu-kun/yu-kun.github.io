---
title: 'Python: 対処法→TypeError: &#039;module&#039; object is not callable'
date: 2016-07-02
authors: [yukun]
tags:
  - python
slug: python-typeerror-module-object-is-not-callable
---

最近久々にBitcoin取引所のWeb APIをCallするPythonスクリプトのテストをしている際に、首題のエラーのエラーが発生した為、備忘録として簡単に纏めておく。 
<!-- truncate -->


### 事象

他ファイルに記載したクラスのインスタンスを作成する際に首題のエラーが発生。

```
↓ import文
import CryptoAccount
・
・
・
↓エラーログ
Traceback (most recent call last):
＜中略＞
  File "/Users/XXXXXXX/PycharmProjects/PyQuoine/Quoine.py", line 49, in getAccounts
    cyac = CryptoAccount(i)
TypeError: 'module' object is not callable

```

このケースだとCryptoAccountクラスが他モジュールファイル(CryptoAccount.py)で定義されているクラス。

### 原因

Pythonの規則が分かっていれば一目瞭然ではあるが、このimport文から対象クラスのインスタンス作成する文は下記の通りとなる。

```
ca = CryptoAccount.CryptoAccount(i)
```

「import CryptoAccount」だとCryptoAccountモジュールだけがシンボルテーブルに入り、内部のCryptoAccountへのアクセスはモジュール名経由でアクセスする必要がある。 詳細は下記の公式ドキュメントを参照されたし。

- [6\. Modules — Python 3.5.2 documentation](https://docs.python.org/3/tutorial/modules.html?highlight=module)
- [6\. モジュール (module) — Python 3.5.1 ドキュメント](http://docs.python.jp/3/tutorial/modules.html)

### 雑感

主題と話はずれるが、久々にオブジェクト指向のプログラミングするとデザインパターンを思い出しながらのコーディングになるので、スピードが遅くなる。趣味スクリプトなので多少のんびりと復習しながら進める予定。
