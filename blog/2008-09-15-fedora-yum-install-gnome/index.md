---
title: 'FedoraにGUI環境GNOMEをyumでインストール'
date: 2008-09-15
authors: [yukun]
tags:
  - command
  - linux
  - setting
slug: fedora-yum-install-gnome
---

Fedoraのセットアップ時にGUI環境(GNOME, KDE)をインストールしていないが、セットアップ後にyumコマンドでGNOMEをインストールする手順を以下に示します。

## XとGNOMEのインストール

以下のコマンドを打ち込みます。 

```bash
 # yum groupinstall "X Window System" "GNOME Desktop Environment" 
```

 もしKDEをインストールする場合は、 

```bash
 yum groupinstall "X Window System" "KDE (K Desktop Environment)" 
```

 何事も無ければ、大体230MBぐらいD&Iしますので、他のことでもしながら待ちます。 しかし、以下のようなエラーが出た場合、 

```bash
 Error: Missing Dependency: policycoreutils = 2.0.31-7.fc8 is needed by package policycoreutils-gui 
```

 Error: Missing Dependencyは依存関係の問題です。上の例では、policycoreutils-guiをインストールするのに必要なpolicycoreutils(2.0.31-7.fc8)が無いですよーと言っています。 念のため、以下のコマンドで必要なものがインストールされているか調べます。 

```bash
 # yum info policycoreutils 
```

 仮にインストールされている場合、そのバージョン番号も表示されますので、その番号が必要とされているものと一致しているかどうか確認します。ここでは2.0.31-7.fc8ですね。 一致していない場合は、yumでupdateか再インストール(removeとinstall)しましょう。もし、一致しているのに上記のエラーが出た場合でも、yum updateで一回システム全体をアップデートしてみてください。その後再度、 

```bash
 # yum groupinstall "X Window System" "GNOME Desktop Environment" 
```

 を行えば、インストールが始まります。

## Fedora起動時にXを立ち上げる

毎回コマンドでstartxと打ってX Window SystemとGNOMEを立ち上げるのも手間ですので以下のファイルを修正して、起動時にGNOMEセッションが使えるようにします。 ファイル/etc/inittabの18行目付近にある id:3:initdefault: を id:5:initdefault: に書き換えます。 その後、再起動すればOKです。

## 日本語入力環境(scim)などのインストール

以下のyumコマンドをroot権限で実行しインストールてください。 

```bash
 # yum groupinstall 'Japanese Support' ＜中略＞ Installing: scim-anthy i386 1.2.4-2.fc8 fedora 365 k scim-lang-japanese i386 1.4.7-7.fc8 fedora 23 k Installing for dependencies: im-chooser i386 0.5.3-1.fc8 fedora 82 k scim i386 1.4.7-7.fc8 fedora 475 k scim-bridge i386 0.4.14-1.fc8 updates-newkey 99 k scim-bridge-gtk i386 0.4.14-1.fc8 updates-newkey 39 k ＜後略＞ 
```

 再起動すれば、「半角/全角」キーで日本語入力が可能になります。 ………大学ではLinuxメインですが、自宅ではWindowsでCygwin、MinGWや仮想OS、クロスプラットフォームなboostライブラリとかを用いながら騙し々々開発していました。が、もうそんなことやってられる段階でなくなったので(socket, threadまわりの評価の為)今回デプロイ用のサーバに一応の開発環境を整えました。 あんまり大学での作業を持ち込みたくないんだけれどなぁ。スケジュール見直そうかな。
