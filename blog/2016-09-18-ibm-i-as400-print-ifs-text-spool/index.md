---
title: 'IBM System i (AS400): IFS上のテキスト形式ファイルを5250プロンプトから印刷(スプール化)'
date: 2016-09-18
authors: [yukun]
tags:
  - as400
  - ibm
  - shell
  - system-i
slug: ibm-i-as400-print-ifs-text-spool
---

本記事はIBM i OSにおけるIFS上のテキスト形式ファイルをコマンドでPrint(スプールファイル化)する方法を記載する。 
<!-- truncate -->
 5250のコマンドプロンプトより下記のコマンドを打鍵する。

```
> qsh cmd('cat /var/log/xxxxxxxxxxx.log')

```

※catコマンドの引数は任意のテキスト形式のファイルパス。 上記コマンド打鍵後、Qshell画面上でF6(=Print)キーを打鍵しEnterキーでコマンドプロンプトへ復帰する。この状態でWRKJOB -> 4とすれば先ほどPrintしたテキストファイルがスプール化されて保管できている。 この手法は出力されたログやリリースしたスクリプトファイルの証跡を取得するのに活用可能。

### 参考サイト

- [IBM Knowledge Center - Qshell](https://www.ibm.com/support/knowledgecenter/ja/ssw_ibm_i_73/rzahz/rzahzintro.htm)
