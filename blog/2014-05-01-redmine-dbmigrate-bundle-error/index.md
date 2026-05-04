---
title: 'Redmine: db:migrate時のbundle pkgエラー時の対処例'
date: 2014-05-01
authors: [yukun]
tags:
  - redmine
  - ruby
  - subversion
slug: redmine-dbmigrate-bundle-error
---

先日、自鯖のRedmineを[公式のUpgrade手順](http://guide.redmine.jp/RedmineUpgrade/ "アップグレード — Redmine Guide 日本語訳")を参考にSubversion経由でソースをupdate後にDBのマイグレーションを実施したところ下記のエラーが発生。 
<!-- truncate -->


### 事象

```
＜Redmineディレクトリに移動 /var/lib/redmine等＞
# svn update
U    test/unit/mailer_test.rb
U    test/unit/user_preference_test.rb
U    test/unit/lib/redmine/scm/adapters/git_adapter_test.rb
U    test/unit/issue_nested_set_test.rb
U    test/functional/issues_controller_test.rb
U    test/functional/repositories_bazaar_controller_test.rb
U    test/functional/repositories_git_controller_test.rb
U    test/functional/repositories_mercurial_controller_test.rb
U    test/integration/api_test/wiki_pages_test.rb
＜中略＞
リビジョン 13109 に更新しました。
# rake db:migrate RAILS_ENV="production"
You have requested:
  ruby-openid ~> 2.3.0
The bundle currently has ruby-openid locked at 2.2.3.
Try running `bundle update ruby-openid`
Run `bundle install` to install missing gems.

```

指示に従ってruby-openidをupdate。

```
# bundle update ruby-openid
Fetching gem metadata from .
Fetching gem metadata from .
Fetching gem metadata from https://rubygems.org/.
Fetching gem metadata from https://rubygems.org/.
Resolving dependencies...
You have requested:
  selenium-webdriver = 2.35.1
The bundle currently has selenium-webdriver locked at 2.35.0.
Try running `bundle update selenium-webdriver`

```

。。指示に従って、selenium-webdriverをupdate。

```
# bundle update selenium-webdriver
Fetching gem metadata from .
Fetching gem metadata from .
Fetching gem metadata from https://rubygems.org/.
Fetching gem metadata from https://rubygems.org/.
Resolving dependencies...
You have requested:
  ruby-openid ~> 2.3.0
The bundle currently has ruby-openid locked at 2.2.3.
Try running `bundle update ruby-openid`

```

たらい回し感が半端ない。。

### 対応例

パッケージ名を指定せず、全体のupdateで対処可能。

```
# bundle update
Fetching gem metadata from .
Fetching gem metadata from .
Fetching gem metadata from https://rubygems.org/.
Fetching gem metadata from https://rubygems.org/.
Resolving dependencies...
Installing rake (10.3.1)
Using i18n (0.6.1)
Installing multi_json (1.9.3)
Using activesupport (3.2.13)
Using builder (3.0.0)
Using activemodel (3.2.13)
Using erubis (2.7.0)
Using journey (1.0.4)
Using rack (1.4.5)
Using rack-cache (1.2)
Using rack-test (0.6.2)
Using hike (1.2.3)
Using tilt (1.4.1)
Using sprockets (2.2.2)
Using actionpack (3.2.13)
Installing mime-types (1.25.1)
Installing polyglot (0.3.4)
＜中略＞
Installing ruby-openid (2.3.0)
Installing rack-openid (1.4.2)
Using rails (3.2.13)
Using rmagick (2.13.2)
Your bundle is updated!
Gems in the groups development and test were not installed.
# rake db:migrate RAILS_ENV="production"
# ←マイグレーション正常完了

```

後は公式の手順通りに進めればUpgrade完了。よくよく確認すると、ruby-openidはそもそもインストールされていなかったので、先のコマンドではupdateではなくinstallが必要だった。
