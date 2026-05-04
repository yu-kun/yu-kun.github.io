---
title: 'QNAP: エラー対処法→ [Firmware Upgrade] System update failed. No enough space on RAM/ disk available for firmware update.'
date: 2014-05-14
authors: [yukun]
tags:
  - qnap
  - ssh
slug: qnap-firmware-upgrade-manually
---

先日自宅のQNAP NASサーバーのファームウェアをWeb UIよりアップグレードを試みたところ、下記のエラーが発生。

### 事象

```
[Firmware Upgrade] System update failed.
No enough space on RAM/ disk available for firmware update.

```

本記事では原因等は記載はせず、対処法のみ紹介。 
<!-- truncate -->


### 対処法

自動ダウンロード機能ではなく、手動でUpgradeを行う。

#### ファームウェアのダウンロード

下記のサイトより購入モデルに合致するファームウェアのダウンロードを行う。(日本語ページだとダウンロードできる機種が限定される場合がある。) [QNAP Systems, Inc. - Network Attached Storage (NAS)](http://www.qnap.com/i/en/product_x_down/) これ以降の手順はダウンロードしたimgファイル(zipファイルを解凍後)をPublicフォルダ直下に保管した状態で進める。(e.g. /share/Public/TS-419P\_20140412-4.0.7.img がサーバーに存在している)

#### ファームウェアの手動適用

Web UIよりSSHかTelnetサービスを起動。その後サーバーにログインの上で以下ののようにコマンド打鍵する。

```
$ ssh admin@192.0.2.1 ← 使用しているQNAPにログイン
# ls /mnt/HDA_ROOT/ ← updateディレクトがあることを確認。
ds.db              photo_scan.record  twonkymedia@       update_pkg/
lost+found/        ssl_lib/           update/
# ls /mnt/
HDA_ROOT/ HDB_ROOT/ HDC_ROOT/ HDD_ROOT/ config/   ext/      update@
# rm -rf /mnt/update ← updateファイルがあれば削除。
# cp /share/Public/TS-419P_20140412-4.0.7.img /share/Public/TS-419P_20140412-4.0.7-work.img
# ln -sf /mnt/HDA_ROOT/update /mnt/update
# /etc/init.d/update.sh /share/Public/TS-419P_20140412-4.0.7-work.img ← ファームウェアの適用
cksum=132710287
Check disk space available for FW update: OK.
Using 120-bit encryption - (QNAPNASVERSION4)
len=1048576
model name = TS-419P
version = 4.0.7
boot/
config/
fw_info
initrd.boot
initrd.boot.cksum
libcrypto.so.1.0.0
libssl.so.1.0.0
qpkg.tar
qpkg.tar.cksum
rootfs2.img
rootfs2.img.cksum
rootfs_ext.tgz
rootfs_ext.tgz.cksum
uImage
uImage.cksum
update/
update_img.sh
4.0.7 20140412
MODEL NAME = TS-419P II+,new version = 4.0.7
limit version = 3.6.0
Allow upgrade
tune2fs 1.41.4 (27-Jan-2009)
Setting maximal mount count to -1
Setting interval between checks to 0 seconds
Update image using HDD ...
Check uImage size ... Pass
Check initrd.boot size ... Pass
Check rootfs2.img size ... Pass
Check Flash ROM
Update Kernel ...
Update Basic RootFS ...
Update Basic RootFS2 ...
1+0 records in
1+0 records out
Update Finished.
set cksum [132710287] ← これで適用完了(最後にビープ音が数回鳴る)
# reboot ← 手動でサーバーを再起動

```

### 参考サイト

[Manually Updating Firmware - QNAPedia](http://wiki.qnap.com/wiki/Manually_Updating_Firmware)
