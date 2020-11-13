function kundenVerwaltung(){
  var landSelect = "";
  $.getJSON("./PHP/getCountries.php", function(data) {
    $.each(data, function( index, value ) {
      landSelect += "<option value='" + index + "'>" + value + "</option>";
    });
  });
  $(".kundeDel").click(function(){
    var kundeID = this.id;
    $.getJSON("./PHP/deleteKunde.php", {kundeID:kundeID},function(data){
      if (data) {
        sessionStorage.setItem('alert', 'delete');
        location.reload();
      }else {
        alert("Dieser Kunde kann nicht mehr gelöscht werden, denn er besitzt eine Filiale.");
      }
    });
  });
  $(".KundeUpd").click(function(){
    var kundeID = this.id;
    $.getJSON("./PHP/getKundeData.php", {kundeID:kundeID},function(data){
      var ausgabe = "<table class='updateTable'>";
      ausgabe += "<tr><td>IDKunde</td><td><input id='IDKunde' value='"+data[0]+"' disabled></td></tr>";
      ausgabe += "<tr><td>Nachname</td><td><input id='Nachname' value='"+data[1]+"'></td></tr>";
      ausgabe += "<tr><td>Vorname</td><td><input id='Vorname' value='"+data[2]+"'></td></tr>";
      ausgabe += "<tr><td>Email</td><td><input id='Email' value='"+data[3]+"'></td></tr>";
      ausgabe += "<tr><td>Strasse</td><td><input id='Strasse' value='"+data[4]+"'></td></tr>";
      ausgabe += "<tr><td>Wohnort</td><td><input id='Wohnort' value='"+data[5]+"'></td></tr>";
      ausgabe += "<tr><td>Postleitzahl</td><td><input id='Postleitzahl' value='"+data[6]+"'></td></tr>";
      var rightLand = data[7];
      ausgabe += "<tr><td>Land</td><td><select id='Land'></select></td></tr>";
      ausgabe += "<tr><td colspan='2'><a class='button' id='goBackButton'>Cancel</a><a class='button' id='update_Kunde'>Submit</a></td></tr>";
      ausgabe += "</table>";
      $("#to_load_content").html(ausgabe);
      $.getJSON("./PHP/getCountries.php", function(data) {
        var landSelected = "";
        $.each(data, function( index, value ) {
          if (rightLand== value) {
            landSelected += "<option value='" + index + "' selected>" + value + "</option>";
          }else {
            landSelected += "<option value='" + index + "'>" + value + "</option>";
          }
        });
        $("#Land").html(landSelected);
      });
      $("#update_Kunde").click(function(){
        var idKunde = $("#IDKunde").val();
        var nachname = $("#Nachname").val();
        var vorname = $("#Vorname").val();
        var email = $("#Email").val();
        var strasse = $("#Strasse").val();
        var wohnort = $("#Wohnort").val();
        var postleitzahl = $("#Postleitzahl").val();
        var land = $("#Land").val();
        if (nachname !== "" && vorname !== "" && email !== "" && strasse !== "" && wohnort !== "" && postleitzahl !== "") {
          $("#deleteAlert").hide();
          if (!isNaN(postleitzahl)) {
            $.getJSON("./PHP/updateKunde.php",{idKunde:idKunde,nachname:nachname,vorname:vorname,email:email,strasse:strasse, wohnort:wohnort, postleitzahl:postleitzahl,land:land},function(data){
              if (data) {
                sessionStorage.setItem('alert', 'update');
                location.reload();
              }else {
                alert("Error happend.");
              }
            });
          }else {
            $("#deleteAlert").show();
            $("#deleteAlert").html("Postleitzahl darf nur Zahlen sein.");
            setTimeout(function(){
              $("#deleteAlert").hide(1000);
            }, 3000);
          }
        }else {
          $("#deleteAlert").show();
          $("#deleteAlert").html("Alle Felder müssen ausgefühlt werden.");
          setTimeout(function(){
            $("#deleteAlert").hide(1000);
          }, 3000);
        }
      });
      $("#goBackButton").click(function(){
        location.reload();
      });
    });
  });
  $("#add_kunde").click(function(){
    var ausgabe = "<h2>Kunde hinzufügen</h2><table class='updateTable'>";
    ausgabe += "<tr><td>Nachname</td><td><input id='Nachname'></td></tr>";
    ausgabe += "<tr><td>Vorname</td><td><input id='Vorname'></td></tr>";
    ausgabe += "<tr><td>Telefon</td><td><input id='Telefon'></td></tr>";
    ausgabe += "<tr><td>Email</td><td><input id='Email'></td></tr>";
    ausgabe += "<tr><td>Strasse</td><td><input id='Strasse'></td></tr>";
    ausgabe += "<tr><td>Wohnort</td><td><input id='Wohnort'></td></tr>";
    ausgabe += "<tr><td>Postleitzahl</td><td><input id='Postleitzahl'></td></tr>";
    ausgabe += "<tr><td>Land</td><td><select id='Land'>"+landSelect+"</select></td></tr>";
    ausgabe += "<tr><td colspan='2'><a class='button' id='goBackButton'>Cancel</a><a class='button' id='insert_Kunde'>Submit</a></td></tr>";
    ausgabe += "</table>";
    $("#to_load_content").html(ausgabe);
    $("#insert_Kunde").click(function(){
      var nachname = $("#Nachname").val();
      var vorname = $("#Vorname").val();
      var telefon = $("#Telefon").val();
      var email = $("#Email").val();
      var strasse = $("#Strasse").val();
      var wohnort = $("#Wohnort").val();
      var postleitzahl = $("#Postleitzahl").val();
      var land = $("#Land").val();
      if (nachname !== "" && vorname !== "" && email !== "" && strasse !== "" && wohnort !== "" && postleitzahl !== "") {
        $("#deleteAlert").hide();
        if (!isNaN(postleitzahl)) {
          $.getJSON("./PHP/insertKunde.php",{nachname:nachname,vorname:vorname,telefon:telefon,email:email,strasse:strasse, wohnort:wohnort, postleitzahl:postleitzahl,land:land},function(data){
            if (data) {
              sessionStorage.setItem('alert', 'insert');
              location.reload();
            }else {
              alert("Error happend.");
            }
          });
        }else {
          $("#deleteAlert").show();
          $("#deleteAlert").html("Postleitzahl darf nur Zahlen sein.");
          setTimeout(function(){
            $("#deleteAlert").hide(1000);
          }, 3000);
        }
      }else {
        $("#deleteAlert").show();
        $("#deleteAlert").html("Alle Felder müssen ausgefühlt werden.");
        setTimeout(function(){
          $("#deleteAlert").hide(1000);
        }, 3000);
      }
    });
    $("#goBackButton").click(function(){
      location.reload();
    });
  });
}
