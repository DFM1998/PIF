<?php
session_start();
if (isset($_SESSION["login"]) && $_SESSION["login"] == true) {
  include './databaseConnection.php';
  $ausgabe = array();
  if (!$conn) {
    $ausgabe = null;
  }else {
    $sql = "SELECT `IDKunde`, `Nachname`, `Vorname`, `Telefon`, `Email`, `Strasse`, `Wohnort`, `Postleitzahl`, `Land` FROM `tblkunde`,`tblland` WHERE `FiLand`=`IDLand`";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
      while($row = mysqli_fetch_assoc($result)) {
        $ausgabe[] = $row["IDKunde"];
        $ausgabe[] = $row["Nachname"];
        $ausgabe[] = $row["Vorname"];
        $ausgabe[] = $row["Telefon"];
        $ausgabe[] = $row["Email"];
        $ausgabe[] = $row["Strasse"];
        $ausgabe[] = $row["Wohnort"];
        $ausgabe[] = $row["Postleitzahl"];
        $ausgabe[] = $row["Land"];
      }
    } else {
      $ausgabe = null;
    }
    echo json_encode($ausgabe);
    mysqli_close($conn);
  }
}


 ?>
