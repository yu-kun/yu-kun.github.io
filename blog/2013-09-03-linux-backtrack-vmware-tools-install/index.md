---
title: 'Linux: BackTrack5 R3にVMWare Toolsをインストール'
date: 2013-09-03
authors: [yukun]
tags:
  - linux
  - vmware
slug: linux-backtrack-vmware-tools-install
---

VMWare Fusion上のBackTrackは初期状態だと、ホストOS(Mac)側とコピペやファイルのドラッグ＆ドロップや画面サイズの動的変更機能が使えない。手動でVMWare Toolsをインストールする必要がある。手順は下記のサイトの通り。 [VMware Tools - BackTrack Linux](https://www.backtrack-linux.org/wiki/index.php/VMware_Tools) 下記は作業ログ。基本的にEnterの連打で完了する。インストール後に再起動すればToolsの反映・起動が完了する。 
<!-- truncate -->
 

```bash
root@bt:~# mkdir /etc/cups/ppd
root@bt:~# prepare-kernel-sources
[*] Kernel source seems to be available
  HOSTCC  scripts/basic/fixdep
  HOSTCC  scripts/kconfig/conf.o
  HOSTCC  scripts/kconfig/zconf.tab.o
  HOSTLD  scripts/kconfig/conf
scripts/kconfig/conf --silentoldconfig Kconfig
  HOSTCC  scripts/mod/mk_elfconfig
  MKELF   scripts/mod/elfconfig.h
  HOSTCC  scripts/mod/file2alias.o
  HOSTCC  scripts/mod/modpost.o
  HOSTCC  scripts/mod/sumversion.o
  HOSTLD  scripts/mod/modpost
  HOSTCC  scripts/selinux/genheaders/genheaders
  HOSTCC  scripts/selinux/mdp/mdp
  HOSTCC  scripts/kallsyms
  HOSTCC  scripts/conmakehash
  HOSTCC  scripts/bin2c
  HOSTCC  scripts/recordmcount
  CHK     include/linux/version.h
  CHK     include/generated/utsrelease.h
  CC      arch/x86/kernel/asm-offsets.s
  GEN     include/generated/asm-offsets.h
  CALL    scripts/checksyscalls.sh
[*] tada!
```

 ここで、メニューバーよりInstall VMWare Toolsをクリック。マウント後以下の手順に進む。 

```bash
root@bt:~# mkdir /mnt/cdrom; mount /dev/cdrom /mnt/cdrom
mount: block device /dev/sr0 is write-protected, mounting read-only
root@bt:~# cp /mnt/cdrom/VMwareTools-9.2.2-893683.tar.gz /tmp/
root@bt:~# cd /tmp/
root@bt:/tmp# ls
keyring-fypS8a  pulse-gQhWkxtWEQob     ssh-GXapxU1378
orbit-root      serverauth.obLodtP6Fx  VMwareTools-9.2.2-893683.tar.gz
root@bt:/tmp# tar zxpf VMwareTools-9.2.2-893683.tar.gz
root@bt:/tmp# cd vmware-tools-distrib/
root@bt:/tmp/vmware-tools-distrib# ls
bin  doc  etc  FILES  INSTALL  installer  lib  vmware-install.pl
root@bt:/tmp/vmware-tools-distrib# ./vmware-install.pl
Creating a new VMware Tools installer database using the tar4 format.
Installing VMware Tools.
In which directory do you want to install the binary files?
[/usr/bin]
What is the directory that contains the init directories (rc0.d/ to rc6.d/)?
[/etc]
What is the directory that contains the init scripts?
[/etc/init.d]
In which directory do you want to install the daemon files?
[/usr/sbin]
In which directory do you want to install the library files?
[/usr/lib/vmware-tools]
The path "/usr/lib/vmware-tools" does not exist currently. This program is
going to create it, including needed parent directories. Is this what you want?
[yes]
In which directory do you want to install the documentation files?
[/usr/share/doc/vmware-tools]
The path "/usr/share/doc/vmware-tools" does not exist currently. This program
is going to create it, including needed parent directories. Is this what you
want? [yes]
The installation of VMware Tools 9.2.2 build-893683 for Linux completed
successfully. You can decide to remove this software from your system at any
time by invoking the following command: "/usr/bin/vmware-uninstall-tools.pl".
Before running VMware Tools for the first time, you need to configure it by
invoking the following command: "/usr/bin/vmware-config-tools.pl". Do you want
this program to invoke the command for you now? [yes]
Initializing...
Making sure services for VMware Tools are stopped.
The VMware FileSystem Sync Driver (vmsync) allows external third-party backup
software that is integrated with vSphere to create backups of the virtual
machine. Do you wish to enable this feature? [no]
Before you can compile modules, you need to have the following installed...
make
gcc
kernel headers of the running kernel
Searching for GCC...
Detected GCC binary at "/usr/bin/gcc".
The path "/usr/bin/gcc" appears to be a valid path to the gcc binary.
Would you like to change it? [no]
Searching for a valid kernel header path...
Detected the kernel headers at "/lib/modules/3.2.6/build/include".
The path "/lib/modules/3.2.6/build/include" appears to be a valid path to the
3.2.6 kernel headers.
Would you like to change it? [no]
Using 2.6.x kernel build system.
make: Entering directory `/tmp/modconfig-LGoNJW/vmci-only'
/usr/bin/make -C /lib/modules/3.2.6/build/include/.. SUBDIRS=$PWD SRCROOT=$PWD/. \
	  MODULEBUILDDIR= modules
make[1]: Entering directory `/usr/src/linux-source-3.2.6'
  WARNING: Symbol version dump /usr/src/linux-source-3.2.6/Module.symvers
           is missing; modules will have no dependencies and modversions.
  CC [M]  /tmp/modconfig-LGoNJW/vmci-only/linux/driver.o
  CC [M]  /tmp/modconfig-LGoNJW/vmci-only/linux/vmciKernelIf.o
  CC [M]  /tmp/modconfig-LGoNJW/vmci-only/common/vmciContext.o
  CC [M]  /tmp/modconfig-LGoNJW/vmci-only/common/vmciDatagram.o
  CC [M]  /tmp/modconfig-LGoNJW/vmci-only/common/vmciDoorbell.o
  CC [M]  /tmp/modconfig-LGoNJW/vmci-only/common/vmciDriver.o
  CC [M]  /tmp/modconfig-LGoNJW/vmci-only/common/vmciEvent.o
  CC [M]  /tmp/modconfig-LGoNJW/vmci-only/common/vmciHashtable.o
  CC [M]  /tmp/modconfig-LGoNJW/vmci-only/common/vmciQPair.o
  CC [M]  /tmp/modconfig-LGoNJW/vmci-only/common/vmciQueuePair.o
  CC [M]  /tmp/modconfig-LGoNJW/vmci-only/common/vmciResource.o
  CC [M]  /tmp/modconfig-LGoNJW/vmci-only/common/vmciRoute.o
  CC [M]  /tmp/modconfig-LGoNJW/vmci-only/driverLog.o
  LD [M]  /tmp/modconfig-LGoNJW/vmci-only/vmci.o
  Building modules, stage 2.
  MODPOST 1 modules
  CC      /tmp/modconfig-LGoNJW/vmci-only/vmci.mod.o
  LD [M]  /tmp/modconfig-LGoNJW/vmci-only/vmci.ko
make[1]: Leaving directory `/usr/src/linux-source-3.2.6'
/usr/bin/make -C $PWD SRCROOT=$PWD/. \
	  MODULEBUILDDIR= postbuild
make[1]: Entering directory `/tmp/modconfig-LGoNJW/vmci-only'
make[1]: `postbuild' is up to date.
make[1]: Leaving directory `/tmp/modconfig-LGoNJW/vmci-only'
cp -f vmci.ko ./../vmci.o
make: Leaving directory `/tmp/modconfig-LGoNJW/vmci-only'
Using 2.6.x kernel build system.
make: Entering directory `/tmp/modconfig-Wciuwn/vmci-only'
/usr/bin/make -C /lib/modules/3.2.6/build/include/.. SUBDIRS=$PWD SRCROOT=$PWD/. \
	  MODULEBUILDDIR= modules
make[1]: Entering directory `/usr/src/linux-source-3.2.6'
  WARNING: Symbol version dump /usr/src/linux-source-3.2.6/Module.symvers
           is missing; modules will have no dependencies and modversions.
  CC [M]  /tmp/modconfig-Wciuwn/vmci-only/linux/driver.o
  CC [M]  /tmp/modconfig-Wciuwn/vmci-only/linux/vmciKernelIf.o
  CC [M]  /tmp/modconfig-Wciuwn/vmci-only/common/vmciContext.o
  CC [M]  /tmp/modconfig-Wciuwn/vmci-only/common/vmciDatagram.o
  CC [M]  /tmp/modconfig-Wciuwn/vmci-only/common/vmciDoorbell.o
  CC [M]  /tmp/modconfig-Wciuwn/vmci-only/common/vmciDriver.o
  CC [M]  /tmp/modconfig-Wciuwn/vmci-only/common/vmciEvent.o
  CC [M]  /tmp/modconfig-Wciuwn/vmci-only/common/vmciHashtable.o
  CC [M]  /tmp/modconfig-Wciuwn/vmci-only/common/vmciQPair.o
  CC [M]  /tmp/modconfig-Wciuwn/vmci-only/common/vmciQueuePair.o
  CC [M]  /tmp/modconfig-Wciuwn/vmci-only/common/vmciResource.o
  CC [M]  /tmp/modconfig-Wciuwn/vmci-only/common/vmciRoute.o
  CC [M]  /tmp/modconfig-Wciuwn/vmci-only/driverLog.o
  LD [M]  /tmp/modconfig-Wciuwn/vmci-only/vmci.o
  Building modules, stage 2.
  MODPOST 1 modules
  CC      /tmp/modconfig-Wciuwn/vmci-only/vmci.mod.o
  LD [M]  /tmp/modconfig-Wciuwn/vmci-only/vmci.ko
make[1]: Leaving directory `/usr/src/linux-source-3.2.6'
/usr/bin/make -C $PWD SRCROOT=$PWD/. \
	  MODULEBUILDDIR= postbuild
make[1]: Entering directory `/tmp/modconfig-Wciuwn/vmci-only'
make[1]: `postbuild' is up to date.
make[1]: Leaving directory `/tmp/modconfig-Wciuwn/vmci-only'
cp -f vmci.ko ./../vmci.o
make: Leaving directory `/tmp/modconfig-Wciuwn/vmci-only'
Using 2.6.x kernel build system.
make: Entering directory `/tmp/modconfig-Wciuwn/vsock-only'
/usr/bin/make -C /lib/modules/3.2.6/build/include/.. SUBDIRS=$PWD SRCROOT=$PWD/. \
	  MODULEBUILDDIR= modules
make[1]: Entering directory `/usr/src/linux-source-3.2.6'
  WARNING: Symbol version dump /usr/src/linux-source-3.2.6/Module.symvers
           is missing; modules will have no dependencies and modversions.
  CC [M]  /tmp/modconfig-Wciuwn/vsock-only/linux/notify.o
  CC [M]  /tmp/modconfig-Wciuwn/vsock-only/linux/af_vsock.o
  CC [M]  /tmp/modconfig-Wciuwn/vsock-only/linux/notifyQState.o
  CC [M]  /tmp/modconfig-Wciuwn/vsock-only/linux/stats.o
  CC [M]  /tmp/modconfig-Wciuwn/vsock-only/linux/util.o
  CC [M]  /tmp/modconfig-Wciuwn/vsock-only/linux/vsockAddr.o
  CC [M]  /tmp/modconfig-Wciuwn/vsock-only/driverLog.o
  LD [M]  /tmp/modconfig-Wciuwn/vsock-only/vsock.o
  Building modules, stage 2.
  MODPOST 1 modules
  CC      /tmp/modconfig-Wciuwn/vsock-only/vsock.mod.o
  LD [M]  /tmp/modconfig-Wciuwn/vsock-only/vsock.ko
make[1]: Leaving directory `/usr/src/linux-source-3.2.6'
/usr/bin/make -C $PWD SRCROOT=$PWD/. \
	  MODULEBUILDDIR= postbuild
make[1]: Entering directory `/tmp/modconfig-Wciuwn/vsock-only'
make[1]: `postbuild' is up to date.
make[1]: Leaving directory `/tmp/modconfig-Wciuwn/vsock-only'
cp -f vsock.ko ./../vsock.o
make: Leaving directory `/tmp/modconfig-Wciuwn/vsock-only'
The module vmxnet3 has already been installed on this system by another
installer or package and will not be modified by this installer.  Use the flag
--clobber-kernel-modules=vmxnet3 to override.
The module pvscsi has already been installed on this system by another
installer or package and will not be modified by this installer.  Use the flag
--clobber-kernel-modules=pvscsi to override.
The module vmmemctl has already been installed on this system by another
installer or package and will not be modified by this installer.  Use the flag
--clobber-kernel-modules=vmmemctl to override.
The VMware Host-Guest Filesystem allows for shared folders between the host OS
and the guest OS in a Fusion or Workstation virtual environment.  Do you wish
to enable this feature? [yes]
Using 2.6.x kernel build system.
make: Entering directory `/tmp/modconfig-tGS3HN/vmci-only'
/usr/bin/make -C /lib/modules/3.2.6/build/include/.. SUBDIRS=$PWD SRCROOT=$PWD/. \
	  MODULEBUILDDIR= modules
make[1]: Entering directory `/usr/src/linux-source-3.2.6'
  WARNING: Symbol version dump /usr/src/linux-source-3.2.6/Module.symvers
           is missing; modules will have no dependencies and modversions.
  CC [M]  /tmp/modconfig-tGS3HN/vmci-only/linux/driver.o
  CC [M]  /tmp/modconfig-tGS3HN/vmci-only/linux/vmciKernelIf.o
  CC [M]  /tmp/modconfig-tGS3HN/vmci-only/common/vmciContext.o
  CC [M]  /tmp/modconfig-tGS3HN/vmci-only/common/vmciDatagram.o
  CC [M]  /tmp/modconfig-tGS3HN/vmci-only/common/vmciDoorbell.o
  CC [M]  /tmp/modconfig-tGS3HN/vmci-only/common/vmciDriver.o
  CC [M]  /tmp/modconfig-tGS3HN/vmci-only/common/vmciEvent.o
  CC [M]  /tmp/modconfig-tGS3HN/vmci-only/common/vmciHashtable.o
  CC [M]  /tmp/modconfig-tGS3HN/vmci-only/common/vmciQPair.o
  CC [M]  /tmp/modconfig-tGS3HN/vmci-only/common/vmciQueuePair.o
  CC [M]  /tmp/modconfig-tGS3HN/vmci-only/common/vmciResource.o
  CC [M]  /tmp/modconfig-tGS3HN/vmci-only/common/vmciRoute.o
  CC [M]  /tmp/modconfig-tGS3HN/vmci-only/driverLog.o
  LD [M]  /tmp/modconfig-tGS3HN/vmci-only/vmci.o
  Building modules, stage 2.
  MODPOST 1 modules
  CC      /tmp/modconfig-tGS3HN/vmci-only/vmci.mod.o
  LD [M]  /tmp/modconfig-tGS3HN/vmci-only/vmci.ko
make[1]: Leaving directory `/usr/src/linux-source-3.2.6'
/usr/bin/make -C $PWD SRCROOT=$PWD/. \
	  MODULEBUILDDIR= postbuild
make[1]: Entering directory `/tmp/modconfig-tGS3HN/vmci-only'
make[1]: `postbuild' is up to date.
make[1]: Leaving directory `/tmp/modconfig-tGS3HN/vmci-only'
cp -f vmci.ko ./../vmci.o
make: Leaving directory `/tmp/modconfig-tGS3HN/vmci-only'
Using 2.6.x kernel build system.
make: Entering directory `/tmp/modconfig-tGS3HN/vmhgfs-only'
/usr/bin/make -C /lib/modules/3.2.6/build/include/.. SUBDIRS=$PWD SRCROOT=$PWD/. \
	  MODULEBUILDDIR= modules
make[1]: Entering directory `/usr/src/linux-source-3.2.6'
  WARNING: Symbol version dump /usr/src/linux-source-3.2.6/Module.symvers
           is missing; modules will have no dependencies and modversions.
  CC [M]  /tmp/modconfig-tGS3HN/vmhgfs-only/backdoorGcc64.o
  CC [M]  /tmp/modconfig-tGS3HN/vmhgfs-only/backdoor.o
  CC [M]  /tmp/modconfig-tGS3HN/vmhgfs-only/bdhandler.o
  CC [M]  /tmp/modconfig-tGS3HN/vmhgfs-only/cpName.o
  CC [M]  /tmp/modconfig-tGS3HN/vmhgfs-only/cpNameLinux.o
  CC [M]  /tmp/modconfig-tGS3HN/vmhgfs-only/cpNameLite.o
  CC [M]  /tmp/modconfig-tGS3HN/vmhgfs-only/dentry.o
  CC [M]  /tmp/modconfig-tGS3HN/vmhgfs-only/dir.o
  CC [M]  /tmp/modconfig-tGS3HN/vmhgfs-only/file.o
  CC [M]  /tmp/modconfig-tGS3HN/vmhgfs-only/filesystem.o
  CC [M]  /tmp/modconfig-tGS3HN/vmhgfs-only/fsutil.o
  CC [M]  /tmp/modconfig-tGS3HN/vmhgfs-only/hgfsBd.o
  CC [M]  /tmp/modconfig-tGS3HN/vmhgfs-only/hgfsEscape.o
  CC [M]  /tmp/modconfig-tGS3HN/vmhgfs-only/hgfsUtil.o
  CC [M]  /tmp/modconfig-tGS3HN/vmhgfs-only/inode.o
  CC [M]  /tmp/modconfig-tGS3HN/vmhgfs-only/link.o
  CC [M]  /tmp/modconfig-tGS3HN/vmhgfs-only/message.o
  CC [M]  /tmp/modconfig-tGS3HN/vmhgfs-only/module.o
  CC [M]  /tmp/modconfig-tGS3HN/vmhgfs-only/page.o
  CC [M]  /tmp/modconfig-tGS3HN/vmhgfs-only/request.o
  CC [M]  /tmp/modconfig-tGS3HN/vmhgfs-only/rpcout.o
  CC [M]  /tmp/modconfig-tGS3HN/vmhgfs-only/stubs.o
  CC [M]  /tmp/modconfig-tGS3HN/vmhgfs-only/super.o
  CC [M]  /tmp/modconfig-tGS3HN/vmhgfs-only/tcp.o
  CC [M]  /tmp/modconfig-tGS3HN/vmhgfs-only/transport.o
  CC [M]  /tmp/modconfig-tGS3HN/vmhgfs-only/vmci.o
  CC [M]  /tmp/modconfig-tGS3HN/vmhgfs-only/kernelStubsLinux.o
  LD [M]  /tmp/modconfig-tGS3HN/vmhgfs-only/vmhgfs.o
  Building modules, stage 2.
  MODPOST 1 modules
  CC      /tmp/modconfig-tGS3HN/vmhgfs-only/vmhgfs.mod.o
  LD [M]  /tmp/modconfig-tGS3HN/vmhgfs-only/vmhgfs.ko
make[1]: Leaving directory `/usr/src/linux-source-3.2.6'
/usr/bin/make -C $PWD SRCROOT=$PWD/. \
	  MODULEBUILDDIR= postbuild
make[1]: Entering directory `/tmp/modconfig-tGS3HN/vmhgfs-only'
make[1]: `postbuild' is up to date.
make[1]: Leaving directory `/tmp/modconfig-tGS3HN/vmhgfs-only'
cp -f vmhgfs.ko ./../vmhgfs.o
make: Leaving directory `/tmp/modconfig-tGS3HN/vmhgfs-only'
Using 2.6.x kernel build system.
make: Entering directory `/tmp/modconfig-BwzmBn/vmxnet-only'
/usr/bin/make -C /lib/modules/3.2.6/build/include/.. SUBDIRS=$PWD SRCROOT=$PWD/. \
	  MODULEBUILDDIR= modules
make[1]: Entering directory `/usr/src/linux-source-3.2.6'
  WARNING: Symbol version dump /usr/src/linux-source-3.2.6/Module.symvers
           is missing; modules will have no dependencies and modversions.
  CC [M]  /tmp/modconfig-BwzmBn/vmxnet-only/vmxnet.o
  Building modules, stage 2.
  MODPOST 1 modules
  CC      /tmp/modconfig-BwzmBn/vmxnet-only/vmxnet.mod.o
  LD [M]  /tmp/modconfig-BwzmBn/vmxnet-only/vmxnet.ko
make[1]: Leaving directory `/usr/src/linux-source-3.2.6'
/usr/bin/make -C $PWD SRCROOT=$PWD/. \
	  MODULEBUILDDIR= postbuild
make[1]: Entering directory `/tmp/modconfig-BwzmBn/vmxnet-only'
make[1]: `postbuild' is up to date.
make[1]: Leaving directory `/tmp/modconfig-BwzmBn/vmxnet-only'
cp -f vmxnet.ko ./../vmxnet.o
make: Leaving directory `/tmp/modconfig-BwzmBn/vmxnet-only'
The vmblock enables dragging or copying files between host and guest in a
Fusion or Workstation virtual environment.  Do you wish to enable this feature?
[yes]
!!! [EXPERIMENTAL] !!!
VMware automatic kernel modules enables automatic building and installation of
VMware kernel modules at boot that are not already present.  By selecting yes,
you will be enabling this experimental feature.  You can always disable this
feature by re-running vmware-config-tools.pl.
Would you like to enable VMware automatic kernel modules?
[no]
Disabling timer-based audio scheduling in pulseaudio.
Detected X server version 1.7.6
X is running fine with the new config file.
Creating a new initrd boot image for the kernel.
update-initramfs: Generating /boot/initrd.img-3.2.6
vmware-tools-thinprint start/running
vmware-tools start/running
The configuration of VMware Tools 9.2.2 build-893683 for Linux for this running
kernel completed successfully.
You must restart your X session before any mouse or graphics changes take
effect.
You can now run VMware Tools by invoking "/usr/bin/vmware-toolbox-cmd" from the
command line.
To enable advanced X features (e.g., guest resolution fit, drag and drop, and
file and text copy/paste), you will need to do one (or more) of the following:
1. Manually start /usr/bin/vmware-user
2. Log out and log back into your desktop session; and,
3. Restart your X session.
Enjoy,
--the VMware team
Found VMware Tools CDROM mounted at /media/VMware Tools. Ejecting device
/dev/sr0 ...
Found VMware Tools CDROM mounted at /mnt/cdrom. Ejecting device /dev/sr0 ...
root@bt:/tmp/vmware-tools-distrib#
```


