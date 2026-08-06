// ===================================
//          LIBRARY ELEMENTS
// ===================================

const libraryDoor = document.getElementById("libraryDoor");
const entrance = document.getElementById("entrance");
const mainSite = document.getElementById("mainSite");


// ===================================
//            OPEN LIBRARY
// ===================================

if (libraryDoor && entrance && mainSite) {

  libraryDoor.addEventListener("click", () => {

    // 二重クリック防止
    if (document.body.classList.contains("opening")) {
      return;
    }

    // 扉を開くアニメーション開始
    document.body.classList.add("opening");

    // 扉が開いたあと入口を消す
    setTimeout(() => {

      entrance.classList.add("hide");

    }, 1100);


    // 本編を表示
    setTimeout(() => {

      mainSite.classList.add("show");

      // ページ最上部へ
      window.scrollTo({
        top: 0,
        behavior: "instant"
      });

    }, 1250);

  });

}


// ===================================
//          SMOOTH SCROLL
// ===================================

const menuLinks = document.querySelectorAll(
  '.main-menu a[href^="#"]'
);

menuLinks.forEach(link => {

  link.addEventListener("click", function(e) {

    const targetId = this.getAttribute("href");

    const target =
      document.querySelector(targetId);

    if (!target) {
      return;
    }

    e.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

});


// ===================================
//        STORY CARD EFFECT
// ===================================

const storyCards =
  document.querySelectorAll(".story-card");

storyCards.forEach(card => {

  card.addEventListener("mouseenter", () => {

    card.classList.add("active");

  });


  card.addEventListener("mouseleave", () => {

    card.classList.remove("active");

  });

});


// ===================================
//         SCROLL REVEAL
// ===================================

const revealTargets =
  document.querySelectorAll(
    ".content-section, .story-card, .author-card"
  );


if ("IntersectionObserver" in window) {

  const observer =
    new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },

      {
        threshold: 0.12
      }

    );


  revealTargets.forEach(target => {

    observer.observe(target);

  });

}