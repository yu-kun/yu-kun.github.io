---
title: 'Homebrew: エラー解決例→Mac OS X EI Capitan upgrade後のpkgインストールエラー'
date: 2016-01-10
authors: [yukun]
tags:
  - mac
slug: homebrew-directory-not-writable
---

### 事象

Mac OS X EI Capitanへupgrade直後にbrewコマンドでパッケージをインストールする際に下記のエラーが発生。 
<!-- truncate -->


```
$ brew install tig
Agreeing to the Xcode/iOS license requires admin privileges, please re-run as root via sudo.
Error: Failure while executing: /usr/bin/otool -L /usr/bin/install_name_tool
$ sudo brew install tig
Password:
Error: Cowardly refusing to `sudo brew install`
You can use brew with sudo, but only if the brew executable is owned by root.
However, this is both not recommended and completely unsupported so do so at
your own risk.
$ brew update
Error: The /usr/local directory is not writable.
Even if this directory was writable when you installed Homebrew, other
software may change permissions on this directory. Some versions of the
"InstantOn" component of Airfoil are known to do this.
You should probably change the ownership and permissions of /usr/local
back to your user account.
  sudo chown -R $(whoami):admin /usr/local
$

```

### 直接原因

brewのファイル保管先である/usr/localの権限が無い為。 ※ OS upgradeの際に権限が書き換わったのかと推測。

### 対応

```
$ sudo chown $(whoami):admin /usr/local
$ cd $(brew --prefix) && git fetch && git reset --hard origin/master.
remote: Counting objects: 30524, done.
remote: Compressing objects: 100% (32/32), done.
remote: Total 30524 (delta 9998), reused 9981 (delta 9981), pack-reused 20511
Receiving objects: 100% (30524/30524), 8.36 MiB | 1.59 MiB/s, done.
Resolving deltas: 100% (22656/22656), completed with 2103 local objects.
From https://github.com/Homebrew/homebrew
   fd96ae2..c686f6c  master     -> origin/master
fatal: ambiguous argument 'origin/master.': unknown revision or path not in the working tree.
Use '--' to separate paths from revisions, like this:
'git  [...] -- [...]'

```

### 参考サイト

- [Failed \`brew update\` on El Capitan (OS X 10.11) Beta · Issue #41665 · Homebrew/homebrew](https://github.com/Homebrew/homebrew/issues/41665#issuecomment-133466064)
