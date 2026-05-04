---
title: 'IBM System i (AS400): CPA, CPFメッセージ内容の検索 - DSPMSGD, WRKMSGF'
date: 2014-04-30
authors: [yukun]
tags:
  - as400
  - system-i
slug: ibm-system-i-as400-cpa-cpf-wrkmsgf
---

IBM i OSが出力するメッセージコードからその内容を調べたい場合は以下の検索手法がある。

```
DSPMSGD CPFXXXX

```

```
                       Select Message Details to Display
                                                             System:   XXXXXX
 Message ID . . . . . . . . . :   CPF5140
 Message file . . . . . . . . :   QCPFMSG
   Library  . . . . . . . . . :     QSYS2924
 Message text . . . . . . . . :   Session stopped by a request from device &4.
 Select one of the following:
      1. Display message text
      2. Display field data
      5. Display message attributes
     30. All of the above
 Selection
 F3=Exit   F12=Cancel

```

また、IBM i OSに登録されているメッセージコードを確認したい場合は以下の通り。

```
WRKMSGF MSGF(*ALL)

```

下記の画面にてQCPFMSG行のOpt列に5を入力の上、Enterを押下。

```
                            Work with Message Files
 Type options, press Enter.
   1=Create   2=Change   4=Delete      5=Display message descriptions
   12=Work with message descriptions   13=Change description
      Message
 Opt  File        Library     Text
      AMQMSG      QSYS2924    WebSphere MQ Message File
      EVFCMSGF    QSYS2924    ADM Check In Exit Hook
      QALRMSG     QSYS2924
      QAPFMSG     QSYS2924
      QBASMSG     QSYS2924
      QCBLMSGE    QSYS2924    COBOL RUN TIME MESSAGE FILE
      QCEEMSG     QSYS2924
      QCGMSG      QSYS2924
 5    QCPFMSG     QSYS2924
                                                                        More...
 Parameters for options 1, 2, 5, 12 and 13 or command
 ===>
 F3=Exit      F4=Prompt   F5=Refresh   F9=Retrieve   F11=Display names only
 F12=Cancel   F16=Repeat position to   F17=Position to   F24=More keys

```


<!-- truncate -->
 下記の画面のPosition to に調べたいMSGコード(CPA, CPF等で始まるもの)を入力してEnterを押下。

```
                          Display Message Descriptions
                                                             System:   XXXXXX
 Message file:   QCPFMSG        Library:   QSYS2924
 Position to . . . . . . .             Message ID
 Type options, press Enter.
   5=Display details   6=Print
 Opt  Message ID  Severity  Message Text
       CAE0002       40     New level of CSP/AE required for application.
       CAE0005       30     &1 Date entered must be in the format &2.
       CAE0009       40     Overflow occurred. Target item is too short.
       CAE0014       40     REPLACE attempted without preceding UPDATE on &1.
       CAE0020       40     Application and file record lengths not equal.
       CAE0023       40     Allocation of table &1 failed.
       CAE0024       40     Subscript value for operand &1 is not valid.
       CAE0025       40     Subscript value &1 is not valid for operand &2.
       CAE0026       40     A calculation caused a maximum value overflow.
       CAE0027       40     Operand number &1 does not contain numeric data.
                                                                        More...
 F3=Exit   F5=Refresh   F12=Cancel
 (C) COPYRIGHT IBM CORP. 1980, 2003.

```

仮に、CPF1394を入力してEnterを押下した場合は、以下のように、表示される。

```
                          Display Message Descriptions
                                                             System:   XXXXXX
 Message file:   QCPFMSG        Library:   QSYS2924
 Position to . . . . . . .             Message ID
 Type options, press Enter.
   5=Display details   6=Print
 Opt  Message ID  Severity  Message Text
       CPF1394       50     CPF1394 User profile &1 cannot sign on.
       CPF1395       50     CPF1395 Not able to allocate object &1 of type *&3
       CPF1396       50     CPF1396 Not able to allocate system resources now.
       CPF1397       70     Subsystem &1 varied off work station &3 for user &8
       CPF1398       70     Subsystem &1 varied off work station &3.
       CPF1399       70     Subsystem &1 deallocated work station &3.
       CPF1601        0     Subsystem description recovery in progress.
       CPF1602        0     Subsystem description recovered. Some contents may
       CPF1603       40     Subsystem description &1 in &2 damaged.
       CPF1604       60     Active subsystem description may or may not be chan
                                                                        More...
 F3=Exit   F5=Refresh   F12=Cancel

```

上画面でCPF1394のOptに5を入力すれば、そのCPF1394のメッセージテキストを確認できる。

```
                       Select Message Details to Display
                                                             System:   XXXXXX
 Message ID . . . . . . . . . :   CPF1394
 Message file . . . . . . . . :   QCPFMSG
   Library  . . . . . . . . . :     QSYS2924
 Message text . . . . . . . . :   CPF1394 User profile &1 cannot sign on.
 Select one of the following:
      1. Display message text
      2. Display field data
      5. Display message attributes
     30. All of the above
 Selection
      1
 F3=Exit   F12=Cancel
 (C) COPYRIGHT IBM CORP. 1980, 2003.

```

Selection に 1を入力後、Enterを押下。

```
                         Display Formatted Message Text
                                                             System:   XXXXXX
 Message ID . . . . . . . . . :   CPF1394
 Message file . . . . . . . . :   QCPFMSG
   Library  . . . . . . . . . :     QSYS2924
 Message . . . . :   CPF1394 User profile &1 cannot sign on.
 Cause . . . . . :   User profile &1 has reached the maximum number of sign-on
   attempts and has been disabled, or the STATUS parameter has been changed to
   *DISABLED on the Create User Profile (CRTUSRPRF) or Change User Profile
   (CHGUSRPRF) command.
 Recovery  . . . :   To enable the user profile, have the security officer
   change the STATUS parameter to *ENABLED on the Change User Profile
   (CHGUSRPRF) command.
                                                                         Bottom
 Press Enter to continue.
 F3=Exit   F11=Display unformatted message text   F12=Cancel

```
