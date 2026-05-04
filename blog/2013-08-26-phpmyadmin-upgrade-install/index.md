---
title: 'PHP: phpMyAdminのアップグレード・インストール'
date: 2013-08-26
authors: [yukun]
tags:
  - linux
  - mysql
  - php
slug: phpmyadmin-upgrade-install
---

[前記事](/blog/redmine-centos-install "Redmine v2.3.2をCentOS v5.9へ再インストール")に続き(単にしばらくほったらかしのOSSが多かっただけに過ぎないが)、phpmyadminもしばらくアップデートしていなかったのでこの際実施した。 まず、最新版を以下のサイトよりダウンロード。 [phpMyAdmin](http://www.phpmyadmin.net/home_page/index.php) 続いて既存のphpmyadminディレクトリをリネームの上、新バージョンへ移行していく。 

```bash
 # cd /var/www # ls cgi-bin error html icons phpMyAdmin-4.0.5-all-languages.tar.gz phpmyadmin # mv phpmyadmin/ _phpmyadmin/ ← 旧versionのディレクトリをリネーム # tar xzvf phpMyAdmin-4.0.5-all-languages.tar.gz # mv phpMyAdmin-4.0.5-all-languages phpmyadmin # cp phpmyadmin/config.sample.inc.php phpmyadmin/config.inc.php # chmod 660 phpmyadmin/config.inc.php # mkpasswd -l 46 # vi phpmyadmin/config.inc.php ← 修正内容は後述 # chown -R apache.apache phpmyadmin/ 
```

 因みに、最近のバージョンのLanguagesの設定は過去とは少々変わったようだ。危うくlocale -aのja\_JP.UTF-8を盲目的にセットするところだった。 Configuration — phpMyAdmin 4.0.5 documentation 

```bash
 # ls phpmyadmin/locale/ ar bn cs de en_GB et fr hi hu it ko nb pl pt_BR ru sk sr@latin th uk uz@latin zh_TW bg ca da el es fi gl hr id ja lt nl pt ro si sl sv tr uz zh_CN 
```

 その為、config.inc.phpファイル内の修正箇所は以下の通り。 

```php
 $cfg['blowfish_secret'] = '＜mkpasswdコマンド結果を挿入＞' $cfg['DefaultLang'] = 'ja'; 
```

 ここで、実際にブラウザからログイン後、日本語UIが確認できればOK。最後にゴミ掃除をすれば完了。拡張機能の無効の警告については今設定ではスコープ外なので割愛。最後に以下の通りゴミ掃除すれば完了。 

```bash
 # rm -f phpMyAdmin-4.0.5-all-languages.tar.gz # rm -fr _phpmyadmin/ 
```

 新バージョンのUIは中々洗練されていてよい。何でも新しい方が良いもんだね。
