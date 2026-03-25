/* ===============================
   DOM取得
=============================== */

const systemTime = document.getElementById("systemTime");
const restoreRate = document.getElementById("restoreRate");
const logList = document.getElementById("logList");
const aiMessage = document.getElementById("aiMessage");
const infoTown = document.getElementById("infoTown");
const infoRate = document.getElementById("infoRate");
const infoStatus = document.getElementById("infoStatus");
const mapFrame = document.getElementById("mapFrame");
const edoCastle = document.getElementById("edoCastle");
const townButtons = document.querySelectorAll(".town");
const transitionOverlay = document.getElementById("transitionOverlay");
const yoshinobuGate = document.getElementById("yoshinobuGate");
const yoshinobuText = document.getElementById("yoshinobuText");
const logDrawer = document.getElementById("logDrawer");

/* ===============================
   ログ・AIメッセージ
=============================== */

const logMessages = [
  "渋谷町 感情データ異常を検出",
  "千代田町 中央管理ループ継続中",
  "港町 外部アクセス痕跡あり",
  "目黒町 生体反応なし",
  "██町 復元率低下",
  "旧江戸城周辺の記録断片を検出",
  "寝音亜衣 監視モードを維持",
  "環境レンダリング異常 : RED SKY ACTIVE",
  "深層アクセスが記録されました",
  "警告 : この都市は安定していません"
];

const aiMessages = {
  default: "あなたの行動は記録されています。",
  千代田町: "中央管理領域への接続を確認しました。",
  港町: "外部との境界が不安定です。",
  新宿町: "夜間環境が固定化されています。",
  渋谷町: "感情データの乱れを観測しています。",
  目黒町: "この町は静かすぎます。",
  "██町": "……この町の情報は不完全です。"
};

/* ===============================
   🔥 LOG SYSTEM（統合）
=============================== */

let infectionLevel = 0;

const hiddenLogs = [
  "記録: 住民データが一斉に消失",
  "監視ログ: 深夜3時、同一人物が複数地点に出現",
  "報告: ██町は地図上から削除済み",
  "警告: アクセスしたユーザーの追跡不能",
  "記録: 最後の通信『戻れない』"
];

function addLog(message, type = "system") {
  if (!logList) return;

  const p = document.createElement("p");
  p.classList.add("log");

  if (type === "error") p.classList.add("log-error");
  if (type === "hidden") p.classList.add("log-hidden");
  if (type === "infected") p.classList.add("log-infected");

  p.textContent = `> ${message}`;
  logList.prepend(p);

  while (logList.children.length > 12) {
    logList.removeChild(logList.lastChild);
  }
}

function randomHiddenLog() {
  const msg = hiddenLogs[Math.floor(Math.random() * hiddenLogs.length)];
  addLog("[ARCHIVE] " + msg, "hidden");
}

function rewritePastLog() {
  if (!logList) return;

  const logs = logList.querySelectorAll("p");
  if (logs.length < 3) return;

  const target = logs[Math.floor(Math.random() * logs.length)];

  const rewriteMessages = [
    "観測対象: YOSHINOBU",
    "ログ改ざんを検出",
    "記録が上書きされています",
    "このログは安全ではありません",
    "監視対象が変更されました"
  ];

  const msg =
    rewriteMessages[Math.floor(Math.random() * rewriteMessages.length)];

  target.textContent = `> ${msg}`;
  target.classList.add("log-infected");

  target.style.transform = "translateX(2px)";
  setTimeout(() => {
    target.style.transform = "translateX(0)";
  }, 120);
}

function increaseInfection() {
  infectionLevel++;

  if (infectionLevel === 3) {
    addLog("データ同期異常", "infected");
  }

  if (infectionLevel === 5) {
    addLog("あなたは観測対象です", "infected");
    rewritePastLog();
  }

  if (infectionLevel === 7) {
    addLog("YOU ARE YOSHINOBU.", "infected");
    document.body.classList.add("deep-error");
  }
}

/* ===============================
   時計
=============================== */

function updateClock() {
  if (!systemTime) return;

  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");

  systemTime.textContent = `${h}:${m}:${s}`;
}

setInterval(updateClock, 1000);
updateClock();

/* ===============================
   ログ更新（進化版）
=============================== */

function randomLogUpdate() {
  const randomMessage =
    logMessages[Math.floor(Math.random() * logMessages.length)];

  addLog(randomMessage);

  if (Math.random() < 0.15) {
    randomHiddenLog();
  }

  if (Math.random() < 0.2) {
    increaseInfection();
  }

  if (restoreRate) {
    const rates = ["68%", "71%", "73%", "77%", "81%", "84%"];
    restoreRate.textContent =
      rates[Math.floor(Math.random() * rates.length)];
  }
}

setInterval(randomLogUpdate, 3200);

/* ===============================
   MAPグリッチ
=============================== */

function triggerMapGlitch() {
  if (!mapFrame) return;

  mapFrame.classList.add("glitch");
  setTimeout(() => {
    mapFrame.classList.remove("glitch");
  }, 260);
}

setInterval(triggerMapGlitch, 5000);

/* ===============================
   町クリック
=============================== */

townButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const town = button.dataset.town;
    const status = button.dataset.status;
    const rate = button.dataset.rate;
    const alert = button.dataset.alert;
    const link = button.dataset.link;

    if (infoTown) infoTown.textContent = town;
    if (infoRate) infoRate.textContent = rate;
    if (infoStatus) infoStatus.textContent = status;

    triggerMapGlitch();

    /* ===============================
       💀 無町イベント（強化版）
    =============================== */

    if (town === "██町") {
      document.body.style.pointerEvents = "none";

      setTimeout(() => {
        document.body.style.pointerEvents = "auto";
      }, 800);

      if (aiMessage) {
        aiMessage.textContent =
          "……その町は正式な記録に存在しません。";
      }

      addLog("[SYS] district search: ██町");
      addLog("[ERR] 該当データが見つかりません", "error");

      setTimeout(() => {
        randomHiddenLog();
      }, 800);

      setTimeout(() => {
        addLog("██町 → 消去済み区域", "hidden");
      }, 1400);

      setTimeout(() => {
        addLog("この区域は存在してはいけない", "hidden");
      }, 2000);

      setTimeout(() => {
        addLog("ユーザー照合開始...");
        increaseInfection();
      }, 2600);

      setTimeout(() => {
        addLog("一致率: 100%");
        increaseInfection();
      }, 3000);

      setTimeout(() => {
        addLog("YOU ARE YOSHINOBU.", "infected");
      }, 3400);

      setTimeout(() => {
        const log = document.createElement("p");
        log.classList.add("log");
        log.textContent = "> システム正常";
        logList.prepend(log);

        while (logList.children.length > 12) {
          logList.removeChild(logList.lastChild);
        }

        setTimeout(() => {
          log.textContent = "> YOU ARE YOSHINOBU.";
          log.classList.add("log-infected");
        }, 1200);
      }, 3800);

      if (transitionOverlay) {
        transitionOverlay.classList.add("show");
        const transitionText = document.getElementById("transitionText");
        if (transitionText) {
          transitionText.textContent = "UNKNOWN DISTRICT DETECTED";
        }
      }

      document.body.classList.add("deep-error");
      const noise = document.querySelector(".noise");
      if (noise) noise.classList.add("noise-strong");
      if (mapFrame) mapFrame.classList.add("glitch-strong");

      setTimeout(() => {
        document.body.classList.remove("deep-error");
        if (noise) noise.classList.remove("noise-strong");
        if (mapFrame) mapFrame.classList.remove("glitch-strong");
      }, 500);

      setTimeout(() => {
        if (link) window.location.href = link;
      }, 5600);

      return;
    }

    /* ===============================
       通常町
    =============================== */

    if (aiMessage) {
      aiMessage.textContent =
        aiMessages[town] || aiMessages.default;
    }

    addLog(`${town} / ${status}`);
    addLog(alert);

    if (transitionOverlay) {
      transitionOverlay.classList.add("show");
      const transitionText = document.getElementById("transitionText");
      if (transitionText) {
        transitionText.textContent = "ACCESSING...";
      }
    }

    setTimeout(() => {
      if (link) window.location.href = link;
    }, 500);
  });
});

/* ===============================
   江戸城
=============================== */

if (edoCastle) {
  edoCastle.addEventListener("click", () => {
    triggerMapGlitch();

    addLog("旧江戸城跡へのアクセスを検出");
    addLog("旧時代保存記録を参照");
    addLog("管理者名の一部を確認 : 徳川慶喜");

    if (infoTown) infoTown.textContent = "旧江戸城跡";
    if (infoRate) infoRate.textContent = "記録断片";
    if (infoStatus) infoStatus.textContent = "旧保存層";

    if (aiMessage) {
      aiMessage.textContent =
        "この地点には、旧い記録が残されています。";
    }
  });
}

/* ===============================
   LOG DRAWER
=============================== */

if (logDrawer) {
  const logTrigger = logDrawer.querySelector(".log-trigger");

  if (logTrigger) {
    logTrigger.addEventListener("click", (e) => {
      e.stopPropagation();

      if (window.innerWidth <= 900) {
        logDrawer.classList.toggle("open");
      } else {
        logDrawer.classList.toggle("open");
      }
    });
  }

  document.addEventListener("click", (e) => {
    if (!logDrawer.contains(e.target) && window.innerWidth <= 900) {
      logDrawer.classList.remove("open");
    }
  });
}

/* ===============================
   YOSHINOBU GATE
=============================== */

if (yoshinobuGate && yoshinobuText) {
  yoshinobuText.addEventListener("click", () => {
    yoshinobuText.classList.add("entered");
    document.body.style.filter = "contrast(1.3) brightness(0.55)";

    setTimeout(() => {
      document.body.style.filter = "none";
      yoshinobuGate.classList.add("hide");
    }, 220);
  });
}

/* ===============================
   RETURN FROM MUCHO
=============================== */

window.addEventListener("load", () => {
  const fromMucho = localStorage.getItem("fromMucho");

  if (fromMucho === "true") {
    localStorage.removeItem("fromMucho");

    setTimeout(() => {
      document.body.style.filter = "brightness(0.5)";
      setTimeout(() => {
        document.body.style.filter = "none";
      }, 200);

      addLog("observer returned from unknown district");
      addLog("record contamination detected");
      addLog("YOU ARE YOSHINOBU.", "infected");

      if (aiMessage) {
        aiMessage.textContent =
          "……あなたは、戻ってきてはいけませんでした。";
      }
    }, 1200);
  }
});
/* ===============================
   FINAL ROUTE CHECK
=============================== */

window.addEventListener("load", () => {
  const visitedShimokitazawa =
    localStorage.getItem("visitedShimokitazawa") === "true";
  const visitedEdo =
    localStorage.getItem("visitedEdo") === "true";
  const returnedFromMucho =
    localStorage.getItem("returnedFromMucho") === "true";

  if (visitedShimokitazawa && visitedEdo && returnedFromMucho) {
    setTimeout(() => {
      addLog("final layer unlocked", "infected");
      addLog("city overwrite started", "infected");
      addLog("observer fixed", "infected");
      addLog("YOU ARE YOSHINOBU.", "infected");
      addLog("system integrity lost", "infected");
      addLog("map overwrite started", "infected");

  document.querySelectorAll(".town-label").forEach(label => {
  if (Math.random() < 0.4) {
    label.textContent = "██町";
  }
});

       if (aiMessage) {
        aiMessage.textContent = "……監視対象の固定が完了しました。";
      }      
       if (aiMessage) {
        aiMessage.textContent = "……記録は完了しました。";
      }

      if (restoreRate) {
        restoreRate.textContent = "00%";
      }

      if (infoTown) infoTown.textContent = "全域";
      if (infoRate) infoRate.textContent = "崩壊";
      if (infoStatus) infoStatus.textContent = "上書き中";

      document.body.classList.add("deep-error");

      const noise = document.querySelector(".noise");
      if (noise) noise.classList.add("noise-strong");

      if (transitionOverlay) {
        transitionOverlay.classList.add("show");
        const transitionText = document.getElementById("transitionText");
        if (transitionText) {
          transitionText.textContent = "CITY OVERRIDDEN";
        }
      }

      setTimeout(() => {
        window.location.href = "final.html";
      }, 2600);
    }, 1400);
  }
});
