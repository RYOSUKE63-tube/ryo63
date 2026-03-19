const DEV_MODE = true;   // 開発中は true / 本番は false
const DEV_RANK = "S";    // 開発中の固定ランク

const authScreen = document.getElementById("authScreen");
const mapScreen = document.getElementById("mapScreen");
const districtScreen = document.getElementById("districtScreen");

const userId = document.getElementById("userId");
const authCode = document.getElementById("authCode");
const authBtn = document.getElementById("authBtn");
const authMessage = document.getElementById("authMessage");

const aiText = document.getElementById("aiText");
const aiText2 = document.getElementById("aiText2");

const rankDisplay = document.getElementById("rankDisplay");
const stressDisplay = document.getElementById("stressDisplay");
const rankDisplay2 = document.getElementById("rankDisplay2");
const stressDisplay2 = document.getElementById("stressDisplay2");

const districtImage = document.getElementById("districtImage");
const districtTitle = document.getElementById("districtTitle");
const districtDesc = document.getElementById("districtDesc");
const backToMapBtn = document.getElementById("backToMapBtn");

const clickSound = document.getElementById("clickSound");
const bootSound = document.getElementById("bootSound");
const alertSound = document.getElementById("alertSound");
const heartbeat = document.getElementById("heartbeat");

const slumGlitch = document.getElementById("slumGlitch");
const slumGlitchText = document.getElementById("slumGlitchText");

const lineCoreUpper = document.getElementById("lineCoreUpper");
const lineUpperGate = document.getElementById("lineUpperGate");
const lineUpperD4 = document.getElementById("lineUpperD4");
const lineUpperD5 = document.getElementById("lineUpperD5");
const lineUpperD6 = document.getElementById("lineUpperD6");
const lineOutside = document.getElementById("lineOutside");

let currentRank = DEV_MODE ? DEV_RANK : (localStorage.getItem("rank") || null);
let stress = DEV_MODE ? 0 : (Number(localStorage.getItem("stress")) || 0);
let voiceEnabled = true;
let speechUnlocked = false;

/* =========================
   音声読み上げ（スマホ安定版）
========================= */
function unlockSpeech() {
  if (speechUnlocked) return;
  if (!("speechSynthesis" in window)) return;

  const synth = window.speechSynthesis;
  synth.cancel();

  try {
    const utter = new SpeechSynthesisUtterance("");
    utter.volume = 0;
    utter.lang = "ja-JP";
    synth.speak(utter);
    speechUnlocked = true;
  } catch (e) {
    console.log("speech unlock failed", e);
  }
}

function speak(text) {
  if (!voiceEnabled) return;
  if (!("speechSynthesis" in window)) return;

  const synth = window.speechSynthesis;
  synth.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ja-JP";
  utter.rate = 0.88;
  utter.pitch = 1.05;
  utter.volume = 1;

  const voices = synth.getVoices();
  const jpVoice =
    voices.find(v => v.lang && v.lang.toLowerCase().startsWith("ja")) || null;

  if (jpVoice) {
    utter.voice = jpVoice;
  }

  // Safari / iPhone対策
  setTimeout(() => {
    synth.speak(utter);
  }, 180);
}

window.speechSynthesis?.addEventListener?.("voiceschanged", () => {});

/* =========================
   基本
========================= */
function randomRank() {
  return ["S", "A", "B", "C", "GUEST"][Math.floor(Math.random() * 5)];
}

function saveState() {
  if (DEV_MODE) return;
  localStorage.setItem("rank", currentRank);
  localStorage.setItem("stress", stress);
}

function playSound(sound) {
  if (!sound) return;
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

function showScreen(screen) {
  [authScreen, mapScreen, districtScreen].forEach(el => el.classList.remove("active"));
  screen.classList.add("active");
}

function typeMessage(target, text, speed = 20) {
  if (!target) return;

  target.textContent = "";
  let i = 0;

  const timer = setInterval(() => {
    target.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(timer);
    }
  }, speed);
}

function updateHUD() {
  const rankText = `RANK : ${currentRank || "GUEST"}`;
  const stressText = `STRESS : ${stress}%`;

  if (rankDisplay) rankDisplay.textContent = rankText;
  if (stressDisplay) stressDisplay.textContent = stressText;
  if (rankDisplay2) rankDisplay2.textContent = rankText;
  if (stressDisplay2) stressDisplay2.textContent = stressText;
}

function increaseStress(value) {
  stress += value;
  if (stress > 100) stress = 100;

  if (stress >= 70 && heartbeat) {
    heartbeat.play().catch(() => {});
  }

  saveState();
  updateHUD();

  if (!DEV_MODE && stress >= 100) {
    alert("強制ログアウトされました");
    localStorage.removeItem("rank");
    localStorage.removeItem("stress");
    location.reload();
  }
}

function changeTheme(theme) {
  document.body.className = "";
  document.body.classList.add(`theme-${theme}`);
}

/* =========================
   ルート演出
========================= */
function resetLines() {
  [
    lineCoreUpper,
    lineUpperGate,
    lineUpperD4,
    lineUpperD5,
    lineUpperD6,
    lineOutside
  ].forEach(line => {
    if (!line) return;
    line.classList.remove("active", "pulse");
  });
}

function activateRoute(num) {
  resetLines();

  if (num === 1) {
    lineCoreUpper?.classList.add("active", "pulse");
  }

  if (num === 2) {
    lineCoreUpper?.classList.add("active", "pulse");
  }

  if (num === 3) {
    lineCoreUpper?.classList.add("active");
    lineUpperGate?.classList.add("active", "pulse");
    lineOutside?.classList.add("active", "pulse");
  }

  if (num === 4) {
    lineCoreUpper?.classList.add("active");
    lineUpperD4?.classList.add("active", "pulse");
  }

  if (num === 5) {
    lineCoreUpper?.classList.add("active");
    lineUpperD5?.classList.add("active", "pulse");
  }

  if (num === 6) {
    lineCoreUpper?.classList.add("active");
    lineUpperD6?.classList.add("active", "pulse");
  }
}

/* =========================
   グリッチ
========================= */
function bodyGlitch() {
  document.body.classList.add("body-glitch");
  setTimeout(() => {
    document.body.classList.remove("body-glitch");
  }, 900);
}

function triggerSlumGlitch() {
  playSound(alertSound);
  bodyGlitch();

  if (slumGlitchText) {
    slumGlitchText.textContent = "下層スラムは管理対象外です。接続は維持できません。";
  }

  if (slumGlitch) {
    slumGlitch.classList.remove("hidden");
  }

  const slumMessage = "警告。下層スラムは管理対象外区域です。接続を遮断します。";
  typeMessage(aiText, slumMessage, 18);

  setTimeout(() => {
    speak(slumMessage);
  }, 280);

  setTimeout(() => {
    if (slumGlitch) {
      slumGlitch.classList.add("hidden");
    }

    document.body.classList.add("screen-shake");

    setTimeout(() => {
      document.body.classList.remove("screen-shake");
      alert("ACCESS DENIED");
      increaseStress(20);
    }, 500);
  }, 1800);
}

/* =========================
   管区設定
========================= */
const accessControl = {
  1: ["A", "S"],
  2: ["B", "A", "S"],
  3: ["GUEST", "C", "B", "A", "S"],
  4: ["C", "B", "A", "S"],
  5: ["GUEST", "C", "B", "A", "S"],
  6: ["GUEST", "C", "B", "A", "S"]
};

const districtData = {
  1: {
    title: "第1管区",
    desc: "NEO AI中枢領域です。制限区域に指定されています。",
    msg: "第1管区は制限区域です",
    theme: "core"
  },
  2: {
    title: "第2管区",
    desc: "上層ネットワーク区域です。高層空間通路と上位生活圏で構成されています。",
    msg: "第2管区へ接続します",
    theme: "upper"
  },
  3: {
    title: "第3管区",
    desc: "交通および出入口管区です。都市の移動経路を統括しています。",
    msg: "第3管区への接続を許可します",
    theme: "transit"
  },
  4: {
    title: "第4管区",
    desc: "商業管区です。消費行動は監視対象です。",
    msg: "第4管区への接続を許可します",
    theme: "commercial"
  },
  5: {
    title: "第5管区",
    desc: "観光およびサイバーアリーナ区域です。娯楽プロトコルが展開されています。",
    msg: "第5管区への接続を許可します",
    theme: "entertainment"
  },
  6: {
    title: "第6管区",
    desc: "下町系低管理区域です。生活供給ノードが稼働中です。",
    msg: "第6管区への接続を許可します",
    theme: "life"
  }
};

/* =========================
   管区アクセス
========================= */
function accessDistrict(num) {
  if (!DEV_MODE && !accessControl[num].includes(currentRank)) {
    playSound(alertSound);
    const denyMessage = "現在のランクでは接続できません";
    typeMessage(aiText, denyMessage, 20);

    setTimeout(() => {
      speak(denyMessage);
    }, 260);

    increaseStress(10);
    return;
  }

  const data = districtData[num];
  playSound(clickSound);

  if (districtImage) {
    districtImage.style.opacity = "0";

    setTimeout(() => {
      districtImage.src = `image/neotokyo-${num}.jpg`;
      districtImage.style.opacity = "1";
    }, 180);
  }

  if (districtTitle) districtTitle.textContent = data.title;
  if (districtDesc) districtDesc.textContent = data.desc;

  typeMessage(aiText2, data.msg, 20);

  setTimeout(() => {
    speak(data.msg);
  }, 260);

  changeTheme(data.theme);
  activateRoute(num);
  increaseStress(3);
  showScreen(districtScreen);
}

/* =========================
   認証
========================= */
authBtn?.addEventListener("click", () => {
  unlockSpeech();

  const id = userId.value.trim();
  const code = authCode.value.trim().toUpperCase();

  if (!id) {
    authMessage.textContent = "IDを入力してください。";
    return;
  }

  if (code !== "NEO AI") {
    playSound(alertSound);
    authMessage.textContent = "認証失敗。アクセスコード不一致。";
    return;
  }

  if (DEV_MODE) {
    currentRank = DEV_RANK;
    stress = 0;
  } else {
    if (!currentRank) {
      currentRank = randomRank();
    }
  }

  saveState();
  updateHUD();

  playSound(bootSound);
  authMessage.textContent = `認証成功 / RANK ${currentRank}`;

  setTimeout(() => {
    showScreen(mapScreen);

    const authSuccessMessage = "認証完了。マップを展開します。";
    typeMessage(aiText, authSuccessMessage, 20);

    setTimeout(() => {
      speak(authSuccessMessage);
    }, 400);
  }, 900);
});

/* =========================
   イベント
========================= */
document.querySelectorAll(".map-node[data-district]").forEach(btn => {
  btn.addEventListener("click", () => {
    unlockSpeech();
    const num = Number(btn.dataset.district);
    accessDistrict(num);
  });
});

document.getElementById("slumBtn")?.addEventListener("click", () => {
  unlockSpeech();
  triggerSlumGlitch();
});

backToMapBtn?.addEventListener("click", () => {
  unlockSpeech();

  const backMessage = "マップへ復帰しました";
  typeMessage(aiText, backMessage, 20);

  setTimeout(() => {
    speak(backMessage);
  }, 260);

  showScreen(mapScreen);
});

updateHUD();