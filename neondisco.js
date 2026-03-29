function playMusic(id){
  const audios = document.querySelectorAll("audio");
  const buttons = document.querySelectorAll(".music-btn");
  const target = document.getElementById(id);

  if (!target) return;

  const currentCard = target.closest(".music-card");
  const currentButton = currentCard ? currentCard.querySelector(".music-btn") : null;

  audios.forEach(audio => {
    if(audio !== target){
      audio.pause();
      audio.currentTime = 0;
    }
  });

  buttons.forEach(button => {
    if(button !== currentButton){
      button.textContent = "▶︎ PLAY";
    }
  });

  if(target.paused){
    const playPromise = target.play();

    if(playPromise !== undefined){
      playPromise
        .then(() => {
          if(currentButton){
            currentButton.textContent = "■ STOP";
          }
        })
        .catch(error => {
          console.log("再生エラー:", error);
        });
    } else {
      if(currentButton){
        currentButton.textContent = "■ STOP";
      }
    }
  } else {
    target.pause();
    target.currentTime = 0;
    if(currentButton){
      currentButton.textContent = "▶︎ PLAY";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const audios = document.querySelectorAll("audio");

  audios.forEach(audio => {
    audio.addEventListener("ended", () => {
      const card = audio.closest(".music-card");
      const button = card ? card.querySelector(".music-btn") : null;

      if(button){
        button.textContent = "▶︎ PLAY";
      }
    });
  });
});
document.querySelectorAll(".unknown-link").forEach(link=>{
  link.addEventListener("click", function(e){

    e.preventDefault();

    const flash = document.getElementById("flash");
    flash.classList.add("active");

    setTimeout(()=>{
      window.location.href = this.href;
    }, 300);

  });
});