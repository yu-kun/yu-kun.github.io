---
title: 'Python: NumPyアレイの行と列の入れ替え(転置) - .T, transpose(), swapaxes()'
date: 2016-08-29
authors: [yukun]
tags:
  - numpy
  - python
slug: python-numpy-array-transpose
---

Pythonの数値計算モジュールであるNumPyのアレイに対する行・列の入れ替え(転置)に関わるメソッドを記載する。 
<!-- truncate -->


### ソースコード

Python 3系の書式で記載。一見だと転置処理がわかりにくい場合もあるので、末尾の公式ドキュメント(サンプルソース記載有り)も合わせて参照して理解度を確認した方が良い。 

```python
 import numpy as np # 4x4のアレイを作成 (reshape(row, col)メソッドでrow行col列のアレイへ修正 arr = np.arange(16).reshape((4,4)) print("arr == \n", arr) # .Tで転置したアレイを出力(arr自体は書き換わらない) print("arr.T == \n", arr.T) # transpose()メソッドでも同様に転置される。 print("arr.transpose() == \n", arr.transpose()) # transpose(n1, n2, n3...)と引数入れ替え順序を指定可能 # 指定できる引数の数は次元数で指定数値は0, 1, ... print("arr.transpose(1, 0) == \n", arr.transpose(1, 0)) # この場合、↑の結果はarr.transpose()、arr.Tと同値。 # 軸の入れ替えとしてはswapaxes()もある print("arr.swapaxes(0,1) == \n", arr.swapaxes(0,1)) # 3次元の行列を作成 arr3d = np.arange(12).reshape((3,2,2)) print("\n arr3d == \n", arr3d) # 下記のtransposeの意味は、2x2行列(3つ)の要素の順序は同じくし # 2x2行列内の転置を行う。 print("arr3d.transpose((0,2,1)) == \n", arr3d.transpose((0,2,1))) 
```


### 実行結果

```
arr ==
 [[ 0  1  2  3]
 [ 4  5  6  7]
 [ 8  9 10 11]
 [12 13 14 15]]
arr.T ==
 [[ 0  4  8 12]
 [ 1  5  9 13]
 [ 2  6 10 14]
 [ 3  7 11 15]]
arr.transpose() ==
 [[ 0  4  8 12]
 [ 1  5  9 13]
 [ 2  6 10 14]
 [ 3  7 11 15]]
arr.transpose(1, 0) ==
 [[ 0  4  8 12]
 [ 1  5  9 13]
 [ 2  6 10 14]
 [ 3  7 11 15]]
arr.swapaxes(0,1) ==
 [[ 0  4  8 12]
 [ 1  5  9 13]
 [ 2  6 10 14]
 [ 3  7 11 15]]
 arr3d ==
 [[[ 0  1]
  [ 2  3]]
 [[ 4  5]
  [ 6  7]]
 [[ 8  9]
  [10 11]]]
arr3d.transpose((0,2,1)) ==
 [[[ 0  2]
  [ 1  3]]
 [[ 4  6]
  [ 5  7]]
 [[ 8 10]
  [ 9 11]]]

```

### 参考サイト

- [numpy.transpose — NumPy v1.11 Manual](http://docs.scipy.org/doc/numpy/reference/generated/numpy.transpose.html)
- [numpy.swapaxes — NumPy v1.11 Manual](http://docs.scipy.org/doc/numpy/reference/generated/numpy.swapaxes.html)
