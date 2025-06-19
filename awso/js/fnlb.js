document.addEventListener("DOMContentLoaded", function () {
  // Merge all bot batches into one big pool
const allBots = [
    "LOBBY.MOM.ZQXR", "LOBBY.MOM.XVNL", "LOBBY.MOM.Q8TY", "LOBBY.MOM.JY3F", "LOBBY.MOM.WKRP", "LOBBY.MOM.NX7Q", "LOBBY.MOM.ML4Z", "LOBBY.MOM.RDU2", "LOBBY.MOM.HCVE", "LOBBY.MOM.TL9K", "LOBBY.MOM.VGEX", "LOBBY.MOM.KYND", "LOBBY.MOM.PW8R", "LOBBY.MOM.BAZQ", "LOBBY.MOM.C3LN", "LOBBY.MOM.VFJ5",

    ];


  // DOM Elements
  const botListContainer = document.querySelector(".list-group");
  const timerButton = document.getElementById("timerButton");
  const countdownElement = document.getElementById("countdown");
  const progressBar = document.getElementById("progressBar");
  const notification = document.createElement("div");
  notification.className = "copied-notification";
  notification.textContent = "Username copied to clipboard!";
  document.body.appendChild(notification);

  let countdown = 15;
  let timerInterval;

  // Animate bot counter with easing function
  function animateBotCount(target) {
    const element = document.querySelector('.bots-ready');
    const duration = 2000; // Animation duration in ms
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function - starts slow, ends fast
      const easedProgress = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      
      const currentValue = Math.floor(easedProgress * target);
      element.textContent = currentValue;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.textContent = target;
      }
    };

    requestAnimationFrame(animate);
  }

  // Helper function to shuffle and pick random bots
  function getRandomBots() {
    // Shuffle the entire bot pool
    const shuffled = [...allBots].sort(() => Math.random() - 0.5);
    // Return the first 5 (or adjust the number as needed)
    return shuffled.slice(0, 5);
  }

  // Function to render random bots
  function renderRandomBots() {
    const botItems = botListContainer.querySelectorAll(".bot-item");
    botItems.forEach((item) => item.remove());

    const randomBots = getRandomBots();

    randomBots.forEach((bot) => {
      const botItem = document.createElement("div");
      botItem.className =
        "list-group-item list-group-item-action d-flex gap-3 py-3 bot-item";
      botItem.innerHTML = `
            <img src="https://static.wikia.nocookie.net/fortnite_gamepedia/images/1/15/RemedyVsToxin.png" alt="${bot}" width="48" height="48" class="rounded-circle flex-shrink-0">
            <div class="d-flex gap-2 w-100 justify-content-between">
              <div>
                <h6 class="mb-0">${bot}</h6>
                <span class="badge badge-light-success fs-8 fw-bold"><img src="awso/assets/user-status.png" width="16px"> ONLINE</span> <i class="fa-duotone fa-solid fa-circle-dot fnlb-badge"></i> <span class="badge badge-light-primary fs-8 fw-bold"><img src="awso/assets/available.png" width="16px"> AVAILABLE</span>
              </div>
              <button class="btn btn-primary btn-sm copy-btn" data-username="${bot}">Copy <i class="fa-solid fa-copy"></i></button>
            </div>
          `;
      botListContainer.insertBefore(botItem, botListContainer.children[0]);
    });

    // Update bot counter with animation
    animateBotCount(allBots.length);

    // Add event listeners to new buttons
    document.querySelectorAll(".copy-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const username = this.getAttribute("data-username");
        copyToClipboard(username);
      });
    });
  }

  // Function to copy to clipboard
  function copyToClipboard(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        notification.classList.add("show");
        setTimeout(() => {
          notification.classList.remove("show");
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }

  // Function to start the countdown
  function startCountdown() {
    clearInterval(timerInterval);
    countdown = 15;
    updateCountdownDisplay();

    timerInterval = setInterval(() => {
      countdown--;
      updateCountdownDisplay();

      if (countdown <= 0) {
        renderRandomBots(); // Show new random bots on timer end
        countdown = 15;
      }
    }, 1000);
  }

  // Function to update countdown display
  function updateCountdownDisplay() {
    countdownElement.textContent = countdown;
    const progressPercentage = 100 - (countdown / 15) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    progressBar.setAttribute("aria-valuenow", progressPercentage);
  }

  // Initialize with random bots
  renderRandomBots();
  startCountdown();
  sendLaunchNotification();
});