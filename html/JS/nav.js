function showpages(data){
  $("#article").show();
  $("#deleteAlert").hide();
  if (sessionStorage.getItem("alert") && sessionStorage.getItem("alert")=="delete") {
    $("#deleteAlert").show();
    $("#deleteAlert").html("The row has been deleted");
    sessionStorage.removeItem('alert');
    setTimeout(function(){
      $("#deleteAlert").hide(1000);
    }, 3000);
  }else if (sessionStorage.getItem("alert") && sessionStorage.getItem("alert")=="insert") {
    $("#deleteAlert").show();
    $("#deleteAlert").html("The row has been added");
    sessionStorage.removeItem('alert');
    setTimeout(function(){
      $("#deleteAlert").hide(1000);
    }, 3000);
  }
  else if (sessionStorage.getItem("alert") && sessionStorage.getItem("alert")=="update") {
    $("#deleteAlert").show();
    $("#deleteAlert").html("The row has been updated");
    sessionStorage.removeItem('alert');
    setTimeout(function(){
      $("#deleteAlert").hide(1000);
    }, 3000);
  }
  //data in the function is the value to check the login: true or false
  var pageUrl = location.hash;

  if (pageUrl == "#rundgaenge") {
    $("#nav1").addClass("active");
    $("#content").show();
    $("#navigation").show();
    erstellteRundgang(data);
  }else if (pageUrl == "#durchgefuerte") {
    $("#nav2").addClass("active");
    $("#content").show();
    durchgeferteRundgang(data);
    $("#navigation").show();
  }else if (pageUrl == "#benutzer") {
    $("#nav3").addClass("active");
    $("#content").show();
    benutzer(data);
    $("#navigation").show();
  }else if (pageUrl == "#token") {
    $("#nav4").addClass("active");
    $("#content").show();
    token();
    $("#navigation").show();
  }else if (pageUrl == "#land") {
    $("#nav5").addClass("active");
    $("#content").show();
    land();
    $("#navigation").show();
  }else if (pageUrl == "#filialen") {
    $("#nav6").addClass("active");
    $("#content").show();
    filialen();
    $("#navigation").show();
  }else if (pageUrl == "#kunde") {
    $("#nav7").addClass("active");
    $("#content").show();
    kunde();
    $("#navigation").show();
  }else{
    $("#nav1").addClass("active");
    $("#content").show();
    $("#navigation").show();
    erstellteRundgang(data);
  }

  $('#navigation ul li a').click(function(e) {
    var txt = $(e.target).attr("href");
    $("#nav1").removeClass("active");
    $("#nav2").removeClass("active");
    $("#nav3").removeClass("active");
    $("#nav4").removeClass("active");
    $("#nav5").removeClass("active");
    $("#nav6").removeClass("active");
    $("#nav7").removeClass("active");
    if (txt == "#rundgaenge") {
      $("#nav1").addClass("active");
      erstellteRundgang(data);
    }else if (txt == "#durchgefuerte") {
      $("#nav2").addClass("active");
      durchgeferteRundgang(data);
    }else if (txt == "#benutzer") {
      benutzer(data);
      $("#nav3").addClass("active");
    } else if (txt == "#token") {
      token();
      $("#nav4").addClass("active");
    }else if (txt == "#land") {
      land();
      $("#nav5").addClass("active");
    }else if (txt == "#filialen") {
      filialen();
      $("#nav6").addClass("active");
    }else if (txt == "#kunde") {
      kunde();
      $("#nav7").addClass("active");
    }else {
      $("#nav1").addClass("active");
      $("#navigation").show();
      erstellteRundgang(data);
    }
    //console.log(txt);
  });
}
