---
title: 'Redmine v2.3.2をCentOS v5.9へ再インストール'
date: 2013-08-25
authors: [yukun]
tags:
  - eclipse
  - linux
  - redmine
  - ruby
slug: redmine-centos-install
---

2011頃にさくらVPSに構築したRedmine v1.x.xをRedmine v2.3.x系にアップグレードしようと試みたが、DBのマイグレーションが手間なのと、Subversionからのソースコードダウンロードだと今後のupdateがかなり効率化できる為、この際再インストールする事にした。対象環境はCentOS v5.9だが作業中に幾つか引っかかったところがあるので、今後の備忘録も兼ねて下記に纏めておく。尚、作業に際しては原則下記の公式ブログに記載の手法で進めていく。 参考：[Redmine 2.3をCentOS 6.4にインストールする手順 | Redmine.JP Blog](http://blog.redmine.jp/articles/2_3/installation_centos/) 以降はそれ以外の作業や作業中のエラー、留意点、対処法など。 
<!-- truncate -->


### そもそも既存環境のアンインストールは？

DB上のRedmineの全テーブルと/var/lib/redmineディレクトリ、Apache側の設定、シンボリックリンク等を削除すればそれで完了となる。

### 必要なパッケージのインストール

[記事の同項目](http://blog.redmine.jp/articles/2_3/installation_centos/)は基本的に全て実施する。v1.x.x系とは若干必要パッケージが異なる為。

#### ImageMagickのインストール

最初のCentOS v5.9ユニークのつまずき。v5.9のyumで導入可能なImageMagickのバージョンは6.2.8とRMagickが必要とする6.4.9より低い。その為、既存バージョンをremove後、新バージョンをソースコードよりビルドインストールする。rpmパッケージによるエラーは依存性の欠如エラーが頻発していちいちインストールするのも何なので今回は採らない。 

```bash
 # yum install libjpeg-devel libpng-devel # wget http://www.imagemagick.org/download/ImageMagick.tar.gz # tar xvfz ImageMagick.tar.gz # cd ImageMagick-6.8.6-8 # ./configure # make # make install # ldconfig /usr/local/lib # which convert /usr/local/bin/convert 
```

 参考：[ImageMagick: Install from Source](http://www.imagemagick.org/script/install-source.php#unix) 因みに上記公式サイトではmake checkを推奨しているが実行したところ自身の環境では下記の箇所以降でスタックするので実行しない方が良い、と思う。

```
PASS: tests/validate-convert.tap 1
```

### Rubyのインストール

[1.9.3をインストール](/blog/linux-epel-repo-depend-error "Linux: yumリポジトリ追加時の依存性の欠如エラー – libyaml")するのだが、ここで合わせて既存の各ツールの更新も含めて実施しておく。 

```bash
 # gem update --system # gem update rake # gem install bundler --no-rdoc --no-ri # gem install rails --version="~> 3.2.3" --no-ri --no-rdoc 
```


### MySQLの設定

既存の設定を引き継げる。

### Redmineのインストール

リポジトリからソースコードを取得した方が後々の更新が楽なのでこちらを採る。

```
svn co http://svn.redmine.org/redmine/branches/2.3-stable /var/lib/redmine

```

#### 設定ファイル config/configuration.yml

下記のサイトに詳細が載っている。 [configuration.yml によるRedmineの設定 | Redmine.JP Blog](http://blog.redmine.jp/articles/configuration_yml/)

### Gemパッケージのインストール

後は公式に記載の通りの手順でGemパッケージをインストールする。インストール中の代表的なエラーとその対処法は下記の通り。

#### Can't install RMagick 2.13.2. You must have ImageMagick 6.4.9 or later.

ImageMagick 6.4.9以上をインストールしていないと出力される。上述の手順で実施いていれば基本的には出ないはず。 

```bash
 # bundle install --without development test Gem::Installer::ExtensionBuildError: ERROR: Failed to build gem native extension. /usr/local/bin/ruby extconf.rb checking for Ruby version >= 1.8.5... yes checking for gcc... yes checking for Magick-config... yes checking for ImageMagick version >= 6.4.9... no Can't install RMagick 2.13.2. You must have ImageMagick 6.4.9 or later. *** extconf.rb failed *** Could not create Makefile due to some reason, probably lack of necessary libraries and/or headers. Check the mkmf.log file for more details. You may need configuration options. Provided configuration options: --with-opt-dir --without-opt-dir --with-opt-include --without-opt-include=${opt-dir}/include --with-opt-lib --without-opt-lib=${opt-dir}/lib --with-make-prog --without-make-prog --srcdir=. --curdir --ruby=/usr/local/bin/ruby Gem files will remain installed in /usr/local/lib/ruby/gems/1.9.1/gems/rmagick-2.13.2 for inspection. Results logged to /usr/local/lib/ruby/gems/1.9.1/gems/rmagick-2.13.2/ext/RMagick/gem_make.out An error occurred while installing rmagick (2.13.2), and Bundler cannot continue. Make sure that `gem install rmagick -v '2.13.2'` succeeds before bundling. 
```


#### Package MagickCore was not found in the pkg-config search path.

続いて、RMagickのインストール時に出力されるエラー。 

```bash
 # gem install rmagick -v '2.13.2' Building native extensions. This could take a while... ERROR: Error installing rmagick: ERROR: Failed to build gem native extension. /usr/local/bin/ruby extconf.rb checking for Ruby version >= 1.8.5... yes checking for gcc... yes checking for Magick-config... yes Warning: Found a partial ImageMagick installation. Your operating system likely has some built-in ImageMagick libraries but not all of ImageMagick. This will most likely cause problems at both compile and runtime. Found partial installation at: /usr/local checking for ImageMagick version >= 6.4.9... yes checking for HDRI disabled version of ImageMagick... yes Package MagickCore was not found in the pkg-config search path. Perhaps you should add the directory containing `MagickCore.pc' to the PKG_CONFIG_PATH environment variable No package 'MagickCore' found Package MagickCore was not found in the pkg-config search path. Perhaps you should add the directory containing `MagickCore.pc' to the PKG_CONFIG_PATH environment variable No package 'MagickCore' found Package MagickCore was not found in the pkg-config search path. Perhaps you should add the directory containing `MagickCore.pc' to the PKG_CONFIG_PATH environment variable No package 'MagickCore' found Package MagickCore was not found in the pkg-config search path. Perhaps you should add the directory containing `MagickCore.pc' to the PKG_CONFIG_PATH environment variable No package 'MagickCore' found checking for stdint.h... yes checking for sys/types.h... yes checking for wand/MagickWand.h... no Can't install RMagick 2.13.2. Can't find MagickWand.h. *** extconf.rb failed *** Could not create Makefile due to some reason, probably lack of necessary libraries and/or headers. Check the mkmf.log file for more details. You may need configuration options. Provided configuration options: --with-opt-dir --without-opt-dir --with-opt-include --without-opt-include=${opt-dir}/include --with-opt-lib --without-opt-lib=${opt-dir}/lib --with-make-prog --without-make-prog --srcdir=. --curdir --ruby=/usr/local/bin/ruby Gem files will remain installed in /usr/local/lib/ruby/gems/1.9.1/gems/rmagick-2.13.2 for inspection. Results logged to /usr/local/lib/ruby/gems/1.9.1/gems/rmagick-2.13.2/ext/RMagick/gem_make.out 
```

 これは単にPKG\_CONFIG\_PATHパスが設定されていないことによるものなので、以下の通り設定してインストールすれば良い。 

```bash
 # export PKG_CONFIG_PATH=/usr/local/lib/pkgconfig # env | grep PKG_CONFIG_PATH PKG_CONFIG_PATH=/usr/local/lib/pkgconfig # gem install rmagick -v '2.13.2' Building native extensions. This could take a while... Successfully installed rmagick-2.13.2 Installing ri documentation for rmagick-2.13.2 1 gem installed 
```

 これで、# bundle install --without development testコマンドは正常完了するはず。

### Redmineの初期設定とデータベースのテーブル作成

基本的にここは公式通りに/var/lib/redmine上で下記のコマンドを実行。仮に下記のエラーが発生した場合は、DBのパスワードと設定ファイルに記載のパスワードの整合性が合っているか今一度確認する。 

```bash
 # RAILS_ENV=production bundle exec rake db:migrate rake aborted! Access denied for user 'xxxx_redmine'@'localhost' (using password: YES) /var/lib/redmine/app/models/issue_relation.rb:73:in `' /var/lib/redmine/app/models/issue_relation.rb:18:in `' /var/lib/redmine/lib/redmine/helpers/gantt.rb:28:in `' /var/lib/redmine/lib/redmine/helpers/gantt.rb:21:in `' /var/lib/redmine/lib/redmine/helpers/gantt.rb:19:in `' /var/lib/redmine/lib/redmine/helpers/gantt.rb:18:in `' /var/lib/redmine/lib/redmine.rb:51:in `' /var/lib/redmine/config/initializers/30-redmine.rb:4:in `' /var/lib/redmine/config/environment.rb:14:in `' Tasks: TOP => db:migrate => environment (See full trace by running task with --trace) 
```


### PassengerのインストールとApacheの設定

ここも基本的に公式通りだが、最新のPassengerパッケージは公式に記載の一部設定ディレクティブが異なるので注意。大抵、下記の用にSyntaxチェックで洗い出す。 

```bash
 # /etc/init.d/httpd configtest WARNING: The 'RailsFrameworkSpawnerIdleTime' option is obsolete. Please use 'PassengerMaxPreloaderIdleTime' instead. Syntax OK 
```

 RailsFrameworkSpawnerIdleTimeは使えないので、PassengerMaxPreloaderIdleTimeを使うこと。/etc/httpd/conf.d/passenger.confを編集の上、チェックし再発しなければOK。 後続の手順は構築通りに進めればWebブラウザからRedmineを表示できる。以降は、下記の公式ページを参考に初期設定を実施しておく。 参考：[Redmineを使い始めるための初期設定 — Redmine.JP](http://redmine.jp/tech_note/first-step/admin/) 因みに、管理→情報欄の「Plugin assetsディレクトリに書き込み可能」が！マークになっている場合は、以下のようにディレクトリを作成、オーナー変更で対処する。 

```bash
 # mkdir /var/lib/redmine/public/plugin_assets # chown apache:apache /var/lib/redmine/public/plugin_assets/ 
```

 やはり最新バージョンは色々と改善されていて使いやすい（２年もたてばそんなもんか。。）。次はEclipseとの連携方法について記載しようかな。

### その他参考サイト

- [CentOS に ImageMagick, RMagick のインストール | akkunchoi@github](http://akkunchoi.github.io/imagemagick-rmagick-centos.html)
