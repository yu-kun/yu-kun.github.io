---
title: 'Python: 乱数の生成 - random()、randint()、uniform()、seed()メソッド'
date: 2008-06-10
authors: [yukun]
tags:
  - module
  - number
  - python
  - random
slug: python-random
---

### ソースコード


```python
 #!/usr/bin/python # coding: UTF-8 # 乱数の生成 | random()、randint()、uniform()、seed()メソッドの使い方 import random # モジュールのインポート print random.random(), 'n' # 0.0 ≦ F ＜ 1.0 の浮動小数点数をランダムに返す # randint(x, y)メソッド: 整数x以上y以下(x ≦ N ≦ y)の乱数を返す for i in range(10): print random.randint(10, 20), ' ', print 'n' # uniform(x, y)メソッド: 実数x以上y未満(x ≦ N ＜ y)の乱数を返す for i in range(10): print random.uniform(10, 20) print # seed()メソッド: 乱数の種の初期化 # (省略した場合はシステムの現在時刻で初期化が行われる) random.seed(1) # 明示的に初期化 for i in range(10): print random.randint(10, 20), ' ', print 'n' random.seed(1) # もう一度初期化(結果は上と同じとなる) for i in range(10): print random.randint(10, 20), ' ', print 'n' 
```


### 実行結果

```
0.610071743263
16   16   15   11   19   16   10   11   20   18
12.8745815718
10.3223430071
10.9674507421
17.5459589302
16.0796539779
15.0854025011
18.6344006559
11.049275088
16.6396732404
12.0720922586
11   19   18   12   15   14   17   18   11   10
11   19   18   12   15   14   17   18   11   10

```

### リファレンス

- [6.4 random -- Generate pseudo-random numbers](http://docs.python.org/2/library/random.html)
