---
title: 'Ansible: "SSH Error: data could not be sent to remote host"の解決法'
date: 2019-02-01
authors: [yukun]
tags:
  - ansible
  - linux
  - ssh
slug: ansible-ssh-error
---

### 事象

```
TASK [Gathering Facts] *************************************************************************************************
fatal: [192.0.2.203]: UNREACHABLE! => {"changed": false, "msg": 
"SSH Error: data could not be sent to remote host \"192.0.2.203\". 
Make sure this host can be reached over ssh", "unreachable": true}
fatal: [192.0.2.201]: UNREACHABLE! => {"changed": false, "msg": 
"SSH Error: data could not be sent to remote host \"192.0.2.201\". 
Make sure this host can be reached over ssh", "unreachable": true}

```


<!-- truncate -->


### 解決法

以下の2通りあるが、特別な背景事由が無いのであればNo.2を推奨。セキュリティチェックを自ら無効化するのは勧められない。尚、通常のsshコマンドでは[リンク](/blog/sshd-warning-remote-host-identification-has-changed)の事象として発生する。

1. ./ansible.cfg上で下記の宣言をする。
    
    ```
    [defaults]
    host_key_checking = False
    
    ```
    
    公式ドキュメント：[Getting Started — Ansible Documentation](https://docs.ansible.com/ansible/latest/user_guide/intro_getting_started.html#host-key-checking)
2. ~/.ssh/known\_hostsに残っている古いhost keyを削除

### 原因

known\_hostsの鍵とサーバのhost keyが異なる為。 尚、コマンド実行時にvオプションを付与することで詳細ログを出力可能。今回のケースはログを取り忘れており、以下の実行結果は別件の例。

```
$ ansible-playbook -i hosts wordpress.yml --tags="common" -vvvv
ansible-playbook 2.4.3.0
  config file = /Users/xxx/server/vm-yukun/ansible.cfg
  configured module search path = [u'/Users/xxx/.ansible/plugins/modules', u'/usr/share/ansible/plugins/modules']
  ansible python module location = /usr/local/Cellar/ansible/2.4.3.0/libexec/lib/python2.7/site-packages/ansible
  executable location = /usr/local/bin/ansible-playbook
  python version = 2.7.10 (default, Jul 15 2017, 17:16:57) [GCC 4.2.1 Compatible Apple LLVM 9.0.0 (clang-900.0.31)]
Using /Users/xxx/server/vm-yukun/ansible.cfg as config file
setting up inventory plugins
Parsed /Users/xxx/server/vm-yukun/hosts inventory source with ini plugin
Loading callback plugin default of type stdout, v2.0 from /usr/local/Cellar/ansible/2.4.3.0/libexec/lib/python2.7/site-packages/ansible/plugins/callback/default.pyc

PLAYBOOK: wordpress.yml **********************************************************************************
1 plays in wordpress.yml

PLAY [CentOS 7上にWordPressをセットアップ] ************************************************************************

TASK [Gathering Facts] ***********************************************************************************
Using module file /usr/local/Cellar/ansible/2.4.3.0/libexec/lib/python2.7/site-packages/ansible/modules/system/setup.py
 ESTABLISH SSH CONNECTION FOR USER: yu
 SSH: EXEC ssh -vvv -C -o ControlMaster=auto -o ControlPersist=60s -o StrictHostKeyChecking=no -o 
Port=22 -o 'IdentityFile="/Users/xxx/.ssh/id_rsa"' -o KbdInteractiveAuthentication=no -o PreferredAuthentications=gssapi-with-mic,gssapi-keyex,hostbased,publickey -o 
PasswordAuthentication=no -o User=yu -o ConnectTimeout=10 -o ControlPath=/Users/xxx/.ansible/cp/73642f0d52 
ansible_host=192.0.2.203 '/bin/sh -c '"'"'sudo -H -S -n -u root /bin/sh -c '"'"'"'"'"'"'"'"'echo BECOME-SUCCESS-cqlwswpjxrgvpddtlyapoxpihkemqlab; 
/usr/bin/python'"'"'"'"'"'"'"'"' && sleep 0'"'"''
fatal: [ansible_host=192.0.2.203]: UNREACHABLE! => {
    "changed": false,
    "msg": "SSH Error: data could not be sent to remote host \"ansible_host=192.0.2.203\". Make sure this host can be reached over ssh",
    "unreachable": true
}
	to retry, use: --limit @/Users/yu/server/vm-yukun/wordpress.retry

PLAY RECAP ***********************************************************************************************
ansible_host=192.0.2.203 : ok=0    changed=0    unreachable=1    failed=0
$

```

因みに上記のエラーはhostsファイル中のansible\_host=192.0.2.203における、"ansible\_host="が不要だった。
