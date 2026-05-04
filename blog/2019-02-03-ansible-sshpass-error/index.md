---
title: 'Ansible: エラー解決法 - to use the ''ssh'' connection type with passwords, you must install the sshpass program'
date: 2019-02-03
authors: [yukun]
tags:
  - ansible
  - ssh
slug: ansible-sshpass-error
---

Mac上のAnsibleスクリプト用いてリモートにあるLinux(CentOS)へ環境構築を試みたところ、下記のエラーが発生し、sshセッションの確立が不可。


<!-- truncate -->


### 事象

```
$ ansible-playbook -i hosts xxx.yml

PLAY [set up xxx on CentOS 7] *******************************************************************

TASK [Gathering Facts] ******************************************************************************
fatal: [192.0.2.202]: FAILED! => {"msg": "to use the 'ssh' connection type with passwords, you must install the sshpass program"}
	to retry, use: --limit @/Users/yu/server/xxx/xxx.retry

PLAY RECAP ******************************************************************************************
192.0.2.202              : ok=0    changed=0    unreachable=0    failed=1

$

```

### 原因

sshpassプログラムがインストールされていない為。

### 対応

下記の通りbrewコマンドでインストールする。

```
$ brew install http://git.io/sshpass.rb
Updating Homebrew...
==> Auto-updated Homebrew!
Updated 2 taps (homebrew/core and homebrew/cask).
==> New Formulae
postgresql@10
==> Updated Formulae
＜中略＞
==> Deleted Formulae
apple-gcc42

######################################################################## 100.0%
==> Downloading http://sourceforge.net/projects/sshpass/files/sshpass/1.05/sshpass-1.05.tar.gz
==> Downloading from https://jaist.dl.sourceforge.net/project/sshpass/sshpass/1.05/sshpass-1.05.tar.g
######################################################################## 100.0%
==> ./configure --prefix=/usr/local/Cellar/sshpass/1.05
==> make install
🍺  /usr/local/Cellar/sshpass/1.05: 9 files, 40.7KB, built in 30 seconds
$

```
