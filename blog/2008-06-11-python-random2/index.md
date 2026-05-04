---
title: 'Python: モジュールにテスト関数を定義 - 重複のない乱数(整数MIN以上MAX以下)の生成'
date: 2008-06-11
authors: [yukun]
tags:
  - exception
  - module
  - number
  - python
  - random
slug: python-random2
---

### ソースコード


```python
#!/usr/bin/python
# coding: UTF-8
import random
def make_randint_list(min, max, cnt, sortflag=False, revflag=False):
    """
    重複のない乱数(整数min以上max以下)を要素としたリストを返す
    """
    list = []
    i = 0
    while cnt != i:
        r = random.randint(min, max)
        try:
            list.index(r)   # 既にリストに存在するか
        except ValueError, e:
            list.append(r)  # 無い場合はリストに格納
            i = i + 1
    if (sortflag): list.sort(reverse=revflag)
    return list
def _main():
    """モジュールのチェック関数"""
    print 'makerand0.py [_main()]'
    print make_randint_list(10, 99, 10)
    print make_randint_list(10, 99, 10, True)       # 昇順ソート
    print make_randint_list(10, 99, 10, True, True) # 降順ソート
if __name__ == '__main__' : _main()
#
```

 モジュール変数\_\_name\_\_の中には通常はモジュール名が入っています。しかし、このモジュールファイルを直接実行した場合は\_\_name\_\_に'\_\_main\_\_'という名前が入ります。その為、if \_\_name\_\_ == '\_\_main\_\_' : は真となり\_main()が実行されます。

### 実行結果

```
$ python makerand0.py
makerand0.py [_main()]
[62, 18, 55, 44, 97, 67, 87, 16, 59, 43]
[11, 13, 30, 42, 46, 52, 71, 75, 81, 92]
[88, 81, 65, 60, 57, 53, 41, 34, 27, 23]

```

### モジュールテスト用スクリプト

#### makerand0\_test.py


```python
#!/usr/bin/python
# coding: UTF-8
from makerand import make_randint_list
print make_randint_list(10, 99, 10)
print make_randint_list(10, 99, 10, True)
print make_randint_list(10, 99, 10, True, True)
```


### 実行結果

```
$ python makerand0_test.py
[52, 44, 63, 61, 50, 66, 88, 45, 99, 57]
[15, 26, 29, 53, 56, 69, 89, 91, 94, 95]
[96, 95, 93, 88, 79, 75, 64, 62, 33, 11]

```

### リファレンス

- [3.6.4 Mutable Sequence Types](http://docs.python.org/2/library/stdtypes.html#typesseq-mutable)
- [6.4 random -- Generate pseudo-random numbers](http://docs.python.org/2/library/random.html)
- [26.10.1 Types and members](http://docs.python.org/2/library/inspect.html#inspect-types)

### チュートリアル

- [6\. Modules](http://docs.python.org/2/tutorial/modules.html)
