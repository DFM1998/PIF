<?php
  session_start();
  if (isset($_SESSION["login"]) && $_SESSION["login"] == true) {
    header("Content-Type: application/json");
    include './databaseConnection.php';
    $ausgabe = array();
    // Check connection
    if (!$conn) {
      $ausgabe = null;
    }
    else {
      $dauer = mysqli_real_escape_string($conn ,$_GET["dauer"]);
      $tastersequenz = mysqli_real_escape_string($conn ,$_GET["tastersequenz"]);
      $FiFilialen =  mysqli_real_escape_string($conn ,$_GET["selectFilial"]);
      $Bezeichnung =  mysqli_real_escape_string($conn ,$_GET["bezeichnung"]);

      $sql = "INSERT INTO tblrundgang (Dauer, Erstelldatum, Tastersequenz, FiFilialen, Bezeichnung)
      VALUES ('$dauer', CURTIME(), '$tastersequenz','$FiFilialen','$Bezeichnung')";

      if ($conn->query($sql) === TRUE) {
        $ausgabe = true;

        $sql = "SELECT * FROM tblrundgang,tblfilialen where idfilialen=fifilialen ORDER BY idrundgang DESC LIMIT 0,1 ";
        $result = mysqli_query($conn, $sql);

        $list = array();

        $ipadresse="";
        $filialenName="";
        $idFilial = "";
        if (mysqli_num_rows($result) > 0) {
            // output data of each row
            while($row = mysqli_fetch_assoc($result)) {
              array_push($list, $row["IDRundgang"]);
              array_push($list, $row["Dauer"]);
              array_push($list, $row["Tastersequenz"]);
              $idFilial=$row["IDFilialen"];
              $ipadresse=$row["IPadresse"];
              $filialenName=$row["Bezeichnung"];
            }
        }
        date_default_timezone_set("Europe/Luxembourg");
        $date = date('Y-m-d_H:i:s');
        $filename = $ipadresse. "_" . $date . ".csv";
        shell_exec("mkdir ../rundgaenge/$idFilial");
        $file = fopen("../rundgaenge/$idFilial/$filename","w");


        fputcsv($file,$list);
        fclose($file);

        shell_exec("bash /var/www/html/rundgaenge/scipts/sendConfig.sh $idFilial/$filename $ipadresse");
        shell_exec("bash /var/www/html/tokens/scripts/sendTokens.sh");

        // the message
        $msg = "Es wurde ein neuer Rundgang an der Filiale $filialenName erstellt.\nDie maximale Dauer des Rundgangs ist $list[1] Minuten und hat folgende Tastersequenz $list[2]. Bezeichnung: $Bezeichnung";

        // use wordwrap() if lines are longer than 70 characters
        $msg = wordwrap($msg,100);

        $sql = "SELECT `Email` FROM `tblmitarbeiter` WHERE `Rechte`=3";
        $result = mysqli_query($conn, $sql);
        $email=array();
        if (mysqli_num_rows($result) > 0) {
            while($row = mysqli_fetch_assoc($result)) {
              $email[]=$row["Email"];
            }
        }
        for ($i=0; $i < count($email); $i++) {
          // send email
          mail("$email[$i]","Rundgang #$list[0]",$msg);
        }
      } else {
        $ausgabe = null;
      }
    }
    echo json_encode($ausgabe);
    mysqli_close($conn);
  }
?>
