window.addEventListener("load", function(){

  const loginScreen = document.getElementById("area-login-screen");

  if(loginScreen){
    setTimeout(function(){
      loginScreen.classList.add("hide");
    }, 3000);
  }

});