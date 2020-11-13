<?php
session_start();
if (isset($_SESSION["login"]) && $_SESSION["login"] == true) {
  header("Content-Type: application/json");
  include("databaseConnection.php");

  $ausgabe = array();

  // Check connection
  if (!$conn) {
    $ausgabe = null;
  }else {
    $username = $_GET["username"];
    $sql = "SELECT `Benutzername` FROM `tblmitarbeiter` WHERE `Benutzername`='$username'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
      while($row = mysqli_fetch_array($result)){
        $ausgabe = 1;
      }
    }else {
      $ausgabe = 2;
    }
  }
  echo json_encode($ausgabe);
  mysqli_close($conn);
}

 ?>
