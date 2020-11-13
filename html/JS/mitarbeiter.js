//is called in: inc.erstelltInhalt.js
function mitarbeiterVerwaltung(){
  var landSelect = "";
  $.getJSON("./PHP/getCountries.php", function(data) {
    $.each(data, function( index, value ) {
      landSelect += "<option value='" + index + "'>" + value + "</option>";
    });
  });
  $("#add_mitarbeiter").click(function(){
    $.getJSON("./PHP/getAccountRechte.php", function(data){
      var ausgabe = "<table class='updateTable' id='updateMitarbeiterTable'>";
      ausgabe += "<tr><td>Nachname</td><td><input id='Nachname'></td></tr>";
      ausgabe += "<tr><td>Vorname</td><td><input id='Vorname'></td></tr>";
      ausgabe += "<tr><td>Email</td><td><input id='Email'></td></tr>";
      ausgabe += "<tr><td>Strasse</td><td><input id='Strasse'></td></tr>";
      ausgabe += "<tr><td>Wohnort</td><td><input id='Wohnort'></td></tr>";
      ausgabe += "<tr><td>Postleitzahl</td><td><input id='Postleitzahl' placeholder='nur Zahlen, z.b. 3514'></td></tr>";
      ausgabe += "<tr><td>Land</td><td><select id='landSelect'>" + landSelect + "</select></td></tr>";
      if (data == "admin") {
        ausgabe += "<tr><td>Benutzername</td><td><input id='Benutzername'></td></tr>";
        ausgabe += "<tr><td>Passwort</td><td><input type='password' id='Passwort'></td></tr>";
        ausgabe += "<tr><td>Funktion</td><td><select id='RechteSelect'><option value='2'>Operator</option><option value='3'>Wachmann</option></select></td></tr>";
      }else if (data == "operator") {
        ausgabe += "<tr hidden><td>Benutzername</td><td><input id='Benutzername'></td></tr>";
        ausgabe += "<tr hidden><td>Passwort</td><td><input type='password' id='Passwort'></td></tr>";
        ausgabe += "<tr><td>Funktion</td><td><select id='RechteSelect'><option value='3'>Wachmann</option></select></td></tr>";
      }
      ausgabe += "<tr><td colspan='2'><a class='button' id='goBackButton'>Cancel</a><a class='button' id='insertMitarbeiter'>Submit</a></td></tr>";
      ausgabe += "</table>";
      $("#to_load_content").html(ausgabe);
      $("#goBackButton").click(function(){
        location.reload();
      });
      $("#RechteSelect").change(function(){
        var selectValue = $("#RechteSelect").val();
        if (selectValue == "3") {
          $("#Benutzername").val("");
          $("#Passwort").val("");
          $("#Benutzername").prop('disabled', true);
          $("#Passwort").prop('disabled', true);
        }else {
          $("#Benutzername").prop('disabled', false);
          $("#Passwort").prop('disabled', false);
        }
      });
      $("#insertMitarbeiter").click(function(){
        var nachname = $("#Nachname").val();
        var vorname = $("#Vorname").val();
        var email = $("#Email").val();
        var strasse = $("#Strasse").val();
        var wohnort = $("#Wohnort").val();
        var postleitzahl = $("#Postleitzahl").val();
        var landSelect = $("#landSelect").val();
        var rechteSelect = $("#RechteSelect").val();
        var benutzername = $("#Benutzername").val();
        var passwort = $("#Passwort").val();
        if (nachname !== "" && vorname !== "" && email !== "" && strasse !== "" && wohnort !== "" && !isNaN(postleitzahl)) {
          //console.log("test");
          $.getJSON("./PHP/checkUsername.php", {username:benutzername}, function(data){
            if (data == 2) {
              $.getJSON("./PHP/insertMitarbeiter.php", {nachname:nachname, vorname:vorname,email:email,strasse:strasse,wohnort:wohnort,postleitzahl:postleitzahl,landSelect:landSelect,rechteSelect:rechteSelect,benutzername:benutzername,passwort:passwort},function(data){
                if (data) {
                  sessionStorage.setItem('alert', 'insert');
                  location.reload();
                }else {
                  alert("Error happend.")
                }
              });
            }else {
              $("#Benutzername").css("border-color", "red");
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
  $(".mitarbeiterDel").click(function(){
    var mitarbeiterID = this.id;
    $.getJSON("./PHP/checkSession.php", function(data){
      if(data){
        $.getJSON("./PHP/deleteMitarbeiter.php", {login:data, mitarbeiterID:mitarbeiterID} , function(ausgabe){
          if (ausgabe) {
            sessionStorage.setItem('alert', 'delete');
            location.reload();
          }else {
            alert("Error: Please contact the Administrator");
          }
        });
      }
    });
    //console.log(this.id);
  });
  $(".mitarbeiterUpd").click(function(){
    var mitarbeiterID = this.id;
    $.getJSON("./PHP/getMitarbeiterToUpdate.php", {mitarbeiterID:mitarbeiterID} , function(data){
      if (data !== null) {
        var ausgabe = "<table class='updateTable' id='updateMitarbeiterTable'>";
        ausgabe += "<tr><td>IDMitarbeiter</td><td><input type='text' id='IDMitarbeiter' value='"+ data["IDMitarbeiter"] +"' disabled></td></tr>";
        ausgabe += "<tr><td>Nachname</td><td><input type='text' id='Nachname' value='"+ data["Nachname"] +"'></td></tr>";
        ausgabe += "<tr><td>Vorname</td><td><input type='text' id='Vorname' value='"+ data["Vorname"] +"'></td></tr>";
        ausgabe += "<tr><td>Email</td><td><input type='text' id='Email' value='"+ data["Email"] +"'></td></tr>";
        ausgabe += "<tr><td>Strasse</td><td><input type='text' id='Strasse' value='"+ data["Strasse"] +"'></td></tr>";
        ausgabe += "<tr><td>Wohnort</td><td><input type='text' id='Wohnort' value='"+ data["Wohnort"] +"'></td></tr>";
        ausgabe += "<tr><td>Postleitzahl</td><td><input type='text' id='Postleitzahl' value='"+ data["Postleitzahl"] +"'></td></tr>";
        ausgabe += "<tr><td>Land</td><td><select id='landSelect'></select></td></tr>";
        var land = data["Land"]
        ausgabe += "<tr><td>Benutzername</td><td><input type='text' id='Benutzername' value='"+ data["Benutzername"] +"'></td></tr>";
        ausgabe += "<tr><td colspan='2'><a class='button' id='goBackButton'>Cancel</a><a class='button' id='updateButton'>Submit</a></td></tr>";
        ausgabe += "</table>";
        $("#to_load_content").html(ausgabe);
        $.getJSON("./PHP/getCountries.php", function(data) {
          var landSelected = "";
          $.each(data, function( index, value ) {
            if (land == value) {
              landSelected += "<option value='" + index + "' selected>" + value + "</option>";
            }else {
              landSelected += "<option value='" + index + "'>" + value + "</option>";
            }
          });
          $("#landSelect").html(landSelected);
        });
        //cancel button to go back
        $("#goBackButton").click(function(){
          location.reload();
        });
        $("#updateButton").click(function(){
          var iDMitarbeiter = $("#IDMitarbeiter").val();
          var nachname = $("#Nachname").val();
          var vorname = $("#Vorname").val();
          var email = $("#Email").val();
          var strasse = $("#Strasse").val();
          var wohnort = $("#Wohnort").val();
          var postleitzahl = $("#Postleitzahl").val();
          var land = $("#landSelect").val();
          var benutzername = $("#Benutzername").val();
          if (nachname !== "" && vorname !== "" && email !== "" && strasse !== "" && wohnort !== "" && !isNaN(postleitzahl)) {
            $("#deleteAlert").hide();
            $.getJSON("./PHP/updateMitarbeiter.php", {iDMitarbeiter:iDMitarbeiter, nachname:nachname, vorname:vorname, email:email,strasse:strasse,wohnort:wohnort,postleitzahl:postleitzahl,land:land,benutzername:benutzername},function(data){
              if (data) {
                sessionStorage.setItem('alert', 'update');
                location.reload();
              }else {
                alert("Contact the Administrator");
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

      }else {
        alert("Error: Please contact the Administrator");
      }
    });
    //console.log(this.id);

    //console.log(getLand());
  });
}
