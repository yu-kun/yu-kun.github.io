---
title: 'IBM System i (AS400): 各OS ver毎のOpenSSHの設定ファイルパス'
date: 2015-06-13
authors: [yukun]
tags:
  - as400
  - ibm
  - ssh
  - system-i
slug: ibm-i-as400-openssh-config-path
---

IBM iのOSバージョンによってOpenSSHのconfigファイルの保管ディレクトリが異なるため、ここに(コピペし易いように) 纏めておく。下表で分かる通り、OSバージョン毎の差異はOpenSSHのバージョンとなる。(≒[5733-SC1 IBM portable utilities for i](https://www.ibm.com/support/knowledgecenter/ja/ssw_ibm_i_71/rzahg/rzahgopenssh.htm))


<!-- truncate -->


| OS Version | Config type | Path of configuration file |
| --- | --- | --- |
|   v5.3 / v5.4   | ssh\_config | /QOpenSys/QIBM/UserData/SC1/OpenSSH/openssh-3.5p1/etc/ssh\_config |
| sshd\_config | /QOpenSys/QIBM/UserData/SC1/OpenSSH/openssh-3.5p1/etc/sshd\_config |
|   v6.1   | ssh\_config | /QOpenSys/QIBM/UserData/SC1/OpenSSH/openssh-3.8.1p1/etc/ssh\_config |
| sshd\_config | /QOpenSys/QIBM/UserData/SC1/OpenSSH/openssh-3.8.1p1/etc/sshd\_config |
|   v7.1   | ssh\_config | /QOpenSys/QIBM/UserData/SC1/OpenSSH/openssh-4.7p1/etc/ssh\_config |
| sshd\_config | /QOpenSys/QIBM/UserData/SC1/OpenSSH/openssh-4.7p1/etc/sshd\_config |

### 参考サイト(公式ドキュメント)

- [IBM Redbooks | Securing Communications with OpenSSH on IBM i5/OS](http://www.redbooks.ibm.com/abstracts/redp4163.html)
- [RedPapers: Securing Communications with OpenSSH on IBM i5/OS (pdf)](http://www.redbooks.ibm.com/redpapers/pdfs/redp4163.pdf)
