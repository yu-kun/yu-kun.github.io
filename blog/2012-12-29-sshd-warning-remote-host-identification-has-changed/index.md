---
title: 'ssh: 解決法 - WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!'
date: 2012-12-29
authors: [yukun]
tags:
  - backtrack
  - linux
  - security
  - ssh
slug: sshd-warning-remote-host-identification-has-changed
---

sshでホストサーバに対してログインを試みた際、下記のWarningメッセージが出力されログインできない。

### 事象

実行環境はMac OS。

```
$ ssh root@172.16.56.135
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the RSA key sent by the remote host is
07:1a:62:b4:68:79:6e:53:dd:1e:ca:e1:28:89:7a:78.
Please contact your system administrator.
Add correct host key in /Users/yu/.ssh/known_hosts to get rid of this message.
Offending RSA key in /Users/yu/.ssh/known_hosts:5
RSA host key for 172.16.56.135 has changed and you have requested strict checking.
Host key verification failed.
$

```

### 原因

Warningメッセージに記載の通りで、「ホスト側の鍵が変わっている。誰か何か(盗聴とか)やってるかも」とのこと。今回はVMWare上のゲストOSのsshdを再構築・鍵の再作成した為、上述のWarningが発生。

### 対応

known\_hostsファイルの当該行を削除することで解決可能。上記のWarningだと.ssh/known\_hostsの5行目172.16.56.135のエントリが該当。

### 参考サイト

- [OpenSSH : WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!](http://futuremix.org/2007/08/openssh-warning)
