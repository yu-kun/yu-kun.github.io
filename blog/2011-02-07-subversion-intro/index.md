---
title: 'Subversion: 基本コマンド操作'
date: 2011-02-07
authors: [yukun]
tags:
  - linux
  - subversion
slug: subversion-intro
---

以前Mac bookでSubversionを使用したときのメモ(備忘録用)。 (今後使い込んだ際に改めて書きなおそうかな。。) 
<!-- truncate -->


### リポジトリの作成

データする格納ディレクトリをSubversionに登録する。

> svnadmin create ＜ディレクトリのパス名＞


```bash
mkdir /Users/yukun/svn-repos
svnadmin create /Users/yukun/svn-repos
```


### 準備用のディレクトリを作成

- インポートするフィアルが存在するディレクトリに移動。
- リポジトリにプロジェクトのファイルをインポート（リポジトリに追加する）する。
- Firstrunプロジェクトとする。
- \-mオプションで任意のメッセージを関連付けられる。


```bash
mkdir /Users/yukun/tmp
cd tmp
```

 

```bash
tmp> svn import -m "imoprting firstrun project" . file:///Users/yukun/svn-repos/firstrun/trunk
Adding         Number.txt
Adding         Day.txt
Committed revision 1.
```


#### インポートの一般式

> svn import -m "＜コメント＞" ＜ファイルが入っているディレクトリのパス＞ ＜リポジトリのパス＞

カレントディレクトリ内のフィアルをインポートしたことになる。 

```bash
$ mkdir /Users/yukun/work
作業ディレクトリを作成
$ cd work
$ mkdir firstrun
```


### チェックアウト

リポジトリからローカルに最新の変更を受け取る。 

```bash
work> svn co file:///Users/yukun/svn-repos/firstrun/trunk firstrun
A    firstrun/Number.txt
A    firstrun/Day.txt
Checked out revision 1.
```


#### チェックアウトの一般式

> $ svn co ＜リポジトリのパス＞ ＜コピー先ディレクトリのパス＞

プロジェクトがローカルで変更が行われたか否かを確認。 

```bash
firstrun>  svn status Day.txt
M      Day.txt
```

 Mはローカルで変更されていて、その変更がリポジトリにコミットされていない。 プロジェクト内のファイルの差分を確認。 

```bash
svn diff Day.txt
Index: Day.txt
===================================================================
--- Day.txt	(revision 1)
+++ Day.txt	(working copy)
@@ -2,4 +2,6 @@
 tuesday
 wednesday
 thrusday
-friday
 No newline at end of file
+friday
+saturday
+sunday
 No newline at end of file
```


### リポジトリの更新（コミット）


```bash
firstrun> svn commit -m "Client wants us to work on weekends"weekends"
Sending        Day.txt
Transmitting file data .
Committed revision 2.
```

 リビジョン番号は変更したファイル数にかかわらずリポジトリ全体に及ぶ

#### コミットの一般式

作業ディレクトリ内で

> firstrun> svn commit -m "＜コメント＞"

リポジトリが実際に更新されたかどうか確認する。 

```bash
firstrun> svn log Day.txt
------------------------------------------------------------------------
r2 | yukun | 2008-12-23 17:28:42 +0900 (火, 23 12 2008) | 1 line
Client wants us to work on weekends
------------------------------------------------------------------------
r1 | yukun | 2008-12-23 16:51:27 +0900 (火, 23 12 2008) | 1 line
imoprting firstrun project
------------------------------------------------------------------------
```

 変更の詳細を出力。 

```bash
firstrun> svn log --verbose Day.txt
------------------------------------------------------------------------
r2 | yukun | 2008-12-23 17:28:42 +0900 (火, 23 12 2008) | 1 line
Changed paths:
   M /firstrun/trunk/Day.txt
Client wants us to work on weekends
------------------------------------------------------------------------
r1 | yukun | 2008-12-23 16:51:27 +0900 (火, 23 12 2008) | 1 line
Changed paths:
   A /firstrun
   A /firstrun/trunk
   A /firstrun/trunk/Day.txt
   A /firstrun/trunk/Number.txt
imoprting firstrun project
------------------------------------------------------------------------
```

 $ svn log のみだと最新の変更は出てこない。 また、作業ディレクトリ以外でコマンドを実行すると、 

```bash
work> svn log
svn: '.' is not a working copy
```

 のようにエラーとなる。

### 競合の発生

2人目のユーザの作業ディレクトリをfirstrun02とする。 

```bash
svn co file:///Users/yukun/svn-repos/firstrun/trunk firstrun02
A    firstrun02/Number.txt
A    firstrun02/Day.txt
Checked out revision 2.
firstrun> svn commit -m "Customer wants more numbers"
Sending        Number.txt
Transmitting file data .
Committed revision 3.
```

 作業ディレクトリのファイルにチェックアウトしたものより新しいバージョンがあるか否かを確認。 

```bash
firstrun02> svn status --show-updates
       *        2   Number.txt
Status against revision:      3
firstrun02> svn status -u
       *        2   Number.txt
Status against revision:      3
```

 \*はリポジトリ内に更新済みのものが存在するかどうか、 すなわちローカルにあるフィアルは古いですよ、ということ。 ローカルのコピーとリポジトリ内の最新のリビジョンを比較するには、 

```bash
firstrun02> svn diff -rHEAD Number.txt
ndex: Number.txt
===================================================================
--- Number.txt	(revision 3)
+++ Number.txt	(working copy)
@@ -2,6 +2,4 @@
 one
 two
 three
-four
-five
-six
 No newline at end of file
+four
 No newline at end of file
```

 普通のdiffではチェックアウトされたリビジョン、ここではr2としか比較しないので、変更点を検出できない。 作業ディレクトリのファイルを更新して最新のリビジョンにマージするには、 

```bash
firstrun02> svn update
U    Number.txt
Updated to revision 3.
```

 Uはフィアルが更新されたことを示している。
