---
title: 'Yahoo!検索 サイトエクスプローラー を利用するブックマークレット'
date: 2008-05-21
authors: [yukun]
tags:
  - javascript
  - network
  - yahoo
slug: siteexplorer-bookmarklet
---

追記：Yahoo!検索 サイトエクスプローラーのサービスって終了してしまったんですね。。 任意のWebページ上でワンクリックでサイトエクスプローラー - Yahoo!検索のインデックス検索が出来るブックマークレットを作ってみました。

### 別ウィンドウで開く

下のリンクをお気に入りにドラック＆ドロップして下さい。 [サイトエクスプローラー(別)](javascript:\(function\(\){void\(window.open\('http://siteexplorer.search.yahoo.co.jp/advsearch?p='+location.href\)\);}\)\(\);) IEの場合、その際のホップアップは許可してください。ホップアップ確認がわずらわしい場合は下の「同じウィンドウで開く」バージョンを利用してください。

### 同じウィンドウで開く

[サイトエクスプローラー(同)](javascript:\(function\(\){ document.location.href='http://siteexplorer.search.yahoo.co.jp/advsearch?p='+escape\(document.location.href\) }\)\(\);) コード 

```javascript
javascript:(function(){
document.location.href=
'http://siteexplorer.search.yahoo.co.jp/advsearch?p='+escape(document.location.href)
})();
```


### 使い方

任意のサイトで上述で作成したお気に入りをクリックすると、そのサイトのインデックス検索が行われます。
