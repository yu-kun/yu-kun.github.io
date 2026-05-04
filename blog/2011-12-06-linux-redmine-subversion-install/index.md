---
title: 'Linux: RedmineとSubversionのインストール・設定例'
date: 2011-12-06
authors: [yukun]
tags:
  - apache
  - linux
  - redmine
  - ruby
  - setting
  - subversion
slug: linux-redmine-subversion-install
---

Linux(ここではCentOS)にプロジェクト管理ソフトウェアであるRedmine 1.2.2とバージョン管理システムであるSubversionのインストール方法と設定例を以下に紹介。想定としては、WebサーバやDB以外は何も設定されていないサーバ環境を対象とした手順。すでにインストールしているものや設定済みのものは適時読み飛ばし下さい。 ※参考サイトは記事の末尾をご参照。 
<!-- truncate -->


### 1\. 開発環境のインストール

RubyやPassengerのインストールに必要なコンパイラをインストールする。

```
# yum groupinstall "Development Tools"
# yum install openssl-devel readline-devel zlib-devel curl-devel

```

### 2\. Rubyのインストール

Redmineを動作させる上でパフォーマンスの良いruby-enterpriseを以下のサイトよりダウンロード。 [Ruby Enterprise Edition](http://www.rubyenterpriseedition.com/download.html)

```
# tar xzvf ruby-enterprise-1.8.7-2011.03.tar.gz
# ruby-enterprise-1.8.7-2011.03/installer --dont-install-useful-gems --no-dev-docs
# ruby -v
ruby 1.8.7 (2011-02-18 patchlevel 334) [x86_64-linux], MBARI 0x6770, Ruby Enterprise Edition 2011.03

```

### 3\. rubygemsのインストール

下記のサイトよりダウンロードする。 [RubyGems.org | your community gem host](https://rubygems.org/)

```
# tar zxvf rubygems-1.5.2.tgz
# cd rubygems-1.5.2
# ruby setup.rb config
# ruby setup.rb setup
# ruby setup.rb install

```

### 4\. gemで必要コンポーネントのインストール

```
# gem install rack -v=1.1.1 --no-rdoc --no-ri
# gem install rake -v=0.8.7 --no-rdoc --no-ri
# gem install i18n -v=0.4.2 --no-rdoc --no-ri
# gem install mysql -- --with-mysql-lib=/usr/lib/mysql --no-rdoc --no-ri

```

仮に以下のエラーが発生した場合。。。

```
Fetching: mysql-2.8.1.gem (100%)
Building native extensions.  This could take a while...
ERROR:  Error installing mysql:
        ERROR: Failed to build gem native extension.
        /usr/local/bin/ruby extconf.rb
checking for mysql_ssl_set()... no
checking for rb_str_set_len()... no
checking for rb_thread_start_timer()... no
checking for mysql.h... no
checking for mysql/mysql.h... no
*** extconf.rb failed ***
Could not create Makefile due to some reason, probably lack of
necessary libraries and/or headers.  Check the mkmf.log file for more
details.  You may need configuration options.

```

パッケージのインストール不足の為、yumでmysql-server mysql-develを依存含めてインストールする。 MySQLのインストールリポジトリをremiやeplpとしている場合はbaseと競合しないように以下のように設定する。

```
# vi /etc/yum.repos.d/CentOS-Base.repo
[base]
priority=1
name=CentOS-$releasever - Base
mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=os
#baseurl=http://mirror.centos.org/centos/$releasever/os/$basearch/
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-5
exclude=mysql*　←mysqlで始まるものは除外(複数指定したいときはカンマ「,」で区切る)
# yum --enablerepo=remi,eplp install mysql-server mysql-devel

```

その上で、再度以下のコマンドを実行する。

```
# gem install mysql -- --with-mysql-lib=/usr/lib/mysql --no-rdoc --no-ri

```

### 5\. Webサーバ(Apache)のインストール

とは言いつつも、ここは既にインストール＆設定されている前提で進める。

```
# yum install httpd httpd-devel

```

### 6\. MySQLのDB作成・設定

MySQLも基本的な文字コードなどのmy.cnf設定は済んでいる前提で進める。

```
# mysql -u root -p
mysql> show variables like 'character_set%';　←為念の確認
+--------------------------+----------------------------+
| Variable_name            | Value                      |
+--------------------------+----------------------------+
| character_set_client     | utf8                       |
| character_set_connection | utf8                       |
| character_set_database   | utf8                       |
| character_set_filesystem | binary                     |
| character_set_results    | utf8                       |
| character_set_server     | utf8                       |
| character_set_system     | utf8                       |
| character_sets_dir       | /usr/share/mysql/charsets/ |
+--------------------------+----------------------------+
mysql> create database ＜DB名＞ default character set utf8;
mysql> grant all on ＜DB名＞.* to ＜DBユーザー名＞ identified by '＜DBパスワード＞';
mysql> flush privileges;
mysql> exit;

```

### 7\. Redmineのインストール

以下のサイトからRedmineをダウンロードする。 [Redmine.JP — Redmine日本語情報サイト](http://redmine.jp/)

```
# tar xzvf redmine-1.2.2.tar.gz
# mv redmine-1.2.2 /var/lib/redmine
# cd /var/lib/redmine
# vi config/database.yml
production:
  adapter: mysql
  database: ＜DB名＞
  host: localhost
  username: ＜DBユーザー名＞
  password: ＜DBパスワード＞
  encoding: utf8
# cp config/configuration.yml.example config/configuration.yml
# vi config/configuration.yml
production:
  email_delivery:
    delivery_method: :smtp
    smtp_settings:
      address: "localhost"
      port: 25
      domain: 'example.com'

```

DBやメールの設定をファイルに書き込んだ後は、セッションキーの作成および、DBテーブルの作成・初期化を以下のコマンドで実施する。

```
# rake generate_session_store
# rake db:migrate RAILS_ENV=production

```

### 8\. Passengerをインストール

Apache上でrailsを使用する為にPassengerをインストール・設定する。

```
# gem install passenger --no-rdoc --no-ri
# passenger-install-apache2-module

```

コマンド実行後最後に出力される下記のパスをメモ帳などに控えておく。 (LoadModule passenger\_module、PassengerRoot、PassengerRuby )

> Please edit your Apache configuration file, and add these lines: LoadModule passenger\_module /usr/local/lib/ruby/gems/1.8/gems/passenger-3.0.9/ext/apache2/mod\_passenger.so PassengerRoot /usr/local/lib/ruby/gems/1.8/gems/passenger-3.0.9 PassengerRuby /usr/local/bin/ruby After you restart Apache, you are ready to deploy any number of Ruby on Rails applications on Apache, without any further Ruby on Rails-specific configuration!

### 9\. Apacheの設定(サブディレクトリ配置の場合)

例としてwww.example.comドメインの配下www.example.com/redmine\_top/がredmineのトップページとする設定例を紹介する。

```
# vi /etc/httpd/conf.d/passenger.conf ←Passenger用の設定ファイルを作成
#（上述で表示されたパスを記述する）
LoadModule passenger_module /usr/local/lib/ruby/gems/1.8/gems/passenger-3.0.9/ext/apache2/mod_passenger.so
PassengerRoot /usr/local/lib/ruby/gems/1.8/gems/passenger-3.0.9
PassengerRuby /usr/local/bin/ruby
RailsBaseURI /redmine_top
Header always unset "X-Powered-By"
Header always unset "X-Rack-Cache"
Header always unset "X-Content-Digest"
Header always unset "X-Runtime"
PassengerMaxPoolSize 20
PassengerMaxInstancesPerApp 4
PassengerPoolIdleTime 3600
PassengerUseGlobalQueue on
PassengerHighPerformance on
PassengerStatThrottleRate 10
RailsSpawnMethod smart
RailsAppSpawnerIdleTime 86400
RailsFrameworkSpawnerIdleTime 0

```

最後に権限・パス設定後、それらを反映する。

```
# chown -R apache:apache /var/lib/redmine
# ln -s /var/lib/redmine/public /var/www/html/redmine_top
# /etc/init.d/httpd configtest
# /etc/init.d/httpd graceful

```

### 10\. Redmineへアクセス

www.example.com/redmine\_top/にアクセスするとredmineのトップページが表示されればOK。まずはユーザー名、パスワードをadmin, adminで入りユーザ名、パスワードを任意の文字列に変更の上、各種設定を確認していく。

### 11\. Subversionのインストールとリポジトリの作成

先ずは、インストールとリポジトリの作成を実施。

```
# yum install subversion
# mkdir /var/lib/svn
# svnadmin create /var/lib/svn/＜リポジトリ名＞
# chown -R apache:apache /var/lib/svn/＜リポジトリ名＞

```

続いてWeb経由でリポジトリにアクセスかつBasic認証機能で閲覧者を制限するには、

```
# yum install mod_dav_svn
# touch /etc/httpd/conf/svn_auth_file
# htpasswd /etc/httpd/conf/svn_auth_file ＜任意のユーザー名＞
New password: ＜タイプ＞
Re-type new password: ＜もう一度タイプ＞
Adding password for user ＜任意のユーザー名＞

```

```
# vi /etc/httpd/conf/httpd.conf

```

↓下記の設定をファイル末尾に追加 

```php
 DAV svn SVNParentPath /var/lib/svn AuthType Basic AuthName "svn repository" AuthUserFile /etc/httpd/conf/svn_auth_file Require valid-user 
```

 www.example.com/svn/＜リポジトリ名＞ でアクセス可能となる。Basic認証を用いてredmineと連携する場合は、redmine用の認証ユーザーを別途作成しredmineに設定すればOK。

### 参考サイト

- [Redmine 1.2をCentOS5.6にインストールする手順](http://blog.redmine.jp/articles/redmine-1_2-installation_centos/)
