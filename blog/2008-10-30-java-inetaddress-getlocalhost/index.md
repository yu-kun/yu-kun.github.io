---
title: 'Java: ローカルホスト名とIPアドレスを取得 - InetAddress.getLocalHost()メソッド'
date: 2008-10-30
authors: [yukun]
tags:
  - java
  - network
slug: java-inetaddress-getlocalhost
---

ローカルのホスト名とIPアドレスの取得方法です。 InetAddress.getLocalHost()メソッドでInetAddressクラスの唯一のインスタンスを取得し、getHostName()でホスト名を、getHostAddress()メソッドでIPアドレスをそれぞれ取得します。 これらの情報はコンピュータ一台に対して通常一つしかないので（LANカードが二枚以上さされている場合を除いて）InetAddressクラスはSingletonパターンを採っているようです。あー、アドレスを二つ以上持っている場合の手順忘れてしまいました。後でさらっておこう。

## ソースコード


```java
 import java.net.InetAddress; import java.net.UnknownHostException; public class ShowInetAddress { public static void main(String[] args) { // ローカルホスト名とIPアドレスを取得 try { InetAddress addr = InetAddress.getLocalHost(); InetAddress addr2 = InetAddress.getLocalHost(); if (addr.equals(addr2)) System.out.println("addrとaddr2は同じインスタンス"); System.out.println("Local Host Name: " + addr.getHostName()); System.out.println("IP Address : " + addr.getHostAddress()); } catch (UnknownHostException e) { e.printStackTrace(); } } } 
```


## 実行結果の一例

```
addrとaddr2は同じインスタンス
Local Host Name: Yukun-PC
IP Address     : 192.168.1.10

```
