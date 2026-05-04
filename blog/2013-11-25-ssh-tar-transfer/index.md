---
title: 'ssh: tarコマンドによるファイル一括転送及び展開'
date: 2013-11-25
authors: [yukun]
tags:
  - linux
  - security
slug: ssh-tar-transfer
---

ローカルホスト上のsshコマンドを実行する際の標準入力はリモートホストで実行するコマンドの標準入力として送出される。 例として、カレントディレクトリのファイル(a.txt, b.txt, c.txt)をリモートホスト上の指定ディレクトリにtar書庫で転送し展開するコマンドは下記の通り。

### ローカルホスト上のプロンプト


```bash
 $ ls a.txt b.txt c.txt $ tar zcf - * | ssh yu@172.16.56.168 tar zxf - -C /home/yu/test yu@172.16.56.168's password: $ 
```

 tarコマンドのファイル名を指定するべき引数に「-」（ハイフン）を指定すると標準入力/標準出力となる。

### リモートホスト上のプロンプト


```bash
 $ pwd /home/yu/test $ ls d.txt e.txt f.txt ＜ローカル側でsshコマンド実行＞ $ ls a.txt b.txt c.txt d.txt e.txt f.txt 
```

 また、話変わってリモートホストで実行するコマンドの標準出力・エラー出力は、ローカルホスト上のsshコマンドの標準出力・エラー出力となる。 例として、リモートホストの指定ディレクトリのファイルをカレントディレクトリにtar書庫で転送し展開するコマンドは下記の通り。

### リモートホスト上のプロンプト


```bash
 $ pwd /home/yu/test $ ls a.txt b.txt c.txt d.txt e.txt f.txt $ cat * a b c d e f $ 
```


### ローカルホスト上のプロンプト


```bash
 $ pwd /home/yu/test $ ls $ ssh yu@172.16.56.168 'cd /home/yu/test ;tar zcf - * ' | tar zxf - yu@172.16.56.168's password: $ ls a.txt b.txt c.txt d.txt e.txt f.txt $ cat * a b c d e f $ 
```


### 参考サイト

[Linuxコマンド集 - 【 tar 】 ファイルを書庫化・展開する（拡張子.tarなど）：ITpro](http://itpro.nikkeibp.co.jp/article/COLUMN/20060227/230896/)
