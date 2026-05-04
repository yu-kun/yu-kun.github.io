---
title: 'Python: UDP/IPv4 Socket Server/Client (1 Client接続のみ)'
date: 2012-05-21
authors: [yukun]
tags:
  - network
  - python
  - server
  - socket
slug: python-udp-socket-server-client
---

先日はTCPでのデータ送受だったので、今回はUDPプロトコルを用いた確認をする。

### ソースコード(for Python 2.7)

補足はソースコード中のコメントを参照。サンプルの為、サーバ・クライアントは同一マシン上での実行を想定。 **tsUdpServ.py** 

```python
# coding: utf-8
from socket import *
from time import ctime
HOST = gethostname()
PORT = 34512
BUFSIZE = 1024
ADDR = (gethostbyname(HOST), PORT)
USER = 'Server'
udpServSock = socket(AF_INET, SOCK_DGRAM) # IPv4/UDPでソケット作成
udpServSock.bind(ADDR) # HOST, PORTでbinding
while True:
	print 'Waiting for message...'
	data, addr = udpServSock.recvfrom(BUFSIZE) # データ受信
	print '...received from and returned to:', addr
	udpServSock.sendto('%s > [%s] %s' % (USER, ctime(), data), addr) # データ送信
udpServSock.close()
```

 TCPと大きく変わるところは、ソケットの作成時にソケットファミリーをSOCK\_DGRAMとすること。また、listen()とaccept()メソッドが不要となったところあたりかな。 **tsUdpClnt.py** 

```python
# coding: utf-8
from socket import *
HOST = gethostname()
PORT = 34512
BUFSIZE = 1024
ADDR = (gethostbyname(HOST), PORT)
USER = 'Client'
udpClntSock = socket(AF_INET, SOCK_DGRAM)
while True:
	data = raw_input('%s > ' % USER) # 標準入力からのデータ入力
	if not data:
		break
	udpClntSock.sendto(data, ADDR) # データ送信
	data, ADDR = udpClntSock.recvfrom(BUFSIZE) # データ受信
	if not data:
		break
	print data # データ出力
udpClntSock.close()
```

 
<!-- truncate -->


### 実行結果

Windows7 64bit上でスクリプトを実行。 **tsUdpServ.py**

```
Waiting for message...
...received from and returned to: ('192.168.11.2', 58173)
Waiting for message...
...received from and returned to: ('192.168.11.2', 58173)
Waiting for message...

```

**tsUdpClnt.py**

```
C:\pleiades\workspace\pyTest\src>python tsUdpClnt.py
Client > hello
Server > [Sun May 20 12:12:14 2012] hello
Client > world with python network
Server > [Sun May 20 12:12:39 2012] world with python network
Client >

```

### 参考サイト

- [17.2. socket — Low-level networking interface — Python v2.7.3 documentation](http://docs.python.org/2/library/socket.html)
