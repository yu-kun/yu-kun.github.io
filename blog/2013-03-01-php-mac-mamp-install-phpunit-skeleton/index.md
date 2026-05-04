---
title: 'PHP: Mac+MAMP環境でのPHPUnit, SkeletonGeneratorのインストール方法'
date: 2013-03-01
authors: [yukun]
tags:
  - php
  - setting
slug: php-mac-mamp-install-phpunit-skeleton
---

PHPでの単体テストモジュールであるPHPUnitをMac OS上のMAMP環境で構築する。基本的に参考サイトに記載の公式のインストール手順通りに行う。(PHP実行パスはMAMP環境上の指定VersionのPHP実行ファイルを指定する必要はあるが。) 
<!-- truncate -->


### PHPUnitのインストール

#### コマンド

```
$ sudo /Applications/MAMP/bin/php/php5.4.4/bin/pear config-set auto_discover 1
$ sudo /Applications/MAMP/bin/php/php5.4.4/bin/pear install pear.phpunit.de/PHPUnit

```

#### 実行結果

```
$ sudo /Applications/MAMP/bin/php/php5.4.4/bin/pear config-set auto_discover 1
config-set succeeded
$ sudo /Applications/MAMP/bin/php/php5.4.4/bin/pear install pear.phpunit.de/PHPUnit
Attempting to discover channel "pear.symfony.com"...
downloading channel.xml ...
Starting to download channel.xml (811 bytes)
....done: 811 bytes
Auto-discovered channel "pear.symfony.com", alias "symfony2", adding to registry
Did not download optional dependencies: phpunit/PHP_Invoker, use --alldeps to download automatically
phpunit/PHPUnit can optionally use package "phpunit/PHP_Invoker" (version >= 1.1.0, version <= 1.1.99)
downloading PHPUnit-3.7.14.tgz ...
Starting to download PHPUnit-3.7.14.tgz (117,687 bytes)
...done: 117,687 bytes
downloading Yaml-2.1.8.tgz ...
Starting to download Yaml-2.1.8.tgz (39,746 bytes)
...done: 39,746 bytes
install ok: channel://pear.symfony.com/Yaml-2.1.8
install ok: channel://pear.phpunit.de/PHPUnit-3.7.14

```

### SkeletonGeneratorのインストール

上記に続いて、スケルトン・ジェネレーターのインストールをする。

#### コマンド

```
$ sudo /Applications/MAMP/bin/php/php5.4.4/bin/pear install phpunit/PHPUnit_SkeletonGenerator

```

#### 実行結果

```
$ sudo /Applications/MAMP/bin/php/php5.4.4/bin/pear install phpunit/PHPUnit_SkeletonGenerator
Attempting to discover channel "components.ez.no"...
downloading channel.xml ...
Starting to download channel.xml (591 bytes)
....done: 591 bytes
Auto-discovered channel "components.ez.no", alias "ezc", adding to registry
downloading PHPUnit_SkeletonGenerator-1.2.0.tgz ...
Starting to download PHPUnit_SkeletonGenerator-1.2.0.tgz (11,210 bytes)
...done: 11,210 bytes
downloading ConsoleTools-1.6.1.tgz ...
Starting to download ConsoleTools-1.6.1.tgz (869,994 bytes)
...done: 869,994 bytes
downloading Base-1.8.tgz ...
Starting to download Base-1.8.tgz (236,357 bytes)
...done: 236,357 bytes
install ok: channel://components.ez.no/Base-1.8
install ok: channel://components.ez.no/ConsoleTools-1.6.1
install ok: channel://pear.phpunit.de/PHPUnit_SkeletonGenerator-1.2.0

```

インストールされたモジュールは/Users/＜ユーザー名＞/pear/以下に保存されている。

### 参考サイト

- [Chapter 3. Installing PHPUnit](http://phpunit.de/manual/3.7/en/installation.html)
