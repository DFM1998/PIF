function tokenVerwaltung(){
  $(".gueltigkeitsindikator").click(function(){
    var idTokens = this.id;
    var GueltigkeitsindikatorValue = $(this).is(':checked');
    var fiMitarbeiter = $(this).attr("name");
    $("#deleteAlert").show();
    $(".gueltigkeitsindikator").attr("disabled", true);
    $("#deleteAlert").html("Wait some seconds");
    $.getJSON('./PHP/updateGueltigkeitsindikator.php', {IDToken:idTokens, Gueltigkeitsindikator:GueltigkeitsindikatorValue, fiMitarbeiter:fiMitarbeiter},function(data){
      if (data) {
        sessionStorage.setItem('alert', 'update');
        location.reload();
      }else {
        alert("Bitte Kontaktieren Sie den Administrator");
      }
    });
  });

  $("#add_token").click(function(){
    $.getJSON("./PHP/getMitarbeiterName.php", function(data){
      var mitArbeiterSelect = "<select id='mitarbeiter'>";
      mitArbeiterSelect += "<option disabled selected value='0'>---Auswählen---</option>";
      for (var i = 0; i < data.length; i=i+3) {
        mitArbeiterSelect += "<option value='"+data[i]+"'>"+data[i+1]+" "+data[i+2]+"</option>";
      }
      mitArbeiterSelect += "</select>";
      var ausgabe = "<table class='updateTable' id='updateMitarbeiterTable'>";
      ausgabe += "<tr><td>Tokenbezeichnung</td><td><input placeholder='000011110125' id='tokenbezeichnung'></td></tr>";
      ausgabe += "<tr><td>Gueltigkeitsindikator</td><td><input type='checkbox'  id='gueltigkeitsindikator'></input></td></tr>";
      ausgabe += "<tr><td>Mitarbeiter</td><td>"+mitArbeiterSelect+"</td></tr>";
      ausgabe += "<tr><td colspan='2'><a class='button' id='goBackButton'>Cancel</a><a class='button' id='insertToken'>Submit</a></td></tr>";
      ausgabe += "</table>";
      $("#to_load_content").html(ausgabe);
      $("#goBackButton").click(function(){
        location.reload();
      });
      $("#insertToken").click(function(){
        var tokenbezeichnung = $("#tokenbezeichnung").val();
        var gueltigkeitsindikator = $("#gueltigkeitsindikator").is(':checked');
        var mitarbeiter = $("#mitarbeiter").val();
        //console.log(gueltigkeitsindikator);
        if (tokenbezeichnung !== "" && mitarbeiter !== 0) {
          $.getJSON("./PHP/insertToken.php", {tokenbezeichnung:tokenbezeichnung, gueltigkeitsindikator:gueltigkeitsindikator, mitarbeiter:mitarbeiter}, function(data){
            $("#deleteAlert").hide();
            if (data) {
              sessionStorage.setItem('alert', 'insert');
              location.reload();
            }else {
              alert("Bitte Kontaktieren Sie den Administrator");
            }
          });
        }else {
          $("#deleteAlert").show();
          $("#deleteAlert").html("Alle Felder müssen ausgefühlt werden.");
          setTimeout(function(){
            $("#deleteAlert").hide(1000);
          }, 3000);
        }
      });
    });
  });
}
