const opening =
  document.getElementById("opening");

const liveScreen =
  document.getElementById("liveScreen");

const ending =
  document.getElementById("ending");

const startButton =
  document.getElementById("startButton");

const pauseButton =
  document.getElementById("pauseButton");

const replayButton =
  document.getElementById("replayButton");

const liveVideo =
  document.getElementById("liveVideo");

const liveMusic =
  document.getElementById("liveMusic");

const progressFill =
  document.getElementById("progressFill");

const currentTime =
  document.getElementById("currentTime");

const duration =
  document.getElementById("duration");


let isPaused = false;


/* =========================================
             TIME FORMAT
========================================= */

function formatTime(seconds) {

  if (
    !Number.isFinite(seconds)
  ) {
    return "0:00";
  }

  const minutes =
    Math.floor(seconds / 60);

  const secs =
    Math.floor(seconds % 60);

  return (
    minutes +
    ":" +
    String(secs).padStart(2, "0")
  );
}


/* =========================================
              LIVE START
========================================= */

startButton.addEventListener(
  "click",
  async () => {

    opening.style.display =
      "none";

    ending.style.display =
      "none";

    liveScreen.style.display =
      "flex";


    liveVideo.currentTime = 0;

    liveMusic.currentTime = 0;


    liveVideo.muted = true;

    liveVideo.loop = true;


    try {

      await liveVideo.play();

      await liveMusic.play();

    } catch (error) {

      console.error(
        "再生エラー:",
        error
      );

    }


    isPaused = false;

    pauseButton.textContent =
      "❚❚ PAUSE";

  }
);


/* =========================================
               PAUSE
========================================= */

pauseButton.addEventListener(
  "click",
  async () => {

    if (!isPaused) {

      liveVideo.pause();

      liveMusic.pause();

      pauseButton.textContent =
        "▶ PLAY";

      isPaused = true;

    } else {

      await liveVideo.play();

      await liveMusic.play();

      pauseButton.textContent =
        "❚❚ PAUSE";

      isPaused = false;

    }

  }
);


/* =========================================
             MUSIC META
========================================= */

liveMusic.addEventListener(
  "loadedmetadata",
  () => {

    duration.textContent =
      formatTime(
        liveMusic.duration
      );

  }
);


/* =========================================
               PROGRESS
========================================= */

liveMusic.addEventListener(
  "timeupdate",
  () => {

    currentTime.textContent =
      formatTime(
        liveMusic.currentTime
      );


    if (
      Number.isFinite(
        liveMusic.duration
      ) &&
      liveMusic.duration > 0
    ) {

      const percentage =
        (
          liveMusic.currentTime /
          liveMusic.duration
        ) * 100;


      progressFill.style.width =
        percentage + "%";

    }

  }
);


/* =========================================
               END LIVE
========================================= */

liveMusic.addEventListener(
  "ended",
  () => {

    liveVideo.pause();

    liveScreen.style.display =
      "none";

    ending.style.display =
      "flex";

  }
);


/* =========================================
               REPLAY
========================================= */

replayButton.addEventListener(
  "click",
  () => {

    ending.style.display =
      "none";

    opening.style.display =
      "flex";


    progressFill.style.width =
      "0%";

    currentTime.textContent =
      "0:00";

  }
);