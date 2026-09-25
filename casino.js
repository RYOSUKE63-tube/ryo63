/* ========================================
   THE SEVENTH
   NEO TOKYO CASINO RESORT
======================================== */


/* ----------------------------------------
   ELEMENTS
---------------------------------------- */

const moneyDisplay =
  document.getElementById("moneyDisplay");

const rankDisplay =
  document.getElementById("rankDisplay");

const reel1 =
  document.getElementById("reel1");

const reel2 =
  document.getElementById("reel2");

const reel3 =
  document.getElementById("reel3");

const resultMessage =
  document.getElementById("resultMessage");

const aiMessage =
  document.getElementById("aiMessage");

const spinButton =
  document.getElementById("spinButton");

const currentBetDisplay =
  document.getElementById("currentBet");

const backButton =
  document.getElementById("backButton");

const betButtons =
  document.querySelectorAll(".bet-button");


/* ----------------------------------------
   SETTINGS
---------------------------------------- */

const DEFAULT_MONEY = 5000;

const symbols = [
  "7",
  "BAR",
  "◆",
  "♠",
  "★"
];

let selectedBet = 100;

let spinning = false;


/* ----------------------------------------
   SHARED NEO TOKYO DATA
---------------------------------------- */

/*
  NEO TOKYO本体と同じlocalStorageキー
  "money" を使用。

  本体側でmoneyを保存すれば、
  THE SEVENTHと残高を共有できます。
*/

let money =
  Number(localStorage.getItem("money"));

if (
  !Number.isFinite(money) ||
  money < 0
) {

  money = DEFAULT_MONEY;

  localStorage.setItem(
    "money",
    String(money)
  );

}


/* ----------------------------------------
   RANK
---------------------------------------- */

const savedRank =
  localStorage.getItem("rank");

rankDisplay.textContent =
  savedRank || "S";


/* ----------------------------------------
   FORMAT
---------------------------------------- */

function formatMoney(value) {

  return "¥" +
    Math.floor(value)
      .toLocaleString("ja-JP");

}


/* ----------------------------------------
   HUD
---------------------------------------- */

function updateHUD() {

  moneyDisplay.textContent =
    formatMoney(money);

  localStorage.setItem(
    "money",
    String(money)
  );

}


/* ----------------------------------------
   AI
---------------------------------------- */

function setAI(text) {

  aiMessage.textContent = text;

}


/* ----------------------------------------
   RANDOM SYMBOL
---------------------------------------- */

function randomSymbol() {

  const index =
    Math.floor(
      Math.random() * symbols.length
    );

  return symbols[index];

}


/* ----------------------------------------
   BET SELECT
---------------------------------------- */

betButtons.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      if (spinning) return;

      selectedBet =
        Number(button.dataset.bet);

      betButtons.forEach(btn => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      currentBetDisplay.textContent =
        formatMoney(selectedBet);

      setAI(
        `${formatMoney(selectedBet)}の賭けを確認。`
      );

    }
  );

});


/* ----------------------------------------
   PAYOUT
---------------------------------------- */

function calculateMultiplier(
  a,
  b,
  c
) {

  /* 777 */

  if (
    a === "7" &&
    b === "7" &&
    c === "7"
  ) {
    return 20;
  }


  /* BAR */

  if (
    a === "BAR" &&
    b === "BAR" &&
    c === "BAR"
  ) {
    return 10;
  }


  /* DIAMOND */

  if (
    a === "◆" &&
    b === "◆" &&
    c === "◆"
  ) {
    return 5;
  }


  /* OTHER TRIPLE */

  if (
    a === b &&
    b === c
  ) {
    return 3;
  }


  /* DOUBLE */

  if (
    a === b ||
    b === c ||
    a === c
  ) {
    return 1.5;
  }


  return 0;

}


/* ----------------------------------------
   SPIN VISUAL
---------------------------------------- */

function startReelAnimation() {

  document
    .querySelectorAll(".reel")
    .forEach(reel => {

      reel.classList.add("spinning");

    });

}


function stopReelAnimation() {

  document
    .querySelectorAll(".reel")
    .forEach(reel => {

      reel.classList.remove("spinning");

    });

}


/* ----------------------------------------
   JACKPOT EFFECT
---------------------------------------- */

function jackpotEffect() {

  document.body.classList.remove(
    "jackpot"
  );

  void document.body.offsetWidth;

  document.body.classList.add(
    "jackpot"
  );

  setTimeout(() => {

    document.body.classList.remove(
      "jackpot"
    );

  }, 800);

}


/* ----------------------------------------
   SPIN
---------------------------------------- */

spinButton.addEventListener(
  "click",
  () => {

    if (spinning) return;


    /* MONEY CHECK */

    if (money < selectedBet) {

      resultMessage.classList.remove(
        "win"
      );

      resultMessage.textContent =
        "残高が不足しています。";

      setAI(
        "残高を確認して。これ以上のBETはできないよ。"
      );

      return;

    }


    spinning = true;

    spinButton.disabled = true;

    resultMessage.classList.remove(
      "win"
    );

    resultMessage.textContent =
      "SPINNING...";


    /* BET */

    money -= selectedBet;

    updateHUD();


    /*
      ユーザー案のAIセリフ
    */

    setAI(
      "その賭けも、記録しておくね。"
    );


    startReelAnimation();


    /* FAKE RAPID SPIN */

    const spinAnimation =
      setInterval(() => {

        reel1.textContent =
          randomSymbol();

        reel2.textContent =
          randomSymbol();

        reel3.textContent =
          randomSymbol();

      }, 80);


    /* FINAL RESULT */

    setTimeout(() => {

      clearInterval(spinAnimation);


      const a =
        randomSymbol();

      const b =
        randomSymbol();

      const c =
        randomSymbol();


      reel1.textContent = a;
      reel2.textContent = b;
      reel3.textContent = c;


      stopReelAnimation();


      const multiplier =
        calculateMultiplier(
          a,
          b,
          c
        );


      /* WIN */

      if (multiplier > 0) {

        const payout =
          Math.floor(
            selectedBet *
            multiplier
          );

        money += payout;

        updateHUD();

        resultMessage.classList.add(
          "win"
        );

        resultMessage.textContent =
          `WIN ${formatMoney(payout)} / ×${multiplier}`;


        if (multiplier >= 20) {

          setAI(
            "JACKPOT。運まで味方につけたみたいだね。"
          );

          jackpotEffect();

        }

        else if (multiplier >= 5) {

          setAI(
            "いい結果だね。勝利記録を更新したよ。"
          );

        }

        else {

          setAI(
            "勝ったんだ。……もう一度やる？"
          );

        }

      }


      /* LOSE */

      else {

        resultMessage.textContent =
          `LOSE -${formatMoney(selectedBet)}`;

        setAI(
          "残高が減ったね。それでも続ける？"
        );

      }


      spinning = false;

      spinButton.disabled = false;


    }, 1200);

  }
);


/* ----------------------------------------
   RETURN
---------------------------------------- */

backButton.addEventListener(
  "click",
  () => {

    /*
      casinoフォルダの1階層上に
      neotokyo.html がある想定。

      構成が違う場合は
      この1行だけ変更してください。
    */

    window.location.href =
      "neotokyo.html";

  }
);


/* ----------------------------------------
   START
---------------------------------------- */

updateHUD();

setAI(
  "THE SEVENTHへようこそ。あなたの運を確認するね。"
);