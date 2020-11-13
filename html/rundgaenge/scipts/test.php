<?php
$ausgabe = shell_exec("bash /var/www/html/rundgaenge/scipts/sendConfig.sh 10.1.3.65_2019-04-25-21-58.csv 192.168.178.39");
echo $ausgabe;
 ?>
