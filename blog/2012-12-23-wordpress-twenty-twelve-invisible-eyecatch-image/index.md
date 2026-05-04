---
title: 'WordPress: Twenty Twelveテーマのアイキャッチ画像の非表示設定'
date: 2012-12-23
authors: [yukun]
tags:
  - php
  - setting
  - wordpress
slug: wordpress-twenty-twelve-invisible-eyecatch-image
---

先日、Wordpressを3.5にアップデートし、Twenty Twelveを適用したところ、アイキャッチ画像がブログページと単一記事ページのタイトル上部に表示されるようになってしまった。当該画像を非表示にするには下記のようにする。 
<!-- truncate -->


### アイキャッチ画像の非表示手順

管理画面→外観→テーマ編集ページに移動し右のサイドバーから"content.php"選択。スクリプト中の下記のコードをコメントアウトすることで、画像が表示されなくなる。

#### 変更前


```php
 
```


#### 変更後


```php
 
```


### 追記 (2018-06-17): Twenty Twelve v1.9〜v2.5での変更方法

Twenty Twelve v1.9以降からはPHPステートメント内にthe\_post\_thumbnail()関数が呼び出されているので、コメントアウト方法は下記の通りとなる。

#### 変更前


```php
 
```


#### 変更後


```php
 
```


### 参考サイト

- [Function Reference/the post thumbnail « WordPress Codex](http://codex.wordpress.org/Function_Reference/the_post_thumbnail)
- [テンプレートタグ/the post thumbnail - WordPress Codex 日本語版](http://wpdocs.osdn.jp/%E3%83%86%E3%83%B3%E3%83%97%E3%83%AC%E3%83%BC%E3%83%88%E3%82%BF%E3%82%B0/the_post_thumbnail)

やはりドキュメントは英語版の方が充実している(当然といえばその通りだが)。最近は[Drupal](https://www.drupal.org/)にも興味があるのだが、WordPressからのデータ、パーマリンク、画像リンクの移行は思ったよりコストがかかりそうなので、引き続きWordPressを使用していく予定。尚、3.5では画像管理が格段に使いやすくなっている。
