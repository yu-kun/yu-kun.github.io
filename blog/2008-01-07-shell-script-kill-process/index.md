---
title: 'シェルスクリプトでプロセスを監視し自動実行＆自動kill'
date: 2008-01-07
authors: [yukun]
tags:
  - linux
  - shell
  - unix
slug: shell-script-kill-process
---

**追記**：[プロセスの監視＆自動復旧(簡易版)](/blog/shell-script-kill-process-2 "Shell Scriptでサーバプロセスのモニタリング")

今ある検索エンジンのデバッグを行っていますが、事情により短期間ですがクローズドな環境で運用されることになりました。構成は大きく分けてエンジンモジュールサーバ、クエリーモジュールサーバの二つのサーバからなっています。

デバッグはまだ途中なので、運用中にクエリーサーバorエンジンサーバのどちらか、もしくは両方が落ちる可能性もあります。落ちた場合は、手動で起動しなおすことになっていますが、せっかくなので自動化しよう。と、考えました。最初はcronデーモンを用いようと思いましたが、プロセスの監視(dead or alive)の仕方が分からず(調べきれず)、シェルスクリプトを用いることにしました(とは言うもののシェルスクリプトを使うのも初めてでした)。

クエリーサーバ&エンジンサーバのプロセスを一定の間隔で監視し、一方が何らかの原因で落ちた際は、再び二つのプロセスを再実行するようなスクリプトの作成を試みました。ここで、以下の要因を考慮に入れる必要がありました。

- エンジンorクエリーのどちらかが落ちたら、両システムも再起動する
- 起動順序はエンジン→クエリー
- エンジンの起動中にクエリーが起動するとエラー
- 同じターミナルではエンジン(サーバ)とサーバがうまく動作しない(もともと別々のマシンで動作させるものでもある)→別の端末でそれぞれ実行する（やっかい）

そこで、即席ではありますが、以下の二つのシェルスクリプトを作成しました。

### 検索エンジンモジュール用監視スクリプト(Echeckp.sh)


```bash
 #!/usr/bin/sh inter=3 # プロセスの監視間隔 wait=5 # serverの起動待ち時間 while true do isAliveSev=`ps -ef | grep "/server" | grep -v grep | wc -l` if [ $isAliveSev = 1 ]; then # serverが動いているか echo "o:serverプロセス" else echo "x:serverプロセス" pidEng=(`ps -ef | grep "/engine" | grep -v grep | awk '{ print $2; }'`) kill $pidEng /ret/eng/engine & flag=true while $flag do echo "serverの起動待ち" reAliveSev=`ps -ef | grep "/server" | grep -v grep | wc -l` if [ $reAliveSev = 1 ]; then flag=false fi sleep $wait reAliveEng=`ps -ef | grep "/engine" | grep -v grep | wc -l` if [ $reAliveEng = 0 ]; then # 両方止まったとき /ret/eng/engine & fi done fi isAliveEng=`ps -ef | grep "/engine" | grep -v grep | wc -l` if [ $isAliveEng = 1 ]; then # engineが動いているか echo "o:engineプロセス" else echo "x:engineプロセス" pidSev=(`ps -ef | grep "/server" | grep -v grep | awk '{ print $2; }'`) kill $pidSev /ret/eng/engine & flag=true while $flag do echo "serverの起動待ち" reAliveSev=`ps -ef | grep "/server" | grep -v grep | wc -l` if [ $reAliveSev = 1 ]; then flag=false fi sleep $wait reAliveEng=`ps -ef | grep "/engine" | grep -v grep | wc -l` if [ $reAliveEng = 0 ]; then # 両方止まったとき /ret/eng/engine & fi done fi sleep $inter # モニター間隔(秒単位) done 
```


続いて、

### 検索クエリーサーバモジュール用監視スクリプト(Scheckp.sh)


```bash
 #!/usr/bin/sh inter=3 # プロセスの監視間隔 wait=3 # engineの起動待ち時間 while true do isAliveEng=`ps -ef | grep "/engine" | grep -v grep | wc -l` if [ $isAliveEng = 1 ]; then echo "o:engineプロセス" else echo "x:engineプロセス" pidSev=(`ps -ef | grep "/server" | grep -v grep | awk '{ print $2; }'`) kill $pidSev flag=true while $flag do echo "engineの起動待ち" reAliveEng=`ps -ef | grep "/engine" | grep -v grep | wc -l` if [ $reAliveEng = 1 ]; then flag=false fi sleep $wait done /ret/sev/server & fi isAliveSev=`ps -ef | grep "/server" | grep -v grep | wc -l` if [ $isAliveSev = 1 ]; then echo "o:serverプロセス" else echo "x:serverプロセス" pidEng=(`ps -ef | grep "/engine" | grep -v grep | awk '{ print $2; }'`) kill $pidEng flag=true while $flag do echo "engineの起動待ち" reAliveEng=`ps -ef | grep "/engine" | grep -v grep | wc -l` if [ $reAliveEng = 1 ]; then flag=false fi sleep $wait done /ret/sev/server & fi sleep $inter # モニター間隔(秒単位) done 
```


と記述し、それぞれ別の端末でshコマンドで実行します。その際chmodで実行権限を与えておくことを忘れないようにします。また、待ち時間は状況に合わせて変更します(初期設定は3秒おきにチェック)。  
一応、これで期待した自動復旧の動作はしましたが、冗長なコードの気がしますし、今回の問題解決にはもっと上手い手段があると思いました。

まぁ、それはそれ。  
本分のデバッグ作業に戻りますか。  
にしても、シェルスクリプトも興味深いです。
