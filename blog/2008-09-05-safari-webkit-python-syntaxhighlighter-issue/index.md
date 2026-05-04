---
title: 'SafariとChromeでSyntaxHighlighterのPythonコードがハイライトされない問題の解決法'
date: 2008-09-05
authors: [yukun]
tags:
  - javascript
  - setting
slug: safari-webkit-python-syntaxhighlighter-issue
---

**追記**(2009-02-14): v2.0でこのバグは改善されていました。 先日「[Google Chrome](https://www.google.com/intl/ja/chrome/ "Google Chrome - ブラウザのダウンロード")」ベータ版がリリースされましたね。私もV8のパフォーマンス興味に試してみたら速すぎて笑っちゃいました。ただ同時に、閲覧情報のプライバシーや利用規約の内容等が結構物議を醸していますね。 
<!-- truncate -->
 まぁ前置きはこれくらいにして、そのChromeで自分のサイトの記事を読み込んだところ[SyntaxHighlighter](http://code.google.com/p/syntaxhighlighter/ "syntaxhighlighter - Google Code")[(v1.5.1)](http://code.google.com/p/syntaxhighlighter/wiki/Version_1_5_1 "Version_1_5_1 - syntaxhighlighter - Google Code - Version 1.5.1 release notes.")がPythonのソースコードでのみ機能しませんでした。そして同様の問題はSafariでもみられました（どちらもWebKitを使っているからか）。デバッグしてみたらshBrushPython.jsコードのエラーでしたので、該当部分を以下のように修正しました。 ファイル10行目の中ほどの、 

```python
RegExp("'(?!')*(?:\\.|(\\\\\\')
```

 の部分を、 

```python
RegExp("'(?!')(?:\\.|(\\\\\\')
```

 に変更します。「\*」を削除するだけです。

> 引用：[Issue 52 - syntaxhighlighter - Google Code](http://code.google.com/p/syntaxhighlighter/issues/detail?id=52&q=python "Issue 52 - syntaxhighlighter - Google Code") Agreed, Python brush is 100% broken in all WebKit browsers. The issue is: SyntaxError: Invalid regular expression: nothing to repeat file:///C:/Documents%20and%20Settings/fraser/Desktop/html/dp.SyntaxHighlighter/js/shBrushPython.js (line 15) It is line 10 in the compressed version and line 15 in the uncompressed version. The offending line is: { regex: new RegExp("'(?!')\*(?:\\\\.|(\\\\\\\\\\\\')|\[^\\\\''\\\\n\\\\r\])\*'", 'gm'), css: 'string' }, Doesn't matter what the Python input is. Confirming that the alternative shBrushPython.js in comment 1 works great. As for the bug in the original regex, it boils down to RegExp("(?!x)\*y") which is a negative look-ahead assertion. But neither I nor WebKit can figure out what the \* is for. Deleting the \* solves the problem and makes Python render fine.

Thanks, Neil and Guyon. これでSafariとChromeでもハイライトされたPythonのソースコードを読むことが出来ます。試しに→[Python: SQLiteにデータを格納、検索、出力 - pysqlite](/blog/python-sqlite-insert "Python: SQLiteにデータを格納、検索、出力 - pysqlite - Yukun's Blog")等どうぞー。
