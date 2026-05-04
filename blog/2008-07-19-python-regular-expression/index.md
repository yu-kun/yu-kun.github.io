---
title: 'Python: 正規表現の基本 - メタ文字「.」「^」「$」'
date: 2008-07-19
authors: [yukun]
tags:
  - python
  - regexp
slug: python-regular-expression
---

### ソースコード


```python
 # coding: Shift_JIS import re # 正規表現を扱うモジュールのインポート # 正規表現のチェックプリント用の関数 def PrintRegMatch(pat, txt): # 書式: re.match(パターン, テキスト) m = re.match(pat, txt) # パターンにマッチしなかった場合はNoneを返す if m != None: print 'パターン"%s"はテキスト"%s"にマッチ「する」' % (pat, txt) else: print 'パターン"%s"はテキスト"%s"にマッチ「しない」' % (pat, txt) txt = 'ABCDEFGH' # 探索される文字列を「テキスト」 # 探索する　文字列を「パターン」 PrintRegMatch('ABC', txt) PrintRegMatch('FGH', txt) print # メタ文字を用いたマッチング # 「.」任意の1文字にマッチ PrintRegMatch('.BCD', txt) PrintRegMatch('....EFGH', txt) PrintRegMatch('...EFGH', txt) print # 「^」は文字列の先頭にマッチするパターン(MULTILINEフラグを設定すると行頭にもマッチ) PrintRegMatch('^ABC', txt) PrintRegMatch('^BCD', txt) print # 「$」は文字列の末尾にマッチするパターン(MULTILINEフラグを設定すると行末にもマッチ) PrintRegMatch('EFGH$', txt) PrintRegMatch('....EFGH$', txt) 
```


### 実行結果

```
パターン"ABC"はテキスト"ABCDEFGH"にマッチ「する」
パターン"FGH"はテキスト"ABCDEFGH"にマッチ「しない」
パターン".BCD"はテキスト"ABCDEFGH"にマッチ「する」
パターン"....EFGH"はテキスト"ABCDEFGH"にマッチ「する」
パターン"...EFGH"はテキスト"ABCDEFGH"にマッチ「しない」
パターン"^ABC"はテキスト"ABCDEFGH"にマッチ「する」
パターン"^BCD"はテキスト"ABCDEFGH"にマッチ「しない」
パターン"EFGH$"はテキスト"ABCDEFGH"にマッチ「しない」
パターン"....EFGH$"はテキスト"ABCDEFGH"にマッチ「する」

```

### リファレンス

- [4.2 re -- Regular expression operations](http://docs.python.org/2/library/re.html)

- [4.2.1 Regular Expression Syntax](http://docs.python.org/2/library/re.html#regular-expression-syntax)
- [4.2.4 Regular Expression Objects](http://docs.python.org/2/library/re.html#regular-expression-objects)
