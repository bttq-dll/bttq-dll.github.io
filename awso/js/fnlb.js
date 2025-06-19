document.addEventListener("DOMContentLoaded", function () {
  // Merge all bot batches into one big pool
const allBots = [
  "Aura1", "Aura2", "Aura3", "Aura4", "Aura5",
  "BotX1", "BotX2", "BotX3", "BotX4", "BotX5",
  "LobbyMaster1", "LobbyMaster2", "LobbyMaster3", "LobbyMaster4", "LobbyMaster5",
  "FortniteBot1", "FortniteBot2", "FortniteBot3", "FortniteBot4", "FortniteBot5",
  "EpicLobby1", "EpicLobby2", "EpicLobby3", "EpicLobby4", "EpicLobby5",
  "MatchBot1", "MatchBot2", "MatchBot3", "MatchBot4", "MatchBot5",
  "QueueKing1", "QueueKing2", "QueueKing3", "QueueKing4", "QueueKing5",
  "StormWatcher1", "StormWatcher2", "StormWatcher3", "StormWatcher4", "StormWatcher5",
  "BattleBuddy1", "BattleBuddy2", "BattleBuddy3", "BattleBuddy4", "BattleBuddy5",
  "DropZone1", "DropZone2", "DropZone3", "DropZone4", "DropZone5",
  "ZoneWarden1", "ZoneWarden2", "ZoneWarden3", "ZoneWarden4", "ZoneWarden5",
  "VictoryBot1", "VictoryBot2", "VictoryBot3", "VictoryBot4", "VictoryBot5",
  "LobbyGuard1", "LobbyGuard2", "LobbyGuard3", "LobbyGuard4", "LobbyGuard5",
  "BuildPro1", "BuildPro2", "BuildPro3", "BuildPro4", "BuildPro5",
  "SweatBot1", "SweatBot2", "SweatBot3", "SweatBot4", "SweatBot5",
  "NoScope1", "NoScope2", "NoScope3", "NoScope4", "NoScope5",
  "Cranker1", "Cranker2", "Cranker3", "Cranker4", "Cranker5",
  "SniperAI1", "SniperAI2", "SniperAI3", "SniperAI4", "SniperAI5",
  "RampRush1", "RampRush2", "RampRush3", "RampRush4", "RampRush5",
  "TurboBuilder1", "TurboBuilder2", "TurboBuilder3", "TurboBuilder4", "TurboBuilder5",
  "EditLord1", "EditLord2", "EditLord3", "EditLord4", "EditLord5",
  "ClutchBot1", "ClutchBot2", "ClutchBot3", "ClutchBot4", "ClutchBot5",
  "BoxFighter1", "BoxFighter2", "BoxFighter3", "BoxFighter4", "BoxFighter5",
  "PickaxePal1", "PickaxePal2", "PickaxePal3", "PickaxePal4", "PickaxePal5",
  "RebootRobo1", "RebootRobo2", "RebootRobo3", "RebootRobo4", "RebootRobo5",
  "GliderBot1", "GliderBot2", "GliderBot3", "GliderBot4", "GliderBot5",
  "Crackshot1", "Crackshot2", "Crackshot3", "Crackshot4", "Crackshot5",
  "SweatyJoe1", "SweatyJoe2", "SweatyJoe3", "SweatyJoe4", "SweatyJoe5",
  "ShieldGen1", "ShieldGen2", "ShieldGen3", "ShieldGen4", "ShieldGen5",
  "FlopperKing1", "FlopperKing2", "FlopperKing3", "FlopperKing4", "FlopperKing5",
  "StormRunner1", "StormRunner2", "StormRunner3", "StormRunner4", "StormRunner5",
  "RezzMachine1", "RezzMachine2", "RezzMachine3", "RezzMachine4", "RezzMachine5",
  "MedkitBot1", "MedkitBot2", "MedkitBot3", "MedkitBot4", "MedkitBot5",
  "ZoneBot1", "ZoneBot2", "ZoneBot3", "ZoneBot4", "ZoneBot5",
  "TrapMaster1", "TrapMaster2", "TrapMaster3", "TrapMaster4", "TrapMaster5",
  "LaunchLad1", "LaunchLad2", "LaunchLad3", "LaunchLad4", "LaunchLad5",
  "TiltedAI1", "TiltedAI2", "TiltedAI3", "TiltedAI4", "TiltedAI5",
  "GreasyBot1", "GreasyBot2", "GreasyBot3", "GreasyBot4", "GreasyBot5",
  "SlurpBoy1", "SlurpBoy2", "SlurpBoy3", "SlurpBoy4", "SlurpBoy5",
  "RebootRoy1", "RebootRoy2", "RebootRoy3", "RebootRoy4", "RebootRoy5",
  "CrackedBot1", "CrackedBot2", "CrackedBot3", "CrackedBot4", "CrackedBot5"
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

  let countdown = 30;
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
                <span class="badge badge-light-success fs-8 fw-bold"><img src="_awso/assets/user-status.png" width="16px"> ONLINE</span> <i class="fa-duotone fa-solid fa-circle-dot fnlb-badge"></i> <span class="badge badge-light-primary fs-8 fw-bold"><img src="_awso/assets/available.png" width="16px"> AVAILABLE</span>
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
    countdown = 30;
    updateCountdownDisplay();

    timerInterval = setInterval(() => {
      countdown--;
      updateCountdownDisplay();

      if (countdown <= 0) {
        renderRandomBots(); // Show new random bots on timer end
        countdown = 30;
      }
    }, 1000);
  }

  // Function to update countdown display
  function updateCountdownDisplay() {
    countdownElement.textContent = countdown;
    const progressPercentage = 100 - (countdown / 30) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    progressBar.setAttribute("aria-valuenow", progressPercentage);
  }

  // Initialize with random bots
  renderRandomBots();
  startCountdown();
});