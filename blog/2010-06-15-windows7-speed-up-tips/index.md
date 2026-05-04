---
title: 'Windows7高速化・軽量化Tips'
date: 2010-06-15
authors: [yukun]
tags:
  - setting
  - windows
slug: windows7-speed-up-tips
---

備忘録として以下のWindows7の使用リソースの軽量化設定の手順を簡単に紹介します。

1. プリフェッチを無効にする
2. スーパーフェッチを無効にする
3. セキュリティセンター機能の無効
4. 自動デフラグ停止
5. 使用しないWindowsの機能のアンインストール
6. 自動ログオン設定


<!-- truncate -->


### プリフェッチを無効にする

レジストリ：HKEY\_LOCAL\_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management\\PrefetchParameters のEnablePrefetcherの値を0にする。 [![Prefetchの無効化](./prefetch_setting-e1276613456325.png "prefetch_setting")](./prefetch_setting-e1276613456325.png)

### スーパーフェッチを無効にする

スタート→コントロールパネル→管理ツール→サービス→Superfetchをダブルクリックし、スタートアップの種類を「無効」に設定し、サービスを停止する。 [![Superfetchサービス](./superfetch_service-e1276613509746.png "superfetch_service")](./superfetch_service-e1276613509746.png) [![Superfetchサービスの設定](./superfetch_setting-e1276613593917.png "superfetch_setting")](./superfetch_setting-e1276613593917.png)

### セキュリティセンター機能の無効

スタート→コントロールパネル→管理ツール→サービス→Security Centerをダブルクリックし、スタートアップの種類を「無効」に設定し、サービスを停止する。 [![Security Centerサービス](./security_center_service-e1276613668768.png "security_center_service")](./security_center_service-e1276613668768.png)

### 自動デフラグ停止

スタート→アクセサリ→「ディスク　デフラグ　ツール」からスケジュール設定を無効化する。

### 使用しないWindowsの機能のアンインストール

スタート→コントロールパネル→プログラムと機能→Windowsの機能の有効化または無効化をクリック [![Windowsの機能の有効化または無効化](./windows_function_setting-e1276613735346.png "windows_function_setting")](./windows_function_setting-e1276613735346.png) ガジェットはバックグラウンドで常駐するので、使用しないのであれば、アンインストールした方が良い。

### 自動ログオン設定

スタート→ファイル検索で「netplwiz」を入力→実行 [![netplwiz_exe](./netplwiz_exe-e1276613774677.png "netplwiz_exe")](./netplwiz_exe-e1276613774677.png) 「ユーザーアカウント」画面で下図のチェックボックスをオフにする。 [![ユーザーアカウント画面](./user_account_setting-e1276613822371.png "user_account_setting")](./user_account_setting-e1276613822371.png)
