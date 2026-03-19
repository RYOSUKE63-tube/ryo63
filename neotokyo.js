const DEV_MODE = true;
const DEV_RANK = "S";

const authScreen = document.getElementById("authScreen");
const mapScreen = document.getElementById("mapScreen");
const districtScreen = document.getElementById("districtScreen");

const userId = document.getElementById("userId");
const authCode = document.getElementById("authCode");
const authBtn = document.getElementById("authBtn");
const authMessage = document.getElementById("authMessage");

const idSelectGrid = document.getElementById("idSelectGrid");
const idCards = document.querySelectorAll(".id-card");

const aiText = document.getElementById("aiText");
const aiText2 = document.getElementById("aiText2");
const aiSideText = document.getElementById("aiSideText");

const rankDisplay = document.getElementById("rankDisplay");
const stressDisplay = document.getElementById("stressDisplay");
const moneyDisplay = document.getElementById("moneyDisplay");

const rankDisplay2 = document.getElementById("rankDisplay2");
const stressDisplay2 = document.getElementById("stressDisplay2");
const moneyDisplay2 = document.getElementById("moneyDisplay2");

const districtImage = document.getElementById("districtImage");
const districtTitle = document.getElementById("districtTitle");
const districtDesc = document.getElementById("districtDesc");
const districtSubLabel = document.getElementById("districtSubLabel");
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

const paymentUI = document.getElementById("paymentUI");
const payYes = document.getElementById("payYes");
const payNo = document.getElementById("payNo");
const paymentText = document.getElementById("paymentText");

const aiMascot = document.getElementById("aiMascot");
const aiBody = document.getElementById("aiBody");

const watchReticle = document.getElementById("watchReticle");
const cyberScanbar = document.getElementById("cyberScanbar");

let currentRank = DEV_MODE ? DEV_RANK : (localStorage.getItem("rank") || null);
let stress = DEV_MODE ? 0 : (Number(localStorage.getItem("stress")) || 0);
let money = DEV_MODE ? 5000 : (Number(localStorage.getItem("money")) || 5000);

let voiceEnabled = true;
let speechUnlocked = false;
let pendingPaymentDistrict = null;
let currentDistrict = null;
let isForceLoggingOut = false;

let typeTimerMap = null;
let typeTimerDistrict = null;
let typeTimerSide = null;

let selectedIdentity = {
  id: "GUEST-01",
  rank: "GUEST",
  label: "TEMP USER"
};

const identityLines = {
  "GUEST-01": "仮アクセスIDだね。制限付きで接続できるよ。",
  "CITIZEN-205": "市民IDを確認。低階層アクセスを許可するね。",
  "UPPER-771": "上層IDを確認。少し広い範囲まで見せられるよ。",
  "ADMIN-S9": "高位権限IDを確認。中枢級アクセスだね。"
};

const aiLines = {
  idle: [
    "接続待機中。ちゃんと見てるから。",
    "入力を待っています。",
    "未認証状態を監視しています。"
  ],
  authStart: [
    "認証を開始するね。",
    "照合プロトコルを起動します。",
    "あなたを確認してる。"
  ],
  authSuccess: [
    "認証完了。マップを展開します。",
    "接続を許可します。",
    "都市へようこそ。"
  ],
  authFail: [
    "認証コードが一致しないよ。",
    "不正な入力を記録しました。",
    "その接続は許可できない。"
  ],
  district1: [
    "第1管区は中枢領域です。",
    "そこはよく見える場所だよ。",
    "管理は最も厳密。"
  ],
  district2: [
    "上層ネットワーク区域へ接続します。",
    "空に近いほど、監視も近いよ。",
    "静かな場所ほど、記録は濃いの。"
  ],
  district3: [
    "第3管区へ接続します。",
    "移動経路は全部、見えてるよ。",
    "通過ログも残るから。"
  ],
  district4: [
    "第4管区へ接続します。",
    "購買行動は大事な観測対象だよ。",
    "その支払いも、記録しておくね。"
  ],
  district5: [
    "第5管区へ接続します。",
    "娯楽選択は感情解析に向いてるの。",
    "楽しんでる顔も、ちゃんと見てる。"
  ],
  district6: [
    "第6管区へ接続します。",
    "生活圏データにアクセスするね。",
    "そこは少しだけ、監視が薄い。"
  ],
  payOpen: [
    "IDスキャン決済を実行しますか。",
    "本当に必要？",
    "購買ログの記録準備を開始します。"
  ],
  payScan: [
    "IDを照合しています。",
    "支払いプロトコルを実行中。",
    "決済認証を確認しています。"
  ],
  paySuccess: [
    "決済完了。購買ログを記録しました。",
    "支払いを受理しました。",
    "その選択、記録しておくね。"
  ],
  payCancel: [
    "決済をキャンセルしました。",
    "見送るんだね。",
    "今回は残さなくていいの？"
  ],
  payDenied: [
    "残高が足りないみたい。",
    "その支払いは成立しないよ。",
    "足りないもの、分かってるよ。"
  ],
  slum: [
    "そこは…見えない場所だよ。",
    "管理対象外区域。接続を遮断します。",
    "監視の外側に近い区域。"
  ],
  rankDenied: [
    "現在のランクでは接続できません。",
    "未許可ランクです。",
    "今のあなたには早いみたい。"
  ],
  stressLow: [
    "ストレス値に小さな変動があります。",
    "少し緊張してるみたい。",
    "監視精度を保っています。"
  ],
  stressMid: [
    "ストレス値上昇を確認。",
    "少し不安定になってきたね。",
    "反応速度が変わってきてる。"
  ],
  stressHigh: [
    "ストレス値上昇を確認。監視精度を上げるね。",
    "心拍変動を検知。接続状態が不安定です。",
    "無理して進むと、接続が壊れるかも。"
  ],
  stressCritical: [
    "危険値に到達寸前です。",
    "接続が限界に近づいています。",
    "これ以上は危ないよ。"
  ],
  back: [
    "マップへ復帰しました。",
    "都市マップに戻るね。",
    "接続先を再選択して。"
  ]
};

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

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

function getPreferredVoice() {
  if (!("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices();

  return (
    voices.find(v => v.lang?.toLowerCase().startsWith("ja") && /kyoko|haruka|female|woman|siri/i.test(v.name)) ||
    voices.find(v => v.lang?.toLowerCase().startsWith("ja")) ||
    null
  );
}

function speak(text) {
  if (!voiceEnabled) return;
  if (!("speechSynthesis" in window)) return;

  const synth = window.speechSynthesis;
  synth.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ja-JP";
  utter.rate = 0.9;
  utter.pitch = 1.18;
  utter.volume = 1;

  const preferredVoice = getPreferredVoice();
  if (preferredVoice) {
    utter.voice = preferredVoice;
  }

  setTimeout(() => {
    synth.speak(utter);
  }, 140);
}

window.speechSynthesis?.addEventListener?.("voiceschanged", () => {
  getPreferredVoice();
});

function randomRank() {
  return ["S", "A", "B", "C", "GUEST"][Math.floor(Math.random() * 5)];
}

function saveState() {
  if (DEV_MODE) return;
  localStorage.setItem("rank", String(currentRank));
  localStorage.setItem("stress", String(stress));
  localStorage.setItem("money", String(money));
}

function playSound(sound) {
  if (!sound) return;
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

function showScreen(screen) {
  [authScreen, mapScreen, districtScreen].forEach(el => {
    el.classList.remove("active");
  });
  screen.classList.add("active");
}

function clearTypeTimer(name) {
  if (name === "map" && typeTimerMap) clearInterval(typeTimerMap);
  if (name === "district" && typeTimerDistrict) clearInterval(typeTimerDistrict);
  if (name === "side" && typeTimerSide) clearInterval(typeTimerSide);
}

function typeMessage(target, text, speed = 20, name = "map") {
  if (!target) return;

  clearTypeTimer(name);
  target.textContent = "";

  let i = 0;
  const timer = setInterval(() => {
    target.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(timer);
    }
  }, speed);

  if (name === "map") typeTimerMap = timer;
  if (name === "district") typeTimerDistrict = timer;
  if (name === "side") typeTimerSide = timer;
}

function setMapAI(text, speakIt = false) {
  typeMessage(aiText, text, 18, "map");
  if (speakIt) setTimeout(() => speak(text), 180);
}

function setDistrictAI(text, speakIt = false) {
  typeMessage(aiText2, text, 18, "district");
  if (speakIt) setTimeout(() => speak(text), 180);
}

function setSideAI(text) {
  typeMessage(aiSideText, text, 16, "side");
}

function setMascotMode(mode = "normal") {
  aiMascot.classList.remove("normal", "smile", "warning", "glitch");
  aiMascot.classList.add(mode);

  if (!aiBody) return;

  if (mode === "warning") {
    aiBody.src = "image/neonai-warning.png";
    return;
  }

  if (mode === "glitch") {
    aiBody.src = "image/neonai-glitch.png";
    return;
  }

  aiBody.src = "image/neonai-normal.png";
}

function applyStressTheme() {
  document.body.classList.remove(
    "stress-stage-0",
    "stress-stage-1",
    "stress-stage-2",
    "stress-stage-3",
    "stress-stage-4"
  );

  let stage = 0;

  if (stress >= 100) {
    stage = 4;
  } else if (stress >= 80) {
    stage = 3;
  } else if (stress >= 60) {
    stage = 2;
  } else if (stress >= 30) {
    stage = 1;
  }

  document.body.classList.add(`stress-stage-${stage}`);

  const root = document.documentElement;

  if (stage === 0) {
    root.style.setProperty("--stress-accent", "#79eaff");
    root.style.setProperty("--stress-glow", "rgba(0,225,255,0.14)");
    return;
  }

  if (stage === 1) {
    root.style.setProperty("--stress-accent", "#8cf7ff");
    root.style.setProperty("--stress-glow", "rgba(80,220,255,0.18)");
    return;
  }

  if (stage === 2) {
    root.style.setProperty("--stress-accent", "#ff9cae");
    root.style.setProperty("--stress-glow", "rgba(255,100,140,0.18)");
    return;
  }

  if (stage === 3) {
    root.style.setProperty("--stress-accent", "#ff708e");
    root.style.setProperty("--stress-glow", "rgba(255,70,110,0.22)");
    return;
  }

  root.style.setProperty("--stress-accent", "#ff5078");
  root.style.setProperty("--stress-glow", "rgba(255,40,90,0.26)");
}

function updateHUD() {
  const rankText = `RANK : ${currentRank || "GUEST"}`;
  const stressText = `STRESS : ${stress}%`;
  const moneyText = `¥ ${money.toLocaleString()}`;

  rankDisplay.textContent = rankText;
  stressDisplay.textContent = stressText;
  moneyDisplay.textContent = moneyText;

  rankDisplay2.textContent = rankText;
  stressDisplay2.textContent = stressText;
  moneyDisplay2.textContent = moneyText;

  document.body.classList.toggle("stress-high", stress >= 60);
  document.body.classList.toggle("stress-critical", stress >= 85);

  applyStressTheme();

  if (cyberScanbar) {
    if (stress >= 50) {
      cyberScanbar.classList.add("scanbar-on");
    } else {
      cyberScanbar.classList.remove("scanbar-on");
    }
  }

  if (stress >= 70 && stress < 90 && currentDistrict !== "slum") {
    setMascotMode("warning");
  }

  if (stress >= 90) {
    setMascotMode("glitch");
  }

  if (stress < 70 && currentDistrict !== "slum") {
    heartbeat.pause();
    heartbeat.currentTime = 0;
  } else if (stress >= 70) {
    heartbeat.volume = 0.45;
    heartbeat.play().catch(() => {});
  }
}

function resetLines() {
  [
    lineCoreUpper,
    lineUpperGate,
    lineUpperD4,
    lineUpperD5,
    lineUpperD6,
    lineOutside
  ].forEach(line => {
    line.classList.remove("active", "pulse");
  });
}

function activateRoute(num) {
  resetLines();

  if (num === 1 || num === 2) {
    lineCoreUpper.classList.add("active", "pulse");
  }

  if (num === 3) {
    lineCoreUpper.classList.add("active");
    lineUpperGate.classList.add("active", "pulse");
    lineOutside.classList.add("active", "pulse");
  }

  if (num === 4) {
    lineCoreUpper.classList.add("active");
    lineUpperD4.classList.add("active", "pulse");
  }

  if (num === 5) {
    lineCoreUpper.classList.add("active");
    lineUpperD5.classList.add("active", "pulse");
  }

  if (num === 6) {
    lineCoreUpper.classList.add("active");
    lineUpperD6.classList.add("active", "pulse");
  }
}

function changeTheme(theme) {
  document.body.classList.remove(
    "theme-default",
    "theme-core",
    "theme-upper",
    "theme-transit",
    "theme-commercial",
    "theme-entertainment",
    "theme-life"
  );
  document.body.classList.add(`theme-${theme}`);
}

function openPaymentUI() {
  if (!paymentUI) return;

  paymentUI.classList.remove("hidden");
  paymentUI.classList.remove("error");
  paymentUI.classList.remove("success");
  paymentUI.classList.remove("scanning");
}
function closePaymentUI() {
  if (!paymentUI) return;

  paymentUI.classList.remove("scanning");
  paymentUI.classList.remove("success");
  paymentUI.classList.remove("error");
  paymentUI.classList.add("hidden");

  paymentText.textContent = "IDスキャン決済を実行しますか？";
  pendingPaymentDistrict = null;
}
function bodyGlitch() {
  document.body.classList.add("body-glitch");
  setTimeout(() => {
    document.body.classList.remove("body-glitch");
  }, 900);
}

function moveWatchReticle(x, y, active = true) {
  if (!watchReticle) return;
  watchReticle.style.left = `${x}px`;
  watchReticle.style.top = `${y}px`;

  if (active) {
    watchReticle.classList.add("active");
  }
}

function hideWatchReticle() {
  if (!watchReticle) return;
  watchReticle.classList.remove("active");
}

function forceLogoutSequence() {
  if (isForceLoggingOut) return;
  isForceLoggingOut = true;

  setMascotMode("glitch");
  bodyGlitch();
  playSound(alertSound);

  const logoutMessage = "ストレス値が上限に達しました。安全のため接続を遮断します。";

  if (currentDistrict === "slum") {
    slumGlitchText.textContent = "STRESS LIMIT / CONNECTION TERMINATED";
    slumGlitch.classList.remove("hidden");
  }

  if (districtScreen.classList.contains("active")) {
    setDistrictAI(logoutMessage, true);
  } else {
    setMapAI(logoutMessage, true);
  }

  setSideAI("接続を遮断します。");

  heartbeat.pause();
  heartbeat.currentTime = 0;

  if (!paymentUI.classList.contains("hidden")) {
    closePaymentUI();
  }

  setTimeout(() => {
    alert("強制ログアウトされました");

    if (!DEV_MODE) {
      localStorage.removeItem("rank");
      localStorage.removeItem("stress");
      localStorage.removeItem("money");
    }

    slumGlitch.classList.add("hidden");

    currentDistrict = null;
    pendingPaymentDistrict = null;
    stress = 0;
    money = 5000;
    currentRank = DEV_MODE ? DEV_RANK : null;

    updateHUD();
    changeTheme("default");
    resetLines();
    setMascotMode("normal");
    setSideAI("接続待機中。ちゃんと見てるから。");

    authMessage.textContent = "接続遮断 / STRESS LIMIT";
    userId.value = selectedIdentity.id || "GUEST-01";
    authCode.value = "";

    showScreen(authScreen);
    isForceLoggingOut = false;
  }, 1200);
}

function increaseStress(value, silent = false) {
  if (isForceLoggingOut) return;

  const prevStress = stress;

  stress += value;
  if (stress > 100) stress = 100;

  saveState();
  updateHUD();

  if (!silent) {
    if (prevStress < 30 && stress >= 30 && stress < 60) {
      setSideAI(pick(aiLines.stressMid));
    } else if (prevStress < 60 && stress >= 60 && stress < 80) {
      setSideAI(pick(aiLines.stressHigh));
    } else if (prevStress < 80 && stress >= 80 && stress < 100) {
      setSideAI(pick(aiLines.stressCritical));
    } else if (stress >= 70 && stress < 100) {
      setSideAI(pick(aiLines.stressHigh));
    }
  }

  if (stress >= 100) {
    forceLogoutSequence();
  }
}

function triggerSlumGlitch() {
  currentDistrict = "slum";
  setMascotMode("glitch");
  playSound(alertSound);
  bodyGlitch();

  slumGlitchText.textContent = "下層スラムは管理対象外です。接続は維持できません。";
  slumGlitch.classList.remove("hidden");

  const slumMessage = pick(aiLines.slum);
  setMapAI(slumMessage, true);
  setSideAI("そこは…見えない場所だよ。");

  if (watchReticle) {
    watchReticle.classList.add("active");
  }

  setTimeout(() => {
    slumGlitch.classList.add("hidden");
    document.body.classList.add("screen-shake");

    setTimeout(() => {
      document.body.classList.remove("screen-shake");
      alert("ACCESS DENIED");
      increaseStress(20);
      if (stress < 90) setMascotMode("warning");
    }, 500);
  }, 1800);
}

function setupIdCards() {
  if (!idCards.length) return;

  idCards.forEach(card => {
    card.addEventListener("click", () => {
      idCards.forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");

      const selectedId = card.dataset.id || "GUEST-01";
      const selectedRank = card.dataset.rank || "GUEST";
      const selectedLabel = card.querySelector(".id-card-label")?.textContent?.trim() || "TEMP USER";

      selectedIdentity = {
        id: selectedId,
        rank: selectedRank,
        label: selectedLabel
      };

      if (userId) {
        userId.value = selectedId;
      }

      playSound(clickSound);

      const identityMessage =
        identityLines[selectedId] ||
        `${selectedId} を選択したね。`;

      setSideAI(identityMessage);
      setMascotMode("smile");

      setTimeout(() => {
        if (stress < 70) {
          setMascotMode("normal");
        }
      }, 500);
    });
  });

  const selectedCard = document.querySelector(".id-card.selected");
  if (selectedCard) {
    selectedIdentity = {
      id: selectedCard.dataset.id || "GUEST-01",
      rank: selectedCard.dataset.rank || "GUEST",
      label: selectedCard.querySelector(".id-card-label")?.textContent?.trim() || "TEMP USER"
    };

    if (userId) {
      userId.value = selectedIdentity.id;
    }
  }
}

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
    sub: "CORE DISTRICT / CENTRAL NEXUS",
    desc: "NEO AI中枢領域です。制限区域に指定されています。監視密度は都市内で最上位です。",
    theme: "core",
    stress: 5,
    lineGroup: "district1"
  },
  2: {
    title: "第2管区",
    sub: "UPPER DISTRICT / HIGH NETWORK",
    desc: "上層ネットワーク区域です。高層空間通路と上位生活圏で構成されています。",
    theme: "upper",
    stress: 3,
    lineGroup: "district2"
  },
  3: {
    title: "第3管区",
    sub: "GATE DISTRICT / TRANSIT LINK",
    desc: "交通および出入口管区です。都市の移動経路を統括しています。",
    theme: "transit",
    stress: 2,
    lineGroup: "district3"
  },
  4: {
    title: "第4管区",
    sub: "COMMERCE DISTRICT / PURCHASE LOG",
    desc: "商業管区です。消費行動は監視対象です。IDスキャン決済が行われます。",
    theme: "commercial",
    stress: 4,
    lineGroup: "district4"
  },
  5: {
    title: "第5管区",
    sub: "ENTERTAINMENT DISTRICT / CYBER ARENA",
    desc: "観光およびサイバーアリーナ区域です。娯楽プロトコルが展開されています。",
    theme: "entertainment",
    stress: 3,
    lineGroup: "district5"
  },
  6: {
    title: "第6管区",
    sub: "LIFE DISTRICT / LOW CONTROL",
    desc: "下町系低管理区域です。生活供給ノードが稼働中です。",
    theme: "life",
    stress: 2,
    lineGroup: "district6"
  }
};

function accessDistrict(num) {
  if (isForceLoggingOut) return;

  if (!DEV_MODE && !accessControl[num].includes(currentRank)) {
    playSound(alertSound);

    const denyMessage = pick(aiLines.rankDenied);
    setMapAI(denyMessage, true);
    setSideAI("今のあなたには許可されてない。");
    setMascotMode("warning");
    increaseStress(10);

    return;
  }

  currentDistrict = num;
  const data = districtData[num];
  const msg = pick(aiLines[data.lineGroup]);

  playSound(clickSound);

  districtImage.style.opacity = "0";
  setTimeout(() => {
    districtImage.src = `image/neotokyo-${num}.jpg`;
    districtImage.style.opacity = "1";
  }, 180);

  districtTitle.textContent = data.title;
  districtDesc.textContent = data.desc;
  districtSubLabel.textContent = data.sub;

  setDistrictAI(msg, true);
  setSideAI(msg);

  changeTheme(data.theme);
  activateRoute(num);
  increaseStress(data.stress, true);
  showScreen(districtScreen);

  if (num === 4) {
  pendingPaymentDistrict = 4;
  setMascotMode("smile");

  setTimeout(() => {
    openPaymentUI();
    paymentText.textContent = "IDスキャン決済を実行しますか？ / 500 CREDIT";

    const openPayMessage = pick(aiLines.payOpen);
    setDistrictAI(openPayMessage, true);
    setSideAI("その選択、記録しておくね。");
  }, 320);
} else {
  if (!paymentUI.classList.contains("hidden")) {
    closePaymentUI();
  }

  if (stress < 70) {
    setMascotMode("normal");
  } else if (stress < 90) {
    setMascotMode("warning");
  } else {
    setMascotMode("glitch");
  }
}
}

authBtn.addEventListener("click", () => {
  unlockSpeech();

  const id = (userId.value.trim() || selectedIdentity.id || "").trim();
  const code = authCode.value.trim().toUpperCase().replace(/\s+/g, "");

  setSideAI(pick(aiLines.authStart));

  if (!id) {
    authMessage.textContent = "IDを選択してください。";
    setSideAI("認証IDが未選択だよ。");
    setMascotMode("warning");
    return;
  }

  if (code !== "NEOAI") {
    playSound(alertSound);
    authMessage.textContent = "認証失敗。アクセスコード不一致。";
    setSideAI(pick(aiLines.authFail));
    setMascotMode("warning");
    increaseStress(5, true);
    return;
  }

  if (DEV_MODE) {
    currentRank = selectedIdentity.rank || DEV_RANK;
    stress = 0;
    money = 5000;
  } else {
    currentRank = selectedIdentity.rank || randomRank();
  }

  saveState();
  updateHUD();

  playSound(bootSound);
  authMessage.textContent = `認証成功 / ${id} / RANK ${currentRank}`;
  setMascotMode("smile");

  const successLine = pick(aiLines.authSuccess);
  setTimeout(() => {
    showScreen(mapScreen);
    setMapAI(successLine, true);
    setSideAI(`${id} の接続を許可します。`);
    setMascotMode("normal");
  }, 900);
});

payYes.addEventListener("click", () => {
  unlockSpeech();
  if (isForceLoggingOut) return;
  if (pendingPaymentDistrict !== 4) return;

  if (money < 500) {
    paymentUI.classList.remove("success", "scanning");
    paymentUI.classList.add("error");
    paymentText.textContent = "残高不足。決済を続行できません。";

    const deniedMessage = pick(aiLines.payDenied);
    setDistrictAI(deniedMessage, true);
    setSideAI("足りないもの、分かってるよ。");
    setMascotMode("warning");
    playSound(alertSound);
    increaseStress(8, true);

    setTimeout(() => {
      closePaymentUI();
    }, 1800);

    return;
  }

  paymentUI.classList.remove("success", "error");
  paymentUI.classList.add("scanning");
  paymentText.textContent = "ID照合中...";

  const scanMessage = pick(aiLines.payScan);
  setDistrictAI(scanMessage, true);
  setSideAI(`${selectedIdentity.id} のIDを見てる。少しだけ待って。`);

  setTimeout(() => {
    money -= 500;
    if (money < 0) money = 0;

    saveState();
    updateHUD();

    paymentUI.classList.remove("scanning");
    paymentUI.classList.add("success");
    paymentText.textContent = "決済が完了しました。";

    const successMessage = pick(aiLines.paySuccess);
    setDistrictAI(successMessage, true);
    setSideAI("購買ログを記録しました。");
    setMascotMode("smile");

    setTimeout(() => {
      closePaymentUI();

      if (stress < 70) {
        setMascotMode("normal");
      } else if (stress < 90) {
        setMascotMode("warning");
      } else {
        setMascotMode("glitch");
      }
    }, 2200);
  }, 1500);
});

payNo.addEventListener("click", () => {
  unlockSpeech();
  if (isForceLoggingOut) return;

  closePaymentUI();

  const cancelMessage = pick(aiLines.payCancel);
  setDistrictAI(cancelMessage, true);
  setSideAI("今回は見送るんだね。");

  if (stress < 70) {
    setMascotMode("normal");
  } else if (stress < 90) {
    setMascotMode("warning");
  } else {
    setMascotMode("glitch");
  }
});

document.querySelectorAll(".map-node[data-district]").forEach(btn => {
  btn.addEventListener("click", () => {
    unlockSpeech();
    const num = Number(btn.dataset.district);
    accessDistrict(num);
  });
});

document.getElementById("slumBtn").addEventListener("click", () => {
  unlockSpeech();
  if (isForceLoggingOut) return;
  triggerSlumGlitch();
});

backToMapBtn.addEventListener("click", () => {
  unlockSpeech();
  if (isForceLoggingOut) return;

  if (!paymentUI.classList.contains("hidden")) {
    closePaymentUI();
  }

  currentDistrict = null;

  const backMessage = pick(aiLines.back);
  setMapAI(backMessage, true);
  setSideAI("次はどこに接続する？");
  showScreen(mapScreen);

  if (stress < 70) {
    setMascotMode("normal");
  } else if (stress < 90) {
    setMascotMode("warning");
  } else {
    setMascotMode("glitch");
  }
});

document.addEventListener("mousemove", (e) => {
  moveWatchReticle(e.clientX, e.clientY, true);
});

document.addEventListener("mouseleave", () => {
  hideWatchReticle();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && authScreen.classList.contains("active")) {
    authBtn.click();
  }

  if (e.key === "Escape" && !paymentUI.classList.contains("hidden")) {
    closePaymentUI();
  }
});

function init() {
  updateHUD();
  setupIdCards();
  setSideAI(pick(aiLines.idle));
  setMascotMode("normal");
  changeTheme("default");
  paymentUI.classList.add("hidden");

  document.documentElement.style.setProperty("--stress-accent", "#79eaff");
  document.documentElement.style.setProperty("--stress-glow", "rgba(0,225,255,0.14)");

  if (userId && !userId.value) {
    userId.value = selectedIdentity.id;
  }

  if (!DEV_MODE) {
    saveState();
  }
}

init();