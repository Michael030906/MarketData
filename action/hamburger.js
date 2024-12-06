function myFunction() {
    var x = document.getElementById("headerContainer");
    if (x.className === "header") {
      x.className += " responsive";
    } else {
      x.className = "header";
    }
  }
  