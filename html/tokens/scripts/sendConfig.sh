#!/bin/bash
source="/var/www/html/tokens/tokens.csv"
destination="/home/pi/tokens"

username="pi"
ip="192.168.178.39"

ping -q -c2 $ip > /dev/null

if [ $? -eq 0 ]
then
	rsync -az $source $username@$ip:$destination
fi
