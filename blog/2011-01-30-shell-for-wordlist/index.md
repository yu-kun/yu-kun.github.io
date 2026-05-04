---
title: 'Shell Script: for文 - ワードリストを順に出力'
date: 2011-01-30
authors: [yukun]
tags:
  - linux
  - loop
  - shell
  - unix
slug: shell-for-wordlist
---

シェルスクリプトのfor文の一般式は下記の通り。 

```bash
for パラメータ変数 in ワードリスト
do
	コマンド
done
```

 ワードリストの要素をパラメータ変数に代入しdo～done間をワードリストの要素分ループする。 
<!-- truncate -->
 以下のシェルスクリプトは数値の羅列を出力するもの。 

```bash
#!/bin/sh
for i in 0 1 2 3 4 5 6 7 8 9
do
	echo "\$i = $i,"
done
```

 実行結果は下記の通り。 

```bash
$ sh for_wordlist.sh
$i = 0,
$i = 1,
$i = 2,
$i = 3,
$i = 4,
$i = 5,
$i = 6,
$i = 7,
$i = 8,
$i = 9,
```

 また、ワードリストを文字列にしたスクリプトを以下に示す。 

```bash
#!/bin/sh
for VAR in 'Dead or alive.' Pardon? "You're d..."
do
	echo $VAR
done
```

 実行結果は下記の通り。 

```bash
$ sh for_wordlist_str.sh
Dead or alive.
Pardon?
You're d...
```


