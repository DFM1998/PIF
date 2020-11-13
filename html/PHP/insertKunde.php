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
      $nachname = mysqli_real_escape_string($conn ,$_GET["nachname"]);
      $vorname = mysqli_real_escape_string($conn ,$_GET["vorname"]);
      $telefon = mysqli_real_escape_string($conn ,$_GET["telefon"]);
      $email = mysqli_real_escape_string($conn ,$_GET["email"]);
      $strasse = mysqli_real_escape_string($conn ,$_GET["strasse"]);
      $wohnort = mysqli_real_escape_string($conn ,$_GET["wohnort"]);
      $postleitzahl = mysqli_real_escape_string($conn ,$_GET["postleitzahl"]);
      $land = mysqli_real_escape_string($conn ,$_GET["land"]);

      $sql = "INSERT INTO tblkunde (`Nachname`, `Vorname`, `Telefon`, `Email`, `Strasse`, `Wohnort`, `Postleitzahl`, `FiLand`)
              VALUES ('$nachname', '$vorname', '$telefon', '$email', '$strasse', '$wohnort', '$postleitzahl', $land)";

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
