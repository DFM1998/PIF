<?php
session_start();
if (isset($_SESSION["login"]) && $_SESSION["login"] == true) {
  header("Content-Type: application/json");
  include './databaseConnection.php';
  $ausgabe = array();
  if (!$conn) {
    $ausgabe = false;
  }
  else {
  $sql = "SELECT `IDToken`,`Tokenbezeichnung`,`Gueltigkeitsindikator`,`Vorname`,`FiMitarbeiter` FROM `tbltoken`,`tblmitarbeiter` WHERE `FiMitarbeiter`=`IDMitarbeiter`";
  $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
      while($row = mysqli_fetch_array($result)){
        $ausgabe[] = $row["IDToken"] ;
        $ausgabe[] = $row["Tokenbezeichnung"] ;
        $ausgabe[] = $row["Gueltigkeitsindikator"] ;
        $ausgabe[] = $row["Vorname"];
        $ausgabe[] = $row["FiMitarbeiter"];
      }
    }else {
      $ausgabe = false;
    }
  }
  echo json_encode($ausgabe);
  mysqli_close($conn);
}
 ?>
