---
title: 'Ansible: エラー解決法 - No package matching ''certbot'' found available, installed or updated'
date: 2019-02-04
authors: [yukun]
tags:
  - ansible
  - linux
  - tls
slug: ansible-certbot-error
---

Mac上のAnsibleスクリプト用いてリモート上のLinux(CentOS)へ[certbot](https://certbot.eff.org/)(※)のインストールを試みたところ、下記のエラーメッセージを出力し処理が異常終了した。 ※[Let's Encrypt](https://letsencrypt.org/)認証局用のTLS/SSL証明書の入手・更新クライアント。


<!-- truncate -->


### 事象

```
$ ansible-playbook -i hosts xxx.yml

PLAY [set up xxx on CentOS 7] ****************************************************************************************
＜中略＞
TASK [common : install Certbot] ******************************************************************************************
fatal: [192.0.2.10]: FAILED! => {"changed": false, "msg": "No package matching 'certbot' found available, installed or updated", 
"rc": 126, "results": ["No package matching 'certbot' found available, installed or updated"]}
	to retry, use: --limit @/Users/xxx/server/coin/xxx.retry

PLAY RECAP ***************************************************************************************************************
192.0.2.10               : ok=3    changed=2    unreachable=0    failed=1

```

### 原因

何のことは無く、Extra Packages for Enterprise Linux ([EPEL](https://fedoraproject.org/wiki/EPEL#How_can_I_use_these_extra_packages.3F))が未インストールだった為。

### 解決法

AnsibleからEPELをインストールする場合は、certbotのインストールの前に、下記をymlへ追記する。

```
- name: install EPEL (Extra Packages for Enterprise Linux)
  yum:
    name: "{{ item }}"
  with_items:
    - epel-release

```

補足：上記ではepelのみyumに指定しているが、with\_itemsブロック以降は先頭に-"ハイフン"を付ければ複数のパッケージを指定可能。
