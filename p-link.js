window.addEventListener("load", function () {
  const bootScreen = document.getElementById("boot-screen");
  const bootStatus = document.getElementById("boot-status");
  const connectBtn = document.getElementById("connect-btn");
  const linkResult = document.getElementById("link-result");
  const vrFlash = document.getElementById("vr-flash");

  if (bootStatus) {
    setTimeout(function () {
      bootStatus.textContent = "NEO AI LINK CHECK";
    }, 1000);

    setTimeout(function () {
      bootStatus.textContent = "XR VISUAL SYSTEM ONLINE";
    }, 2000);

    setTimeout(function () {
      bootStatus.textContent = "NEO AI LINK ESTABLISHED";
    }, 2800);
  }

  if (bootScreen) {
    setTimeout(function () {
      bootScreen.classList.add("hide");
    }, 3300);
  }

  if (connectBtn && linkResult && vrFlash) {
    connectBtn.addEventListener("click", function () {
      linkResult.textContent = "CONNECTING TO NEO AI...";

      setTimeout(function () {
        linkResult.textContent = "XR LINK VERIFIED";
      }, 900);

      setTimeout(function () {
        vrFlash.classList.remove("active");
        void vrFlash.offsetWidth;
        vrFlash.classList.add("active");
        linkResult.textContent = "CYBER WORLD READY";
      }, 1700);

      setTimeout(function () {
        linkResult.textContent = "PIPELINE XR GOGGLE ONLINE";
      }, 2400);
    });
  }
});
const startBtn = document.getElementById("xr-start");
const statusText = document.getElementById("xr-status");
const flash = document.getElementById("xr-flash");

startBtn.addEventListener("click", function(){

statusText.textContent = "SCANNING XR DEVICE...";

setTimeout(function(){
statusText.textContent = "NEO AI CONNECTING...";
},1000);

setTimeout(function(){
statusText.textContent = "XR VISUAL SYSTEM BOOT...";
},2000);

setTimeout(function(){

flash.classList.remove("active");
void flash.offsetWidth;
flash.classList.add("active");

statusText.textContent = "CYBER CITY ONLINE";

},3000);

});