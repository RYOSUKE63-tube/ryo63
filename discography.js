function resetAllPlayers() {
  const audios = document.querySelectorAll("audio");
  const buttons = document.querySelectorAll(".music-card button");

  audios.forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });

  buttons.forEach(button => {
    button.textContent = "▶︎ 再生";
  });
}

function playMusic(id) {
  const target = document.getElementById(id);

  if (!target) return;

  const card = target.closest(".music-card");
  const button = card ? card.querySelector("button") : null;

  const audios = document.querySelectorAll("audio");
  const buttons = document.querySelectorAll(".music-card button");

  audios.forEach(audio => {
    if (audio !== target) {
      audio.pause();
      audio.currentTime = 0;
    }
  });

  buttons.forEach(btn => {
    if (btn !== button) {
      btn.textContent = "▶︎ 再生";
    }
  });

  if (target.paused) {
    target.play();
    if (button) {
      button.textContent = "■ 停止";
    }
  } else {
    target.pause();
    target.currentTime = 0;
    if (button) {
      button.textContent = "▶︎ 再生";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const audios = document.querySelectorAll("audio");

  audios.forEach(audio => {
    audio.addEventListener("ended", () => {
      const card = audio.closest(".music-card");
      const button = card ? card.querySelector("button") : null;

      if (button) {
        button.textContent = "▶︎ 再生";
      }
    });

    audio.addEventListener("pause", () => {
      if (audio.ended) return;

      const card = audio.closest(".music-card");
      const button = card ? card.querySelector("button") : null;

      if (button && audio.currentTime === 0) {
        button.textContent = "▶︎ 再生";
      }
    });
  });
});