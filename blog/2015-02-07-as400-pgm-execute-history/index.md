---
title: 'IBM System i (AS400): プログラムの実行有無の確認 - DSPOBJD'
date: 2015-02-07
authors: [yukun]
tags:
  - ibm
  - system-i
slug: as400-pgm-execute-history
---

System i において、対象プログラムが最後に何時実行されたのかを調べるにはDSPOBJDコマンドを用いて確認する。用途としては「実行結果はさておきPGMが実行されたかどうか」を確認したい際に使う。

### コマンド実行例

```
> DSPOBJD OBJ(XXXX/YYYYYYYYY) OBJTYPE(*PGM)

```


<!-- truncate -->
 対象OBJのOpt欄に5(=Display full attributes)を入力すると以下のDescription画面が表示される。この例ではLast used date がブランク、Days used count = 0の為、当該PGMが一度も実行されていないことが分かる。

```
   Last used date . . . . . . . . . . :
   Days used count  . . . . . . . . . :   0

```

### Display Object Description - Full画面

```
                       Display Object Description - Full
                                                                 Library 1 of 1
 Object . . . . . . . :   YYYYYYYYY       Attribute  . . . . . :   CLP
   Library  . . . . . :     XXXX          Owner  . . . . . . . :   #SYSLOAD
 Library ASP device . :   *SYSBAS         Primary group  . . . :   *NONE
 Type . . . . . . . . :   *PGM
 Change/Usage information:
   Change date/time . . . . . . . . . :   14-12-10  04:33:56
   Usage data collected . . . . . . . :   YES
   Last used date . . . . . . . . . . :
   Days used count  . . . . . . . . . :   0
     Reset date . . . . . . . . . . . :
   Allow change by program  . . . . . :   YES
 Auditing/Integrity information:
   Object auditing value  . . . . . . :   *CHANGE
   Digitally signed . . . . . . . . . :   NO
                                                                        More...
 Press Enter to continue.
 F3=Exit   F12=Cancel

```
