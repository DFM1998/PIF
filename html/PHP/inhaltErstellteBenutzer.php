<?php
session_start();
if (isset($_SESSION["login"]) && $_SESSION["login"] == true) {
  header("Content-Type: application/json");
  include './databaseConnection.php';
  $ausgabe = array();
  if (!$conn) {
    $ausgabe = null;
  }else {
  $sessionRechte = $_SESSION['rechte'];
  $sql = "SELECT `Nachname`,`Vorname`,`Email`,`Strasse`,`Wohnort`,`Postleitzahl`,`Benutzername`,`Rechte`,`Land`,`IDMitarbeiter`  FROM `tblmitarbeiter`,`tblland` WHERE `filand`=`idland` AND `Rechte`>$sessionRechte";
  $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
      while($row = mysqli_fetch_array($result)){
        $ausgabe[] = $row["Nachname"] ;
        $ausgabe[] = $row["Vorname"] ;
        $ausgabe[] = $row["Email"] ;
        $ausgabe[] = $row["Strasse"];
        $ausgabe[] = $row["Wohnort"];
        $ausgabe[] = $row["Postleitzahl"];
        $ausgabe[] = $row["Benutzername"];
        $ausgabe[] = $row["Rechte"];
        $ausgabe[] = $row["Land"];
        $ausgabe[] = $row["IDMitarbeiter"];
      }
    }else {
      $ausgabe = null;
    }
  }
  echo json_encode($ausgabe);
  mysqli_close($conn);
}
 ?>
