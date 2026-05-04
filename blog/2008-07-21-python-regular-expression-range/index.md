---
title: 'Python: 正規表現の基本 - 文字範囲の指定「[ ]」'
date: 2008-07-21
authors: [yukun]
tags:
  - python
  - regexp
slug: python-regular-expression-range
---

### ソースコード


```python
 # coding: Shift_JIS import re # 正規表現を扱うモジュールのインポート # 正規表現のチェックプリント用の関数 def PrintRegMatch(pat, txt): # 探索される文字列をテキスト # 探索する 文字列をパターン # 書式: re.match(パターン, テキスト) m = re.match(pat, txt) # パターンにマッチしなかった場合はNoneを返す if m != None: print 'パターン"%s"はテキスト"%s"にマッチ「する」' % (pat, txt) else: print 'パターン"%s"はテキスト"%s"にマッチ「しない」' % (pat, txt) # []で括られた文字の内どれか1つにマッチすれば真 PrintRegMatch('[ABC]D', 'CD') # A or B or C の次に D がくるパターンにマッチ PrintRegMatch('[A-C]E', 'CE') # [A-C]は[ABC]と同意 print # [A-Z]は全てのアルファベット大文字の内のどれか1つの意 PrintRegMatch('[A-Z]*END', 'CHSHSBSRAWRGARENDGREW') PrintRegMatch('A[A-Z]*E', 'AgafgafE') PrintRegMatch('A[a-z]*E', 'AewnglfngowE') # [0-9]は0～9の数字の内どれか1つの意 PrintRegMatch('[0-9]*-[0-9]*-[0-9]*', '03-3333-2222') print # []内の「^」否定 PrintRegMatch('[^ABC]D', 'DD') # A or B or C でない文字の次に D がくるパターンにマッチ PrintRegMatch('[^A-Z]*-[^A-Z]*', '164-9999') print PrintRegMatch('[ABC][DEF]', 'CE') PrintRegMatch('[ABC][DEF]', 'CC') PrintRegMatch('[a-zA-Z]*', 'FjAVzxRUqyOIn') PrintRegMatch('[a-z][A-Z]*', 'FjAVzxRUqyOIn') PrintRegMatch('[a-z]*[A-Z]*', 'FjAVzxRUqyOIn') 
```


### 実行結果

```
パターン"[ABC]D"はテキスト"CD"にマッチ「する」
パターン"[A-C]E"はテキスト"CE"にマッチ「する」
パターン"[A-Z]*END"はテキスト"CHSHSBSRAWRGARENDGREW"にマッチ「する」
パターン"A[A-Z]*E"はテキスト"AgafgafE"にマッチ「しない」
パターン"A[a-z]*E"はテキスト"AewnglfngowE"にマッチ「する」
パターン"[0-9]*-[0-9]*-[0-9]*"はテキスト"03-3333-2222"にマッチ「する」
パターン"[^ABC]D"はテキスト"DD"にマッチ「する」
パターン"[^A-Z]*-[^A-Z]*"はテキスト"164-9999"にマッチ「する」
パターン"[ABC][DEF]"はテキスト"CE"にマッチ「する」
パターン"[ABC][DEF]"はテキスト"CC"にマッチ「しない」
パターン"[a-zA-Z]*"はテキスト"FjAVzxRUqyOIn"にマッチ「する」
パターン"[a-z][A-Z]*"はテキスト"FjAVzxRUqyOIn"にマッチ「しない」
パターン"[a-z]*[A-Z]*"はテキスト"FjAVzxRUqyOIn"にマッチ「する」

```

### リファレンス

- [4.2 re -- Regular expression operations](http://docs.python.org/2/library/re.html)

- [4.2.1 Regular Expression Syntax](http://docs.python.org/2/library/re.html#regular-expression-syntax)
- [4.2.4 Regular Expression Objects](http://docs.python.org/2/library/re.html#regular-expression-objects)
