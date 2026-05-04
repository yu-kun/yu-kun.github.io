---
title: 'Python: 正規表現の基本 - 繰り返し「*」「+」「?」'
date: 2008-07-20
authors: [yukun]
tags:
  - loop
  - python
  - regexp
slug: python-regular-expression-loop
---

### ソースコード


```python
# coding: Shift_JIS
import re # 正規表現を扱うモジュールのインポート
# 正規表現のチェックプリント用の関数
def PrintRegMatch(pat, txt):
    #   書式: re.match(パターン, テキスト)
    m = re.match(pat, txt) # パターンにマッチしなかった場合はNoneを返す
    if m != None: print 'パターン"%s"はテキスト"%s"にマッチ「する」' % (pat, txt)
    else: print 'パターン"%s"はテキスト"%s"にマッチ「しない」' % (pat, txt)
txt = 'ABCDEFGH' # 探索される文字列をテキスト
                 # 探索する　文字列をパターン
# 「*」: 直前の文字の0回以上の繰り返しにマッチ
PrintRegMatch('.*CDE', txt)
PrintRegMatch('A.*H', txt)
PrintRegMatch('A*BC', txt)
PrintRegMatch('A.*BC', txt)
PrintRegMatch('A*', '')
print
# 「+」: 直前の文字の1回以上の繰り返しにマッチ
PrintRegMatch('.+DEF', txt)
PrintRegMatch('A.+H', txt)
PrintRegMatch('A+BC', txt)
PrintRegMatch('A.+BC', txt)
PrintRegMatch('A+', '')
print
# 「?」: 直前の文字の0or1回の繰り返しにマッチ
PrintRegMatch('^A?.+$', txt)
PrintRegMatch('^B?$', '')
PrintRegMatch('^C?E', 'E')
PrintRegMatch('A.?H', txt)
PrintRegMatch('BBB?C', 'BBC')
```


### 実行結果

```
パターン".*CDE"はテキスト"ABCDEFGH"にマッチ「する」
パターン"A.*H"はテキスト"ABCDEFGH"にマッチ「する」
パターン"A*BC"はテキスト"ABCDEFGH"にマッチ「する」
パターン"A.*BC"はテキスト"ABCDEFGH"にマッチ「する」
パターン"A*"はテキスト""にマッチ「する」
パターン".+DEF"はテキスト"ABCDEFGH"にマッチ「する」
パターン"A.+H"はテキスト"ABCDEFGH"にマッチ「する」
パターン"A+BC"はテキスト"ABCDEFGH"にマッチ「する」
パターン"A.+BC"はテキスト"ABCDEFGH"にマッチ「しない」
パターン"A+"はテキスト""にマッチ「しない」
パターン"^A?.+$"はテキスト"ABCDEFGH"にマッチ「する」
パターン"^B?$"はテキスト""にマッチ「する」
パターン"^C?E"はテキスト"E"にマッチ「する」
パターン"A.?H"はテキスト"ABCDEFGH"にマッチ「しない」
パターン"BBB?C"はテキスト"BBC"にマッチ「する」

```

### リファレンス

- [4.2 re -- Regular expression operations](http://docs.python.org/2/library/re.html)

- [4.2.1 Regular Expression Syntax](http://docs.python.org/2/library/re.html#regular-expression-syntax)
- [4.2.4 Regular Expression Objects](http://docs.python.org/2/library/re.html#regular-expression-objects)
