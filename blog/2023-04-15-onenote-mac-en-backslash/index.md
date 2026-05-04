---
title: '解決例: OneNoteで(バックスラッシュ)入力時に¥(円)記号に変換される事象'
date: 2023-04-15
authors: [yukun]
tags:
  - mac
  - onenote
slug: onenote-mac-en-backslash
---

## 事象

以下の環境においてMicrosoft OneNote for Mac version 16.72のノートへのバックスラッシュ（\\）入力時に¥（円）記号が表示される事象が発生。

- OS: MacOS 13.3.1

- キーボード: RealForce R2 Mac JP 91 (A0.16)

- キーボード配列設定：日本語

## 解決例

フォントを既存の「Meiryo UI」から「Menlo」に変更することで解決。（MenloはVScodeで使用して馴染みがあった）

Word for Macでも同事象が発生しており原因は謎ですな。。
