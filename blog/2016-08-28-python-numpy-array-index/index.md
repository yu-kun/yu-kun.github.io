---
title: 'Python: NumPyアレイの添え字操作'
date: 2016-08-28
authors: [yukun]
tags:
  - numpy
  - python
slug: python-numpy-array-index
---

Pythonの数値計算モジュールであるNumPyのアレイに対する添え字操作の基本を記載する。 
<!-- truncate -->


### ソースコード

Python3系で記述している。 

```python
import numpy as np
# 1行21列のアレイをa rangeメソッドで作成
arr = np.arange(0,21)
print("arr == ", arr)
# 添え字による要素へのアクセス
print("arr[10] == ", arr[10])
# 0〜10までの要素をもつアレイを出力
print("arr[0:11] ==", arr[0:11])
# 0〜10迄の要素にスカラー値を代入
arr[0:11] = 100
print("arr[0:11] = 100\n", arr, "\n")
arr = np.arange(0,11)
slice_arr = arr[0:5]
print("arr == ", arr)
print("slice_arr == ", slice_arr)
# slice_arrの全要素にスカラー値100を代入
slice_arr[:] = 100
print("slice_arr == ", slice_arr)
# slice_arrはarrの参照の為、参照元まで書き変わっている。
print("arr == ", arr, "\n")
# アレイデータのコピー(≠参照)
arr_cp = arr.copy()
arr_cp[:] = 99
print("arr_cp == ", arr_cp)
# arr_cp側の変更はarr側へは影響ない
print("arr == ", arr, "\n")
# 2次元アレイへの添え字アクセス
arr_2d = np.array(([1,2,3],[4,5,6],[7,8,9]))
print("arr_2d == \n", arr_2d)
print("arr_2d[1] == ", arr_2d[1])
# 個別の要素へのアクセスは[row][col] or [row,col]の添え字でアクセス
print("arr_2d[0][1] & arr_2d[0,1] == ", arr_2d[0][1], arr_2d[0,1], "\n")
# 2次元アレイのスライス
print("arr_2d[:2,1:] == \n", arr_2d[:2,1:])
print("arr_2d[:2,:] == \n", arr_2d[:2,:], "\n")
# 9x5のアレイを作成
arr_2d = np.zeros((9,5))
print("arr_2d == \n", arr_2d)
# shapeはアレイの長さをタプル(row, col)で返却する。
# shape[0]は行数
arr_len = arr_2d.shape[0]
for i in range(arr_len):
  arr_2d[i] = i
print("arr_2d == \n", arr_2d, "\n")
# 指定の行だけを取り出す
print("arr_2d[[1,3,5,7]] == \n", arr_2d[[1,3,5,7]], "\n")
# 指定の行だけを順番を変えて取り出す
print("arr_2d[[7,5,1,3]] == \n", arr_2d[[7,5,1,3]], "\n")
```


### 実行結果

```
arr ==  [ 0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20]
arr[10] ==  10
arr[0:11] == [ 0  1  2  3  4  5  6  7  8  9 10]
arr[0:11] = 100
 [100 100 100 100 100 100 100 100 100 100 100  11  12  13  14  15  16  17
  18  19  20]
arr ==  [ 0  1  2  3  4  5  6  7  8  9 10]
slice_arr ==  [0 1 2 3 4]
slice_arr ==  [100 100 100 100 100]
arr ==  [100 100 100 100 100   5   6   7   8   9  10]
arr_cp ==  [99 99 99 99 99 99 99 99 99 99 99]
arr ==  [100 100 100 100 100   5   6   7   8   9  10]
arr_2d ==
 [[1 2 3]
 [4 5 6]
 [7 8 9]]
arr_2d[1] ==  [4 5 6]
arr_2d[0][1] & arr_2d[0,1] ==  2 2
arr_2d[:2,1:] ==
 [[2 3]
 [5 6]]
arr_2d[:2,:] ==
 [[1 2 3]
 [4 5 6]]
arr_2d ==
 [[ 0. 0. 0. 0. 0.]
 [ 0. 0. 0. 0. 0.]
 [ 0. 0. 0. 0. 0.]
 [ 0. 0. 0. 0. 0.]
 [ 0. 0. 0. 0. 0.]
 [ 0. 0. 0. 0. 0.]
 [ 0. 0. 0. 0. 0.]
 [ 0. 0. 0. 0. 0.]
 [ 0. 0. 0. 0. 0.]]
arr_2d ==
 [[ 0. 0. 0. 0. 0.]
 [ 1. 1. 1. 1. 1.]
 [ 2. 2. 2. 2. 2.]
 [ 3. 3. 3. 3. 3.]
 [ 4. 4. 4. 4. 4.]
 [ 5. 5. 5. 5. 5.]
 [ 6. 6. 6. 6. 6.]
 [ 7. 7. 7. 7. 7.]
 [ 8. 8. 8. 8. 8.]]
arr_2d[[1,3,5,7]] ==
 [[ 1. 1. 1. 1. 1.]
 [ 3. 3. 3. 3. 3.]
 [ 5. 5. 5. 5. 5.]
 [ 7. 7. 7. 7. 7.]]
arr_2d[[7,5,1,3]] ==
 [[ 7. 7. 7. 7. 7.]
 [ 5. 5. 5. 5. 5.]
 [ 1. 1. 1. 1. 1.]
 [ 3. 3. 3. 3. 3.]]

```

### 参考サイト

- [NumPy Reference — NumPy v1.11 Manual](http://docs.scipy.org/doc/numpy/reference/)
