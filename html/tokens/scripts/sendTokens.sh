#!/bin/bash
source="/var/www/html/tokens/tokens.csv"
destination="/home/pi/tokens"

username="pi"

ips=$(mysql --defaults-extra-file=/etc/mysql/connection.cnf "dbpif" <<< "Select IPadresse from tblfilialen")

arr_ips=($ips)

for (( i = 1; i < "${#arr_ips[@]}"; i++ )); do
  
  ip="${arr_ips[$i]}"

  timeout 0.5 ping -q -c1 $ip > /dev/null

  if [ $? -eq 0 ]
  then
    echo "ok"
   	rsync -az $source $username@$ip:$destination
  fi

done
