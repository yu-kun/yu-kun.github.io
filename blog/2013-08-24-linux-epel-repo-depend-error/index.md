---
title: 'Ruby 1.9.3インストール: yumリポジトリ追加時の依存性の欠如エラー - libyaml'
date: 2013-08-24
authors: [yukun]
tags:
  - linux
  - redmine
  - ruby
slug: linux-epel-repo-depend-error
---

ほったらかしにしていたとある自鯖のRedmineのアップグレードに際し、Ruby 1.9系のビルドに必要なlibyamlをyumでインストールする為にEPELリポジトリを追加しようとしたら下記のエラーが発生。尚、epel-releaseパッケージのURLは以下のページより確認。

よくよく確認したら対象OSバージョンがv5.9だった。。 

```bash
 # rpm -Uvh を取得中 警告: /var/tmp/rpm-xfer.0lmNQv: ヘッダ V3 RSA/SHA256 signature: NOKEY, key ID 0608b895 エラー: 依存性の欠如: rpmlib(FileDigests) <= 4.6.0-1 は epel-release-6-8.noarch に必要とされています rpmlib(PayloadIsXz) <= 5.2-1 は epel-release-6-8.noarch に必要とされています # cat /etc/redhat-release CentOS release 5.9 (Final) 
```

 v5.x系のパッケージをインストールするのも何だし、先ずはOSをv6.x系にUpgradeするかな。いや、v5.x系からv6.x系へのアップグレードはコマンドではなくOSの再インストール推奨されていることを考えると、一先ず、v5.x系でlibyamlをインストールする。 

```bash
 # vi/etc/yum.repos.d/epel.repo ← v5系のリポジトリ追加 # yum install --enablerepo=epel libyaml libyaml-devel 
```

 後はRuby v1.9.3のインストール作業となる。 

```bash
 # curl -O ftp://ftp.ruby-lang.org/pub/ruby/1.9/ruby-1.9.3-p448.tar.gz # tar zxvf ruby-1.9.3-p448.tar.gz # cd ruby-1.9.3-p448 # ./configure --disable-install-doc # make # make install # ruby -v ruby 1.9.3p448 (2013-06-27 revision 41675) [x86_64-linux] 
```


