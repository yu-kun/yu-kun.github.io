---
title: 'Python: NumPyアレイの計算 - かけ算、引き算、割り算、累乗'
date: 2016-08-27
authors: [yukun]
tags:
  - numpy
  - python
slug: python-numpy-array-calc
---

Pythonの数値計算モジュールであるNumPyのアレイ計算の基本を記載する。 
<!-- truncate -->


### ソースコード

Python3系で記述している。 

```python
 import numpy as np # 2行4列のアレイを作る arr1 = np.array([[1,2,3,4],[5,6,7,8]]) print("arr1 == \n", arr1) # アレイのかけ算: それぞれの要素のかけ算となる print("arr1 * arr1 ==\n", arr1 * arr1) # np.dot(arr1, arr1)でも同様の結果を得られる。 # アレイの引き算: それぞれの要素の引き算となる print("arr1 - arr1 ==\n", arr1 - arr1) # 1(スカラー)をアレイの各要素で割る print("1 / arr1 ==\n", 1 / arr1) # アレイの累乗は各要素の累乗 print("arr1 ** 4 ==\n", arr1 ** 4) 
```


### 実行結果

```
arr1 ==
 [[1 2 3 4]
 [5 6 7 8]]
arr1 * arr1 ==
 [[ 1  4  9 16]
 [25 36 49 64]]
arr1 - arr1 ==
 [[0 0 0 0]
 [0 0 0 0]]
1 / arr1 ==
 [[ 1. 0.5         0.33333333  0.25      ]
 [ 0.2         0.16666667  0.14285714  0.125     ]]
arr1 ** 4 ==
 [[   1   16   81  256]
 [ 625 1296 2401 4096]]

```

### 参考サイト

- [NumPy Reference — NumPy v1.11 Manual](http://docs.scipy.org/doc/numpy/reference/)
