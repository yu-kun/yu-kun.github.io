---
title: 'IBM System i (AS400): Power-Off時の処理追加方法 - QEZPWROFFP'
date: 2015-02-08
authors: [yukun]
tags:
  - ibm
  - system-i
slug: as400-end-process-qezpwroffp
---

System i においてスケジュールPower-Off時にアプリケーションの終結処理等を挿入したい場合、QSYS/QEZPWROFFPプログラムを修正する。修正方法は下記の通り。

### ソースファイルの取得

```
> RTVCLSRC PGM(QSYS/QEZPWROFFP) SRCFILE(QGPL/QCLSRC)

```

ここではQGPLに保管している。

### ソースファイルの修正

```
> STRSEU SRCFILE(QGPL/QCLSRC) SRCMBR(QEZPWROFFP)

```

```
 Columns . . . :    1  71            Edit                           QGPL/QCLSRC
 SEU==>                                                              QEZPWROFFP
 FMT **  ...+... 1 ...+... 2 ...+... 3 ...+... 4 ...+... 5 ...+... 6 ...+... 7
0018.00 /* User mod flag  . . . . . . . . . . . . . :   *NO               UM*/
0019.00 /*                                                                ED*/
0020.00 /********************************************************************/
0021.00      PGM
0022.00      DCL VAR(&COIBM) TYPE(*CHAR) LEN(128) VALUE('      5738-SS1 (C) -
0023.00 COPYRIGHT IBM CORP. 1980, 1991 ALL RIGHTS RESERVED. LICENSED -
0024.00 MATERIALS - PROPERTY OF IBM')
0025.00      QSYS/PWRDWNSYS OPTION(*IMMED)
0026.00      GOTO CMDLBL(PGM_END)
0027.00 COPYWRITE: +
0028.00      QSYS/CHGVAR VAR(&COIBM) VALUE(&COIBM)
0029.00 PGM_END:
0030.00      QSYS/ENDPGM
        ****************** End of data ****************************************
 F3=Exit   F4=Prompt   F5=Refresh   F9=Retrieve   F10=Cursor   F11=Toggle
 F16=Repeat find       F17=Repeat change          F24=More keys

```

上記の QSYS/PWRDWNSYS OPTION(\*IMMED) 前に任意の処理を追加〜コンパイル〜配置することで、スケジュールPower-Off時に実行される。WebSphere MQ のキューマネージャの停止処理や各種ログのラップ処理を追加する等の活用に使える。詳細な仕様については下記のIBM Knowledge Centerをご参照。

### 参考サイト

- [IBM Knowledge Center - Exit Program for Tailoring Power Off](http://www-01.ibm.com/support/knowledgecenter/ssw_ibm_i_71/apis/XEZPWROF.htm)
