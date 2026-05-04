---
title: 'Python: 10進数整数を2進数文字列に変換する関数'
date: 2008-08-04
authors: [yukun]
tags:
  - mathematics
  - number
  - python
  - sequence
  - string
slug: python-decimal-to-binary-conversion
---

2進数文字列を10進数整数に変換する関数int()はありますが、

```
>>> int('1011', 2)
11

```

その逆の、10進数整数を2進数文字列に変換する関数が(Python2.5では)見当たらなかったので、書いてみました。

### ソースコード


```python
#!/usr/bin/python
# coding: UTF-8
import math, string
# 10進数整数を2進数文字列に変換する関数
# decimal : 10進数整数
# press   : 上位桁の0を切り詰めるフラグ
def toBinary(decimal, press=True):
    if decimal == 0: return '0'
    bin_str = ""
    i = 31
    while i >= 0:
        bi = int((decimal & int(math.pow(2, i))) >> i)
        bin_str += str(bi)
        i -= 1
    if press:
        try:
            bin_str = bin_str[bin_str.index('1'):]
        except ValueError:
            print 'error'
            bin_str = '0'
    return bin_str
bin_arr = [toBinary(i) for i in range(21)]
print '10進数t2進数'
for i in range(len(bin_arr)):
    print '%2dt%5s' % (i, bin_arr[i])
```


Pythonでは明示的に型変換する必要がありますので、所々int()、str()を用いて型直ししています。

### 実行結果

```
10進数  2進数
 0          0
 1          1
 2         10
 3         11
 4        100
 5        101
 6        110
 7        111
 8       1000
 9       1001
10       1010
11       1011
12       1100
13       1101
14       1110
15       1111
16      10000
17      10001
18      10010
19      10011
20      10100

```

## 追記: 32bit以上の整数を扱う場合

参考: [10進数を2進数と16進数に変換する - gan2 の Ruby 勉強日記](http://d.hatena.ne.jp/gan2/20070603/1180888302 "10進数を2進数と16進数に変換する - gan2 の Ruby 勉強日記") ↑の記事で、データサイズにかかわらず処理できるRubyプログラムがありましたので、参考させていただきました。


```python
def toBinary2(decimal):
    if decimal == 0: return '0'
    bin_str = ""
    while decimal > 0:
        bin_str += str(decimal % 2)
        decimal >>= 1
    return bin_str[::-1]
```


実行結果は上と同じです。

### リファレンス

- [6.1 math -- Mathematical functions](http://docs.python.org/2/library/math.html "6.1 math -- Mathematical functions")
- [6.7.1 Mapping Operators to Functions](http://docs.python.org/2/library/operator.html#operator-map "6.7.1 Mapping Operators to Functions")
