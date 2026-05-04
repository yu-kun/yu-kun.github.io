---
title: 'Python: 辞書の全てのキーと値をたどる - items(), keys(), values()メソッド'
date: 2008-06-04
authors: [yukun]
tags:
  - loop
  - python
slug: python-dict2
---

### ソースコード


```python
#!/usr/bin/python
# coding: UTF-8
# 辞書の全てのキーと値をたどる | items(), keys(), values()メソッドの使い方
# 辞書の初期化
profile = { 'Hana':19, 'Toru':26, 'Katori':15, 'Sato':45}
print profile, '\n'            # 出力して確認
# 辞書のitems()メソッドで全てのキー(key), 値(value)をたどる
for k, v in profile.items():   # for/if文では文末のコロン「:」を忘れないように
    print k, v
# items()メソッドの戻り値
print 'items():', profile.items(), '\n'    # keyとvalueのタプルのリストを返している
# 辞書のkeys()メソッドで全てのキーをたどる
for k in profile.keys():
    print 'key:', k
# keys()メソッドの戻り値
print 'keys():', profile.keys(), '\n'      # keyリストを返している
# 辞書のvalues()メソッドで全ての値をたどる
for v in profile.values():
    print 'value:', v
# values()メソッドの戻り値
print 'values():', profile.values(), '\n'  # valueのリストを返している
```


### 実行結果

```
{'Toru': 26, 'Hana': 19, 'Katori': 15, 'Sato': 45}
Toru 26
Hana 19
Katori 15
Sato 45
items(): [('Toru', 26), ('Hana', 19), ('Katori', 15), ('Sato', 45)]
key: Toru
key: Hana
key: Katori
key: Sato
keys(): ['Toru', 'Hana', 'Katori', 'Sato']
value: 26
value: 19
value: 15
value: 45
values(): [26, 19, 15, 45]

```

### リファレンス

- [3.8 Mapping Types -- dict](https://docs.python.org/2/library/stdtypes.html#typesmapping)

### チュートリアル

- [4\. More Control Flow Tools](http://docs.python.org/2/tutorial/controlflow.html)
    - [4.2 for Statements](http://docs.python.org/2/tutorial/controlflow.html)
- [5\. Data Structures](https://docs.python.org/2/tutorial/datastructures.html)
    - [5.5 Dictionaries](https://docs.python.org/2/tutorial/datastructures.html)
    - [5.6 Looping Techniques](https://docs.python.org/2/tutorial/datastructures.html)
