window.addEventListener("load", function(){

  const gateLoginScreen = document.getElementById("gate-login-screen");

  if(gateLoginScreen){
    setTimeout(function(){
      gateLoginScreen.classList.add("hide");
    }, 3000);
  }

});