---
title: 'Kubernetes: エラー解決法 requires conntrack to be installed in root''s path'
date: 2020-04-14
authors: [yukun]
tags:
  - kubernetes
slug: kubernetes-error-conntrack
---

Ubuntu上に Kubernetes v1.18.0のminikubeをインストールしminikube startコマンドを実行したとろ、下記のエラーが発生し、minikube startコマンドが中断。


<!-- truncate -->


### エラーメッセージ


```bash
 $ sudo minikube --driver=none start 😄 minikube v1.9.2 on Ubuntu 16.04 (vbox/amd64) ✨ Using the none driver based on user configuration 💣 Sorry, Kubernetes v1.18.0 requires conntrack to be installed in root's path 
```


### 解決法

conntrackがインストールされていない為発生したエラー。下記コマンドでconntrackをインストールする。


```bash
 $ sudo apt install conntrack Reading package lists... Done Building dependency tree Reading state information... Done The following NEW packages will be installed: conntrack 0 upgraded, 1 newly installed, 0 to remove and 1 not upgraded. Need to get 27.3 kB of archives. After this operation, 91.1 kB of additional disk space will be used. Get:1 http://archive.ubuntu.com/ubuntu xenial/main amd64 conntrack amd64 1:1.4.3-3 [27.3 kB] Fetched 27.3 kB in 1s (25.4 kB/s) Selecting previously unselected package conntrack. (Reading database ... 62970 files and directories currently installed.) Preparing to unpack .../conntrack_1%3a1.4.3-3_amd64.deb ... Unpacking conntrack (1:1.4.3-3) ... Processing triggers for man-db (2.7.5-1) ... Setting up conntrack (1:1.4.3-3) ... $ 
```


インストール後は正常にminikubeコマンドを実行できる。


```bash
 $ sudo minikube start 😄 minikube v1.9.2 on Ubuntu 16.04 (vbox/amd64) ✨ Automatically selected the docker driver 🛑 The "docker" driver should not be used with root privileges. 💡 If you are running minikube within a VM, consider using --driver=none: 📘 https://minikube.sigs.k8s.io/docs/reference/drivers/none/ vagrant@minikube:~$ sudo minikube --driver=none start 😄 minikube v1.9.2 on Ubuntu 16.04 (vbox/amd64) ✨ Using the none driver based on user configuration 👍 Starting control plane node in cluster minikube 🤹 Running on localhost (CPUs=2, Memory=1999MB, Disk=9861MB) ... ℹ️ OS release is Ubuntu 16.04.6 LTS 🐳 Preparing Kubernetes v1.18.0 on Docker 18.06.2-ce ... ❗ This bare metal machine is having trouble accessing https://k8s.gcr.io 💡 To pull new external images, you may need to configure a proxy: > kubectl.sha256: 65 B / 65 B [--------------------------] 100.00% ? p/s 0s > kubeadm.sha256: 65 B / 65 B [--------------------------] 100.00% ? p/s 0s > kubelet.sha256: 65 B / 65 B [--------------------------] 100.00% ? p/s 0s > kubeadm: 37.96 MiB / 37.96 MiB [------------] 100.00% 216.61 KiB p/s 3m0s > kubectl: 41.98 MiB / 41.98 MiB [------------] 100.00% 233.34 KiB p/s 3m4s > kubelet: 108.01 MiB / 108.01 MiB [---------] 100.00% 408.56 KiB p/s 4m31s

🌟 Enabling addons: default-storageclass, storage-provisioner 🤹 Configuring local host environment ...

❗ The 'none' driver is designed for experts who need to integrate with an existing VM 💡 Most users should use the newer 'docker' driver instead, which does not require root! 📘 For more information, see: https://minikube.sigs.k8s.io/docs/reference/drivers/none/

❗ kubectl and minikube configuration will be stored in /home/vagrant ❗ To use kubectl or minikube commands as your own user, you may need to relocate them. For example, to overwrite your own settings, run:

▪ sudo mv /home/vagrant/.kube /home/vagrant/.minikube $HOME ▪ sudo chown -R $USER $HOME/.kube $HOME/.minikube

💡 This can also be done automatically by setting the env var CHANGE_MINIKUBE_NONE_USER=true 🏄 Done! kubectl is now configured to use "minikube"

❗ /usr/local/bin/kubectl is v1.13.4, which may be incompatible with Kubernetes v1.18.0. 💡 You can also use 'minikube kubectl -- get pods' to invoke a matching version

$ sudo kubectl get pod -n kube-system NAME READY STATUS RESTARTS AGE coredns-66bff467f8-5rwm9 1/1 Running 0 2m41s coredns-66bff467f8-kfsl4 1/1 Running 0 2m41s etcd-minikube 1/1 Running 0 2m50s kube-apiserver-minikube 1/1 Running 0 2m50s kube-controller-manager-minikube 1/1 Running 0 2m50s kube-proxy-7wnkw 1/1 Running 0 2m41s kube-scheduler-minikube 1/1 Running 0 2m50s storage-provisioner 1/1 Running 0 2m47s 
```


