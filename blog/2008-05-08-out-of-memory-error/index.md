---
title: 'java.lang.OutOfMemoryErrorが発生する原因とその解決法の一例'
date: 2008-05-08
authors: [yukun]
tags:
  - exception
  - java
  - network
slug: out-of-memory-error
---

JVMがGCを行えるように、開放するインスタンスへの参照を切っていたのだけれど、なぜか例外が投げられ続けていました。色々調べてみたら、java.io.ObjectOutputStream#writeObject(Object obj)の部分で、書き出されたobjの状態が保持され続けるので、いつまでたってもGCが始まらなかったのが原因でした。 解決法は、java.io.ObjectOutputStream#reset()メソッドでストリームが保持している状態を無効にすることで、不要インスタンスをGCの対象に入れることでした。
