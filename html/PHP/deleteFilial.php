<?php
session_start();
if (isset($_SESSION["login"]) && $_SESSION["login"] == true) {
  header("Content-Type: application/json");
  include './databaseConnection.php';

  // Check connection
  if (!$conn) {
    $ausgabe = null1;
  }
  else {
    $filialID = $_GET["filialID"];

    $sql = "DELETE FROM `tblfilialen` WHERE `tblfilialen`.`IDFilialen` = $filialID";

    if (mysqli_query($conn, $sql)) {
      $ausgabe = true;
    } else {
      $ausgabe = null;
    }
  }
  echo json_encode($ausgabe);
  mysqli_close($conn);
}

 ?>
