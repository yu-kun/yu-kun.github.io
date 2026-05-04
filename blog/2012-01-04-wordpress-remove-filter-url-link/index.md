---
title: 'WordPress: 本文・コメント中のURLの自動リンクを抑制する - make_clickable'
date: 2012-01-04
authors: [yukun]
tags:
  - wordpress
slug: wordpress-remove-filter-url-link
---

最近のWordPressは本文・コメント内のURL(http:～、ftp:～)に自動的にリンクを貼る機能があるのだが、ソースコード中の文字列にまでリンクを貼られるとコードそのものが崩れる為、それを抑制するよう使用テーマのfunctions.phpに以下のコードを追記する。 
<!-- truncate -->
 

```php
/* 自動リンク除去 */
remove_filter('comment_text', 'make_clickable');
remove_filter('the_content', 'make_clickable');
```

 ※余談： 上記の設定をしてもリンクが解除されなかったので、他の原因を探ってみたら、chromeブラウザで拡張機能Text URL Linkeを使用していると、記事中のhttp:～リンクを自動的にタグで囲んでしまうので、これも無効化する必要があった(^\_^;)

### 参考サイト

1. [Function Reference/make clickable « WordPress Codex](http://codex.wordpress.org/Function_Reference/make_clickable)
2. [Function Reference/remove filter « WordPress Codex](http://codex.wordpress.org/Function_Reference/remove_filter)
3. [Remove Auto Links In WordPress Comments Content Without Plugin](http://www.clickonf5.org/10159/remove-links-in-comments/)
4. [WordPress › フォーラム » 投稿記事の自動置換処理をカスタマイズしたい](http://ja.forums.wordpress.org/topic/4927)
