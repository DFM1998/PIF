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
    $mitarbeiter = $_GET["mitarbeiterID"];
    $mitarbeiterEscape =  mysqli_real_escape_string($conn, $mitarbeiter);

    $sql = "SELECT `IDMitarbeiter`,`Nachname`,`Vorname`,`Email`,`Strasse`,`Wohnort`,`Postleitzahl`,`Benutzername`,`Rechte`,`Land`,`Tokenbezeichnung`,`Gueltigkeitsindikator` FROM `tblmitarbeiter`,`tblland`,`tbltoken` WHERE `filand`=`idland` AND `FiMitarbeiter`=`idMitarbeiter` AND `IDMitarbeiter`='$mitarbeiterEscape'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
      if($row = mysqli_fetch_assoc($result)) {
        $ausgabe["IDMitarbeiter"] = $row["IDMitarbeiter"];
        $ausgabe["Nachname"] = $row["Nachname"] ;
        $ausgabe["Vorname"] = $row["Vorname"] ;
        $ausgabe["Email"] = $row["Email"] ;
        $ausgabe["Strasse"] = $row["Strasse"];
        $ausgabe["Wohnort"] = $row["Wohnort"];
        $ausgabe["Postleitzahl"] = $row["Postleitzahl"];
        $ausgabe["Land"] = $row["Land"];
        $ausgabe["Benutzername"] = $row["Benutzername"];
        $ausgabe["Rechte"] = $row["Rechte"];
        $ausgabe["Tokenbezeichnung"] = $row["Tokenbezeichnung"];
        $ausgabe["Gueltigkeitsindikator"] = $row["Gueltigkeitsindikator"];
      }else {
        $ausgabe = null;
      }
    } else {
      $ausgabe = null;
    }
    if ($ausgabe == null) {
      $sql = "SELECT `IDMitarbeiter`,`Nachname`,`Vorname`,`Email`,`Strasse`,`Wohnort`,`Postleitzahl`,`Benutzername`,`Rechte`,`Land` FROM `tblmitarbeiter`,`tblland`,`tbltoken` WHERE `filand`=`idland` AND `IDMitarbeiter`='$mitarbeiterEscape'";
      $result = mysqli_query($conn, $sql);

      if (mysqli_num_rows($result) > 0) {
        if($row = mysqli_fetch_assoc($result)) {
          $ausgabe["IDMitarbeiter"] = $row["IDMitarbeiter"];
          $ausgabe["Nachname"] = $row["Nachname"] ;
          $ausgabe["Vorname"] = $row["Vorname"] ;
          $ausgabe["Email"] = $row["Email"] ;
          $ausgabe["Strasse"] = $row["Strasse"];
          $ausgabe["Wohnort"] = $row["Wohnort"];
          $ausgabe["Postleitzahl"] = $row["Postleitzahl"];
          $ausgabe["Land"] = $row["Land"];
          $ausgabe["Benutzername"] = $row["Benutzername"];
          $ausgabe["Rechte"] = $row["Rechte"];
        }else {
          $ausgabe = null;
        }
      } else {
        $ausgabe = null;
      }
    }
  }
  echo json_encode($ausgabe);
  mysqli_close($conn);
}
 ?>
