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
      $bezeichnung = mysqli_real_escape_string($conn ,$_GET["bezeichnung"]);
      $strasse = mysqli_real_escape_string($conn ,$_GET["strasse"]);
      $orstschaft = mysqli_real_escape_string($conn ,$_GET["orstschaft"]);
      $postleitzahl = mysqli_real_escape_string($conn ,$_GET["postleitzahl"]);
      $iPadresse = mysqli_real_escape_string($conn ,$_GET["iPadresse"]);
      $FiLand = mysqli_real_escape_string($conn ,$_GET["FiLand"]);
      $FiKunde = mysqli_real_escape_string($conn ,$_GET["FiKunde"]);

      $sql = "INSERT INTO tblfilialen (Bezeichnung, Strasse, Orstschaft, Postleitzahl, IPadresse, FiLand, FiKunde)
              VALUES ('$bezeichnung', '$strasse', '$orstschaft', '$postleitzahl', '$iPadresse', $FiLand, $FiKunde)";

      if ($conn->query($sql) === TRUE) {
        $ausgabe = true;
      } else {
        $ausgabe = null;
      }
    }
    echo json_encode($ausgabe);
    mysqli_close($conn);
  }
?>
