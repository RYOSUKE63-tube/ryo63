/* ===================================
        FOUR SEASONS
        MAIN SCRIPT
=================================== */

document.addEventListener("DOMContentLoaded", () => {


  /* ===================================
              ELEMENTS
  =================================== */

  const entrance =
    document.getElementById("entrance");

  const mainSite =
    document.getElementById("mainSite");

  const enterButton =
    document.getElementById("enterButton");

  const seasonWindows =
    document.querySelectorAll(".season-window");


  /* ===================================
            ENTRANCE OPEN
  =================================== */

  if(enterButton){

    enterButton.addEventListener("click", () => {

      /*
        先にメインサイトを表示
      */

      if(mainSite){
        mainSite.classList.add("show");
      }


      /*
        入口をフェードアウト
      */

      if(entrance){
        entrance.classList.add("hide");
      }


      /*
        少し待ってから入口を完全に消す
      */

      setTimeout(() => {

        if(entrance){
          entrance.style.display = "none";
        }

        window.scrollTo({
          top:0,
          behavior:"instant"
        });

      },1200);

    });

  }



  /* ===================================
          SEASON WINDOW CLICK
  =================================== */

  seasonWindows.forEach((windowBox) => {

    windowBox.addEventListener("click", () => {


      /*
        二重クリック防止
      */

      if(windowBox.classList.contains("open")){
        return;
      }


      /*
        季節情報
      */

      const season =
        windowBox.dataset.season;

      const link =
        windowBox.dataset.link;


      /*
        他の窓を操作不可にする
      */

      seasonWindows.forEach((item) => {

        item.style.pointerEvents = "none";

        if(item !== windowBox){

          item.classList.add("season-fade");

        }

      });


      /*
        選択した窓をOPEN
      */

      windowBox.classList.add("open");


      /*
        BODYへ季節クラス追加
      */

      document.body.classList.add(
        "season-opening"
      );

      document.body.classList.add(
        "opening-" + season
      );


      /*
        季節別エフェクト
      */

      createSeasonEffect(season);


      /*
        約1.8秒後に
        季節ページへ移動
      */

      setTimeout(() => {

        if(link){
          window.location.href = link;
        }

      },1800);

    });

  });



  /* ===================================
          CREATE SEASON EFFECT
  =================================== */

  function createSeasonEffect(season){

    const effect =
      document.createElement("div");

    effect.classList.add(
      "season-screen-effect",
      season + "-screen-effect"
    );

    document.body.appendChild(effect);


    /*
      SPRING
      花びら
    */

    if(season === "spring"){

      for(let i = 0; i < 30; i++){

        const petal =
          document.createElement("span");

        petal.classList.add(
          "screen-petal"
        );

        petal.style.left =
          Math.random() * 100 + "%";

        petal.style.animationDelay =
          Math.random() * 0.8 + "s";

        petal.style.animationDuration =
          1.2 + Math.random() * 1.4 + "s";

        petal.style.opacity =
          0.4 + Math.random() * 0.6;

        effect.appendChild(petal);

      }

    }



    /*
      SUMMER
      光
    */

    if(season === "summer"){

      const light =
        document.createElement("div");

      light.classList.add(
        "summer-light"
      );

      effect.appendChild(light);

    }



    /*
      AUTUMN
      落ち葉
    */

    if(season === "autumn"){

      for(let i = 0; i < 25; i++){

        const leaf =
          document.createElement("span");

        leaf.classList.add(
          "screen-leaf"
        );

        leaf.style.left =
          Math.random() * 100 + "%";

        leaf.style.animationDelay =
          Math.random() * 0.8 + "s";

        leaf.style.animationDuration =
          1.4 + Math.random() * 1.5 + "s";

        effect.appendChild(leaf);

      }

    }



    /*
      WINTER
      雪
    */

    if(season === "winter"){

      for(let i = 0; i < 45; i++){

        const snow =
          document.createElement("span");

        snow.classList.add(
          "screen-snow"
        );

        snow.style.left =
          Math.random() * 100 + "%";

        snow.style.width =
          4 + Math.random() * 7 + "px";

        snow.style.height =
          snow.style.width;

        snow.style.animationDelay =
          Math.random() * 0.8 + "s";

        snow.style.animationDuration =
          1.4 + Math.random() * 1.6 + "s";

        effect.appendChild(snow);

      }

    }

  }


/* ===================================
          MUSIC PLAYER
=================================== */

document.addEventListener("DOMContentLoaded", () => {

  const playButtons =
    document.querySelectorAll(".play-button");

  const audios =
    document.querySelectorAll("audio");


  playButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const audioId =
        button.dataset.audio;

      const audio =
        document.getElementById(audioId);


      /* audioが見つからない場合 */

      if(!audio){

        console.error(
          "Audio not found:",
          audioId
        );

        return;

      }


      /* 現在再生中か確認 */

      const wasPlaying =
        !audio.paused;


      /* 全曲停止 */

      audios.forEach((item) => {

        item.pause();

      });


      /* 全ボタンをPLAYに戻す */

      playButtons.forEach((item) => {

        item.textContent =
          "▶ PLAY";

      });


      /* 停止中だった曲なら再生 */

      if(!wasPlaying){

        audio.play()
          .then(() => {

            button.textContent =
              "❚❚ PAUSE";

          })
          .catch((error) => {

            console.error(
              "Audio playback error:",
              error
            );

          });

      }

    });

  });


  /* ===================================
       曲が最後まで再生された時
  =================================== */

  audios.forEach((audio) => {

    audio.addEventListener(
      "ended",
      () => {

        playButtons.forEach(
          (button) => {

            if(
              button.dataset.audio
              === audio.id
            ){

              button.textContent =
                "▶ PLAY";

            }

          }
        );

      }
    );

  });

});

  /* ===================================
          PAGE RETURN FIX
  =================================== */

  /*
    ブラウザの「戻る」で戻った時に
    OPEN状態のままになるのを防ぐ
  */

  window.addEventListener(
    "pageshow",
    () => {

      seasonWindows.forEach((item) => {

        item.classList.remove(
          "open",
          "season-fade"
        );

        item.style.pointerEvents = "";

      });


      document.body.classList.remove(
        "season-opening",
        "opening-spring",
        "opening-summer",
        "opening-autumn",
        "opening-winter"
      );


      document
        .querySelectorAll(
          ".season-screen-effect"
        )
        .forEach((effect) => {

          effect.remove();

        });

    }
  );


});

/* ===================================
          MUSIC PLAYER
=================================== */

function toggleMusic(audioId, button){

  const audio = document.getElementById(audioId);

  if(!audio){
    console.error("音源が見つかりません:", audioId);
    return;
  }

  const wasPaused = audio.paused;

  /* 全曲停止 */
  document.querySelectorAll("audio").forEach((item) => {
    item.pause();
  });

  /* 全ボタンをPLAY表示に戻す */
  document.querySelectorAll(".play-button").forEach((btn) => {
    btn.textContent = "▶ PLAY";
  });

  /* 停止中だった曲なら再生 */
  if(wasPaused){

    audio.play()
      .then(() => {
        button.textContent = "❚❚ PAUSE";
      })
      .catch((error) => {
        console.error("再生できません:", error);
      });

  }

}