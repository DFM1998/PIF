function filialenVerwaltung(){
  var landSelect = "";
  $.getJSON("./PHP/getCountries.php", function(data) {
    $.each(data, function( index, value ) {
      landSelect += "<option value='" + index + "'>" + value + "</option>";
    });
  });
  var kunde = "";
  $.getJSON("./PHP/getKunde.php", function(data) {
    $.each(data, function( index, value ) {
      kunde += "<option value='" + index + "'>" + value + "</option>";
    });
  });
  $("#add_filialen").click(function(){
    var ausgabe = "<table class='updateTable'>";
    ausgabe += "<tr><td>Bezeichnung</td><td><input id='bezeichnung'></td></tr>";
    ausgabe += "<tr><td>Strasse</td><td><input id='strasse'></td></tr>";
    ausgabe += "<tr><td>Orstschaft</td><td><input id='orstschaft'></td></tr>";
    ausgabe += "<tr><td>Postleitzahl</td><td><input id='postleitzahl'></td></tr>";
    ausgabe += "<tr><td>IPadresse</td><td><input id='ipadresse'></td></tr>";
    ausgabe += "<tr><td>Land</td><td><select id='land'>"+landSelect+"</select></td></tr>";
    ausgabe += "<tr><td>Kundename</td><td><select id='kundename'>"+kunde+"</select></td></tr>";
    ausgabe += "<tr><td colspan='2'><a class='button' id='goBackButton'>Cancel</a><a class='button' id='insertFilialen'>Submit</a></td></tr>";
    ausgabe += "</table>";
    $("#to_load_content").html(ausgabe);
    $("#goBackButton").click(function(){
      location.reload();
    });
    $("#insertFilialen").click(function(){
      var bezeichnung = $("#bezeichnung").val();
      var strasse = $("#strasse").val();
      var orstschaft = $("#orstschaft").val();
      var postleitzahl = $("#postleitzahl").val();
      var ipadresse = $("#ipadresse").val();
      var land = $("#land").val();
      var kundename = $("#kundename").val();

      $.getJSON("./PHP/insertFiliale.php", {bezeichnung:bezeichnung, strasse:strasse, orstschaft:orstschaft, postleitzahl:postleitzahl, iPadresse:ipadresse, FiLand:land, FiKunde:kundename}, function(data) {
        if (data) {
          sessionStorage.setItem('alert', 'insert');
          location.reload();
        }else {
          alert("Erro happend.")
        }
      });
    });
  });
  $(".filialenUpd").click(function(){
    var iDFilialen = this.id;
    $.getJSON("./PHP/getFilialDaten.php", {IDFilialen: iDFilialen},function(data) {
      var ausgabe = "<table class='updateTable'>";
      ausgabe += "<tr><td>IDFilialen</td><td><input id='IDFilialen' value='" + iDFilialen + "' disabled></td></tr>";
      ausgabe += "<tr><td>Bezeichnung</td><td><input id='bezeichnung' value='"+data[0]+"'></td></tr>";
      ausgabe += "<tr><td>Strasse</td><td><input id='strasse' value='"+data[1]+"'></td></tr>";
      ausgabe += "<tr><td>Orstschaft</td><td><input id='orstschaft' value='"+data[2]+"'></td></tr>";
      ausgabe += "<tr><td>Postleitzahl</td><td><input id='postleitzahl' value='"+data[3]+"'></td></tr>";
      ausgabe += "<tr><td>Land</td><td><select id='land'></select></td></tr>";
      ausgabe += "<tr><td>IPadresse</td><td><input id='ipadresse' value='"+data[4]+"'></td></tr>";
      ausgabe += "<tr><td>Kundename</td><td><select id='kundename'></select></td></tr>";
      ausgabe += "<tr><td colspan='2'><a class='button' id='goBackButton'>Cancel</a><a class='button' id='updateFilialen'>Submit</a></td></tr>";
      ausgabe += "</table>";
      var kundenname = data[6];
      var land = data[5];
      $("#to_load_content").html(ausgabe);
      $.getJSON("./PHP/getKunde.php", function(data) {
        var kundeSelected = "";
        $.each(data, function( index, value ) {
          if (kundenname == value) {
            kundeSelected += "<option value='" + index + "' selected>" + value + "</option>";
          }else {
            kundeSelected += "<option value='" + index + "'>" + value + "</option>";
          }
        });
        $("#kundename").html(kundeSelected);
      });
      $.getJSON("./PHP/getCountries.php", function(data) {
        var landSelected = "";
        $.each(data, function( index, value ) {
          if (land == value) {
            landSelected += "<option value='" + index + "' selected>" + value + "</option>";
          }else {
            landSelected += "<option value='" + index + "'>" + value + "</option>";
          }
        });
        $("#land").html(landSelected);
      });
      $("#goBackButton").click(function(){
        location.reload();
      });
      $("#updateFilialen").click(function(){
        var iDFilialen = $("#IDFilialen").val();
        var bezeichnung = $("#bezeichnung").val();
        var strasse = $("#strasse").val();
        var orstschaft = $("#orstschaft").val();
        var postleitzahl = $("#postleitzahl").val();
        var ipadresse = $("#ipadresse").val();
        var land = $("#land").val();
        var kundename = $("#kundename").val();
        $.getJSON("./PHP/updateFiliale.php", {iDFilialen:iDFilialen, bezeichnung:bezeichnung, strasse:strasse, orstschaft:orstschaft, postleitzahl:postleitzahl, ipadresse:ipadresse, land:land, kundename:kundename}, function(data) {
          if (data) {
            sessionStorage.setItem('alert', 'update');
            location.reload();
          }else {
            alert("Error happend");
          }
        });
      });
    });
  });

}
