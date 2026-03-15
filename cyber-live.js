window.addEventListener("load", function () {
  const loginScreen = document.getElementById("login-screen");
  const liveStatus = document.getElementById("live-status");
  const liveMusic = document.getElementById("liveMusic");
  const livePlayBtn = document.getElementById("livePlayBtn");

  function updateMusicButton() {
    if (!liveMusic || !livePlayBtn) return;

    if (liveMusic.paused) {
      livePlayBtn.textContent = "▶ PLAY SOUND";
      livePlayBtn.classList.remove("is-playing");
    } else {
      livePlayBtn.textContent = "⏸ STOP SOUND";
      livePlayBtn.classList.add("is-playing");
    }
  }
  liveMusic.volume = 0.4;
  function tryPlayMusic() {
    if (!liveMusic) return;

    const playPromise = liveMusic.play();

    if (playPromise !== undefined) {
      playPromise
        .then(function () {
          updateMusicButton();
        })
        .catch(function () {
          updateMusicButton();
        });
    }
  }

  if (livePlayBtn && liveMusic) {
    livePlayBtn.addEventListener("click", function () {
      if (liveMusic.paused) {
        liveMusic.play().then(function () {
          updateMusicButton();
        }).catch(function () {
          updateMusicButton();
        });
      } else {
        liveMusic.pause();
        updateMusicButton();
      }
    });

    liveMusic.addEventListener("play", updateMusicButton);
    liveMusic.addEventListener("pause", updateMusicButton);
    updateMusicButton();
  }

  if (liveStatus) {
    setTimeout(function () {
      liveStatus.textContent = "LIVE SYSTEM READY";
    }, 1500);

    setTimeout(function () {
      liveStatus.textContent = "LIVE START";
      document.body.classList.add("live-start");
      tryPlayMusic();
    }, 2500);
  }

  if (loginScreen) {
    setTimeout(function () {
      loginScreen.classList.add("hide");
    }, 3500);
  }
});