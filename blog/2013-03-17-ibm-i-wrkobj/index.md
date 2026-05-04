---
title: 'IBM System i (AS400): オブジェクトの作成、一覧表示、権限表示'
date: 2013-03-17
authors: [yukun]
tags:
  - as400
  - ibm
  - system-i
  - system-i-access
slug: ibm-i-wrkobj
---

オブジェクトに対する以下の操作の動作確認をする。

1. オブジェクトの作成
2. オブジェクトの一覧の表示
3. オブジェクトの権限の表示


<!-- truncate -->


### オブジェクトの作成

以下のコマンドを打鍵してOutput Queue、Job Queue、ファイルを作成する。

```
> CRTOUTQ OUTQ(SASAKI/SSKOUTQ) TEXT('Output queue for Sasaki')
  Object SSKOUTQ type *OUTQ created in library SASAKI.
> CRTJOBQ JOBQ(SASAKI/SSKJOBQ) TEXT('Job queue for Sasaki')
  Object SSKJOBQ type *JOBQ created in library SASAKI.
> CRTDSPF FILE(SASAKI/FILE1)
  File FILE1 created in library SASAKI.

```

上記コマンド中のSASAKIはライブラリー名を指す。

### オブジェクトの一覧の表示

作成したオブジェクトの確認を行う。

```
 > WRKLIB ＜ライブラリー名＞
```

```
                              Work with Libraries
 Type options, press Enter.
   1=Create   2=Change   3=Copy    4=Delete   5=Display   6=Print
   8=Display library description   9=Save     10=Restore
   11=Save changed objects         12=Work with objects   14=Clear
                              ASP
 Opt  Library     Attribute   Device      Text
      SASAKI      PROD                    SASAKI Library
                                                                         Bottom
 Parameters for options 1, 2, 3, 5, 8, 9, 10, 11 and 12 or command
 ===>
 F3=Exit      F4=Prompt   F5=Refresh   F9=Retrieve   F11=Display names only
 F12=Cancel   F16=Repeat position to   F17=Position to

```

オブジェクトの一覧を表示するには対象のライブラリー(ここではSASAKI)の行で、

```
 > Type 12 and press Enter 
```

```
                               Work with Objects
 Type options, press Enter.
   2=Edit authority        3=Copy   4=Delete   5=Display authority   7=Rename
   8=Display description   13=Change description
 Opt  Object      Type      Library     Attribute   Text
      SSKJOBQ     *JOBQ     SASAKI                  Job queue for Sasaki
      SSKOUTQ     *OUTQ     SASAKI                  Output queue for Sasaki
      FILE1       *FILE     SASAKI      DSPF
                                                                         Bottom
 Parameters for options 5, 7 and 13 or command
 ===>
 F3=Exit   F4=Prompt   F5=Refresh   F9=Retrieve   F11=Display names and types
 F12=Cancel   F16=Repeat position to   F17=Position to

```

なお、Opt列のFILE1行で13 Optを実行することでテキスト記述を変更できる。

```
                       Change Object Description (CHGOBJD)
 Type choices, press Enter.
 Object . . . . . . . . . . . . . > FILE1         Name, generic*, *ALL
   Library  . . . . . . . . . . . >   SASAKI      Name, *LIBL, *USRLIBL...
 Object type  . . . . . . . . . . > *FILE         *ALL, *ALRTBL, *AUTL...
 Text 'description' . . . . . . . > 'A display file'
 Days used count  . . . . . . . .   *NORESET      *NORESET, *RESET
                                                                         Bottom
 F3=Exit   F4=Prompt   F5=Refresh   F12=Cancel   F13=How to use this display
 F24=More keys

```

### オブジェクトの権限の表示

権限の表示はOpt 5を用いる。下記のように複数選択した場合は、権限表示画面上でEnterを押下することで次のオブジェクトの権限表示画面に遷移する。

```
                               Work with Objects
 Type options, press Enter.
   2=Edit authority        3=Copy   4=Delete   5=Display authority   7=Rename
   8=Display description   13=Change description
 Opt  Object      Type      Library     Attribute   Text
 5    SSKJOBQ     *JOBQ     SASAKI                  Job queue for Sasaki
 5    SSKOUTQ     *OUTQ     SASAKI                  Output queue for Sasaki
 5    FILE1       *FILE     SASAKI      DSPF        A display file
                                                                         Bottom
 Parameters for options 5, 7 and 13 or command
 ===>
 F3=Exit   F4=Prompt   F5=Refresh   F9=Retrieve   F11=Display names and types
 F12=Cancel   F16=Repeat position to   F17=Position to

```

上記画面でEnterを押下すると下記の画面に遷移。

```
                            Display Object Authority
 Object . . . . . . . :   SSKJOBQ         Owner  . . . . . . . :   SASAKI
   Library  . . . . . :     SASAKI        Primary group  . . . :   *NONE
 Object type  . . . . :   *JOBQ           ASP device . . . . . :   *SYSBAS
 Object secured by authorization list  . . . . . . . . . . . . :   *NONE
                          Object
 User        Group       Authority
 *PUBLIC                 *USE
 SASAKI                  *ALL
 QSPL                    *CHANGE
                                                                         Bottom
 Press Enter to continue.
 F3=Exit   F11=Display detail object authorities   F12=Cancel   F17=Top
 F18=Bottom
 (C) COPYRIGHT IBM CORP. 1980, 2003.

```

上記画面で再度Enterを押下すると2つめのオブジェクトの権限表示画面に遷移するが、ここでは割愛する。
