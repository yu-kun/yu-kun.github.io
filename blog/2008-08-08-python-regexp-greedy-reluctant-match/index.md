---
title: 'Python: 正規表現の基本 - 最長、最短マッチング'
date: 2008-08-08
authors: [yukun]
tags:
  - loop
  - python
  - regexp
slug: python-regexp-greedy-reluctant-match
---

直前の文字、メタ文字を繰り返しマッチングさせる量指定記号である「\*」「+」「?」などは、テキスト中にその繰り返しパターンがマッチする箇所が複数ある場合は、通常最後にマッチした箇所をオブジェクトに記録します。このような最長マッチングに対して、マッチング箇所が複数の場合に最初にマッチした箇所を記録する最短マッチング方法があります。 最短マッチングを行う量指定記号は最長マッチングの記号の**末尾に「?」を付ける**だけです。すなわち、最長の量指定が「\*」「+」「?」であるのに対して、**最短マッチングは「\*?」「+?」「??」**となります。それでは、以下のコードで確認してみましょう。

### ソースコード


```python
 # coding: Shift_JIS import re # 正規表現を扱うモジュールのインポート # 正規表現のチェックプリント用の関数 def PrintRegMatch(pat, txt): # 書式: re.search(パターン, テキスト) m = re.search(pat, txt) # パターンにマッチしなかった場合はNoneを返す if m != None: print 'パターン: "%s"nテキスト: "%s"nマッチ : する' % (pat, txt) print 'マッチング開始位置:', m.start() print 'マッチング終了位置:', m.end() else: print 'パターン: "%s"nテキスト: "%s"nマッチ: しない' % (pat, txt) print return m # サンプルテキスト txt = '

Hello! World!!

Goodbye World

' # 最長: .* # 最短: .*? PrintRegMatch('

.*

', txt) # 最長: 文字列末尾の

にマッチ PrintRegMatch('

.*?

', txt) # 最短: World!!

の

にマッチ # 最長: .+ # 最短: .+? PrintRegMatch('

.+

', txt) # +?は直前の文字の1文字以上の繰り返し PrintRegMatch('

.+?

', txt) # ↑の控えめマッチング # 最長: .? # 最短: .?? PrintRegMatch('B.?C', 'BCCC') # ?は直前の文字の0 or 1回の繰り返し PrintRegMatch('B.??C', 'BCCC') # ??はその控えめ(ry 
```

 re.searchはre.matchと異なり、パターンを**テキスト文字列の先頭以外**にもマッチさせます。

### 実行結果


```html
 パターン: "

.*

" テキスト: "

Hello! World!!

Goodbye World

" マッチ : する マッチング開始位置: 0 マッチング終了位置: 41 パターン: "

.*?

" テキスト: "

Hello! World!!

Goodbye World

" マッチ : する マッチング開始位置: 0 マッチング終了位置: 21 パターン: "

.+

" テキスト: "

Hello! World!!

Goodbye World

" マッチ : する マッチング開始位置: 0 マッチング終了位置: 41 パターン: "

.+?

" テキスト: "

Hello! World!!

Goodbye World

" マッチ : する マッチング開始位置: 0 マッチング終了位置: 21 パターン: "B.?C" テキスト: "BCCC" マッチ : する マッチング開始位置: 0 マッチング終了位置: 3 パターン: "B.??C" テキスト: "BCCC" マッチ : する マッチング開始位置: 0 マッチング終了位置: 2 
```


### リファレンス

- [4.2 re -- Regular expression operations](http://docs.python.org/2/library/re.html)

- [4.2.1 Regular Expression Syntax](http://docs.python.org/2/library/re.html#regular-expression-syntax)
- [4.2.4 Regular Expression Objects](http://docs.python.org/2/library/re.html#regular-expression-objects)
