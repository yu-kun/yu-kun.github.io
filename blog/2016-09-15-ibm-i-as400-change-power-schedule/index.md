---
title: 'IBM System i (AS400): 電源スケジュールの変更と確認方法 - GO POWER, QIPLDATTIM'
date: 2016-09-15
authors: [yukun]
tags:
  - as400
  - ibm
  - system-i
slug: ibm-i-as400-change-power-schedule
---

IBM System i (AS400)マシンのパワースケジュールの変更方法と変更結果の確認方法を記載する。 
<!-- truncate -->


### スケジュールの変更

1. GO POWER
2. Opt 2 (= Change power on and off schedule)
3. 時刻を変更しEnterを打鍵
4. メッセージ"Power on and off schedule successfully changed from yy-mm-dd."を確認

### 変更の確認

下記コマンドを打鍵し、次回のIPL時刻が上記の変更に沿って更新されていることを確認。

```
WRKSYSVAL QIPLDATTIM
```

### 電電スケジュールの変更に伴う考慮点

WRKJOBSCDEコマンド等でシステムに登録されているジョブスケジューラーのhold・スケジュール時刻の変更要否を確認すること。

### 参考サイト

- [IBM Knowledge Center - i5/OS: Restarting and powering down a system with logical partitions](http://www.ibm.com/support/knowledgecenter/ssw_ibm_i_71/rzait/rzaitwronofflpar.htm)
- iSeries Information Center
- publib.boulder.ibm.com/html/as400/v5r1/ic2962/index.htm?info/rzal2/rzal2startstop.htm
