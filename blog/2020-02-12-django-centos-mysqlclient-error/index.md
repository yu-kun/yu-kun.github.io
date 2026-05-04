---
title: 'Django: CentOS上でのmysqlclientインストールエラーの解決法'
date: 2020-02-12
authors: [yukun]
tags:
  - centos
  - django
  - mariadb
  - mysql
  - python
slug: django-centos-mysqlclient-error
---

[開発環境(Mac)ではインストールできたmysqlclient](/blog/python-pip-install-mysqlclient-catalina)だが、いざ本番のCentOSサーバへDjangoアプリをデプロイの上、pip install -r requirements.txt でライブラリのインストールを試みたところ、依存ライブラリ・パッケージが不足しており下記のエラーが発生。インストール異常終了した為、解決法を後述に記載する。


<!-- truncate -->


### エラー事象 (例1)


```bash
ERROR: Command errored out with exit status 1:
 command: /usr/bin/python3.6 -c 'import sys, setuptools, tokenize; sys.argv[0] = '"'"'/tmp/pip-install-q0i5354t/mysqlclient/setup.py'"'"'; __file__='"'"'/tmp/pip-install-q0i5354t/mysqlclient/setup.py'"'"';f=getattr(tokenize, '"'"'open'"'"', open)(__file__);code=f.read().replace('"'"'\r\n'"'"', '"'"'\n'"'"');f.close();exec(compile(code, __file__, '"'"'exec'"'"'))' egg_info --egg-base /tmp/pip-install-q0i5354t/mysqlclient/pip-egg-info
     cwd: /tmp/pip-install-q0i5354t/mysqlclient/
Complete output (12 lines):
/bin/sh: mysql_config: command not found
/bin/sh: mariadb_config: command not found
/bin/sh: mysql_config: command not found
Traceback (most recent call last):
  File "<string>", line 1, in <module>
  File "/tmp/pip-install-q0i5354t/mysqlclient/setup.py", line 16, in <module>
    metadata, options = get_config()
  File "/tmp/pip-install-q0i5354t/mysqlclient/setup_posix.py", line 61, in get_config
    libs = mysql_config("libs")
  File "/tmp/pip-install-q0i5354t/mysqlclient/setup_posix.py", line 29, in mysql_config
    raise EnvironmentError("%s not found" % (_mysql_config_path,))
OSError: mysql_config not found
----------------------------------------
ERROR: Command errored out with exit status 1: python setup.py egg_info Check the logs for full command output.
```


### エラー事象 (例2)


```bash
Installing collected packages: asgiref, asn1crypto, base58, certifi, pycparser, cffi, chardet, six, cryptography, defusedxml, sqlparse, pytz, Django, python3-openid, idna, urllib3, requests, oauthlib, requests-oauthlib, django-allauth, django-cleanup, django-environ, django-filter, djangorestframework, djangorestframework-filters, ecdsa, gunicorn, mysqlclient, pyparsing, packaging, pip-review
     Running setup.py install for pycparser … done
     Running setup.py install for django-allauth … done
     Running setup.py install for mysqlclient … error
     ERROR: Command errored out with exit status 1:
      command: /srv/cq4/venv/bin/python3.6 -u -c 'import sys, setuptools, tokenize; sys.argv[0] = '"'"'/tmp/pip-install-1a2tgg59/mysqlclient/setup.py'"'"'; file='"'"'/tmp/pip-install-1a2tgg59/mysqlclient/setup.py'"'"';f=getattr(tokenize, '"'"'open'"'"', open)(file);code=f.read().replace('"'"'\r\n'"'"', '"'"'\n'"'"');f.close();exec(compile(code, file, '"'"'exec'"'"'))' install --record /tmp/pip-record-ijt7h4i7/install-record.txt --single-version-externally-managed --compile --install-headers /srv/cq4/venv/include/site/python3.6/mysqlclient
          cwd: /tmp/pip-install-1a2tgg59/mysqlclient/
     Complete output (30 lines):
     running install
     running build
     running build_py
     creating build
     creating build/lib.linux-x86_64-3.6
     creating build/lib.linux-x86_64-3.6/MySQLdb
     copying MySQLdb/init.py -&gt; build/lib.linux-x86_64-3.6/MySQLdb
     copying MySQLdb/exceptions.py -&gt; build/lib.linux-x86_64-3.6/MySQLdb     copying MySQLdb/compat.py -&gt; build/lib.linux-x86_64-3.6/MySQLdb     copying MySQLdb/connections.py -&gt; build/lib.linux-x86_64-3.6/MySQLdb     copying MySQLdb/converters.py -&gt; build/lib.linux-x86_64-3.6/MySQLdb     copying MySQLdb/cursors.py -&gt; build/lib.linux-x86_64-3.6/MySQLdb     copying MySQLdb/release.py -&gt; build/lib.linux-x86_64-3.6/MySQLdb     copying MySQLdb/times.py -&gt; build/lib.linux-x86_64-3.6/MySQLdb     creating build/lib.linux-x86_64-3.6/MySQLdb/constants     copying MySQLdb/constants/init.py -&gt; build/lib.linux-x86_64-3.6/MySQLdb/constants     copying MySQLdb/constants/CLIENT.py -&gt; build/lib.linux-x86_64-3.6/MySQLdb/constants     copying MySQLdb/constants/CR.py -&gt; build/lib.linux-x86_64-3.6/MySQLdb/constants     copying MySQLdb/constants/ER.py -&gt; build/lib.linux-x86_64-3.6/MySQLdb/constants     copying MySQLdb/constants/FIELD_TYPE.py -&gt; build/lib.linux-x86_64-3.6/MySQLdb/constants     copying MySQLdb/constants/FLAG.py -&gt; build/lib.linux-x86_64-3.6/MySQLdb/constants     running build_ext     building 'MySQLdb._mysql' extension     creating build/temp.linux-x86_64-3.6     creating build/temp.linux-x86_64-3.6/MySQLdb     gcc -pthread -Wno-unused-result -Wsign-compare -DDYNAMIC_ANNOTATIONS_ENABLED=1 -DNDEBUG -O2 -g -pipe -Wall -Wp,-D_FORTIFY_SOURCE=2 -fexceptions -fstack-protector-strong --param=ssp-buffer-size=4 -grecord-gcc-switches -m64 -mtune=generic -D_GNU_SOURCE -fPIC -fwrapv -fPIC -Dversion_info=(1,4,6,'final',0) -D__version_=1.4.6 -I/usr/include/mysql -I/usr/include/mysql/mysql -I/srv/cq4/venv/include -I/usr/include/python3.6m -c MySQLdb/_mysql.c -o build/temp.linux-x86_64-3.6/MySQLdb/_mysql.o
     gcc -pthread -shared -Wl,-z,relro build/temp.linux-x86_64-3.6/MySQLdb/_mysql.o -L/usr/lib64/ -L/usr/lib64 -lmariadb -lpython3.6m -o build/lib.linux-x86_64-3.6/MySQLdb/_mysql.cpython-36m-x86_64-linux-gnu.so
     /usr/bin/ld: cannot find -lmariadb
     collect2: error: ld returned 1 exit status
     error: command 'gcc' failed with exit status 1
     ----------------------------------------
 ERROR: Command errored out with exit status 1: /srv/cq4/venv/bin/python3.6 -u -c 'import sys, setuptools, tokenize; sys.argv[0] = '"'"'/tmp/pip-install-1a2tgg59/mysqlclient/setup.py'"'"'; file='"'"'/tmp/pip-install-1a2tgg59/mysqlclient/setup.py'"'"';f=getattr(tokenize, '"'"'open'"'"', open)(file);code=f.read().replace('"'"'\r\n'"'"', '"'"'\n'"'"');f.close();exec(compile(code, file, '"'"'exec'"'"'))' install --record /tmp/pip-record-ijt7h4i7/install-record.txt --single-version-externally-managed --compile --install-headers /srv/cq4/venv/include/site/python3.6/mysqlclient Check the logs for full command output.
```


### 発生環境

CentOS 7.7.1908, Python 3.6.8, pip 20.0.2

### 解決方法

下記のパッケージをインストール後に改めてpipを実行することで解消。


```bash
yum install epel-release
yum install python-devel mysql-community-devel
yum install --enablerepo=epel,  python36 python36-devel
curl -sS https://downloads.mariadb.com/MariaDB/mariadb_repo_setup | bash
yum install gcc MariaDB-server MariaDB-devel MariaDB-shared openssl-devel zlib-devel libssl-dev
```


もし既にIUSリポジトリのPython36uパッケージがインストールされている場合は以下の操作でパッケージを削除後に上記のコマンドを打鍵する。


```bash
yum remove Python36u
rm -fr /usr/lib/python3.6
vim /etc/yum.repos.d/ius.repo →　enabled=0へ変更
```


今回の発生環境ではIUSリポジトリのPythonでは何故か上手く行かず、EPELリポジトリのPython36パッケージはエラーなく処理が推移。
