---
title: 'java.io.StreamCorruptedExceptionが発生した原因とその解決策の一例'
date: 2008-09-04
authors: [yukun]
tags:
  - exception
  - java
  - multithread
  - network
slug: cause-java-io-stream-corrupted-exception
---

以前というか[この頃](/blog/out-of-memory-error "java.lang.OutOfMemoryErrorが発生する原因とその解決法の一例 - Yukun's Blog")Javaで簡単な分散処理サーバ・クライアントシステムのモデルを実装中にこのjava.io.StreamCorruptedExceptionという例外が発生。

## StreamCorruptedExceptionの発生原因

結論から言えば、恐らく実行中のスレッドの数がマシンスペックに対して多すぎたのではないかと推定（推定どまり）。 サーバが複数のクライアントを受け付けるので、クライアントのソケット接続（accept時）毎にスレッドを生成する方法を採った。この時はブロッキング型のモデル（この頃ノンブロッキング型は知らなかった）。 例外の発生状況はサーバプログラムをテスト動作時、絶えず約1000クライアントからのリクエストを受け付け、かつレスポンス等を行った場合。なお送受信データはシリアライズされたオブジェクトで、サイズは平均5KB。その時テストマシンで走らせたスレッド数が約5000。 シリアライズの復元の問題かと考えたが、送受信するオブジェクトのクラスとそのserialVersionUIDは揃えており、500クライアント位ではこれといった異常なく動作していた。 実際にある時間のクライアントの送信データ数とサーバの受信データ数を確認してみたら、両数値の差が生じていて、約200リクエストがソケット部分で溜まったところでダウンしました。 スレッド数が多いと、その分スレッドの切り替えが頻発したり、待たされるスレッドが出てくる。その為、ソケットの部分で受信データが許容量以上に溜まって、I/Oのどこかがオバーフローか変になった可能性もある。

### 例外発生時のスタックトレースの一部抜粋

```
java.io.StreamCorruptedException: unexpected reset; recursion depth: 1
	at java.io.ObjectInputStream.handleReset(Unknown Source)
	at java.io.ObjectInputStream.readObject0(Unknown Source)
	at java.io.ObjectInputStream.skipCustomData(Unknown Source)
	at java.io.ObjectInputStream.readNonProxyDesc(Unknown Source)
	at java.io.ObjectInputStream.readClassDesc(Unknown Source)
	at java.io.ObjectInputStream.readOrdinaryObject(Unknown Source)
	at java.io.ObjectInputStream.readObject0(Unknown Source)
	at java.io.ObjectInputStream.readObject(Unknown Source)

```

また、これ以外にOptionalDataExceptionという例外も併発しましたが、これも同じ原因かと推定。

```
java.io.OptionalDataException
	at java.io.ObjectInputStream.readObject0(Unknown Source)
	at java.io.ObjectInputStream.readObject(Unknown Source)

```

## 試した解決策

### スレッド数を抑える

これは解決策とは言えないが、マシンスペック(CPU\[コア\]数やクロックなど)に対してスレッド数が多すぎるのが問題だと推定したので、ある程度スレッド数を抑えて運用したところ例外は発生しなくなった。

### もう一度接続しなおす

例外をtry-catchブロックでキャッチできるので、それに合わせて接続しなおしてリクエストorレスポンスを再送することで一時対処した。

### ノンブロッキング型にする

nio（New I/O）ライブラリが用意されているので、それを用いたノンブロッキング型の機構にして、スレッドプールを用意することでスレッド数やコンテキストスイッチ、オーバヘッドをある程度抑えることが可能と考えるが、まだ未検証。 どちらにせよ、根本原因の究明にはkernel dump等の情報を取って解析していく必要がある。。。
