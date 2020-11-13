<?php
session_start();
if (isset($_SESSION["login"]) && $_SESSION["login"] == true) {
  header("Content-Type: application/json");
  include './databaseConnection.php';
  $ausgabe = array();
  if (!$conn) {
    $ausgabe = null;
  }else {
    $sql = "SELECT tblfilialen.Bezeichnung,tblfilialen.Strasse,`Orstschaft`,tblfilialen.Postleitzahl,`IPadresse`,`Land`,`Nachname`,`Vorname`,`IDFilialen`  FROM `tblfilialen`, `tblkunde`,`tblland` WHERE `FiKunde`=`IdKunde` AND tblfilialen.FiLand=`IdLand`";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
      while($row = mysqli_fetch_assoc($result)) {
        $ausgabe[] = $row["Bezeichnung"];
        $ausgabe[] = $row["Strasse"];
        $ausgabe[] = $row["Orstschaft"];
        $ausgabe[] = $row["Postleitzahl"];
        $ausgabe[] = $row["IPadresse"];
        $ausgabe[] = $row["Land"];
        $ausgabe[] = $row["Nachname"];
        $ausgabe[] = $row["Vorname"];
        $ausgabe[] = $row["IDFilialen"];
      }
    } else {
      $ausgabe = null;
    }
    echo json_encode($ausgabe);
    mysqli_close($conn);
  }
}


 ?>
