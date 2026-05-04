---
title: 'IBM System i (AS400): シェル (qsh) からCLコマンドを実行する'
date: 2014-06-19
authors: [yukun]
tags:
  - as400
  - ibm
  - shell
  - system-i
slug: as400-qsh-cl-system
---

IBM i(AS400)上のシェルスクリプト内でCLコマンドを実行することができるので、物によってはCLPでプログラムを組むより簡単にできることがある。当記事は「引数で与えられたファイル内の端末デバイス一覧を用いてデバイスを一括で作成するシェル」を通じてシェル内でのCLコマンドの使用方法を紹介する。 
<!-- truncate -->


### 使用データ (デバイス名一覧)

```
$ cat devlist.txt
TEST001
TEST002
TEST003
TEST004
TEST005

```

### 一括作成スクリプト


```bash
$ cat crtdev.sh
#!/bin/sh
filename=$1
cat ${filename} | while read line
do
  system "CRTDEVDSP DEVD(${line}) DEVCLS(*VRT) TYPE(3179) MODEL(2)"
done
```

 シェルからCLコマンドを使用するにはsystemユーティリティを使用する。使用方法の詳細は下記のページを参照。 [IBM i 7.1 Information Center>プログラミング>シェルおよびユーティリティー>Qshell>ユーティリティー>コマンド実行>system - CL コマンドを実行する](http://www-01.ibm.com/support/knowledgecenter/ssw_ibm_i_71/rzahz/rzahzsystem.htm?lang=ja)

### 実行結果

command entry画面でqshを打鍵しqshプロンプトを開く。

```
> cd /home/xxxxxx ← 上述のデータとスクリプトを保管してあるディレクトリへ移動
> ls
  crtdev.sh       devlist.txt
> ./crtdev.sh devlist.txt
  CPC2622:  Description for device TEST001 created.
  CPC2622:  Description for device TEST002 created.
  CPC2622:  Description for device TEST003 created.
  CPC2622:  Description for device TEST004 created.
  CPC2622:  Description for device TEST005 created.

```

正常完了。念のためF3でcommand entry画面に戻り、

```
> WRKDEVD DEVD(TEST*)

```

を実行すると下記画面の通り、確かにデバイスが作成されていることが分かる。

```
                         Work with Device Descriptions
                                                             System:   XXXXXX
 Position to  . . . . .                Starting characters
 Type options, press Enter.
   2=Change   3=Copy    4=Delete   5=Display   6=Print   7=Rename
   8=Work with status   9=Retrieve source
 Opt  Device      Type        Text
      TEST001     3179
      TEST002     3179
      TEST003     3179
      TEST004     3179
      TEST005     3179
                                                                         Bottom
 Parameters or command
 ===>
 F3=Exit   F4=Prompt   F5=Refresh   F6=Create   F9=Retrieve   F12=Cancel
 F14=Work with status

```
