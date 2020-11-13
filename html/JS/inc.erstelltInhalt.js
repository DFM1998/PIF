function erstellteRundgang(data) {
  $.getJSON("./PHP/inhaltErstellteRundgang.php",{login:data},function(data){
    var ausgabe = "<h2>Rundgänge</h2>";
    ausgabe += "<button id='add_rundgang'>Rundgang hinzufügen</button>";
    ausgabe += "<table><tr><th>ID Rundgang</th><th>Bezeichnung</th><th>Fillial Name</th><th>Erstelldatum des Rundgangs</th><th>Tastersequenz</th><th>Dauer (minuten)</th></tr>"
    for (var i = 0; i < data.length; i=i+6
    ) {
      ausgabe += "<tr><td>" + data[i] + "</td><td>"+data[i+1]+"</td><td>"+data[i+2]+"</td><td>"+ data[i+3] +"</td><td>"+ data[i+4] +"</td><td>"+ data[i+5] +"</td></tr>";
    }
    ausgabe += "</table>";
    $("#to_load_content").html(ausgabe);
    rundgangverwaltung();
  });
}
// function from w3schools: https://www.w3schools.com/howto/howto_js_sort_table.asp
function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("tableAbsolivierteRundgange");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function durchgeferteRundgang(data) {
  $.getJSON("./PHP/absolvierterRundgang.php",{login:data},function(data){
    var ausgabe = "<h2>Durchgeführte</h2>";
    ausgabe += '<input type="radio" name="zustand" class="zustand" value="all" checked>Alle anzeigen';
    ausgabe += '<input type="radio" name="zustand" class="zustand" value="ok">Rundgang ok';
    ausgabe += '<input type="radio" name="zustand" class="zustand" value="notOk">Rundgang not ok<br><br>';
    ausgabe += '<input type="checkbox" value="1" class="checkboxFilter">Tastersequenz';
    ausgabe += '<input type="checkbox" value="2" class="checkboxFilter">Anmelde Zeit';
    ausgabe += '<input type="checkbox" value="3" class="checkboxFilter">Abmelde Zeit';
    ausgabe += '<input type="checkbox" value="4" class="checkboxFilter">Erfolgreich';
    ausgabe += '<input type="checkbox" value="5" class="checkboxFilter">FiRundgang';
    ausgabe += '<input type="checkbox" value="6" class="checkboxFilter">Tokenbezeichnung';
    ausgabe += '<input type="checkbox" value="7" class="checkboxFilter">Zeitstempel';
    ausgabe += "<table id='tableAbsolivierteRundgange'>";
    ausgabe += '<tr><th onclick="sortTable(0)">Tastersequenz<i><th onclick="sortTable(1)">Anmelde Zeit<i></i></th><th onclick="sortTable(2)">Abmelde Zeit<i></i></th><th onclick="sortTable(3)">Erfolgreich<i></i></th><th onclick="sortTable(4)">FiRundgang<i></i></th><th onclick="sortTable(5)">Tokenbezeichnung<i></i></th><th onclick="sortTable(6)">Zeitstempel<i></i></th></tr>';
    for (var i = 0; i < data.length; i=i+7) {
      var erfolgreichResult = "";
      if (data[i+3] == "1") {
         erfolgreichResult = "ok";
      }else {
         erfolgreichResult = "error";
      }
      ausgabe += "<tr><td>" + data[i] + "</td><td>"+data[i+1]+"</td><td>"+data[i+2]+"</td><td><span class='erfolgreich" + erfolgreichResult +"'>"+erfolgreichResult+"</span></td><td>"+ data[i+4] +"</td><td>"+ data[i+5] +"</td><td>"+ data[i+6] +"</td></tr>";
    }
    ausgabe += "</table>";
    $("#to_load_content").html(ausgabe);
    var checkClick = -1;
    $("th").click(function(){
      $(".arrow i").empty();
      $("*").removeClass("arrow");
      $(this).addClass( "arrow" );
      if (checkClick == -1) {
        $(".arrow i").html(" ▲");
        checkClick = 1;
      }else {
        $(".arrow i").html(" ▼");
        checkClick = -1;
      }
    });
    $(".zustand").change(function(){
      var zustandValue = $(this).val();
      if (zustandValue == "all") {
        $("#tableAbsolivierteRundgange tr td").each(function() {
          $(this).find(".erfolgreicherror").parents().eq(1).show();
          $(this).find(".erfolgreichok").parents().eq(1).show();
        });
      }else if (zustandValue == "ok") {
        $("#tableAbsolivierteRundgange tr").each(function() {
          $(this).find(".erfolgreicherror").parents().eq(1).hide();
          $(this).find(".erfolgreichok").parents().eq(1).show();
        });
      }else if (zustandValue == "notOk") {
        $("#tableAbsolivierteRundgange tr").each(function() {
          $(this).find(".erfolgreichok").parents().eq(1).hide();
          $(this).find(".erfolgreicherror").parents().eq(1).show();
        });
      }
    })
    $(".checkboxFilter").click(function(){
      var checkBoxValue = $(this).val();
      $('th:nth-child('+checkBoxValue+')').toggle();
      $('td:nth-child('+checkBoxValue+')').toggle();
    });
  });
}
function benutzer(data) {
  $.getJSON("./PHP/inhaltErstellteBenutzer.php",{login:data},function(data){
    var ausgabe = "<h2>Mitarbeiter</h2><table>"
    ausgabe += "<button id='add_mitarbeiter'>Mitarbeiter hinzufügen</button>";
    ausgabe += "<tr><th>Nachname</th><th>Vorname</th><th>Email</th><th>Strasse</th><th>Wohnort</th><th>Postleitzahl</th><th>Land</th><th>Benutzername</th><th>Funktion</th><th colspan='2'>Verwaltung</th></tr>"
    for (var i = 0; i < data.length; i=i+10) {
      var funktion = "Operator";
      if (data[i+7] == 3) {
        funktion = "Wachmann";
      }
      var bentzerName = data[i+6];
      if (data[i+6] == "null") {
        bentzerName = "<span style='color:grey'>null</span>";
      }
      ausgabe += "<tr><td>" + data[i] + "</td><td>"+data[i+1]+"</td><td>"+data[i+2]+"</td><td>"+ data[i+3] +"</td><td>"+ data[i+4] +"</td><td>"+ data[i+5] +"</td><td>"+ data[i+8] +"</td><td>"+ bentzerName +"</td><td>"+funktion+"</td><td><a class='mitarbeiterDel' id='" + data[i+9]  + "'>Delete</a></td><td><a class='mitarbeiterUpd' id='" + data[i+9]  + "'>Update</a></td></tr>";
    }
    ausgabe += "</table>";
    $("#to_load_content").html(ausgabe);
    mitarbeiterVerwaltung();
  });
}

function token() {
  $.getJSON("./PHP/token.php",function(data){
    var ausgabe = "<h2>Tokens</h2><table>"
    ausgabe += "<button id='add_token'>Token hinzufügen</button>";
    ausgabe += "<tr><th>IDToken</th><th>Tokenbezeichnung</th><th>Gueltigkeitsindikator</th><th>Wachmann Vorname</th></tr>";
    for (var i = 0; i < data.length; i=i+5) {
      console.log(data[i+2]);
      if (data[i+2] == "true") {
        var Gueltigkeitsindikator = "<input type='checkbox' class='gueltigkeitsindikator' id="+data[i]+" checked name='"+data[i+4]+"'></input>";
      }else {
        var Gueltigkeitsindikator = "<input type='checkbox' class='gueltigkeitsindikator' id="+data[i]+" name='"+data[i+4]+"'></input>";
      }

      /*else if (data[i+2] == 'Kuendigung') {
        var Gueltigkeitsindikator = "<select class='GueltigkeitsindikatorSelect' id='"+data[i]+"'><option>InBetrieb</option><option selected>Kuendigung</option><option>Diebstahl</option><option>Verlust</option></select>";
      }else if (data[i+2] == 'Diebstahl') {
        var Gueltigkeitsindikator = "<select class='GueltigkeitsindikatorSelect' id='"+data[i]+"'><option>InBetrieb</option><option>Kuendigung</option><option selected>Diebstahl</option><option>Verlust</option></select>";
      }else if (data[i+2] == 'Verlust') {
        var Gueltigkeitsindikator = "<select class='GueltigkeitsindikatorSelect' id='"+data[i]+"'><option>InBetrieb</option><option>Kuendigung</option><option>Diebstahl</option><option selected>Verlust</option></select>";
      }else {
        var Gueltigkeitsindikator = "<select class='GueltigkeitsindikatorSelect' id='"+data[i]+"'><option>InBetrieb</option><option>Kuendigung</option><option>Diebstahl</option><option>Verlust</option></select>";
      }*/

      ausgabe += "<tr><td>" + data[i] + "</td><td>" + data[i+1] +"</td><td>"+ Gueltigkeitsindikator + "</td><td>"+ data[i+3] +"</td></tr>";
    }
    ausgabe += "</table>";
    $("#to_load_content").html(ausgabe);
    tokenVerwaltung();
  });
}
function land() {
  $.getJSON("./PHP/getCountries.php",function(data){
    var ausgabe = "<h2>Land</h2>";
    ausgabe += "<button id='add_land'>Land hinzufügen</button>";
    ausgabe += "<table><tr><th>IDLand</th><th>Land</th></tr>";
    $.each(data, function( index, value ) {
      ausgabe += "<tr><td>"+index+"</td><td>"+value+"</td></tr>";
    });
    ausgabe += "</table>";
    $("#to_load_content").html(ausgabe);
    $("#add_land").click(function(){
      var ausgabe = "<h2>Land hinzufügen</h2><table class='updateTable'>";
      ausgabe += "<tr><td>Bezeichnung</td><td><input id='bezeichnung'></td></tr>";
      ausgabe += "<tr><td>Land</td><td><input id='land'></td></tr>";
      ausgabe += "<tr><td colspan='2'><a class='button' id='goBackButton'>Cancel</a><a class='button' id='insertLand'>Submit</a></td></tr>";
      ausgabe += "</table>";
      $("#to_load_content").html(ausgabe);
      $("#goBackButton").click(function(){
        location.reload();
      });
      $("#insertLand").click(function(){
        var bezeichnungEingabe = $("#bezeichnung").val();
        var landEingabe = $("#land").val();
        if (bezeichnungEingabe !== "" && landEingabe !== "") {
          $("#deleteAlert").hide();
          $.getJSON("./PHP/insertLand.php", {bezeichnung: bezeichnungEingabe, land: landEingabe}, function(data){
            if (data) {
              sessionStorage.setItem('alert', 'insert');
              location.reload();
            }else {
              alert("Error happend.");
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
function filialen(){
  $.getJSON("./PHP/getFilialen.php", function(data){
    var ausgabe = "<h2>Filialen</h2>";
    ausgabe += "<button id='add_filialen'>Filialen hinzufügen</button>";
    ausgabe += "<table><tr><th>Bezeichnung</th><th>Strasse</th><th>Orstschaft</th><th>Postleitzahl</th><th>IPadresse</th><th>Land</th><th>Kundename</th><th>Verwaltung</th></tr>";
    for (var i = 0; i < data.length; i=i+9) {
      ausgabe += "<tr><td>"+data[i]+"</td><td>"+data[i+1]+"</td><td>"+data[i+2]+"</td><td>"+data[i+3]+"</td><td>"+data[i+4]+"</td><td>"+data[i+5]+"</td><td>"+data[i+6]+" "+data[i+7]+"</td><td><a class='filialenUpd' id='" + data[i+8]  + "'>Update</a></td></tr>";
    }
    ausgabe += "</table>";
    $("#to_load_content").html(ausgabe);
    filialenVerwaltung();
  });
}
function kunde(){
  $.getJSON("./PHP/getKundenInfomation.php", function(data){
    var ausgabe = "<h2>Kunde</h2>";
    ausgabe += "<button id='add_kunde'>Kunde hinzufügen</button>";
    ausgabe += "<table><tr><th>IDKunde</th><th>Nachname</th><th>Vorname</th><th>Telefonnummer</th><th>Email</th><th>Strasse</th><th>Wohnort</th><th>Postleitzahl</th><th>Land</th><th colspan='2'>Verwaltung</th></tr>";
    for (var i = 0; i < data.length; i=i+9) {
      ausgabe += "<tr><td>"+data[i]+"</td><td>"+data[i+1]+"</td><td>"+data[i+2]+"</td><td>"+data[i+3]+"</td><td>"+data[i+4]+"</td><td>"+data[i+5]+"</td><td>"+data[i+6]+"</td><td>"+data[i+7]+"</td><td>"+data[i+8]+"</td><td><a class='kundeDel' id='" + data[i]  + "'>Delete</a></td><td><a class='KundeUpd' id='" + data[i]  + "'>Update</a></td></tr>";
    }
    ausgabe += "</table>";
    $("#to_load_content").html(ausgabe);
    kundenVerwaltung();
  });
}
