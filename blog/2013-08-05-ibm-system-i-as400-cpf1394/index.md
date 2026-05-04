---
title: 'IBM System i (AS400): CPF1394 User profile XXX cannot sign on.の解決策'
date: 2013-08-05
authors: [yukun]
tags:
  - as400
  - ibm
  - system-i
slug: ibm-system-i-as400-cpf1394
---

IBM System iへのSign-on(サインオン)時に上記のCPF1394のエラーが発生した場合の対応としては先ず、当該ユーザープロファイルのステータスを確認する。 
<!-- truncate -->


### 対応

```
> DSPUSRPRF XXXXXX

```

実行結果は以下の通り。

```
                                           Display User Profile - *BASIC
 User Profile . . . . . . . . . . . . . . . :   XXXXXX
 Previous sign-on . . . . . . . . . . . . . :
 Sign-on attempts not valid . . . . . . . . :   7
 Status . . . . . . . . . . . . . . . . . . :   *DISABLED
 Date password last changed . . . . . . . . :   13-07-30
＜後略＞

```

Statusが\*Disabledになっているので、CHGUSRPRFコマンド等で\*Enabledに変更することで、Sign-on可能状態となる。

```
> CHGUSRPRF USRPRF(XXXXXX) STATUS(*ENABLED)

```

```
                                           Display User Profile - *BASIC
 User Profile . . . . . . . . . . . . . . . :   XXXXXX
 Previous sign-on . . . . . . . . . . . . . :
 Sign-on attempts not valid . . . . . . . . :   0
 Status . . . . . . . . . . . . . . . . . . :   *ENABLED
 Date password last changed . . . . . . . . :   13-07-30
＜後略＞

```

### 原因

因みにエラーの原因はSign-onを7回失敗し、システムのSign-on試行上限を超えた為、Disabledとなったもの。尚、システム値にて試行上限はQMAXSIGN(Shippedは3)、また、上限を超えて誤った場合の挙動はQMAXSGNACNで設定可能。

```
QMAXSGNACN  *SEC     Action to take for failed signon attempts
QMAXSIGN    *SEC     Maximum sign-on attempts allowed

```
