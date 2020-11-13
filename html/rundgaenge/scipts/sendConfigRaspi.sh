#!/bin/bash

source="/home/pi/rundgangfiles/"
destination="/home/matda327/rundgangfiles"

username="pi"
ip="192.168.178.39"

ping -q -c2 $ip > /dev/null

if [ $? -eq 0 ]
then
	rsync -az $username@$ip:$source $destination
fi
