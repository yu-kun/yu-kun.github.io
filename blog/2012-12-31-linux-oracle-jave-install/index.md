---
title: 'Linux: Oracle Javeのインストール方法'
date: 2012-12-31
authors: [yukun]
tags:
  - java
  - linux
  - setting
slug: linux-oracle-jave-install
---

Oracle(旧Sun) Javaは下記サイトからダウンロードする。 [Java SE Downloads](http://www.oracle.com/technetwork/java/javase/downloads/index.html) RedHat系のデストリビューションであればrpmパッケージが簡単。ダウンロード後にroot権限で下記コマンドを実行。

```
# rpm -ivh jdk-7u10-linux-x64.rpm
(100%)########################################### [100%]
Unpacking JAR files...
	rt.jar...
Error: Could not open input file: /usr/java/jdk1.7.0_10/jre/lib/rt.pack
	jsse.jar...
Error: Could not open input file: /usr/java/jdk1.7.0_10/jre/lib/jsse.pack
	charsets.jar...
Error: Could not open input file: /usr/java/jdk1.7.0_10/jre/lib/charsets.pack
	tools.jar...
Error: Could not open input file: /usr/java/jdk1.7.0_10/lib/tools.pack
	localedata.jar...
Error: Could not open input file: /usr/java/jdk1.7.0_10/jre/lib/ext/localedata.pack

```

上記のエラーが出力されるが後述の参考サイトを確認する限り特に問題ないようだ。

```
# javac -version;java -version
javac 1.7.0_10
java version "1.7.0_10"
Java(TM) SE Runtime Environment (build 1.7.0_10-b18)
Java HotSpot(TM) 64-Bit Server VM (build 23.6-b04, mixed mode)

```

### 参考サイト

- [java - Errors when installing jdk 1.7 in linux - Stack Overflow](http://stackoverflow.com/questions/13302271/errors-when-installing-jdk-1-7-in-linux)
- [Installing JDK and Eclispe - FedoraForum.org](http://forums.fedoraforum.org/showthread.php?t=285076)
- Java - GeilThings
