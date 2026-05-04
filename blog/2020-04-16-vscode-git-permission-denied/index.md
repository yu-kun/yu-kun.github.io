---
title: 'VS Code: gitのPermission denied (publickey)やInvalid username or password. fatal: Authentication failedの解決法'
date: 2020-04-16
authors: [yukun]
tags:
  - git
  - vscode
slug: vscode-git-permission-denied
---

VS Code 1.44.2にてGitHubへソースコードのプッシュをhttps方式、ssh方式療法で試みたところ、下記のエラーが発生しプッシュに失敗。


<!-- truncate -->


### エラーメッセージ


```bash
 ↓ https方式 次の場所で Git を検索しています: /usr/bin/git /usr/bin/git から Git 2.24.2 (Apple Git-127) を使用しています > git clone /Users/xxx/Documents/vscode/yyy --progress Cloning into '/Users/xxx/Documents/vscode/yyy'... remote: Invalid username or password. fatal: Authentication failed for 'https://github.com/xxx/yyy.git/‘

↓ssh方式 > git clone git@github.com:xxx/yyy.git /Users/xxx/Documents/vscode/yyy --progress Cloning into '/Users/xxx/Documents/vscode/yyy'... git@github.com: Permission denied (publickey). fatal: Could not read from remote repository.

Please make sure you have the correct access rights and the repository exists. 
```


### 原因

https方式が失敗したのはGitHubに二段階認証を設定していた為で、ssh方式が失敗したのはGitHubに公開鍵を登録していなかった為だった。

### 解決法

下記の公式ドキュメントを参考にsshの公開鍵をGitHubに登録することでssh方式でプッシュ可能となる。

### 参考サイト

[Testing your SSH connection - GitHub Help](https://help.github.com/en/github/authenticating-to-github/testing-your-ssh-connection)
