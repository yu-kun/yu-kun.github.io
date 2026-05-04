---
title: 'Shell Script: for文 - ワードリストに変数、コマンドを使用'
date: 2011-02-06
authors: [yukun]
tags:
  - linux
  - loop
  - shell
  - unix
slug: shell-for-wordlist-command
---

以下のシェルスクリプトはfor文のワードリストに文字列変数を使用したもの。文字列はスペース区切でパラメータ変数に格納されloopする。また、ワードリストにバッククォートで括ったコマンドを指定すると、そのコマンドの実行結果がパラメータ変数に渡される。 

```bash
 #!/bin/sh VARS="1 2 3 four five" for VAR in $VARS do echo $VAR done echo "" for LIST in `date` do echo $LIST done 
```

 
<!-- truncate -->
 実行結果は下記の通り。 

```bash
 $ sh for_var.sh 1 2 3 four five 2011年 2月 6日 日曜日 12:31:09 JST 
```


