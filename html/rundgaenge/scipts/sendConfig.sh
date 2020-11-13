#!/bin/bash
source="/var/www/html/rundgaenge/$1"
destination="/home/pi/rundgangConfig"

username="pi"
ip="$2"

ping -q -c2 $ip > /dev/null

if [ $? -eq 0 ]
then
	rsync -az $source $username@$ip:$destination
fi
