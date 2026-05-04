---
title: 'Java: 形態素解析Senをインストール(Windows編)'
date: 2010-03-25
authors: [yukun]
tags:
  - java
  - sen
  - setting
slug: java-install-sen-windows
---

### ダウンロードするソフト

1.ActivePerl([ActivePerl, Download Perl for Windows, Mac, Linux, AIX, HP-UX & Solaris](http://www.activestate.com/activeperl)) 2.Apache Ant([Apache Ant - Binary Distributions](http://ant.apache.org/bindownload.cgi)) 3.Sen(sen: ドキュメント & ファイル: release) 
<!-- truncate -->
 ActivePerlはインストーラーに従いインストールする。 ダウンロードしたAntとSenはC:\\work以下に解凍し、フォルダ名をそれぞれapache-ant、senとリネームする。

### 環境変数の設定

PATH(追加) C:\\work\\apache-ant\\bin; ANT\_HOME C:\\work\\apache-ant SEN\_HOME C:\\work\\sen JAVA\_HOME C:\\Sun\\SDK\\jdk この後、上記の環境変数が適応されているか下記のコマンドを用いて確認する。

```
C:\>echo %ANT_HOME%
C:\work\apache-ant (←OK、パスが適応されている)

```

適応されていなければ再起動する。

### 辞書のインストール方法

カレントディレクトリをdicに設定後、辞書をインストールする。

```
C:\>cd work/sen/dic (←カレントディレクトリを移動)
C:\work\sen\dic>ant -Dperl.bin=C:\Perl\bin\perl.exe (←辞書のインストール)
Buildfile: C:\work\sen\dic\build.xml
＜中略＞
BUILD SUCCESSFUL
Total time: 1 minute 2 seconds
C:\work\sen\dic>

```

### 動作確認

%SEN\_HOME%\\sen.batをダブルクリックする。

```
C:\work\sen\bin>rem set classpath
C:\work\sen\bin>SET CLASSPATH=C:\work\sen\lib\sen.jar
C:\work\sen\bin>SET CLASSPATH=C:\work\sen\lib\sen.jar;C:\work\sen\lib\commons-logging.jar
done.
Please input Japanese sentence:
2010/03/25 0:29:44 net.java.sen.Dictionary 
情報: token file = C:\work\sen\dic/token.sen
2010/03/25 0:29:44 net.java.sen.Dictionary 
情報: time to load posInfo file = 16[ms]
2010/03/25 0:29:44 net.java.sen.Dictionary 
情報: double array trie dictionary = C:\work\sen\dic/da.sen
2010/03/25 0:29:44 net.java.sen.util.DoubleArrayTrie load
情報: loading double array trie dict = C:\work\sen\dic/da.sen
2010/03/25 0:29:45 net.java.sen.util.DoubleArrayTrie load
情報: loaded time = 0.453[ms]
2010/03/25 0:29:45 net.java.sen.Dictionary 
情報: pos info file = C:\work\sen\dic/posInfo.sen
2010/03/25 0:29:45 net.java.sen.Dictionary 
情報: time to load pos info file = 0[ms]
2010/03/25 0:29:45 net.java.sen.Tokenizer loadConnectCost
情報: connection file = C:\work\sen\dic\matrix.sen
2010/03/25 0:29:45 net.java.sen.Tokenizer loadConnectCost
情報: time to load connect cost file = 141[ms]
hello
hello   (hello) 未知語(0,5,5)   null    null
こんにちは
こんにちは      (こんにちは)    感動詞(0,5,5)   コンニチハ      コンニチワ

```
