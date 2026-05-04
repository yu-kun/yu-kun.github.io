---
title: 'Java: 複数クライアントでの自動Web(HTTP GET)レスポンス計測ツール'
date: 2014-08-19
authors: [yukun]
tags:
  - html
  - java
slug: java-auto-measure-response
---

### これは何？

- 少数(1〜数台)のクライアント環境から多数のWebアクセスのエミュレート及びそのレスポンスを計測する際に活用するコード。
- 指定のURLにGETリクエストを送出し、そのレスポンス(ボディ）データと処理時間(リクエスト送出からレスポンス受信まで)を算出。 ※一般のブラウザのようにレスポンス取得からデータの描画までの処理時間は含まれない。
- main()内でスレッドプール(Webクライアント数)とタスク(合計アクセス数)を生成。仮にクライアントが応答無しになった場合は、最大awaitTime秒待って強制終了する。
- このツールを使用した際の評価の書き方としては「XクライアントからのY時間あたりZアクセス数が発生した時のAAA（サーバ負荷|クライアントのレスポンス時間\[最大|平均|最小\])」の用になる見込みだが、Yを計測するコードは入れていない。。。(若干わかりにくいので、もっと簡潔な表現に落とす必要があるかも)
- URLの指定はコマンドラインパラメータからできるように修正した方が良かったが、時間の関係で割愛している。(URLの修正にいちいち再コンパイルは手間ではある)

### 使い方は？

- 下記のソースをJavaでコンパイルし、java Mainコマンドで実行する。(Eclipseがあればそれを使用すると手間が省ける)
- アクセスURLとパラメータには気をつけること(外部サイトを指定してDOS攻撃に間違えられないように、自分のサーバか、localサーバなどを使用すること)
- 現状実行結果を標準出力している。スレッドセーフな整形ログ出力を追加で書き込むのも良いし、標準出力内容を簡易的にして、プログラムの実行結果をファイルにリダイレクトするのも良い。


<!-- truncate -->


### ソースコード

#### Main.java


```java
 package info.yukun.autoWebAccess; import java.util.concurrent.ExecutorService; import java.util.concurrent.Executors; import java.util.concurrent.TimeUnit; public class Main { public static void main(String[] args) throws InterruptedException { System.out.println("Entering main"); // スレッドの作成数 ExecutorService pool = Executors.newFixedThreadPool(20); // レスポンス計測対象のページ final String url = "http://www.example.com/"; // タスク完了を待つ時間(sec) final long awaitTime = 5 * 60; // スレッドpoolに投げるタスク内容 Runnable task = new Runnable() { public void run() { NetHttpClient http = new NetHttpClient(url); http.executeGet(); System.out.println("Client - " + Thread.currentThread().getId() + ": " + http.getResponseTime() + "sec"); } }; // スレッドプールにタスクを投げる for (int i = 0; i < 50; i++) { pool.execute(task); } try { // 全タスクが終了後にスレッドを終了させる。 pool.shutdown(); // (全てのタスクが終了した場合、trueを返しif内はスキップ) if (!pool.awaitTermination(awaitTime, TimeUnit.SECONDS)) { // タイムアウトした場合、全てのスレッドを中断(interrupted)してスレッドプールを破棄する。 pool.shutdownNow(); } } catch (InterruptedException e) { // awaitTerminationスレッドがinterruptedした場合も、全てのスレッドを中断する System.out.println("awaitTermination interrupted: " + e); pool.shutdownNow(); } System.out.println("Exit main"); } } 
```


#### NetHttpClient.java


```java
 package info.yukun.autoWebAccess; import java.io.BufferedReader; import java.io.IOException; import java.io.InputStreamReader; import java.net.HttpURLConnection; import java.net.URL; import java.nio.charset.StandardCharsets; public class NetHttpClient { private StringBuffer res; private long msec; private String path; public NetHttpClient(String url) { this.res = new StringBuffer(); this.path = url; } public void executeGet() { long start = System.currentTimeMillis(); try { URL url = new URL(path); HttpURLConnection connection = null; try { connection = (HttpURLConnection) url.openConnection(); connection.setRequestMethod("GET"); if (connection.getResponseCode() == HttpURLConnection.HTTP_OK) { try (InputStreamReader isr = new InputStreamReader( connection.getInputStream(), StandardCharsets.UTF_8); BufferedReader reader = new BufferedReader(isr)) { String line; while ((line = reader.readLine()) != null) { res.append(line); res.append(System.getProperty("line.separator")); } } } } finally { if (connection != null) { connection.disconnect(); } } } catch (IOException e) { e.printStackTrace(); } long stop = System.currentTimeMillis(); msec = stop - start; } public double getResponseTime() { return (double) msec / 1000; } public StringBuffer getResponse() { return res; } } 
```


### 実行結果 (イメージ)

```
Entering main
Client - 25: 1.896sec
Client - 18: 1.946sec
Client - 15: 2.155sec
Client - 11: 2.424sec
Client - 16: 2.525sec
Client - 26: 2.643sec
Client - 22: 3.652sec
Client - 23: 3.667sec
Client - 13: 4.007sec
Client - 19: 4.074sec
Client - 29: 4.105sec
Client - 27: 4.349sec
Client - 21: 5.917sec
Client - 30: 5.935sec
Client - 28: 5.946sec
Client - 11: 3.583sec
Client - 20: 6.029sec
Client - 26: 4.085sec
Client - 23: 3.467sec
Client - 17: 7.298sec
Client - 19: 3.426sec
Client - 16: 5.457sec
Client - 27: 3.652sec
Client - 13: 4.02sec
Client - 22: 4.463sec
Client - 29: 4.258sec
Client - 28: 2.899sec
Client - 11: 3.539sec
Client - 30: 3.627sec
Client - 21: 3.731sec
Client - 26: 3.103sec
Client - 23: 2.702sec
Client - 25: 7.986sec
Client - 14: 9.971sec
Client - 20: 4.612sec
Client - 16: 3.385sec
Client - 29: 3.05sec
Client - 22: 3.415sec
Client - 13: 3.535sec
Client - 28: 2.95sec
Client - 30: 2.692sec
Client - 27: 4.542sec
Client - 19: 5.435sec
Client - 17: 5.652sec
Client - 11: 3.582sec
Client - 21: 3.484sec
Client - 24: 13.501sec
Client - 12: 13.605sec
Client - 15: 11.518sec
Client - 18: 11.781sec
Exit main

```

### 参考サイト

- [ExecutorService (Java Platform SE 7 )](http://docs.oracle.com/javase/7/docs/api/java/util/concurrent/ExecutorService.html)
