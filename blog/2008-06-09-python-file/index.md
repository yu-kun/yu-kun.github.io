---
title: 'Python: テキストファイルの読み込み - read()、readlines()、readline()メソッド'
date: 2008-06-09
authors: [yukun]
tags:
  - file
  - python
  - read
slug: python-file
---

以下の読み込み用テキストファイルを用いて、 **text.txt**

```
It is meaningless only to think my long further aims idly.
It is important to set my aims but at the same time I should confirm my present condition.
Unless I set the standard where I am in any level, I'll be puzzled about what I should do from now on.

```

以下のメソッドを用いた場合の処理を書いてみます。

- read() - ファイルを全て読み込み、その文字列データに対して処理を行う
- readlines() - ファイルを全て読み込み、1行毎に処理を行う
- readline() - 1行毎に読み込み、その処理を繰り返す

## read() - ファイルを全て読み込み、その文字列データに対して処理を行う


```python
f = open('text.txt')
data1 = f.read()  # ファイル終端まで全て読んだデータを返す
f.close()
print(type(data1)) # 文字列データ
lines1 = data1.split('\n') # 改行で区切る(改行文字そのものは戻り値のデータには含まれない)
print(type(lines1))
for line in lines1:
    print line
print()
```


### 実行結果

```

It is meaningless only to think my long further aims idly.
It is important to set my aims but at the same time I should confirm my present condition.
Unless I set the standard where I am in any level, I'll be puzzled about what I should do from now on.

```

## readlines() - ファイルを全て読み込み、1行毎に処理を行う


```python
f = open('text.txt')
lines2 = f.readlines() # 1行毎にファイル終端まで全て読む(改行文字も含まれる)
f.close()
# lines2: リスト。要素は1行の文字列データ
for line in lines2:
    print(line),
print
```


### 実行結果

```
It is meaningless only to think my long further aims idly.
It is important to set my aims but at the same time I should confirm my present condition.
Unless I set the standard where I am in any level, I'll be puzzled about what I should do from now on.

```

## readline() - 1行毎に読み込み、その処理を繰り返す


```python
f = open('text.txt')
line = f.readline() # 1行を文字列として読み込む(改行文字も含まれる)
while line:
    print(line)
    line = f.readline()
f.close
```


### 実行結果

```
It is meaningless only to think my long further aims idly.
It is important to set my aims but at the same time I should confirm my present condition.
Unless I set the standard where I am in any level, I'll be puzzled about what Ishould do from now on.

```

### リファレンス

- [3.9 File Objects](http://docs.python.org/2/library/stdtypes.html#bltin-file-objects)

### チュートリアル

- [7\. Input and Output](http://docs.python.org/2/tutorial/inputoutput.html)
    - [7.2 Reading and Writing Files](http://docs.python.org/2/tutorial/inputoutput.html)
