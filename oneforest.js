const idols = [
  {
    name: "リラ",
    profile: "世界をトリコにする絶対不動のセンター。",
    image: "image/image1.jpg"
  },
  {
    name: "ナミ",
    profile: "メンバー最年長でリーダー。メンバーいわく、ど天然。",
    image: "image/image2.jpg"
  },
  {
    name: "カレン",
    profile: "ステージ上では大人っぽい表情を見せるが、楽屋ではいたずら好き。",
    image: "image/image3.jpg"
  },
  {
    name: "ミフル",
    profile: "メンバー1の歌唱力を持ち、カラオケでは100点を出したこともある。",
    image: "image/image4.jpg"
  },
  {
    name: "リン",
    profile: "メンバー1の集中力を持ち、集中すると周りの音がまったく聞こえなくなる。",
    image: "image/image5.jpg"
  },
  {
    name: "メグ",
    profile: "メンバー1のダンススキルを持ち、楽曲の振り付けも担当する。",
    image: "image/image6.jpg"
  },
  {
    name: "ミク",
    profile: "メンバー最年少で甘えん坊。大好物はもも。",
    image: "image/image7.jpg"
  }
];

let currentIdol = 0;

const idolName = document.getElementById("idol-name");
const idolProfile = document.getElementById("idol-profile");
const idolPhoto = document.getElementById("photo");
const nextIdolBtn = document.getElementById("next-idol");
const prevIdolBtn = document.getElementById("prev-idol");

function showIdol(index) {
  idolName.textContent = idols[index].name;
  idolProfile.textContent = idols[index].profile;
  idolPhoto.src = idols[index].image;
  idolPhoto.alt = idols[index].name;
}

nextIdolBtn.addEventListener("click", function() {
  currentIdol++;

  if (currentIdol >= idols.length) {
    currentIdol = 0;
  }

  showIdol(currentIdol);
});

prevIdolBtn.addEventListener("click", function() {
  currentIdol--;

  if (currentIdol < 0) {
    currentIdol = idols.length - 1;
  }

  showIdol(currentIdol);
});
const galleryImages = [
  "image/image1.jpg",
  "image/image2.jpg",
  "image/image3.jpg",
  "image/image4.jpg",
  "image/image5.jpg",
  "image/image6.jpg",
  "image/image7.jpg"
];

let currentGallery = 0;

const galleryPhoto = document.getElementById("gallery-photo");
const nextGalleryBtn = document.getElementById("next-gallery");
const prevGalleryBtn = document.getElementById("prev-gallery");

nextGalleryBtn.addEventListener("click", function() {
  currentGallery++;

  if (currentGallery >= galleryImages.length) {
    currentGallery = 0;
  }

  galleryPhoto.src = galleryImages[currentGallery];
});

prevGalleryBtn.addEventListener("click", function() {
  currentGallery--;

  if (currentGallery < 0) {
    currentGallery = galleryImages.length - 1;
  }

  galleryPhoto.src = galleryImages[currentGallery];
});
const questions = document.querySelectorAll(".question");

questions.forEach(function(question) {
  question.addEventListener("click", function() {
    const answer = question.nextElementSibling;

    if (answer.style.display === "block") {
      answer.style.display = "none";
    } else {
      answer.style.display = "block";
    }
  });
});
const cyberLink = document.getElementById("cyber-link");

if (cyberLink) {
  const flash = document.createElement("div");
  flash.className = "cyber-flash";
  document.body.appendChild(flash);

  cyberLink.addEventListener("click", function () {
    const target = cyberLink.dataset.link;

    cyberLink.classList.add("is-jumping");
    flash.classList.remove("is-active");
    void flash.offsetWidth;
    flash.classList.add("is-active");

    setTimeout(function () {
      window.location.href = target;
    }, 380);
  });
}
const dots = document.querySelectorAll(".dot");

function showIdol(index) {
  idolName.textContent = idols[index].name;
  idolProfile.textContent = idols[index].profile;
  idolPhoto.src = idols[index].image;
  idolPhoto.alt = idols[index].name;

  dots.forEach(function(dot){
    dot.classList.remove("active");
  });

  dots[index].classList.add("active");
}

dots.forEach(function(dot){
  dot.addEventListener("click", function(){
    currentIdol = Number(dot.dataset.index);
    showIdol(currentIdol);
  });
});