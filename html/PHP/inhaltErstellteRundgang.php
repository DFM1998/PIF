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
  $sql = "SELECT `IDRundgang`,`Erstelldatum`,`Tastersequenz`,`tblrundgang`.`Bezeichnung`,`tblfilialen`.`Bezeichnung` as bezeichnungFilial,`dauer`  FROM `tblrundgang`,`tblfilialen` WHERE `IDFilialen`=`FiFilialen` ORDER BY `IDRundgang` ASC";
  $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
      while($row = mysqli_fetch_array($result)){
        $ausgabe[] = $row["IDRundgang"] ;
        $ausgabe[] = $row["Bezeichnung"] ;
        $ausgabe[] = $row["bezeichnungFilial"] ;
        $ausgabe[] = $row["Erstelldatum"] ;
        $ausgabe[] = $row["Tastersequenz"];
        $ausgabe[] = $row["dauer"];

      }
    }else {
      $ausgabe = null;
    }
  }
  echo json_encode($ausgabe);
  mysqli_close($conn);
}
 ?>
