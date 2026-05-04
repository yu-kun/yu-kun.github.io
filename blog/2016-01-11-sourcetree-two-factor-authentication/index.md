---
title: 'SourceTree: GitHubログインエラーの対処法→ &quot;Must specify two-factor authentication OTP code.&quot;'
date: 2016-01-11
authors: [yukun]
tags:
  - git
slug: sourcetree-two-factor-authentication
---

### 事象

GUIでリポジトリを操作できるSourceTreeを用いてGitHubへログインを試みたところ下記のエラーが発生。 [![sourcetree_git_login_error](./sourcetree_git_login_error.gif)](./sourcetree_git_login_error.gif) 
<!-- truncate -->


### 原因

Mac版SourceTreeがGitHubの二段階認証によるログインに対応していない為。

### 対応

GitHub設定画面からPersonal access tokenを作成し、当該token文字列をSourceTreeのGitHubアカウントパスワード入力欄へペーストする。 [![github_access_tokens_setting](./github_access_tokens_setting.gif)](./github_access_tokens_setting.gif) 尚、access tokenのScopesは後からでも編集可能。
