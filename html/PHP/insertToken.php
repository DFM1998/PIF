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
    $Tokenbezeichnung = $_GET["tokenbezeichnung"];
    $Gueltigkeitsindikator = $_GET["gueltigkeitsindikator"];
    $FiMitarbeiter = $_GET["mitarbeiter"];

    $sql = "UPDATE tbltoken SET Gueltigkeitsindikator='false' WHERE FiMitarbeiter='" . $FiMitarbeiter . "'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_query($conn, $sql)) {
      $sql = "INSERT INTO tbltoken (Tokenbezeichnung, Gueltigkeitsindikator, FiMitarbeiter)
      VALUES ('$Tokenbezeichnung', '$Gueltigkeitsindikator', $FiMitarbeiter)";

      if ($conn->query($sql) === TRUE) {
        $ausgabe = true;

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
        $ausgabe = null;
      }

    } else {
      $ausgabe = false;
    }



  }
  echo json_encode($ausgabe);
  mysqli_close($conn);
}
 ?>
