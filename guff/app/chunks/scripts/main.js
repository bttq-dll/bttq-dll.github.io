function simulateLoading() {
  const loader = document.getElementById("loader");
  const progressBar = document.querySelector(".loader-progress");
  const body = document.body;

  // Start loading state
  body.classList.add("loading");

  // Simulate progress
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 10;
    progressBar.style.width = `${Math.min(progress, 100)}%`;

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
        body.classList.remove("loading");
        body.classList.add("loaded");
        // Initialize carousel AFTER loading completes
        initCarousel();
      }, 500);
    }
  }, 200);
}

// Carousel functionality
function initCarousel() {
  // Bot data
  const allBots = [
    "im.a.guff.555",
    "im.a.guff.556",
    "im.a.guff.557",
    "im.a.guff.558",
    "im.a.guff.559",
    "im.a.guff.560",
    "im.a.guff.561",
    "im.a.guff.562",
    "im.a.guff.563",
    "im.a.guff.564",
    "im.a.guff.565",
    "im.a.guff.566",
    "im.a.guff.567",
    "im.a.guff.568",
    "im.a.guff.569",
    "im.a.guff.570",
    "im.a.guff.571",
    "im.a.guff.572",
    "im.a.guff.573",
    "im.a.guff.574",
    "im.a.guff.575",
    "im.a.guff.576",
    "im.a.guff.577",
    "im.a.guff.578",
    "im.a.guff.579",
    "im.a.guff.580",
  ];

  // Shuffle array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const shuffledBots = shuffleArray([...allBots]);
  const botCarouselTrack = document.getElementById("bot-carousel-track");
  const prevButton = document.getElementById("prev-slide");
  const nextButton = document.getElementById("next-slide");
  const discordButton = document.querySelector(".guff-discord");

  // Initialize Toast
  const copyToastEl = document.getElementById("copyToast");
  const copyToast = new bootstrap.Toast(copyToastEl, {
    animation: true,
    autohide: true,
    delay: 2000,
  });

  // Carousel state
  let currentBatch = 0;
  const botsPerBatch = 3;
  const totalBatches = Math.ceil(shuffledBots.length / botsPerBatch);
  let autoSlideInterval;

  // Generate bot cards
  function generateBotCards() {
    botCarouselTrack.innerHTML = "";

    for (let i = 0; i < totalBatches; i++) {
      const batch = document.createElement("div");
      batch.className = "bot-batch";
      batch.style.width = "100%";

      const startIdx = i * botsPerBatch;
      const endIdx = startIdx + botsPerBatch;
      const batchBots = shuffledBots.slice(startIdx, endIdx);

      batchBots.forEach((bot) => {
        const botCard = document.createElement("div");
        botCard.className = "bot-slide";
        botCard.innerHTML = `
          <div class="bot-card">
            <div class="bot-avatar">
              <div class="avatar-img-wrapper">
                <img src="app/assets/icon.png" alt="${bot}" />
              </div>
            </div>
            <div class="bot-info">
              <div class="bot-name-with-icon">
                <span class="bot-name">${bot}</span>
                <img src="app/assets/guff-verified.png" alt="Verified" class="verified-icon" />
              </div>
            </div>
            <div class="bot-action">
              <button class="btn btn-primary btn-sm copy-btn" data-username="${bot}">
                <i class="fa-solid fa-copy"></i> Copy
              </button>
            </div>
          </div>
        `;
        batch.appendChild(botCard);
      });
      botCarouselTrack.appendChild(batch);
    }

    // Initialize copy buttons
    document.querySelectorAll(".copy-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const username = button.getAttribute("data-username");
        copyToClipboard(username);
      });
    });
  }

  function updateCarousel() {
    const batchWidth = 100;
    botCarouselTrack.style.transform = `translateX(-${
      currentBatch * batchWidth
    }%)`;
  }

  function nextBatch() {
    if (currentBatch < totalBatches - 1) {
      currentBatch++;
    } else {
      currentBatch = 0;
    }
    updateCarousel();
  }

  function prevBatch() {
    if (currentBatch > 0) {
      currentBatch--;
    } else {
      currentBatch = totalBatches - 1;
    }
    updateCarousel();
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextBatch, 6000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      // Update the timestamp
      const timeElement = copyToastEl.querySelector("small");
      const now = new Date();
      timeElement.textContent = `Just now (${now.getHours()}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")})`;

      // Show the toast
      copyToast.show();
    });
  }

  // Set Discord URL
  discordButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "https://discord.gg/your-invite-link";
  });

  // Initialize carousel
  generateBotCards();
  updateCarousel();
  startAutoSlide();

  // Event listeners
  nextButton.addEventListener("click", () => {
    stopAutoSlide();
    nextBatch();
    startAutoSlide();
  });

  prevButton.addEventListener("click", () => {
    stopAutoSlide();
    prevBatch();
    startAutoSlide();
  });

  // Pause on hover
  botCarouselTrack.addEventListener("mouseenter", stopAutoSlide);
  botCarouselTrack.addEventListener("mouseleave", startAutoSlide);
}

document.addEventListener("DOMContentLoaded", function () {
  simulateLoading();
});
