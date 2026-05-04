---
title: 'UNIX: pushd, popd, dirs - ディレクトリスタックによる移動'
date: 2013-06-09
authors: [yukun]
tags:
  - bash
  - linux
  - shell
  - unix
slug: unix-pushd-pop-dirs
---

シェルコマンドpushd, popd, dirsを用いて、ディレクトリスタックを使うことでディレクトリ間の移動を簡潔に行うTips。

### 使い方

pushdでスタックにジャンプしたいディレクトリを登録し、それをカレントディレクトリとする。popdで一番最後に登録したディレクトリを取り出し、それをカレントディレクトリとする。dirsでスタック内に登録されているディレクトリを表示。

### スタックへディレクトリの登録


```bash
 $ pushd /Applications/MAMP /Applications/MAMP ~ $ pushd /var/log /var/log /Applications/MAMP ~ $ pushd /etc /etc /var/log /Applications/MAMP ~ $ dirs -v 0 /etc 1 /var/log 2 /Applications/MAMP 3 ~ $ popd /var/log /Applications/MAMP ~ $ dirs -v 0 /var/log 1 /Applications/MAMP 2 ~ $ pwd /var/log 
```


### ディレクトリ間の移動

上記のスタックの状態からホームディレクトリに移動するにはpushd +2を使用する。 

```bash
 $ pushd +2 ~ /var/log /Applications/MAMP $ pwd /Users/yu $ dirs -v 0 ~ 1 /var/log 2 /Applications/MAMP $ pushd +2 /Applications/MAMP ~ /var/log $ pwd /Applications/MAMP $ 
```


### aliasへの登録

当コマンドをより便利に使う為に、以下のaliasやよく使うディレクトリを予め~/.bash\_profile等に登録しておくと良い。 

```bash
 alias pu='pushd' alias po='popd' alias dirs='dirs -v' alias d='dirs' alias pu1='pushd +1' alias pu2='pushd +2' alias pu3='pushd +3' alias pu4='pushd +4' alias pu5='pushd +5' alias pu6='pushd +6' alias pu7='pushd +7' alias pu8='pushd +8' alias pu9='pushd +9' 
```

 これで若干でも日々のタイプ量が減ると思うと、かなり良い。

### 参考サイト

- [UNIX tips: Learn 10 more good UNIX usage habits](http://www.ibm.com/developerworks/aix/library/au-unixtips/)
- [pushd and popd - Wikipedia, the free encyclopedia](http://en.wikipedia.org/wiki/Pushd_and_popd)
