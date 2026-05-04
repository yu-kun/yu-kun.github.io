---
title: 'ethOS: B250 Mining ExpertのUSBブート用BIOS設定'
date: 2018-08-12
authors: [yukun]
tags:
  - bios
  - ethos
  - mining
slug: asus-b250-usb-boot-bios
---

先日、知人からASUS B250 Mining Expertマザーボード([公式Link](https://www.asus.com/jp/Motherboards/B250-MINING-EXPERT/) ／ [Amazon](https://amzn.to/2OtxvIH))を譲って貰ったので、セットアップで躓いた点を記録に残しておく。

今回はこのマザーボードを用いてethOSイメージをUSBメモリから起動を試みたところ、初期のBIOS設定ではOSは起動せず、BIOSメニュー画面に遷移する為、USBブートする為のBIOS設定を以下に記載する。


<!-- truncate -->


### BIOS設定

BIOS設定画面へ遷移後にAdvanced Modeに変更後、下記画像遷移の通り操作を進める。

先ずは、Bootタブ→CSMにカーソルを合わせてEnterを押下。 [![B250_mining_expert_bios_usb1](./B250_mining_expert_bios_usb1.jpg)](./B250_mining_expert_bios_usb1.jpg)

Launch CSMにカーソルを合わせてEnterを押下。 [![B250_mining_expert_bios_usb2](./B250_mining_expert_bios_usb2.jpg)](./B250_mining_expert_bios_usb2.jpg)

Enabledにカーソルを合わせてEnterを押下。 [![B250_mining_expert_bios_usb3](./B250_mining_expert_bios_usb3.jpg)](./B250_mining_expert_bios_usb3.jpg)

そうすると下図の画面構成となる。 [![B250_mining_expert_bios_usb4](./B250_mining_expert_bios_usb4.jpg)](./B250_mining_expert_bios_usb4.jpg)

ExitタブのSave Changes & Resetにカーソルを合わせてEnterを押下。 [![B250_mining_expert_bios_usb5](./B250_mining_expert_bios_usb5.jpg)](./B250_mining_expert_bios_usb5.jpg)

確認のポップアップ画面が表示されるのでOKでEnter。 [![B250_mining_expert_bios_usb6](./B250_mining_expert_bios_usb6.jpg)](./B250_mining_expert_bios_usb6.jpg)

その後、マシンに再起動が掛かる。USBメモリを挿入済みであれば無操作で下図の画面まで遷移する。既にUSBブート済みであり、ここから数分経つとethOSの初期画面に遷移する。 [![B250_mining_expert_bios_usb7](./B250_mining_expert_bios_usb7.jpg)](./B250_mining_expert_bios_usb7.jpg)
