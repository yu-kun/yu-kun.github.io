---
title: 'Bash: 数字とその他 文字列の判別'
date: 2011-08-05
authors: [yukun]
tags:
  - bash
  - linux
  - regexp
  - shell
slug: bash-if-num-str
---

数字文字列とそれ以外の文字列を判別する条件式は以下の通り。

### スクリプト


```bash
 #!/bin/sh if expr "$1" : '[0-9]*' > /dev/null ; then echo "数字です" else echo "数字以外です" fi 
```


### 実行結果

```
$ ./if_numstr.sh 123
数字です
$ ./if_numstr.sh abc
数字以外です

```

### 内容

exprで正規表現を用いて数値を判定。exprは内部コード以外にも標準出力にも結果を返すので、不要なそれは/dev/nullへリダイレクトする。
