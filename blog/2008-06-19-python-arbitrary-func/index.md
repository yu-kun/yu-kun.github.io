---
title: 'Python: 可変個の引数を受け取る関数'
date: 2008-06-19
authors: [yukun]
tags:
  - python
slug: python-arbitrary-func
---

### ソースコード


```python
 # 可変個の引数を受け取る関数 # 引数の前に*を付けると、関数内ではタプルとして受け取る def sigma_sq(*nums): # Σf(k)^xのを計算、f(n)はnumsの要素 print (type(nums), nums) x = 2 # 乗数 n_elem = len(nums) # タプルの長さ sum = 0 for elem in nums: sum += pow(elem, x) # x乗する return sum

print(sigma_sq(1, 2, 3)) # 関数呼び出し側の引数: リスト[タプル]の前に*を付けると # 関数側でリスト[タプル]を展開し、個々の要素を埋め込んでくれる list = [1, 2, 3] print(sigma_sq(*list)) print(sigma_sq(*[x for x in range(4)])) def plusx3(a, b, c): return a+b+c print ('n', plusx3(*list)) # 補足: 上の処理を簡潔に書く sq = 2 print ('n', sum([pow(x, sq) for x in list])) 
```


### 実行結果

```
 (1, 2, 3)
14
 (1, 2, 3)
14
 (0, 1, 2, 3)
14
n 6
n 14

```

### チュートリアル

- [4\. More Control Flow Tools](https://docs.python.org/3/tutorial/controlflow.html)
