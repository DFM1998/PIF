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
    $iDFilialen = $_GET["iDFilialen"];
    $bezeichnung = $_GET["bezeichnung"];
    $strasse = $_GET["strasse"];
    $orstschaft = $_GET["orstschaft"];
    $postleitzahl = $_GET["postleitzahl"];
    $ipadresse = $_GET["ipadresse"];
    $land = $_GET["land"];
    $kundename = $_GET["kundename"];
    $sql = "UPDATE tblfilialen SET Bezeichnung='" . $bezeichnung. "',Strasse='" . $strasse. "',Orstschaft='" . $orstschaft. "',Postleitzahl='" . $postleitzahl. "',FiLand='" . $land. "',FiKunde='" . $kundename. "',IPadresse='" . $ipadresse. "' WHERE IDFilialen='" . $iDFilialen . "'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_query($conn, $sql)) {
      $ausgabe = true;
      
    } else {
      $ausgabe = false;
    }
  }
  echo json_encode($ausgabe);
  mysqli_close($conn);
}
 ?>
