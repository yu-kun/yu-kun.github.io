---
title: 'Python: TCP/IPv4 Socket Server/Client (1 Client接続のみ)'
date: 2012-05-20
authors: [yukun]
tags:
  - network
  - python
  - socket
slug: python-socket-server-client
---

PythonでSocketサーバ、クライアントの接続方法を下記のソースコードを用いて確認。C言語のどう程度のサンプルと比較すると行数が少なく、書きやすい。これがThreadやノンブロッキング・多重化を用いた時にどの程度膨らむかは今後確認予定。

### ソースコード(for Python 2.7)

補足はソースコード中のコメントを参照。サンプルの為、サーバ・クライアントは同一マシン上での実行を想定。 **tsTcpServ.py** 

```python
# coding: utf-8
from socket import *
from time import ctime
HOST = gethostname()
PORT = 34567
BUFSIZE = 1024
ADDR = (gethostbyname(HOST), PORT)
USER = 'Server'
tcpSerSock = socket(AF_INET, SOCK_STREAM) # IPv4/TCPソケットとして作成
tcpSerSock.bind(ADDR) # アドレス、ポートのbinding
tcpSerSock.listen(5) # サーバソケットの最大接続要求の順番待ち数
while True:
	print 'Waiting for connection...'
	(tcpCliSock, addr) = tcpSerSock.accept() # 接続待受開始
	print '...connected from.' , addr
	while True:
		data = tcpCliSock.recv(BUFSIZE) # C->Sデータの受信
		if not data:
			break
		tcpCliSock.send('%s > [%s] %s' % (USER, ctime(), data)) # S->Cデータの送信
	tcpCliSock.close() # Clientソケットのclose
tcpSerSock.close() # Serverソケットのclose (到達不能コード)
```

 **tsTcpclnt.py** 

```python
# coding: utf-8
from socket import *
HOST = gethostname()
PORT = 34567
BUFSIZE = 1024
ADDR = (gethostbyname(HOST), PORT)
USER = 'Client'
tcpClntSock = socket(AF_INET, SOCK_STREAM)
tcpClntSock.connect(ADDR)
while True:
	data = raw_input('%s > ' % USER) # 標準入力からのデータ入力
	if not data:
		break
	tcpClntSock.send(data) # C->Sへデータ送信
	data = tcpClntSock.recv(BUFSIZE) # S->Cのデータ受信
	if not data:
		break
	print data
tcpClntSock.close()
```

 
<!-- truncate -->


### 実行結果

**tsTcpServ.py**

```
Waiting for connection...
...connected from. ('192.168.11.2', 52208)
Waiting for connection...
...connected from. ('192.168.11.2', 52211)
Waiting for connection...

```

**tsTcpClnt.py**

```
C:\pleiades\workspace\pyTest\src>python tsTcpClnt.py
Client > hello
Server > [Sat May 19 18:52:12 2012] hello
Client > good
Server > [Sat May 19 18:52:17 2012] good
Client > how about you
Server > [Sat May 19 18:52:30 2012] how about you
Client >
C:\pleiades\workspace\pyTest\src>python tsTcpClnt.py
Client > reconnect
Server > [Sat May 19 18:52:42 2012] reconnect
Client > end
Server > [Sat May 19 18:52:44 2012] end
Client >

```

### 参考サイト

- ソケットプログラミング HOWTO — Python 2.7ja1 documentation
