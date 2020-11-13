
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
      $email =  mysqli_real_escape_string($conn ,$_GET["email"]);
      $strasse =  mysqli_real_escape_string($conn ,$_GET["strasse"]);
      $wohnort =  mysqli_real_escape_string($conn ,$_GET["wohnort"]);
      $postleitzahl =  mysqli_real_escape_string($conn ,$_GET["postleitzahl"]);
      $landSelect =  mysqli_real_escape_string($conn ,$_GET["landSelect"]);
      $rechteSelect =  mysqli_real_escape_string($conn ,$_GET["rechteSelect"]);
      $benutzername =  mysqli_real_escape_string($conn ,$_GET["benutzername"]);
      $passwort =  mysqli_real_escape_string($conn ,$_GET["passwort"]);

      if (empty($passwort) || empty($benutzername)) {
        $sql = "INSERT INTO tblmitarbeiter (nachname, vorname, email, strasse, wohnort, postleitzahl, FiLand, rechte)
        VALUES ('$nachname', '$vorname', '$email','$strasse','$wohnort','$postleitzahl','$landSelect','$rechteSelect')";
      }else {
        $sql = "INSERT INTO tblmitarbeiter (nachname, vorname, email, strasse, wohnort, postleitzahl, FiLand, rechte, benutzername, passwort)
        VALUES ('$nachname', '$vorname', '$email','$strasse','$wohnort','$postleitzahl','$landSelect','$rechteSelect','$benutzername',sha1('$passwort'))";
      }

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
