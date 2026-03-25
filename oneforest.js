/* ===== MEMBER DATA ===== */

const idols = [
  {
    name: "リラ",
    gummy: "ストロベリーグミ",
    age: "22歳",
    height: "160cm",
    profile: "世界をトリコにする絶対不動のセンター。",
    image: "image/image1.jpg"
  },
  {
    name: "ナミ",
    gummy: "ラムネグミ",
    age: "25歳",
    height: "158cm",
    profile: "グループ最年長でリーダー。メンバーいわく、ど天然。",
    image: "image/image2.jpg"
  },
  {
    name: "カレン",
    gummy: "オレンジグミ",
    age: "21歳",
    height: "159cm",
    profile: "ステージ上では大人っぽい表情をみせるが楽屋ではイタズラ好き。",
    image: "image/image3.jpg"
  },
  {
    name: "ミフル",
    gummy: "メロングミ",
    age: "24歳",
    height: "162cm",
    profile: "メンバー1の歌唱力をもつ、グループでは歌の女王。",
    image: "image/image4.jpg"
  },
  {
    name: "リン",
    gummy: "レモングミ",
    age: "22歳",
    height: "158cm",
    profile: "グループ1の集中力を持つが集中しすぎて周りの音が聞こえなくなる。",
    image: "image/image5.jpg"
  },
  {
    name: "メグ",
    gummy: "グレープグミ",
    age: "21歳",
    height: "158cm",
    profile: "グループ1、ダンススキルがあり、楽曲の振付けも担当する。",
    image: "image/image6.jpg"
  },
  {
    name: "ミク",
    gummy: "ピーチグミ",
    age: "19歳",
    height: "160cm",
    profile: "グループ最年少で楽屋ではいつもメンバーに甘えている。",
    image: "image/image7.jpg"
  }
];

let currentIdol = 0;

const idolName = document.getElementById("idol-name");
const idolData = document.getElementById("idol-data");
const idolProfile = document.getElementById("idol-profile");
const idolPhoto = document.getElementById("photo");

const nextIdolBtn = document.getElementById("next-idol");
const prevIdolBtn = document.getElementById("prev-idol");

const dots = document.querySelectorAll(".dot");

/* ===== MEMBER表示 ===== */

function showIdol(index) {

  idolName.textContent = idols[index].name;

  idolData.textContent =
    "GUMMY：" + idols[index].gummy +
    " / AGE：" + idols[index].age +
    " / HEIGHT：" + idols[index].height;

  idolProfile.textContent = idols[index].profile;

  idolPhoto.src = idols[index].image;
  idolPhoto.alt = idols[index].name;

  idolPhoto.classList.remove("fade-change");
  idolName.classList.remove("fade-change");
  idolData.classList.remove("fade-change");
  idolProfile.classList.remove("fade-change");

  void idolPhoto.offsetWidth;

  idolPhoto.classList.add("fade-change");
  idolName.classList.add("fade-change");
  idolData.classList.add("fade-change");
  idolProfile.classList.add("fade-change");

  dots.forEach(function(dot){
    dot.classList.remove("active");
  });

  dots[index].classList.add("active");

}

/* ===== ボタン切替 ===== */

nextIdolBtn.addEventListener("click", function(){

  currentIdol++;

  if(currentIdol >= idols.length){
    currentIdol = 0;
  }

  showIdol(currentIdol);

});

prevIdolBtn.addEventListener("click", function(){

  currentIdol--;

  if(currentIdol < 0){
    currentIdol = idols.length - 1;
  }

  showIdol(currentIdol);

});

/* ===== ドット切替 ===== */

dots.forEach(function(dot){

  dot.addEventListener("click", function(){

    currentIdol = Number(dot.dataset.index);

    showIdol(currentIdol);

  });

});

/* ===== 自動切替 ===== */

setInterval(function(){

  currentIdol++;

  if(currentIdol >= idols.length){
    currentIdol = 0;
  }

  showIdol(currentIdol);

},4000);


/* ===== GALLERY ===== */

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

nextGalleryBtn.addEventListener("click", function(){

  currentGallery++;

  if(currentGallery >= galleryImages.length){
    currentGallery = 0;
  }

  galleryPhoto.src = galleryImages[currentGallery];

});

prevGalleryBtn.addEventListener("click", function(){

  currentGallery--;

  if(currentGallery < 0){
    currentGallery = galleryImages.length - 1;
  }

  galleryPhoto.src = galleryImages[currentGallery];

});


/* ===== FAQ ===== */

const questions = document.querySelectorAll(".question");

questions.forEach(function(question){

  question.addEventListener("click", function(){

    const answer = question.nextElementSibling;

    if(answer.style.display === "block"){
      answer.style.display = "none";
    }else{
      answer.style.display = "block";
    }

  });

});


/* ===== NEONリンク演出 ===== */

const cyberLink = document.getElementById("cyber-link");

if(cyberLink){

  const flash = document.createElement("div");
  flash.className = "cyber-flash";
  document.body.appendChild(flash);

  cyberLink.addEventListener("click", function(){

    const target = cyberLink.dataset.link;

    cyberLink.classList.add("is-jumping");

    flash.classList.remove("is-active");
    void flash.offsetWidth;
    flash.classList.add("is-active");

    setTimeout(function(){

      window.location.href = target;

    },380);

  });

}


/* ===== MUSIC ===== */

function playMusic(id){

  const audios = document.querySelectorAll("audio");

  audios.forEach(audio => {
    if(audio.id !== id){
      audio.pause();
      audio.currentTime = 0;
    }
  });

  const target = document.getElementById(id);

  if(target.paused){
    target.play();
  }else{
    target.pause();
  }
}