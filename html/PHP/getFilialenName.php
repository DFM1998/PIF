<?php
session_start();
if (isset($_SESSION["login"]) && $_SESSION["login"] == true) {
  include './databaseConnection.php';
  $ausgabe = array();
  if (!$conn) {
    $ausgabe = null;
  }else {
    $sql = "SELECT `IDFilialen`, `Bezeichnung` FROM `tblfilialen`";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
      while($row = mysqli_fetch_assoc($result)) {
        $ausgabe[$row["IDFilialen"]] = $row["Bezeichnung"];
      }
    } else {
      $ausgabe = null;
    }
    echo json_encode($ausgabe);
    mysqli_close($conn);
  }
}


 ?>
