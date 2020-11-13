//is called in: inc.erstelltInhalt.js
function rundgangverwaltung(){
  var filialenSelect = "";
  $.getJSON("./PHP/getFilialenName.php", function(data){
    $.each(data, function( index, value ) {
      filialenSelect += "<option value='"+ index +"'>" + value + "</option>";
    });
  });
  $("#add_rundgang").click(function(){
    var ausgabe = "<h2>Rundgang hinzufügen</h2><table class='updateTable'>";
    ausgabe += "<tr><td>Dauer</td><td><input placeholder='st.' id='dauerst' style='width: 25px'><input placeholder='min.' id='dauermin' style='width: 25px'><input placeholder='sec.' id='dauersec' style='width: 25px'></td></tr>";
    ausgabe += "<tr><td>Tastersequenz</td><td><input id='tastersequenz' placeholder='12356'></td></tr>";
    ausgabe += "<tr><td>Filialen</td><td><select id='selectFilial'></select></td></tr>";
    ausgabe += "<tr><td>Bezeichnung</td><td><input id='bezeichnung'></td></tr>";
    ausgabe += "<tr><td colspan='2'><a class='button' id='goBackButton'>Cancel</a><a class='button' id='insertRundgang'>Submit</a></td></tr>";
    ausgabe += "</table><div id='warningMessage'></div>";
    $("#to_load_content").html(ausgabe);
    $("#selectFilial").html(filialenSelect);
    $("#goBackButton").click(function(){
      location.reload();
    });
    $("#insertRundgang").click(function(){
      var dauerst= $("#dauerst").val();
      var dauermin = $("#dauermin").val();
      var dauersec = $("#dauersec").val();
      var tastersequenz = $("#tastersequenz").val();
      var selectFilial = $("#selectFilial").val();
      var bezeichnung = $("#bezeichnung").val();
      if ((dauerst !== "" || dauermin !== "" || dauersec !== "") && tastersequenz !== "" && selectFilial !== "" && bezeichnung !== "") {
        if (isNaN(dauerst) || isNaN(dauermin) || isNaN(dauersec)) {
          $("#deleteAlert").show();
          $("#deleteAlert").html("An der Dauer dürfen nur Zahlen eingetragen werden.");
          setTimeout(function(){
            $("#deleteAlert").hide(1000);
          }, 3000);
        }else {

          var dauer = (dauerst*1*60) + dauermin*1 + (dauersec*1/60);
          console.log(dauer);
          $("#deleteAlert").hide();
          $("#warningMessage").html("Wait a second");
          //console.log(dauer, tastersequenz,selectFilial);
          $.getJSON("./PHP/insertRundgang.php", {dauer:dauer, tastersequenz:tastersequenz, selectFilial:selectFilial, bezeichnung:bezeichnung}, function(data){
            if (data) {
              location.reload();
            }else {
              alert("Error happend.");
            }
          });
        }
      }else {
        $("#deleteAlert").show();
        $("#deleteAlert").html("Alle Felder müssen ausgefühlt werden.");
        setTimeout(function(){
          $("#deleteAlert").hide(1000);
        }, 3000);
      }
    });
  });
}
