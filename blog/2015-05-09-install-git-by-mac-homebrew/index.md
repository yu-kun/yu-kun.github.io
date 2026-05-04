---
title: 'MacにhomebrewでGitをインストール'
date: 2015-05-09
authors: [yukun]
tags:
  - git
  - mac
slug: install-git-by-mac-homebrew
---

本記事ではMac OSにGit環境を [homebrew](http://brew.sh/index_ja.html) (Macパッケージ管理システムの一つ)でインストールする手順を紹介。 
<!-- truncate -->


### 前提環境

homebrewがインストールされていること。

### 環境確認

```
$ brew --version
0.9.5 # homebrewがインストールされている
$ git --version
git version 1.9.5 (Apple Git-50.3) # OSデフォルトのgit (バージョンも古い)
$ brew list | grep git # grep結果が0=現状homebrewではgitパッケージの管理がされてないことを確認
$ brew info git | grep stable
git: stable 2.3.5 (bottled), HEAD # homebrew上のgit最新バージョンを確認(要ネットワーク接続)

```

### Gitのインストール

```
$ brew install git
＜中略＞
🍺 /usr/local/Cellar/git/2.3.5: 1363 files, 31M
$ git --version
git version 2.3.5 # 確かにインストールされている
brew list | grep git
git # homebrewでもパッケージ管理対象に入っている
$ which git
/usr/local/bin/git # インストールしたコマンドのフルパス確認
$ ls -l /usr/local/bin/git
lrwxr-xr-x 1 yu admin 27 4 2 00:39 /usr/local/bin/git -> ../Cellar/git/2.3.5/bin/git # 実体は /usr/local/Cellar以下で、bin/以下はそのエイリアスであることを確認

```

### 備考：トラブルシューティング

仮にgit --version結果が今回インストールしたversionと異なる場合、コマンドパスの優先度が適切に反映されていない可能性がある。対処例として、echo $PATH内容の確認(修正)→プロンプトの再起動(かsource ~/.bash\_profile)をする事で解決可能。 ※当方は以前別のパッケージインストール時に/etc/paths、$PATHの修正を行っていた為、今回は同様の事象が発生無かった。 また、インストールしたパッケージをアンインストールしたい場合はbrew remove ＜パッケージ名＞を使用する。

### 参考サイト

- [Homebrew — OS X用パッケージマネージャー](http://brew.sh/index_ja.html)
- [Git](http://git-scm.com/)
