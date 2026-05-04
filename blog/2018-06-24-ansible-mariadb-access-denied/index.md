---
title: 'Ansible: MariaDB エラー解決法 - 1045, Access denied for user ''root''@''localhost'' (using password: YES)'
date: 2018-06-24
authors: [yukun]
tags:
  - ansible
  - mariadb
slug: ansible-mariadb-access-denied
---

### 事象

Ansibleのmysql\_dbモジュールを用いてMariaDB (MySQL派生OSS)の環境構築(DB, User作成)をLinux (CentOS 7.x系)に実施したところ、下記のエラーが発生し、Ansible Playbookの実行が中断。

尚、MariaDBのVersionはVer 15.1 Distrib 10.2.15-MariaDB。


<!-- truncate -->


### エラーメッセージ


```bash
failed: [192.0.2.0] (item={u'name': u'wordpress'}) => 
{"changed": false, "item": {"name": "wordpress"}, 
"msg": "unable to find /root/.my.cnf. Exception message: 
(1045, \"Access denied for user 'root'@'localhost' (using password: NO)\")"}
	to retry, use: --limit @/Users/mac/server/vm-yukun/wordpress.retry
```


や、下記のエラーが出力。


```bash
failed: [192.0.2.0] (item={u'name': u'wordpress'}) => 
{"changed": false, "item": {"name": "wordpress"}, 
"msg": "unable to connect to database, check login_user and login_password are correct or /root/.my.cnf has the credentials. Exception message: 
(1045, \"Access denied for user 'root'@'localhost' (using password: YES)\")"}
	to retry, use: --limit @/Users/mac/server/vm-yukun/wordpress.retry
```


### 原因

MariaDBのroot password設定以降にroot権限を要するコマンド実行時にroot等必要な権限を持つユーザーのpasswordをAnsible→MariaDBに渡していない場合に、上記のエラーが発生する。

### 解決方法

Ansibleのmysql\_dbモジュールのlogin\_passwordパラメータにパスワード文字列を設定する。設定例は下記の通り。

```
# 前提：MariaDBのroot password設定済み
- name: create MariaDB database
  mysql_db:
    name: "{{ item.name }}"
    encoding: "{{ item.encoding|default('utf8mb4') }}"
    # 照合順序(コレ−ション)
    collation: "{{ item.collation|default('utf8mb4_general_ci') }}"
    login_password: "{{ mariadb_root_password }}"
    state: present
  # wordpress.yml で定義されたvars名
  with_items: "{{ mariadb_databases }}"
```

### 参考サイト

[mysql\_db - Add or remove MySQL databases from a remote host. — Ansible Documentation](https://docs.ansible.com/ansible/latest/modules/mysql_db_module.html)
