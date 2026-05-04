---
title: 'AIR: SQLiteでデータの挿入と検索 - SQLConnection、SQLStatementクラス'
date: 2008-12-22
authors: [yukun]
tags:
  - actionscript
  - air
  - gui
  - mysql
slug: air-actionscript-sqlite-statement
---

AIRアプリケーションからSQLiteのDBにアクセスするには主にSQLConnectionとSQLStatementクラスを用います。基本的な処理の流れは、

1. SQLConnection#openAsync(＜Fileオブジェクト＞, ＜モード＞)でDBに接続
2. SQLStatement#textプロパティにSQL文を代入しexecute()で実行
3. その際、フィールド値はSQLStatement#parameters\["@＜定義されたパラメータ＞"\]で代入する
4. SELECT文の検索結果データははSQLStatement#getResult()で取得
5. 結果データの型はSQLResultで、データそのものはdataプロパティ(Array型)に入っている。e.g. ＜SQLResult＞.data\[i\].＜フィールド名＞

下のプログラムはDBに接続してテーブルの作成、レコードの追加、検索を行うサンプルです。 
<!-- truncate -->


## ソースコード


```actionscript
<?xml version="1.0" encoding="utf-8"?>
<mx:WindowedApplication xmlns:mx="http://www.adobe.com/2006/mxml"
layout="absolute" creationComplete="dbConnect()">
<mx:Script>
  <![CDATA[
  import flash.data.SQLConnection;
  import flash.filesystem.File;
  import flash.events.SQLErrorEvent;
  import flash.events.SQLEvent;
  private var conn:SQLConnection;
  private var dbFile:File;
  private var sql:SQLStatement;
  // DBに接続
  private function dbConnect():void {
    conn = new SQLConnection();
    conn.addEventListener(SQLEvent.OPEN, onDBOpen);
    conn.addEventListener(SQLErrorEvent.ERROR, onDBError);
    dbFile = File.desktopDirectory.resolvePath("test01.db");
    trace("フィアルは存在" + (dbFile.exists ? "します。：" : "しません。") + dbFile.nativePath);
    conn.openAsync(dbFile, SQLMode.CREATE);
  }
  // 接続完了
  private function onDBOpen(e:SQLEvent):void {
    trace("Connect DB");
    conn.removeEventListener(SQLEvent.OPEN, onDBOpen);
    conn.removeEventListener(SQLErrorEvent.ERROR, onDBError);
    createTable(); // テーブルを作成
  }
  private function onDBError(e:SQLErrorEvent):void {
    trace("Can't connect DB: " + e.error.message);
    trace("Error detals: " + e.error.details);
  }
  // テーブルを作成する関数
  private function createTable():void {
    sql = new SQLStatement();
    sql.sqlConnection = conn;
    var sqlTxt:String = "CREATE TABLE IF NOT EXISTS addresses " +
        "(id INTEGER PRIMARY KEY, name TEXT, age INTEGER)";
    sql.text = sqlTxt;
    sql.addEventListener(SQLEvent.RESULT, onCreate);
    sql.addEventListener(SQLErrorEvent.ERROR, onCreateError);
    sql.execute();
  }
  // テーブル作成完了
  private function onCreate(e:SQLEvent):void {
    trace("Can create table");
    sql.removeEventListener(SQLEvent.RESULT, onCreate);
    sql.removeEventListener(SQLErrorEvent.ERROR, onCreateError);
    insertData(); // データを挿入
  }
  private function onCreateError(e:SQLErrorEvent):void {
    trace("Can't create table: " + e.error.message);
    trace("Error details: " + e.error.details);
  }
  private function insertData():void {
    sql = new SQLStatement();
    sql.sqlConnection = conn;
    var sqlTxt:String = "INSERT INTO addresses (id, name, age) " +
      "VALUES (@id, @name, @age)";
    sql.text = sqlTxt;
    sql.parameters["@id"] = 1;
    sql.parameters["@name"] = "名無し";
    sql.parameters["@age"] = 18;
    sql.addEventListener(SQLEvent.RESULT, onInsert);
    sql.addEventListener(SQLErrorEvent.ERROR, onInsertError);
    sql.execute();
  }
  // データ挿入完了
  private function onInsert(e:SQLEvent):void {
    trace("Can insert data");
    sql.removeEventListener(SQLEvent.RESULT, onInsert);
    sql.removeEventListener(SQLErrorEvent.ERROR, onInsertError);
    selectData(); // データを検索
  }
  private function onInsertError(e:SQLErrorEvent):void {
    trace("Can't insert data: " + e.error.message);
    trace("Error details: " + e.error.details);
  }
  private function selectData():void {
    sql = new SQLStatement();
    sql.sqlConnection = conn;
    var sqlTxt:String = "SELECT * FROM addresses";
    sql.text = sqlTxt;
    sql.addEventListener(SQLEvent.RESULT, onSelect);
    sql.addEventListener(SQLErrorEvent.ERROR, onSelectError);
    sql.execute();
  }
  // 検索結果を取得完了
  private function onSelect(e:SQLEvent):void {
    trace("Can select data");
    sql.removeEventListener(SQLEvent.RESULT, onSelect);
    sql.removeEventListener(SQLErrorEvent.ERROR, onSelectError);
    var result:SQLResult = sql.getResult();
    var num:int = result.data.length;
    var id:int;
    var name:String;
    var age:String;
    for (var i:int = 0; i < num; i++) {
      var row:Object = result.data[i];
      id = row.id;
      name = row.name;
      age = row.age;
      var str:String = "id=" + id + ", name=" + name + ", age=" + age;
      trace(str);
    }
  }
  private function onSelectError(e:SQLErrorEvent):void {
    trace("Can't select data: " + e.error.message);
    trace("Error details: " + e.error.details);
  }
  ]]]]><![CDATA[>
</mx:Script>
</mx:WindowedApplication>
```


## 実行結果

```
フィアルは存在しません。/Users/yukun/Desktop/test01.db
Connect DB
Can create table
Can insert data
Can select data
id=1, name=名無し, age=18

```

### リファレンス

- Adobe AIR 1.5 \* ローカル SQL データベースの操作
- Adobe AIR 1.5 \* データベースへの接続
