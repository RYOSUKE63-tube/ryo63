const introScreen = document.getElementById("intro-screen");
const enterBtn = document.getElementById("enter-btn");

if (introScreen && enterBtn) {
  enterBtn.addEventListener("click", function () {
    introScreen.classList.add("warping");

    setTimeout(function () {
      introScreen.classList.add("hide");
    }, 1100);
  });
}
setTimeout(function(){
  document.querySelector(".live-now-banner").style.opacity = "1";
},2000);
window.addEventListener("load", function () {
  const enterBtn = document.getElementById("enter-btn");
  const introScreen = document.getElementById("intro-screen");
  const warpScreen = document.getElementById("warp-screen");

  if (enterBtn && introScreen && warpScreen) {
    enterBtn.addEventListener("click", function () {
      introScreen.style.display = "none";
      warpScreen.classList.add("active");

      setTimeout(function () {
        warpScreen.style.display = "none";
      }, 2000);
    });
  }
});