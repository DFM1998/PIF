<?php
  header("Content-Type: application/json");
  include './databaseConnection.php';
  $ausgabe = '';
  if (!$conn) {
    $ausgabe = 1;
  }else if (!isset($_GET["username"]) || !isset($_GET["passwort"])) {
    $ausgabe = 2;
  }else {

  $eingabe = $_GET["username"];
  $eingabe2 = $_GET["passwort"];
  $eingabeEscpe = mysqli_real_escape_string($conn, $eingabe);
  $eingabe2Escpe = mysqli_real_escape_string($conn, $eingabe2);

  $sql = "SELECT `IDMitarbeiter`,`Nachname`, `Vorname`, `Rechte` FROM `tblmitarbeiter` WHERE `Benutzername`='". $eingabeEscpe ."' AND `Passwort`=sha1('". $eingabe2Escpe ."')";
  $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
      $row = mysqli_fetch_array($result);
      session_start();
      $_SESSION['login'] = "true";
      $_SESSION['rechte'] = $row['Rechte'];
      $_SESSION['IDMitarbeiter'] = $row['IDMitarbeiter'];
      $ausgabe = 0;
    }else {
      $ausgabe = 3;
    }
  }
  echo json_encode($ausgabe);
  mysqli_close($conn);
?>
