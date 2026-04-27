const doorWrap = document.getElementById("doorWrap");
const entrance = document.getElementById("entrance");
const mainSite = document.getElementById("mainSite");
const storyBtn = document.getElementById("storyBtn");
const storyList = document.getElementById("storyList");

doorWrap.addEventListener("click", () => {
  document.body.classList.add("opening");

  setTimeout(() => {
    entrance.classList.add("hide");
    mainSite.classList.add("show");
  }, 1000);
});

storyBtn.addEventListener("click", (e) => {
  e.preventDefault();
  storyList.classList.toggle("show");
});