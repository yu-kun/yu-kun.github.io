---
title: 'Linux: SUID, SGIDプログラムの検索 - findコマンド'
date: 2013-11-18
authors: [yukun]
tags:
  - linux
  - security
slug: linux-suid-sgid-find
---

Linuxシステム内のプログラムのパーミッションににSUID(set user-ID)ビットもしくはSGID(set group-ID)ビットが設定されていると、プログラムの実行ユーザの権限ではなく、プログラムの所有ユーザ、グループの権限で実行される。(IBM i の借用権限みたいなものかな)例として、ユーザのパスワード変更コマンドであるpasswdコマンドがある。 

```bash
 # ls -l /usr/bin/passwd -rwsr-xr-x. 1 root root 30768 Feb 22 2012 /usr/bin/passwd 
```

 passwdコマンドはその他一般ユーザから実行可能であり、かつ下記の/etc/passwdファイルを編集する権限も必要である為、SUIDビットを立てている。 

```bash
 # ls -l /etc/passwd -rw-r--r--. 1 root root 1686 Jun 27 19:31 /etc/passwd 
```

 SUID, SGIDビットのプログラムはユーザに対して高権限を与える側面もある為、システム攻撃者のバックドアプログラム/スクリプトとして悪用されることもある。これらを発見する手段の一つとして下記のコマンドがある。 

```bash
 # find / \( -perm -4000 -or -perm -2000 \) -type f -exec ls -la {} \; 
```

 簡単に解説すると()内の-permが検索対象のパーミッション設定、-type fで通常ファイルタイプを検索、-execでfind検索結果を-execの後続のコマンドに渡す。その際{}の箇所に検索結果を渡せる。VM上のLinuxで実行した結果は下記の通り。 

```bash
 # find / \( -perm -4000 -or -perm -2000 \) -type f -exec ls -la {} \; find: `/proc/3652/task/3652/fd/5': No such file or directory find: `/proc/3652/task/3652/fdinfo/5': No such file or directory find: `/proc/3652/fd/5': No such file or directory find: `/proc/3652/fdinfo/5': No such file or directory -rwsr-x---. 1 root dbus 50552 Sep 14 2012 /lib64/dbus-1/dbus-daemon-launch-helper -rws--x--x. 1 root root 14280 Oct 14 17:14 /usr/libexec/pt_chown -rwsr-xr-x. 1 root root 11080 Sep 20 03:40 /usr/libexec/polkit-1/polkit-agent-helper-1 -rwx--s--x. 1 root utmp 9808 Aug 19 2010 /usr/libexec/utempter/utempter -rwsr-xr-x. 1 root root 224912 Feb 22 2013 /usr/libexec/openssh/ssh-keysign -rwsr-xr-x. 1 root root 12872 Jul 12 2012 /usr/libexec/pulse/proximity-helper -rwsr-xr-x. 1 abrt abrt 5792 Sep 26 22:11 /usr/libexec/abrt-action-install-debuginfo-to-abrt-cache -rwx--s--x. 1 root utmp 17160 May 23 00:10 /usr/lib64/vte/gnome-pty-helper -rwsr-xr-x. 1 root root 61152 Nov 13 2012 /usr/lib64/nspluginwrapper/plugin-config -r-sr-xr-x. 1 root root 10224 Feb 18 2013 /usr/lib/vmware-tools/bin64/vmware-user-suid-wrapper -r-sr-xr-x. 1 root root 9532 Feb 18 2013 /usr/lib/vmware-tools/bin32/vmware-user-suid-wrapper -rwsr-xr-x. 1 root root 30768 Feb 22 2012 /usr/bin/passwd -rwsr-xr-x. 1 root root 36144 Dec 8 2011 /usr/bin/newgrp -rwxr-sr-x. 1 root tty 12016 Apr 29 2013 /usr/bin/write ---s--x---. 1 root stapusr 162584 Feb 22 2013 /usr/bin/staprun -r-xr-sr-x. 1 root tty 15224 Jul 19 2011 /usr/bin/wall -rws--x--x. 1 root root 20056 Apr 29 2013 /usr/bin/chsh -rwsr-xr-x. 1 root root 18072 Sep 20 03:40 /usr/bin/pkexec -rwsr-xr-x. 1 root root 71480 Dec 8 2011 /usr/bin/gpasswd -rwxr-sr-x. 1 root mail 20392 Aug 19 2010 /usr/bin/lockfile -rwsr-xr-x. 1 root root 47520 Jul 19 2011 /usr/bin/crontab -rwsr-xr-x. 1 root root 54240 Jan 30 2012 /usr/bin/at -rwxr-sr-x. 1 root nobody 112704 Feb 22 2013 /usr/bin/ssh-agent -rwx--s--x. 1 root slocate 38464 Oct 10 2012 /usr/bin/locate -rwsr-xr-x. 1 root root 2214792 Oct 16 03:56 /usr/bin/Xorg -rws--x--x. 1 root root 20184 Apr 29 2013 /usr/bin/chfn ---s--x--x. 1 root root 123832 Feb 22 2013 /usr/bin/sudo -rwsr-xr-x. 1 root root 66352 Dec 8 2011 /usr/bin/chage -rwxr-sr-x. 1 root smmsp 833512 Nov 12 2010 /usr/sbin/sendmail.sendmail -rwxr-sr-x. 1 root postdrop 213736 Dec 3 2011 /usr/sbin/postqueue -rwsr-xr-x. 1 root root 9000 Aug 5 22:21 /usr/sbin/usernetctl -rws--x--x. 1 root root 41136 Aug 23 2010 /usr/sbin/userhelper -r-s--x---. 1 root apache 13984 Aug 14 02:30 /usr/sbin/suexec -rwxr-sr-x. 1 root postdrop 180808 Dec 3 2011 /usr/sbin/postdrop -rwx--s--x. 1 root lock 15808 Aug 19 2010 /usr/sbin/lockdev -rwsr-xr-x. 1 root root 53472 Apr 29 2013 /bin/umount -rwsr-x---. 1 root fuse 32336 Dec 8 2011 /bin/fusermount -rwsr-xr-x. 1 root root 34904 May 23 20:00 /bin/su -rwsr-xr-x. 1 root root 40760 Sep 26 23:35 /bin/ping -rwsr-xr-x. 1 root root 36488 Sep 26 23:35 /bin/ping6 -rwsr-xr-x. 1 root root 77336 Apr 29 2013 /bin/mount -rwxr-sr-x. 1 root root 8792 Aug 5 22:21 /sbin/netreport -rwsr-xr-x. 1 root root 10272 Feb 22 2013 /sbin/pam_timestamp_check -rwsr-xr-x. 1 root root 34840 Feb 22 2013 /sbin/unix_chkpwd 
```

 diffコマンドやcronと併用することで、定期的に差分チェックが可能。 仮に不要なビット設定がされているコマンドがあった場合は以下のコマンドでSUID, SGIDを削除する。 

```bash
 chmod u-s ＜ファイル名＞ chmod g-s ＜ファイル名＞ 
```

 実行後の対象ファイルのパーミッションは通常のxに置き換わる。
