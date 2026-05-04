---
title: 'Python: pandasのSeriesオブジェクトの作成・参照・変換'
date: 2016-09-13
authors: [yukun]
tags:
  - pandas
  - python
slug: python-pandas-series
---

本記事はPythonのデータ分析用ライブラリである[pandas](http://pandas.pydata.org/)内の代表的なSeriesオブジェクト(一次元のデータ列)の基本機能(作成・参照・他データ構造への変換)を記載する。 
<!-- truncate -->


### ソースコード

Python3系の書式で記述している。 

```python
from pandas import Series
# PandasのSeriesオブジェクトを作成。Numpy.arrayとの違いはデータのindexに文字列を設定できること。
obj = Series([1,2,4,8])
# 何も指定しない場合は0から始まるインデックスが割り振られる
print("obj == \n", obj, "\n")
# valuesで値(ここでは[1,2,4,8])が帰ってくる。
print("obj.values == ", obj.values, "\n")
# indexはobj.indexで出力可能
print("obj.index == ", obj.index, "\n")
# 文字列index付きのデータを作成
# 各国の人口ランキング
# 参考： https://en.wikipedia.org/wiki/List_of_countries_and_dependencies_by_population
#     ： http://www2u.biglobe.ne.jp/~standard/code/country.htm
cp = Series([1378710000, 1330900000, 324460000, 260581000, 206644000, 194233000],
             index=['CHN', 'IND', 'USA', 'IDN', 'BRA', 'PAK'])
print("Countries and dependencies by population == \n", cp, "\n")
# 文字列のindexでアクセス可能
print("cp['PAK'] == ", cp['PAK'], "\n")
# 添え字に式を用いる事も可能
# 例：人口3億人以上の国は？
print("cp[cp > 300000000] == \n", cp[cp > 300000000], "\n")
# 辞書のようにも扱える
# 例：CHNがあるか？
print("'CHN' in cp == ", 'CHN' in cp, "\n")
# 辞書型⇔Series型は双方向で変換可能
print("cp.to_dict() == \n", cp.to_dict(), "\n")
print("Series(cp.to_dict()) == \n", Series(cp.to_dict()), "\n")
# Series同士の足し算はpandas側で合致するIndexで纏めて計算してくれる
print("cp + cp == \n", cp + cp, "\n")
# SeriesとそのIndexに名前をつけることが可能
cp.name = "Countries and dependencies by population"
cp.index.name = "Country (or dependent territory)"
print("cp == \n", cp, "\n")
```


### 実行結果

```
obj ==
 0    1
1    2
2    4
3    8
dtype: int64
obj.values ==  [1 2 4 8]
obj.index ==  RangeIndex(start=0, stop=4, step=1)
Countries and dependencies by population ==
 CHN    1378710000
IND    1330900000
USA     324460000
IDN     260581000
BRA     206644000
PAK     194233000
dtype: int64
cp['PAK'] ==  194233000
cp[cp > 300000000] ==
 CHN    1378710000
IND    1330900000
USA     324460000
dtype: int64
'CHN' in cp ==  True
cp.to_dict() ==
 {'BRA': 206644000, 'PAK': 194233000, 'IDN': 260581000, 'CHN': 1378710000, 'IND': 1330900000, 'USA': 324460000}
Series(cp.to_dict()) ==
 BRA     206644000
CHN    1378710000
IDN     260581000
IND    1330900000
PAK     194233000
USA     324460000
dtype: int64
cp + cp ==
 CHN    2757420000
IND    2661800000
USA     648920000
IDN     521162000
BRA     413288000
PAK     388466000
dtype: int64
cp ==
 Country (or dependent territory)
CHN    1378710000
IND    1330900000
USA     324460000
IDN     260581000
BRA     206644000
PAK     194233000
Name: Countries and dependencies by population, dtype: int64

```

### 参考サイト

- [pandas.Series — pandas 0.18.1 documentation](http://pandas.pydata.org/pandas-docs/stable/generated/pandas.Series.html)
- [List of countries and dependencies by population - Wikipedia, the free encyclopedia](https://en.wikipedia.org/wiki/List_of_countries_and_dependencies_by_population)
- [標準関係略語説明:各種コード:国名・通貨コード一覧](http://www2u.biglobe.ne.jp/~standard/code/country.htm)
