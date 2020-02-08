source ../privateconf/set.sh
setconf ${1}

#SElinux無効
sed -i "s/\(^SELINUX=\).*/\1disabled/" /etc/selinux/config

#ファイルディスクリプタ変更
echo "* soft nofile 65536" >> /etc/security/limits.conf
echo "* hard nofile 65536" >> /etc/security/limits.conf

#カーネルパラメータ変更
echo "vm.swappiness = 10" >> /etc/sysctl.conf
echo "net.core.somaxconn = 1024" >> /etc/sysctl.conf

#hostname変更
echo "portfolio" > /etc/hostname

#history設定変更
sed -i -e "s/HISTSIZE=1000/#HISTSIZE=1000/g" /etc/profile
sed -i -e "/#HISTSIZE=1000/a HISTSIZE=10000" /etc/profile
echo "HISTTIMEFORMAT='%F %T '" >> /etc/profile
echo "unset HISTCONTROL" >> /etc/profile
echo "export HISTSIZE HISTTIMEFORMAT" >> /etc/profile

#ssh設定変更
sed -i -e "/#Port 22/a Port $hostSshPort"  /etc/ssh/sshd_config
sed -i -e "/#PasswordAuthentication yes/a PasswordAuthentication no"  /etc/ssh/sshd_config

#FW設定変更
sed -i -e "/ssh/a <port protocol=\"tcp\" port=\"$hostSshPort\"/>"  /etc/firewalld/zones/public.xml
sed -i -e "/ssh/a <port protocol=\"tcp\" port=\"443\"/>"  /etc/firewalld/zones/public.xml
sed -i -e "/ssh/a <port protocol=\"tcp\" port=\"80\"/>"  /etc/firewalld/zones/public.xml
sed -i -e "/ssh/d" /etc/firewalld/zones/public.xml
sed -i -e "/dhcpv6-client/d" /etc/firewalld/zones/public.xml

#yumアップデート
yum update -y

#再起動
reboot
