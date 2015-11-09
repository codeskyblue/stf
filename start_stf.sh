#!/bin/bash -
#

PUBLIC_IP=
case $(uname) in
	Darwin)
		PUBLIC_IP=$(ipconfig getifaddr en0)
		;;
	Linux)
		PUBLIC_IP=$(/sbin/ifconfig | grep 'inet ' | grep -v '127.0' | grep -v ":172\.*" | awk '{print $2}' | cut -d: -f2)
		;;
esac

export TMPDIR=$PWD/tmp

node lib/cli.js local --public-ip $PUBLIC_IP \
    --auth-type openid --auth-options '["--identifier=https://login.netease.com/openid/"]' \
    --bind-dev-pub=tcp://$PUBLIC_IP:7114 \
    --bind-dev-pull=tcp://$PUBLIC_IP:7116
exit $?
