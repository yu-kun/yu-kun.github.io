---
title: 'Python: 辞書の全てのキーと値をソートしてたどる - sorted()関数'
date: 2008-06-05
authors: [yukun]
tags:
  - python
  - sort
slug: python-sorted
---

### ソースコード


```python
#!/usr/bin/python
# coding: UTF-8
# 辞書の全てのキーと値をソートしてたどる | sorted()関数の使い方
# 辞書の初期化(名前:年齢)
profile = { 'Hana':19, 'Toru':26, 'Katori':15, 'Sato':45}
# 初期化の確認: 辞書のitems()メソッドで全てのキー(key), 値(value)をたどる
for (k, v) in profile.items():
    print 'キー: %-6s, 値: %2d' % (k, v)
print
# ↑items()はキーと値のタプルを返している。
#   (丸括弧)は省略してもOK→ for k, v in profile.items(): とも書ける
# 辞書の全てのキーをソートしてたどる
for k in sorted(profile.keys()):
    print 'キー: %-6s, 値: %2d' % (k, profile[k])
print
# キーである文字列がここではアルファベット順にソートされる(文字コードでの昇順)
# 組み込み関数sorted()は第1引数にリストを取り、それをソートしたリストを返す。
# 辞書の全ての値をソートしてたどる
for v in sorted(profile.values()):
    print '値:', v
print
# 値である整数が昇順にソートされて表示される
# 辞書の全てのキーを降順(逆順)にソートしてたどる
for k in sorted(profile.keys(), reverse=True):
    print 'キー: %-6s, 値: %2d' % (k, profile[k])
print
# 関数sorted()の第4引数(ここではオプション引数として)に
# ソート順序を逆順にするフラグを設定 reverse=True
# 辞書の全ての値を降順(逆順)ソートしてたどる
for v in sorted(profile.values(), reverse=True):
    print '値:', v
print
```


### 実行結果

```
キー: Toru  , 値: 26
キー: Hana  , 値: 19
キー: Katori, 値: 15
キー: Sato  , 値: 45
キー: Hana  , 値: 19
キー: Katori, 値: 15
キー: Sato  , 値: 45
キー: Toru  , 値: 26
値: 15
値: 19
値: 26
値: 45
キー: Toru  , 値: 26
キー: Sato  , 値: 45
キー: Katori, 値: 15
キー: Hana  , 値: 19
値: 45
値: 26
値: 19
値: 15

```

### リファレンス

- [3.8 Mapping Types -- dict](https://docs.python.org/2/library/stdtypes.html#typesmapping)

### チュートリアル

- [4\. More Control Flow Tools](http://docs.python.org/2/tutorial/controlflow.html)
    - [4.2 for Statements](http://docs.python.org/2/tutorial/controlflow.html)
- [5\. Data Structures](https://docs.python.org/2/tutorial/datastructures.html)
    - [5.5 Dictionaries](https://docs.python.org/2/tutorial/datastructures.html)
    - [5.6 Looping Techniques](https://docs.python.org/2/tutorial/datastructures.html)
