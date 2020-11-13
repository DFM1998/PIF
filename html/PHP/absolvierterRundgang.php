<?php
session_start();
if (isset($_SESSION["login"]) && $_SESSION["login"] == true) {
  header("Content-Type: application/json");
  include("databaseConnection.php");

  $ausgabe = array();

  // Check connection
  if (!$conn) {
    $ausgabe = null;
  }else {
  $sql = "SELECT `RundgangTasterSequenz`,`Anmelde_Zeit`, `Abmelde_Zeit`, `Erfolgreich`, `FiRundgang`, `Tokenbezeichnung`, `Zeitstempel` FROM `tblabsolvierterrunndgang`, `tbltoken` WHERE `IDToken`=`FiToken`";
  $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
      while($row = mysqli_fetch_array($result)){
        $ausgabe[] = $row["RundgangTasterSequenz"] ;
        $ausgabe[] = $row["Anmelde_Zeit"] ;
        $ausgabe[] = $row["Abmelde_Zeit"] ;
        $ausgabe[] = $row["Erfolgreich"] ;
        $ausgabe[] = $row["FiRundgang"];
        $ausgabe[] = $row["Tokenbezeichnung"];
        $ausgabe[] = $row["Zeitstempel"];
      }
    }else {
      $ausgabe = null;
    }
  }
  echo json_encode($ausgabe);
  mysqli_close($conn);
}



 ?>
