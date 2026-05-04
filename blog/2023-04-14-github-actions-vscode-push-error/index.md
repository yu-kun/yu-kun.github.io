---
title: '解決例: ! [remote rejected] main -> main (refusing to allow an OAuth App to create or update workflow `.github/workflows/xxx.yml` without `workflow` scope)'
date: 2023-04-14
authors: [yukun]
tags:
  - github
slug: github-actions-vscode-push-error
---

## 事象

VSCode (on macOS) でGitHub Actionsを利用する為、リポジトリに.github/workflows/\*.ymlファイルをpushする際に下記のエラーが発生しpushできない事象が発生。

### エラーメッセージ

```
! [remote rejected] main -> main (refusing to allow an OAuth App to create or update workflow `.github/workflows/xxx.yml` without `workflow` scope)
```

## 原因

OAuth上でworkflowに対するcreate or updateの権限が付与されていない為。workflow機能の実装以前にVSCodeでGitHub関連のOAuth設定をしていた場合は本事象が発生する可能性あり。

## 解決例

1. VSCode上でGitHubアカウントからサインアウトしアプリを終了（⌘Q）。

3. 「キーチェーンアクセス.app」上の検索ボックスで文字列github.comとvscodeに合致する全てのエントリを削除。

5. VSCode上でGitHubアカウントに再サインイン。サインイン時に権限付与対象の設定チェックボックスが表示される為、workflowがチェックされていることを確認。

サインアウト前に設定確認した限りだとworkflowへの権限チェックはついていたものの、本事象が発生していたのがイマイチだった。（readはOK、create or updateはNGの意味だったのかな。。）
