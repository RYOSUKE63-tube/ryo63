const members = [
  {
    id: "01",
    name: "RIO",
    color: "RED",
    role: "CENTER",
    age: "22",
    height: "165cm",
    image: "image/neon1.jpg"
  },
  {
    id: "02",
    name: "HARU",
    color: "BLUE",
    role: "VOCAL",
    age: "20",
    height: "160cm",
    image: "image/neon2.jpg"
  },
  {
    id: "03",
    name: "NOZOMI",
    color: "YELLOW",
    role: "DANCER",
    age: "21",
    height: "158cm",
    image: "image/neon3.jpg"
  },
  {
    id: "04",
    name: "RINO",
    color: "GREEN",
    role: "PERFORMER",
    age: "18",
    height: "155cm",
    image: "image/neon4.jpg"
  },
  {
    id: "05",
    name: "AYAKA",
    color: "PURPLE",
    role: "MYSTERIOUS",
    age: "22",
    height: "160cm",
    image: "image/neon5.jpg"
  }
];

let current = 0;

function showMember() {
  const memberImage = document.getElementById("memberImage");
  const memberId = document.getElementById("memberId");
  const memberName = document.getElementById("memberName");
  const memberColor = document.getElementById("memberColor");
  const memberRole = document.getElementById("memberRole");
  const memberAge = document.getElementById("memberAge");
  const memberHeight = document.getElementById("memberHeight");
  const memberProfile = document.getElementById("memberProfile");

  memberImage.src = members[current].image;
  memberImage.alt = members[current].name;
  memberId.textContent = "NEON ID : " + members[current].id;
  memberName.textContent = members[current].name;
  memberColor.textContent = "COLOR : " + members[current].color;
  memberRole.textContent = "ROLE : " + members[current].role;
  memberAge.textContent = "AGE : " + members[current].age;
  memberHeight.textContent = "HEIGHT : " + members[current].height;

  if (members[current].color === "RED") {
    memberProfile.style.borderColor = "#ff2a2a";
    memberProfile.style.boxShadow = "0 0 20px #ff2a2a";
  } else if (members[current].color === "BLUE") {
    memberProfile.style.borderColor = "#00cfff";
    memberProfile.style.boxShadow = "0 0 20px #00cfff";
  } else if (members[current].color === "YELLOW") {
    memberProfile.style.borderColor = "#ffd900";
    memberProfile.style.boxShadow = "0 0 20px #ffd900";
  } else if (members[current].color === "GREEN") {
    memberProfile.style.borderColor = "#7fff00";
    memberProfile.style.boxShadow = "0 0 20px #7fff00";
  } else if (members[current].color === "PURPLE") {
    memberProfile.style.borderColor = "#d896ff";
    memberProfile.style.boxShadow = "0 0 20px #d896ff";
  }
}

function nextMember() {
  current++;
  if (current >= members.length) {
    current = 0;
  }
  showMember();
}

function prevMember() {
  current--;
  if (current < 0) {
    current = members.length - 1;
  }
  showMember();
}

function selectMember(index) {
  current = index;
  showMember();
}

window.addEventListener("load", function () {
  const loadingText = document.getElementById("loadingText");
  const loadingScreen = document.getElementById("loadingScreen");
  const memberProfile = document.getElementById("memberProfile");

  if (loadingText && loadingScreen && memberProfile) {
    setTimeout(function () {
      loadingText.textContent = "NEON CIRCUIT CONNECTED";
    }, 1500);

    setTimeout(function () {
      loadingScreen.style.display = "none";
      memberProfile.style.display = "flex";
      showMember();
    }, 3000);
  } else {
    showMember();
  }
});

const topBtn = document.getElementById("top-btn");

if (topBtn) {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 200) {
      topBtn.style.display = "block";
    } else {
      topBtn.style.display = "none";
    }
  });

  topBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

const returnLink = document.getElementById("return-link");

if (returnLink) {
  const returnFlash = document.createElement("div");
  returnFlash.className = "return-flash";
  document.body.appendChild(returnFlash);

  returnLink.addEventListener("click", function (event) {
    event.preventDefault();

    const target = returnLink.dataset.link;

    returnLink.classList.add("is-jumping");
    returnFlash.classList.remove("is-active");
    void returnFlash.offsetWidth;
    returnFlash.classList.add("is-active");

    setTimeout(function () {
      window.location.href = target;
    }, 380);
  });
}
setInterval(function () {
  current++;
  if (current >= members.length) {
    current = 0;
  }
  showMember();
}, 3000);
function playMusic(){
  const music = document.getElementById("neonMusic");
  music.play();
}
function playMusic(){
  const music = document.getElementById("neonMusic");

  if(music.paused){
    music.play();
  }else{
    music.pause();
  }
}