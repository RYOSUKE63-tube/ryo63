window.addEventListener("load", function () {
  const selectButtons = document.querySelectorAll(".select-btn");
  const selectedRank = document.getElementById("selected-rank");
  const selectedName = document.getElementById("selected-name");
  const selectedPrice = document.getElementById("selected-price");

  const cards = document.querySelectorAll(".ticket-card");

  const generateScreen = document.getElementById("ticketGenerate");
  const genRank = document.getElementById("gen-rank");
  const genName = document.getElementById("gen-name");
  const genPrice = document.getElementById("gen-price");
  const enterGateBtn = document.getElementById("enterGateBtn");

  const scanScreen = document.getElementById("scanScreen");
  const scanProgress = document.getElementById("scanProgress");
  const scanResult = document.getElementById("scanResult");
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

      if (selectedRank) {
        selectedRank.textContent = rank;
      }

      if (selectedName) {
        selectedName.textContent = name;
      }

      if (selectedPrice) {
        selectedPrice.textContent = price;
      }

      if (genRank) {
        genRank.textContent = rank;
      }

      if (genName) {
        genName.textContent = name;
      }

      if (genPrice) {
        genPrice.textContent = price;
      }

      if (generateScreen) {
        generateScreen.classList.add("active");
      }
    });
  });

  if (enterGateBtn) {
    enterGateBtn.addEventListener("click", function () {
      if (generateScreen) {
        generateScreen.classList.remove("active");
      }

      if (!scanScreen || !scanProgress || !scanResult) {
        return;
      }

      scanScreen.classList.add("active");
      scanResult.textContent = "";
      scanProgress.style.width = "0%";

      if (gate) {
        gate.classList.remove("open");
      }

      setTimeout(function () {
        scanProgress.style.width = "100%";
      }, 100);

      setTimeout(function () {
        scanResult.textContent = "ACCESS GRANTED";

        if (gate) {
          gate.classList.add("open");
        }
      }, 2000);

      setTimeout(function () {
        scanScreen.classList.remove("active");

        if (gate) {
          gate.classList.remove("open");
        }

        scanProgress.style.width = "0%";
      }, 4000);
    });
  }
});