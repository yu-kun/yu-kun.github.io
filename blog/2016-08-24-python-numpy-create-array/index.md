---
title: 'Python: NumPyでアレイを作成する - array(), zeros(), empty(), eye(), arange()'
date: 2016-08-24
authors: [yukun]
tags:
  - numpy
  - python
slug: python-numpy-create-array
---

Python上で数値計算(特にベクトル・行列)を効率的に行うためのモジュールであるNumPyのサンプルコード。ここでは特に、アレイの作成手法について紹介。記事の末尾には公式ドキュメントへのリンクを載せている。 
<!-- truncate -->


### ソースコード

以下のソースコードはPython 3.xの書式で記載している。 

```python
 # npと言うエイリアスをつけてnumpyをインポート import numpy as np # Python標準のリスト型 list1 = [1, 2, 3, 4] print("list1 == ", list1) # リストからnumpyのアレイを作成 array1 = np.array(list1) print("array1 == ", array1) # リスト型のlist2を作成 list2 = [5, 6, 7, 8] # リストのリストを作成 lists = [list1, list2] # 多次元アレイを作成 array2 = np.array(lists) print("array2 == \n", array2, "\n") # アレイのサイズを確認 print("array2.shape == ", array2.shape) # タプル出力：2行4列のアレイと分かる # アレイのデータ型を確認 (全要素は同じ型) print("array2.dtype == ", array2.dtype, "\n") # 全ての要素が0のアレイ array_zeros = np.zeros(3) print("array_zeros == ", array_zeros) print("array_zeros.dtype == ", array_zeros.dtype, "\n") # 全ての要素が1のアレイ array_ones = np.ones((3, 3)) print("array_ones == \n", array_ones, "\n") # 空のアレイ array_emp = np.empty((3, 3)) print("array_emp == \n", array_emp, "\n") # 0で初期化されているわけでは無い # 単位行列(dentity array) array_den = np.eye(5) # 5行5列の単位行列 print("array_den == \n", array_den, "\n") # arange 関数でのアレイの作成 array3 = np.arange(10) # 0〜(10-1)までを1ずつ加算した要素でアレイ作成 array4 = np.arange(8, 60, 4) # 8〜(60-1)までを4ずつ加算した要素でアレイ作成 print("array3 == ", array3) print("array4 == ", array4) 
```


### 実行結果

```
list1  ==  [1, 2, 3, 4]
array1 ==  [1 2 3 4]
array2 ==
 [[1 2 3 4]
 [5 6 7 8]]
array2.shape ==  (2, 4)
array2.dtype ==  int64
array_zeros ==  [ 0. 0. 0.]
array_zeros.dtype ==  float64
array_ones ==
 [[ 1. 1. 1.]
 [ 1. 1. 1.]
 [ 1. 1. 1.]]
array_emp ==
 [[ 0. 0. 0.]
 [ 0. 0. 0.]
 [ 0. 0. 0.]]
array_den ==
 [[ 1. 0. 0. 0. 0.]
 [ 0. 1. 0. 0. 0.]
 [ 0. 0. 1. 0. 0.]
 [ 0. 0. 0. 1. 0.]
 [ 0. 0. 0. 0. 1.]]
array3 ==  [0 1 2 3 4 5 6 7 8 9]
array4 ==  [ 8 12 16 20 24 28 32 36 40 44 48 52 56]

```

### 参考サイト

- [NumPy Reference — NumPy v1.11 Manual](http://docs.scipy.org/doc/numpy/reference/)
