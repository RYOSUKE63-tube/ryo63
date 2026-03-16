window.addEventListener("load", function () {
  const selectButtons = document.querySelectorAll(".select-btn");
  const selectedRank = document.getElementById("selected-rank");
  const selectedName = document.getElementById("selected-name");
  const selectedPrice = document.getElementById("selected-price");
  const selectedSection = document.querySelector(".ticket-selected-section");

  const cards = document.querySelectorAll(".ticket-card");

  const generateScreen = document.getElementById("ticketGenerate");
  const genRank = document.getElementById("gen-rank");
  const genName = document.getElementById("gen-name");
  const genPrice = document.getElementById("gen-price");
  const enterGateBtn = document.getElementById("enterGateBtn");

  const screen = document.getElementById("scanScreen");
  const progress = document.getElementById("scanProgress");
  const result = document.getElementById("scanResult");
  const gate = document.querySelector(".gate");

  cards.forEach(function (card) {
    card.addEventListener("click", function () {
      cards.forEach(function (c) {
        c.classList.remove("active");
      });
      card.classList.add("active");
    });
  });

  selectButtons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const card = button.closest(".ticket-card");
      const rank = button.dataset.rank || "";
      const name = button.dataset.name || "";
      const price = button.dataset.price || "";

      cards.forEach(function (c) {
        c.classList.remove("active");
      });

      if (card) {
        card.classList.add("active");
      }

      if (selectedRank) selectedRank.textContent = rank;
      if (selectedName) selectedName.textContent = name;
      if (selectedPrice) selectedPrice.textContent = price;

      if (genRank) genRank.textContent = rank;
      if (genName) genName.textContent = name;
      if (genPrice) genPrice.textContent = price;

      if (selectedSection) {
        selectedSection.scrollIntoView({
          behavior: "smooth"
        });
      }

      setTimeout(function () {
        if (generateScreen) {
          generateScreen.classList.add("active");
        }
      }, 500);
    });
  });

  if (enterGateBtn) {
    enterGateBtn.addEventListener("click", function () {
      if (generateScreen) {
        generateScreen.classList.remove("active");
      }

      if (!screen || !progress || !result) return;

      screen.classList.add("active");
      result.textContent = "";
      progress.style.width = "0%";

      if (gate) {
        gate.classList.remove("open");
      }

      setTimeout(function () {
        progress.style.width = "100%";
      }, 100);

      setTimeout(function () {
        result.textContent = "ACCESS GRANTED";
        if (gate) {
          gate.classList.add("open");
        }
      }, 2000);

      setTimeout(function () {
        screen.classList.remove("active");
        if (gate) {
          gate.classList.remove("open");
        }
      }, 4000);
    });
  }
});