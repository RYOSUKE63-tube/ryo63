window.addEventListener("load", function(){

  const mapLoadingScreen = document.getElementById("map-loading-screen");

  if(mapLoadingScreen){
    setTimeout(function(){
      mapLoadingScreen.classList.add("hide");
    }, 3000);
  }

});