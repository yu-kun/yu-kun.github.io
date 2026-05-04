---
title: 'IBM System i (AS400): FTPサーバでのファイルの指定方法 - 最上位ライブラリはQSYS.LIB or QGPL.LIB?'
date: 2016-08-26
authors: [yukun]
tags:
  - as400
  - ftp
  - ibm
  - system-i
slug: ibm-i-as400-ftp-namefmt-qsys-qgpl
---

IBM System iのFTPサーバからファイル名(メンバ名)を指定する方法は以下の2通りある。

1. name format (namefmt) 0: LIBNAME/FILENAME.MBRNAME
2. name format (namefmt) 1: /QSYS.LIB/LIBNAME.LIB/FILENAME.FILE/MBRNAME.MBR


<!-- truncate -->
 FTPでIBM iにログインした場合、初期name formatは0が指定される。1に変更する場合は以下のコマンドを実行する。

```
ftp> quote site namefmt 1
```

### 陥りがちなフルパスの誤認識

```
230 XXXXXXX logged on.
ftp> pwd
257 "QGPL" is current library.
ftp> cd YYYYLIB
250 "YYYYLIB" is current library.

```

上記のコマンド結果から現在のパスをQGPL/YYYYLIBと考えがちだが、実際のフルパスは/QSYS.LIB/YYYYLIB.LIBとなる（全てのライブラリはQSYSライブラリ配下の為）。これを確認するには上記のプロンプトに続けてquote site namefmt 1を打鍵すれば、フルパスが出力される。

### 参考サイト

- [IBM Using the FTP Subcommand: NAMEFMT - Japan](http://www-01.ibm.com/support/docview.wss?uid=nas8N1017416)
