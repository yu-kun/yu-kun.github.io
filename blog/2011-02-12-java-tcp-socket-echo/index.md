---
title: 'Java: TCP Socket Echo Server/Client サンプル'
date: 2011-02-12
authors: [yukun]
tags:
  - java
  - network
  - socket
slug: java-tcp-socket-echo
---

以下の2つのサンプルコードはローカルでTCP Socketを用いたEchoサーバ/クライアントを走らせるもの。Javaのネットワークプログラミングで基本となるクラスとメソッドの使いどころを確認しておきたくて作成。まぁ今はnioがデファクトですけど。

### サーバ


```java
package tcpechoserver;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.SocketAddress;
public class Main {
    private static final int BUFSIZE = 32; // 受信バッファサイズ
    public static void main(String[] args) throws IOException {
	    int servPort = 5000;
		// サーバソケットの作成
	    ServerSocket servSock = new ServerSocket(servPort);
		int recvMsgSize; // 受信メッセージサイズ
		byte[] receiveBuf = new byte[BUFSIZE]; // 受信バッファ
		// クライアントからの接続を待ち受けるループ
		while (true) {
			Socket clntSock = servSock.accept(); // クライアントの接続を取得
			SocketAddress clientAddress = clntSock.getRemoteSocketAddress();
			System.out.println("接続中：" + clientAddress);
			InputStream in = clntSock.getInputStream();
			OutputStream out = clntSock.getOutputStream();
			while ((recvMsgSize = in.read(receiveBuf)) != -1) {
				out.write(receiveBuf, 0, recvMsgSize);
			}
			clntSock.close();
		}
		// 到達不能コード
	}
}
```

 
<!-- truncate -->


### クライアント


```java
package tcpechoclient;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;
import java.net.SocketException;
public class Main {
    public static void main(String[] args) throws IOException {
		String server = "localhost";
		int servPort = 5000;
		byte[] data = "Hello, Net world".getBytes();
		byte[] msg = new byte[data.length];
		Socket socket = new Socket(server, servPort);
		System.out.println("サーバとの接続を確立。");
		InputStream in = socket.getInputStream();
		OutputStream out = socket.getOutputStream();
		out.write(data); // サーバに文字列を送付
		System.out.println("送信：" + new String(data));
		// サーバからの返信を受信
		int totalBytesRcvd = 0;
		int bytesRcvd;
		while (totalBytesRcvd < data.length) { // 全文を受信するまでloop
			if ((bytesRcvd = in.read( // 引数は読込データ、Offset、読込データ長
					msg,
					totalBytesRcvd,
					data.length - totalBytesRcvd)) == -1) {
				throw new SocketException("接続遮断");
			}
			totalBytesRcvd += bytesRcvd;
		} // while end
		System.out.println("受信：" + new String(msg));
		socket.close();
	}
}
```

 尚、java.io.InputStream#read(byte b\[\], int off, int len)の仕様は下記の通り。 (忘れてたので備忘録としてメソッドのコメントより抜粋)

> \* @param b the buffer into which the data is read. \* @param off the start offset in array `b` \* at which the data is written. \* @param len the maximum number of bytes to read. \* @return the total number of bytes read into the buffer, or \* `-1` if there is no more data because the end of \* the stream has been reached.

使い方はサーバ→クライアントの順で起動する。

### 実行結果

#### サーバ側

```
接続中：/127.0.0.1:53562

```

#### クライアント側

```
サーバとの接続を確立。
送信：Hello, Net world
受信：Hello, Net world

```

### リファレンス

1. [クラス Socket](http://java.sun.com/javase/ja/6/docs/ja/api/java/net/Socket.html)
2. [クラス ServerSocket](http://java.sun.com/javase/ja/6/docs/ja/api/java/net/ServerSocket.html)
