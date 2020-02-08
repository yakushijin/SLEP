function setconf () {
source ../privateconf/set.conf

if [ ${1} = "dev" ]; then
domain=$devdomain
mymailaddress=$devmymailaddress
hostSshPort=$devHostSshPort
hostIp=$devHostIp
sshKey=$devSshKey
elif [ ${1} = "staging" ]; then
domain=$Stagindomain
mymailaddress=$Staginmymailaddress
hostSshPort=$StagingHostSshPort
hostIp=$StagingHostIp
sshKey=$StagingSshKey
elif [ ${1} = "prod" ]; then
domain=$Proddomain
mymailaddress=$Prodmymailaddress
hostSshPort=$ProdHostSshPort
hostIp=$ProdHostIp
sshKey=$ProdSshKey
else
echo "error"
exit 1
fi
}
