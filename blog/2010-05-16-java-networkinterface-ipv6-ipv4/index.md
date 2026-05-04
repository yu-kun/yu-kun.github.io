---
title: 'Java: インターフェースとローカルのIPv6, IPv4アドレスの取得 - NetworkInterfaceクラス'
date: 2010-05-16
authors: [yukun]
tags:
  - java
  - network
  - socket
slug: java-networkinterface-ipv6-ipv4
---

下記のコードはネットワークインターフェース情報取得し、IPv6とIPv4のアドレスを取得、表示するサンプルコードです。

### ソースコード


```java
 import java.net.Inet4Address; import java.net.Inet6Address; import java.net.InetAddress; import java.net.NetworkInterface; import java.net.SocketException; import java.util.ArrayList; import java.util.Enumeration; import java.util.HashMap; /** * ネットワークインターフェースの取得 */ public class InetAddressesInfo { private HashMap> interfaceMap; public InetAddressesInfo() { interfaceMap = new HashMap>(); } public void getInterfaces() { interfaceMap.clear(); try { Enumeration interfaceList = NetworkInterface.getNetworkInterfaces(); if (interfaceList == null) { System.out.println("Message: No interfaces found"); } else { while (interfaceList.hasMoreElements()) { NetworkInterface iface = interfaceList.nextElement(); Enumeration addrList = iface.getInetAddresses(); if (!addrList.hasMoreElements()) continue; ArrayList iaddress = new ArrayList(); while (addrList.hasMoreElements()) iaddress.add(addrList.nextElement()); interfaceMap.put(iface, iaddress); } } } catch (SocketException se) { System.out.println("Error getting network interfaces: " + se.getMessage()); } } public void show() { for (NetworkInterface n : interfaceMap.keySet()) { System.out.println("Interface " + n.getName() + ": "); for (InetAddress a : interfaceMap.get(n)) { System.out.print("\tAddress " + ((a instanceof Inet4Address ? "(IPv4)" : (a instanceof Inet6Address ? "(IPv6)" : "(?)")))); System.out.println(": " + a.getHostAddress()); } } } public HashMap> getInterfaceMap() { return interfaceMap; } public void setInterfaceMap( HashMap> interfaceMap) { this.interfaceMap = interfaceMap; } public static void main(String[] args) { InetAddressesInfo i = new InetAddressesInfo(); i.getInterfaces(); i.show(); } } 
```


### 実行結果

```
Interface lo:
	Address (IPv6): 0:0:0:0:0:0:0:1
	Address (IPv4): 127.0.0.1
Interface net4:
	Address (IPv6): fe80:0:0:0:0:5efe:c0a8:10a%12
Interface net5:
	Address (IPv6): 2001:0:4137:9e76:8ae:1cf7:3f57:fef5
	Address (IPv6): fe80:0:0:0:8ae:1cf7:3f57:fef5%13
Interface eth3:
	Address (IPv6): 2001:c90:33d:21d4:919c:836b:2d1a:cf33
	Address (IPv6): 2001:c90:33d:21d4:8856:aef1:d0bd:db64
	Address (IPv6): fe80:0:0:0:919c:836b:2d1a:cf33%11
	Address (IPv4): 192.168.1.10

```

### ドキュメント

・[NetworkInterface (Java Platform SE 6)](http://java.sun.com/javase/ja/6/docs/ja/api/java/net/NetworkInterface.html)
