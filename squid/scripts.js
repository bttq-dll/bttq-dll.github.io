// Robust loader + Black Friday bar script (drop-in replacement)

// ---------- simulateLoading (safe) ----------
function simulateLoading() {
  try {
    const loader = document.getElementById("loader");
    const progressBar = document.querySelector(".loader-progress");
    const body = document.body;

    if (!loader || !progressBar) {
      // If loader elements are missing, ensure main content shows
      document.querySelector(".main-content")?.classList.add("visible");
      // still attempt to show BF bar after a tick
      setTimeout(showBlackFridayBar, 200);
      return;
    }

    // Ensure BF bar is hidden while loading
    const bfBar = document.getElementById("bfBar");
    if (bfBar) {
      bfBar.style.display = "none";
      bfBar.style.visibility = "hidden";
      bfBar.style.opacity = "0";
    }

    // Start loading state
    body.classList.add("loading");

    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      progressBar.style.width = `${Math.min(progress, 100)}%`;

      if (progress >= 100) {
        clearInterval(interval);
        // Wait a tiny bit to simulate fade out
        setTimeout(() => {
          // Hide loader
          loader.style.opacity = "0";
          loader.style.visibility = "hidden";
          // Remove loading class and mark loaded
          body.classList.remove("loading");
          body.classList.add("loaded");

          // Reveal main content
          const mainContent = document.querySelector(".main-content");
          if (mainContent) {
            mainContent.classList.add("visible");
          }

          // Show BF bar only after loader is totally hidden
          // use requestAnimationFrame to ensure DOM paint happened
          requestAnimationFrame(() => {
            try { showBlackFridayBar(); } catch (e) { /* swallow safely */ }
          });

          // init optional carousel safely
          if (typeof initCarousel === "function") {
            try { initCarousel(); } catch (e) { /* swallow safely */ }
          }
        }, 450);
      }
    }, 180);
  } catch (err) {
    // If anything unexpectedly throws, show the content so page doesn't stay blank
    console.error("simulateLoading error:", err);
    document.querySelector(".main-content")?.classList.add("visible");
    document.body.classList.remove("loading");
    setTimeout(showBlackFridayBar, 250);
  }
}

// ---------- Black Friday Bar (defensive) ----------
function showBlackFridayBar() {
  const bfBar = document.getElementById("bfBar");
  if (!bfBar) return;

  // If user dismissed, don't show
  if (localStorage.getItem('bfBarDismissed') === '1') return;

  // Ensure hidden state cleared and measurable
  bfBar.style.display = "flex";
  bfBar.style.visibility = "visible";
  bfBar.style.opacity = "0";
  bfBar.style.transform = "translateY(-6px)";
  bfBar.style.transition = "opacity 260ms ease, transform 260ms ease";

  // Force reflow to measure height reliably
  void bfBar.offsetWidth;

  // Measure actual height and set CSS var on :root (safe)
  const height = Math.ceil(bfBar.getBoundingClientRect().height || bfBar.offsetHeight || 0);
  try {
    document.documentElement.style.setProperty('--bf-height', `${height}px`);
  } catch (e) {
    // ignore if setting CSS var fails (rare)
  }

  // Add body class so CSS can reduce min-vh-100 if present
  document.body.classList.add('bf-shown');

  // Animate in
  requestAnimationFrame(() => {
    bfBar.style.opacity = "1";
    bfBar.style.transform = "translateY(0)";
  });

  // Wire close button if present
  const closeBtn = bfBar.querySelector(".bf-close");
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      hideBlackFridayBar(true);
    }, { once: true });
  }
}

function hideBlackFridayBar(persist = false) {
  const bfBar = document.getElementById("bfBar");
  if (!bfBar) return;

  bfBar.style.transition = "opacity 200ms ease, transform 200ms ease";
  bfBar.style.opacity = "0";
  bfBar.style.transform = "translateY(-6px)";

  setTimeout(() => {
    bfBar.style.display = "none";
    bfBar.style.visibility = "hidden";
    document.documentElement.style.setProperty('--bf-height', `0px`);
    document.body.classList.remove('bf-shown');
  }, 220);

  if (persist) localStorage.setItem('bfBarDismissed', '1');
}

// ---------- Language toggle & translation (unchanged, defensive) ----------
function setupLanguageToggle() {
  try {
    const langToggle = document.getElementById('lang-toggle');
    if (!langToggle) return;

    const savedLang = getCookie('lang') || 'en';
    let currentLang = savedLang;
    updateLanguage(currentLang);

    langToggle.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'ko' : 'en';
      setCookie('lang', currentLang, 365);
      updateLanguage(currentLang);
    });
  } catch (e) {
    console.error("setupLanguageToggle error:", e);
  }
}

function updateLanguage(lang) {
  try {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(el => {
      const originalHeight = el.offsetHeight;
      el.style.minHeight = `${originalHeight}px`;
      el.classList.add('skeleton');
      const children = el.querySelectorAll('*');
      children.forEach(child => child.style.visibility = 'hidden');
    });

    setTimeout(() => {
      elements.forEach(el => {
        const key = el.getAttribute('data-translate');
        const translation = translations[lang]?.[key] || translations['en']?.[key] || '';
        if (translation) el.innerHTML = translation;
        el.classList.remove('skeleton');
        el.style.minHeight = '';
        const children = el.querySelectorAll('*');
        children.forEach(child => child.style.visibility = '');
      });

      const langToggle = document.getElementById('lang-toggle');
      if (langToggle) {
        langToggle.innerHTML = lang === 'en' ?
          '<img src="assets/south-korea.png" alt="KR" style="width: 20px; margin-right: 6px;">' :
          '<img src="assets/usa.png" alt="US" style="width: 20px; margin-right: 6px;">';
      }
    }, 500);
  } catch (e) {
    console.error("updateLanguage error:", e);
  }
}

// ---------- cookies/helpers & translations ----------
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
}
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
const translations = {
  en: {
    title: '<img src="assets/logo.png" alt="Squid Logo" class="main-logo mb-4 loader-logo">',
    subtitle: 'Want to have fun with <span class="fortnite-t">free Fortnite lobby bots</span>?<br>Join my <span class="fortnite-t"><i class="fa-brands fa-discord"></i> Discord server</span> and grab yours now!',
    discord: '<i class="fa-brands fa-discord"></i> Lets Begin!',
    faq: 'FAQ',
    tos: '<i class="fa-solid fa-book-section"></i> Informations',
    privacy: '<i class="fa-solid fa-square-dollar"></i> Deluxe',
    disclaimer: 'awsome.gg is an independent project and is not affiliated with, endorsed by,<br class="d-none d-sm-inline">or associated with Epic Games or Discord in any way. All trademarks and copyrights are the property of their respective owners.'
  },
  ko: {
    title: '<img src="assets/logo.png" alt="Squid Logo" class="main-logo mb-4 loader-logo">',
    subtitle: '<span class="fortnite-t">무료 포트나이트 로비 봇</span>으로 재미를 누려보세요?<br><span class="fortnite-t"><i class="fa-brands fa-discord"></i> 디스코드 서버</span>에서 지금 당장 받아보세요!',
    discord: '디스코드',
    faq: '자주묻는질문',
    tos: '이용약관',
    privacy: '개인정보처리방침',
    disclaimer: 'awsome.gg 은(는) 독립적인 프로젝트이며, Epic Games나 Discord와 제휴, 승인, 연관되지 않았습니다.<br class="d-none d-sm-inline"> 모든 상표권과 저작권은 각 소유자의 재산입니다.'
  }
};

// ---------- init ----------
document.addEventListener('DOMContentLoaded', () => {
  // safety: hide BF bar at start
  const bfBar = document.getElementById("bfBar");
  if (bfBar) {
    bfBar.style.display = "none";
    bfBar.style.visibility = "hidden";
    bfBar.style.opacity = "0";
    document.documentElement.style.setProperty('--bf-height', '0px');
  }

  simulateLoading();
  setupLanguageToggle();
});

// fallback: make sure BF bar shows if loader already hidden
window.addEventListener('load', () => {
  const loader = document.getElementById("loader");
  if (loader && getComputedStyle(loader).visibility === 'hidden') {
    try { showBlackFridayBar(); } catch (e) {}
  }
});
