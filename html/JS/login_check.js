$(document).ready(function(){
  $.getJSON("./PHP/checkSession.php",function(data){
    if (data) {
      showpages(data); // is in nav.js
      // Get the modal
      var modal = document.getElementById('myModal');
      // Get the button that opens the modal
      var btn = document.getElementById("editAccountButton");
      // Get the <span> element that closes the modal
      var span = document.getElementsByClassName("close")[0];
      // When the user clicks the button, open the modal
      btn.onclick = function() {
        modal.style.display = "block";
      }
      // When the user clicks on <span> (x), close the modal
      span.onclick = function() {
        modal.style.display = "none";
      }
      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
      $.getJSON("./PHP/getKundenInformation.php", function(data ){
        //console.log(data);
        var ausgabe = "<h2>Personal Data</h2>";
        ausgabe += "<table><tr><td>IDMitarbeiter</td><td><input id='PersonaliDMitarbeiter' value='"+data[9]+"' disabled></td></tr>";
        ausgabe += "<tr><td>Nachname</td><td><input id='Personalnachname' value='"+data[0]+"'></td></tr>";
        ausgabe += "<tr><td>Vorname</td><td><input id='Personalvorname' value='"+data[1]+"'></td></tr>";
        ausgabe += "<tr><td>Email</td><td><input id='Personalemail' value='"+data[2]+"'></td></tr>";
        ausgabe += "<tr><td>Strasse</td><td><input id='Personalstrasse' value='"+data[3]+"'></td></tr>";
        ausgabe += "<tr><td>Wohnort</td><td><input id='Personalwohnort' value='"+data[4]+"'></td></tr>";
        ausgabe += "<tr><td>Postleitzahl</td><td><input id='Personalpostleitzahl' value='"+data[5]+"'></td></tr>";
        ausgabe += "<tr><td>Benutzername</td><td><input id='PersonalBeutzername' value='"+data[6]+"'></td></tr>";
        ausgabe += "<tr><td>Land</td><td><select id='PersonalLand'></select></td></tr>";
        var personalLand = data[8];
        //console.log(land);
        ausgabe += "<tr><td colspan='2'><a class='button' id='goBackButtonAccount'>Cancel</a><a class='button' id='updateOwenData'>Submit</a></td></tr></table>";
        ausgabe += "<h2>Change Password</h2>";
        ausgabe += "<table><tr><td>Passwort</td><td><input type='password' id='NewPasswort'></td></tr>";
        ausgabe += "<tr><td colspan='2'><a class='button' id='changePassword'>Change Password</a></td></tr>";
        ausgabe += "</table>";
        $("#ausgabeAccount").html(ausgabe);
        $.getJSON("./PHP/getCountries.php", function(data) {
          var landSelected = "";
          $.each(data, function( index, value ) {
            if (personalLand == index) {
              landSelected += "<option value='" + index + "' selected>" + value + "</option>";
            }else {
              landSelected += "<option value='" + index + "'>" + value + "</option>";
            }
          });
          $("#PersonalLand").html(landSelected);
        });
        $("#updateOwenData").click(function(){
          var iDMitarbeiter = $("#PersonaliDMitarbeiter").val();
          var nachname = $("#Personalnachname").val();
          var vorname = $("#Personalvorname").val();
          var email = $("#Personalemail").val();
          var strasse = $("#Personalstrasse").val();
          var wohnort = $("#Personalwohnort").val();
          var postleitzahl = $("#Personalpostleitzahl").val();
          var benutzername = $("#PersonalBeutzername").val();
          //console.log(benutzername);
          var land = $("#PersonalLand").val();
          if (nachname !== "" && vorname !== "" && email !== "" && strasse !== "" && wohnort !== "" && postleitzahl !== "" && benutzername !== "") {
            $.getJSON("./PHP/updateMitarbeiter.php", {iDMitarbeiter:iDMitarbeiter,nachname:nachname,vorname:vorname,email:email,strasse:strasse,wohnort:wohnort,postleitzahl:postleitzahl,benutzername:benutzername,land:land},function(data){
              if (data) {
                modal.style.display = "none";
                alert("Die Informationen wurden aktualisiert.");
              }else {
                alert("Error happend.")
              }
            });
          }else {
            alert("Alle Felder müssen ausgefühlt werden");
          }
        });
        $("#goBackButtonAccount").click(function(){
          location.reload();
        });
        $("#changePassword").click(function(){
          var iDMitarbeiter = $("#PersonaliDMitarbeiter").val();
          var passwort = $("#NewPasswort").val();
          $.getJSON("./PHP/changePassword.php", {iDMitarbeiter:iDMitarbeiter,passwort:passwort}, function(data){
            if (data) {
              modal.style.display = "none";
              alert("Passwort wurde aktualisiert.");
            }else {
              alert("Error happend.");
            }
          });
        });
      });
    }else {
      $("#login").show();
      $("#LoginAlert").hide();
      $('#passwort').keypress(function(e) {
       var key = e.which;
       if(key == 13){
          $('button[id = LoginButton]').click();
          return false;
        }
      });
      $("#LoginButton").click(function(){
        var benutzername = $("#benutzername").val();
        var passwort = $("#passwort").val();
        $.getJSON("./PHP/login.php",{username:benutzername, passwort:passwort},function(data){
          if (data === 1) {
            $("#login").css("transition", "height 0.4s ease");
            $("#login").css("height", "350px");
            $("#LoginAlert").html("Erro: Database connection!");
            $("#LoginAlert").show();
          }else if (data === 2) {
            $("#login").css("transition", "height 0.4s ease");
            $("#login").css("height", "350px");
            $("#LoginAlert").html("Error: connecting!");
            $("#LoginAlert").show();
          }else if (data === 3 || data === 4) {
            $("#login").css("transition", "height 0.4s ease");
            $("#login").css("height", "350px");
            $("#LoginAlert").html("Login not correct !");
            $("#LoginAlert").show("slow");
            setTimeout(function(){
              $("#LoginAlert").hide("slow");
            },3000)
            setTimeout(function(){
              $("#login").css("height", "300px")
            },3250)
          }else {
            location.reload();
          }
        });
      });
    }
  });
});
