---
title: 'WebSphere MQ: IBM i (AS400) へのインストール'
date: 2013-05-29
authors: [yukun]
tags:
  - iseries
  - system-i
  - websphere-mq
slug: iseries-websphere-mq-install
---

ドイツのレンタルIBM i v5.3(2009年にEOS)へWebSphere MQの評価版を導入した際の手順を以下に紹介する。参考サイト・文献は本記事末尾をご参照。 尚、基本的にはIBM サイトのWebSphere MQのスタートアップ・ガイドを元に進めるのが良い。本記事はガイド中のポイントとなる必要最小限のステップを載せている。 
<!-- truncate -->


### 事前環境確認：インストールされている1次言語、2次言語の確認

確認方法はプロンプトからGO LICPGM → "20. Display installed secondary languages"。

```
                     Display Installed Secondary Languages
                                                             System:   SASAKI
 Primary language . . . . . . :   2929
 Description  . . . . . . . . :   German
 Type options, press Enter.
   5=Display installed Licensed Program
 Option     Language     Description
              2924       English
                                                                         Bottom
 F3=Exit   F12=Cancel

```

ドイツ国内管理のサーバーだけあって、やはり1次言語が2929(German)、一応2次言語が2924(English大文字小文字)。WebSphere MQのインストール言語は対象マシンの1次言語と同じものとなる。仮に2924を使用したい場合は、同インストールメディア内の翻訳バージョンを別途インストールする。

### WebSphere MQのインストール

インストールはRSTLICPGMコマンドで行う。

```
RSTLICPGM LICPGM(5724H72) DEV(OPTVRT01) OPTION(*BASE) OUTPUT(*PRINT)

```

尚、ここではOPTVRT01にインストールメディアのISOイメージをマウントしている前提で進める。以下は上記コマンドを打鍵後、F4押下時の画面。

```
                      Restore Licensed Program (RSTLICPGM)                      
                                                                                
Type choices, press Enter.                                                     
                                                                                
Product  . . . . . . . . . . . . > 5724H72       Character value               
Device . . . . . . . . . . . . . > OPTVRT01      Name, *SAVF                   
                + for more values                                               
Optional part to be restored . .   *BASE         *BASE, 1, 2, 3, 4, 5, 6, 7... 
Type of object to be restored  .   *ALL          *ALL, *PGM, *LNG              
Language for licensed program  .   *PRIMARY      Character value, *PRIMARY...  
Output . . . . . . . . . . . . . > *PRINT        *NONE, *PRINT                 
Release  . . . . . . . . . . . .   *FIRST        Character value, *FIRST       
Replace release  . . . . . . . .   *ONLY         Character value, *ONLY, *NO   
Volume identifier  . . . . . . .   *MOUNTED                                    
                + for more values                                               
End of media option  . . . . . .   *REWIND       *REWIND, *LEAVE, *UNLOAD      
                                                                                
                                                                                
                                                                                
                                                                                
                                                                        More... 
F3=Exit   F4=Prompt   F5=Refresh   F10=Additional parameters   F12=Cancel      
F13=How to use this display        F24=More keys                               

```

上記画面でEnterを押下後、以下の通り確認画面が表示されるのでF14=Acceptするとインストールが続行する。

```
                               Software Agreement
                                                             System:   SASAKI
Licensed program  . . . . . . . . :   5724H72
Licensed program option . . . . . :   *BASE
Release . . . . . . . . . . . . . :   V7R0M1
LIZENZINFORMATION
Für die Lizenzierung der nachfolgend aufgelisteten Programme gelten
zusätzlich zu den 'Internationale Nutzungsbedingungen für
Programmpakete' die folgenden Bedingungen.
Programmname: IBM WebSphere MQ V7.0.1
Programmnummer: 5724-H72
Programmname: IBM WebSphere MQ for z/OS V7.0.1
Programmnummer: 5655-R36
                                                                        More...
F3=Exit   F6=Print   F12=Cancel   F13=Select available language   F14=Accept
F16=Decline          F17=Top      F18=Bottom

```

上記はドイツ語のSoftware AgreementだがF13で英語に変更可能。以下はF14=Accept押下後のコマンドリプライ結果。

```
*PGM objects for product 5724H72 option *BASE release V7R0M1 restored.    
*LNG objects for NLV 2929 for product 5724H72 option *BASE release V7R0M1 
   restored.                                                               
Objects for product 5724H72 option *BASE release *FIRST restored.

```

続いて下記コマンドでSampleプログラムをインストールする。

```
RSTLICPGM LICPGM(5724H72) dev(OPTVRT01) OPTION(1) OUTPUT(*PRINT)
*PGM objects for product 5724H72 option 1 release V7R0M1 restored.
Objects for product 5724H72 option 1 release *FIRST restored.

```

最後に翻訳バージョン(2924)を以下のコマンドでインストール。

```
RSTLICPGM LICPGM(5724H72) DEV(OPTVRT01) RSTOBJ(*LNG) LNG(2924) OUTPUT(*PR
INT)
*LNG objects for NLV 2924 for product 5724H72 option *BASE release V7R0M1
  restored.

```

### インストール結果確認

プロンプトからGO LICPGM → "10. Display installed licensed programs"で確認する。

```
                      Display Installed Licensed Programs
                                                             System:   SASAKI
Licensed  Installed
Program   Status       Description
5722SS1   *COMPATIBLE  OS/400 - Qshell
5722SS1   *COMPATIBLE  OS/400 - Domain Name System
5722SS1   *COMPATIBLE  OS/400 - Portable App Solutions Environment
5722SS1   *COMPATIBLE  OS/400 - Digital Certificate Manager
5722SS1   *COMPATIBLE  OS/400 - CCA Cryptographic Service Provider
5722SS1   *COMPATIBLE  OS/400 - International Components for Unicode
5722SS1   *COMPATIBLE  OS/400 - Additional Fonts
5722DG1   *COMPATIBLE  IBM HTTP Server
5722DG1   *COMPATIBLE  Triggered Cache Manager
5722DP4   *COMPATIBLE  DB2 DataPropagator
5724H72   *INSTALLED   WebSphere MQ for i5/OS
5724H72   *INSTALLED   WebSphere MQ for i5/OS - Samples
5722IP1   *COMPATIBLE  IBM Infoprint Server
5722JC1   *COMPATIBLE  Toolbox for Java
                                                                        More...
Press Enter to continue.
F3=Exit   F11=Display release   F12=Cancel   F19=Display trademarks

```

### 参考サイト

- [スタートアップ・ガイド バージョン 7.0](https://www.google.co.jp/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&ved=0CCwQFjAA&url=ftp%3A%2F%2F60.247.49.233%2FCZ4V6ML_mq_win701%2FDocs%2FHelp%2Fja_jp%2Fpdf%2Famqtac07.pdf&ei=ngemUdvZAsWklQW8z4GYBA&usg=AFQjCNFFQDn5UFnbiKCWbxMVCHMb6VaY7A&sig2=u4tHyttFeWKivJf_Bqz_Yw&bvm=bv.47008514,d.dGI)
- IBM Japanese:Ｗｅｂｓｐｈｅｒｅ　ＭＱ　ｆｏｒ　ｉＳｅｒｉｅｓ　スタートアップ・ガイド　バージョン　５．３ (GC88-9248-00) - Japan
- IBM Japanese:ＷｅｂＳｐｈｅｒｅ　ＭＱ　ｆｏｒ　ｉＳｅｒｉｅｓ　システム管理ガイド　Ｖ６．０ (SD88-6570-00) - Japan
