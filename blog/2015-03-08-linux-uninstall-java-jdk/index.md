---
title: 'Java: Linux (CentOS)からJDK (RPM PKG版)をアンインストールする方法'
date: 2015-03-08
authors: [yukun]
tags:
  - java
  - linux
slug: linux-uninstall-java-jdk
---

既存のJDKをアンインストールする手順を下記に記載。対象のマシンに最新の[JDK (Java SE Development Kit)](http://www.oracle.com/technetwork/java/javase/downloads/index.html)をインストールする際等に使用。

### 環境前提

- OS: CentOS (64bit)
- JDKのインストールタイプ: RPMパッケージ (≠自己解凍形式)


<!-- truncate -->


### インストールされているJavaのバージョン確認

```
# java -version
java version "1.7.0_25"
Java(TM) SE Runtime Environment (build 1.7.0_25-b15)
Java HotSpot(TM) 64-Bit Server VM (build 23.25-b01, mixed mode)
# javac -version
javac 1.7.0_25

```

### インストールデータの確認

```
# which java
/usr/bin/java
# ls -l /usr/bin/java
lrwxrwxrwx 1 root root 26  8月 10  2013 /usr/bin/java -> /usr/java/default/bin/java
# ls /usr/java/
default/     jdk1.7.0_25/ latest/
# ls -l /usr/java
合計 4
lrwxrwxrwx 1 root root   16  8月 10  2013 default -> /usr/java/latest
drwxr-xr-x 8 root root 4096  8月 10  2013 jdk1.7.0_25
lrwxrwxrwx 1 root root   21  8月 10  2013 latest -> /usr/java/jdk1.7.0_25
# ls /usr/java/jdk1.7.0_25/
COPYRIGHT  README.html                         THIRDPARTYLICENSEREADME.txt  db       jre  man      src.zip
LICENSE    THIRDPARTYLICENSEREADME-JAVAFX.txt  bin                          include  lib  release

```

### アンインストールするJDKのパッケージ名を確認

オプション引数qがパッケージ詳細の表示、aがqに続くオプションで「インストールされている全てのパッケージを選択」。それをパイプでgrepコマンドに引き渡し、jdkで検索をかけている。

```
# rpm -qa | grep jdk
jdk-1.7.0_25-fcs

```

### JDKのアンインストール

```
# rpm -e jdk-1.7.0_25-fcs

```

### JDKのアンインストール結果確認

```
# java
-bash: java: command not found
# javac
-bash: javac: command not found
# ls /usr/
X11R6/    etc/      include/  lib/      libexec/  man/      share/    tmp/
bin/      games/    kerberos/ lib64/    local/    sbin/     src/
↑ /usr/javaフォルダが削除されていることを確認。

```

確かにJDKがアンインストールされていることを確認できた。

### 備考: 最新JDKのインストール

```
# rpm -ivh jdk-8u40-linux-x64.rpm
準備中...                ########################################### [100%]
   1:jdk1.8.0_40            ########################################### [100%]
Unpacking JAR files...
	rt.jar...
	jsse.jar...
	charsets.jar...
	tools.jar...
	localedata.jar...
	jfxrt.jar...
	plugin.jar...
	javaws.jar...
	deploy.jar...
# java -version
java version "1.8.0_40"
Java(TM) SE Runtime Environment (build 1.8.0_40-b25)
Java HotSpot(TM) 64-Bit Server VM (build 25.40-b25, mixed mode)
# javac -version
javac 1.8.0_40

```

### 参考サイト

- [RPMを使用したLinux 64ビットJavaのインストール方法](http://java.com/ja/download/help/linux_x64rpm_install.xml)
- [Linux 版 Java をアンインストールするにはどうすればよいですか?](https://www.java.com/ja/download/help/linux_uninstall.xml)
