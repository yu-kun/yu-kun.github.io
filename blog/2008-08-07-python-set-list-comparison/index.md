---
title: 'Python: set型の集合演算で2つのリスト要素を比較'
date: 2008-08-07
authors: [yukun]
tags:
  - list
  - python
  - set
slug: python-set-list-comparison
---

2つのリストの要素を比較する際、リスト型をset型に変えると「-」「&」などの演算子1つで集合演算できます(AND、OR、NOTとか)。

### ソースコード


```python
#!/usr/bin/python
# coding: UTF-8
# リストの比較(by 集合演算)
old_list = ['A', 'B', 'C', 'D', 'E', 'F'] # 古いリスト
new_list = ['A', 'C', 'F', 'G', 'H', 'I'] # 更新された新しいリスト、とする
# 組み込み関数set()を用いて(リストを含む)シーケンス型からset型データを作成
old_set = set(old_list)
new_set = set(new_list)
print 'old_set           ==', old_set
print 'new_set           ==', new_set
# 差集合: old_setの要素からnew_setに含まれる要素を削除した要素集合
# すなわち、old_setをnew_setに更新した際に、削除された要素集合、とみる
print 'old_set - new_set ==', old_set - new_set
print 'len(old_set - new_set) ==', len(old_set - new_set) # 削除された個数
# old_setをnew_setに更新した際に、追加された要素集合、とみる
print 'new_set - old_set ==', new_set - old_set
print 'len(new_set - old_set) ==', len(new_set - old_set) # 追加された個数
# old_setをnew_setの共通要素集合(更新した際に変更されなかった要素、とみる)
print 'new_set & old_set ==', new_set & old_set
# old_setかnew_setに含まれる要素集合
print 'new_set ^ old_set ==', new_set ^ old_set
# 和集合: old_setとnew_setに含まれる重複の無い要素集合
print 'new_set | old_set ==', new_set | old_set
```


### 実行結果

```
old_set           == set(['A', 'C', 'B', 'E', 'D', 'F'])
new_set           == set(['A', 'C', 'G', 'F', 'I', 'H'])
old_set - new_set == set(['B', 'E', 'D'])
len(old_set - new_set) == 3
new_set - old_set == set(['I', 'H', 'G'])
len(new_set - old_set) == 3
new_set & old_set == set(['A', 'C', 'F'])
new_set ^ old_set == set(['B', 'E', 'D', 'G', 'I', 'H'])
new_set | old_set == set(['A', 'C', 'B', 'E', 'D', 'G', 'F', 'I', 'H'])

```

リスト(and シーケンス型)をset型に変更すると要素の順序が失われます。再度リスト型に戻したいときは、list()関数を用います。 

```python
>>> set_data = set(['a', 'b', 'c', 'd'])
>>> set_data
set(['a', 'c', 'b', 'd'])
>>> list_data = list(set_data)
>>> list_data
['a', 'c', 'b', 'd']
>>> type(list_data)
<type 'list'>
>>>
```

 話変わりますが、Rubyだと配列のまま加減算ができます(配列オブジェクトが「+」「-」演算子などをサポートしているみたい)。

### リファレンス

- [3.7 Set Types -- set, frozenset](http://docs.python.org/2/library/stdtypes.html#types-set "3.7 Set Types -- set, frozenset")
- [5.7 sets -- Unordered collections of unique elements](http://docs.python.org/2/library/sets.html "5.7 sets -- Unordered collections of unique elements")
