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
    $updateRows = $_GET["Gueltigkeitsindikator"];
    $updateRows2 = $_GET["IDToken"];
    $updateRows3 = $_GET["fiMitarbeiter"];

    $sql = "UPDATE tbltoken SET Gueltigkeitsindikator='false' WHERE FiMitarbeiter='" . $updateRows3 . "'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_query($conn, $sql)) {
      $ausgabe = true;
      $sql = "UPDATE tbltoken SET Gueltigkeitsindikator='" . $updateRows. "' WHERE IDToken='" . $updateRows2 . "'";
      $result = mysqli_query($conn, $sql);

      if (mysqli_query($conn, $sql)) {
        $sql = "SELECT IDToken,Tokenbezeichnung FROM tbltoken where Gueltigkeitsindikator='true'";
        $result = mysqli_query($conn, $sql);

        $list = array();
        if (mysqli_num_rows($result) > 0) {
            // output data of each row
            while($row = mysqli_fetch_assoc($result)) {
              array_push($list, $row["IDToken"]);
              array_push($list, $row["Tokenbezeichnung"]);
            }
        }

        $filename = "tokens.csv";
        $file = fopen("../tokens/$filename","w");
        fputcsv($file,$list);
        fclose($file);

        shell_exec("bash /var/www/html/tokens/scripts/sendTokens.sh");

      } else {
        $ausgabe = false;
      }
    } else {
      $ausgabe = false;
    }

  }
  echo json_encode($ausgabe);
  mysqli_close($conn);
}
 ?>
