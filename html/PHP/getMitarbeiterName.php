<?php
session_start();
if (isset($_SESSION["login"]) && $_SESSION["login"] == true) {
  header("Content-Type: application/json");
  include './databaseConnection.php';
  $ausgabe = array();
  // Check connection
  if (!$conn) {
    $ausgabe = null;
  }else {
  $sql = "SELECT `IDMitarbeiter`,`Nachname`,`Vorname`  FROM `tblmitarbeiter` WHERE `Rechte`>2";
  $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
      while($row = mysqli_fetch_array($result)){
        $ausgabe[] = $row["IDMitarbeiter"] ;
        $ausgabe[] = $row["Nachname"] ;
        $ausgabe[] = $row["Vorname"] ;
      }
    }else {
      $ausgabe = null;
    }
  }
  echo json_encode($ausgabe);
  mysqli_close($conn);
}
 ?>
