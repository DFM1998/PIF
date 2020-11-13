$("#logout").click(function(event){
  //event.preventDefault();
  $.getJSON("./PHP/logout.php", function(data){
    if (data) {
      location.reload();
    }else {
      alert("Contact the Administator");
    }
  });
});
