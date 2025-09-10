/* ========== Feature JS for Everest site ========== */
/* Buttons, modal, facts, theme, form validation, subscribe simulation */

(() => {
  // --- Theme toggle (persist in localStorage) ---
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('ev_theme');
  function applyTheme(theme){
    if(theme === 'dark'){
      root.setAttribute('data-theme','dark');
      themeToggle.textContent = '☀️';
      themeToggle.setAttribute('aria-pressed','true');
    } else {
      root.removeAttribute('data-theme');
      themeToggle.textContent = '🌙';
      themeToggle.setAttribute('aria-pressed','false');
    }
  }
  applyTheme(savedTheme || 'light');
  themeToggle.addEventListener('click', () => {
    const now = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('ev_theme', now);
    applyTheme(now);
  });

  // --- Random facts + auto rotate ---
  const facts = [
    "Mount Everest grows about 4 mm every year due to tectonic uplift.",
    "Tibetan name: Chomolungma — 'Goddess Mother of the World'.",
    "Temperatures on Everest can fall below −60°C in winter.",
    "The 'death zone' is above 8,000 m where the human body cannot acclimatize.",
    "First verified ascent: 29 May 1953 — Hillary & Tenzing."
  ];
  const factBtn = document.getElementById('factBtn');
  const randEl = document.getElementById('randomFact');
  const autoBtn = document.getElementById('autoFactsBtn');

  function showFact(i){
    randEl.textContent = facts[i];
  }
  factBtn.addEventListener('click', () => {
    const i = Math.floor(Math.random() * facts.length);
    showFact(i);
  });

  // auto-rotate state
  let autoInterval = null;
  autoBtn.addEventListener('click', () => {
    const pressing = autoBtn.getAttribute('aria-pressed') === 'true';
    if (pressing) {
      stopAutoFacts();
    } else {
      startAutoFacts();
    }
  });
  function startAutoFacts() {
    autoBtn.setAttribute('aria-pressed','true');
    autoInterval = setInterval(() => {
      const i = Math.floor(Math.random() * facts.length);
      showFact(i);
    }, 3000);
  }
  function stopAutoFacts(){
    autoBtn.setAttribute('aria-pressed','false');
    if(autoInterval) { clearInterval(autoInterval); autoInterval = null; }
  }

  // --- Modal: climbing tips ---
  const tipsBtn = document.getElementById('tipsBtn');
  const tipsModal = document.getElementById('tipsModal');
  const closeModal = document.getElementById('closeModal');

  function openModal(){
    tipsModal.setAttribute('aria-hidden','false');
    // trap focus (simple)
    closeModal.focus();
    document.body.style.overflow = 'hidden';
  }
  function closeModalFn(){
    tipsModal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    tipsBtn.focus();
  }
  tipsBtn.addEventListener('click', openModal);
  closeModal.addEventListener('click', closeModalFn);
  tipsModal.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') closeModalFn();
  });
  tipsModal.addEventListener('click', (e) => {
    if(e.target === tipsModal) closeModalFn();
  });

  // --- Subscribe (simulated) ---
  const subscribeBtn = document.getElementById('subscribeBtn');
  const subscribeEmail = document.getElementById('subscribeEmail');
  const subscribeMsg = document.getElementById('subscribeMsg');
  subscribeBtn.addEventListener('click', () => {
    const email = subscribeEmail.value.trim();
    if(!email || !/^\S+@\S+\.\S+$/.test(email)){
      subscribeMsg.textContent = 'Please enter a valid email.';
      subscribeMsg.style.color = 'tomato';
      return;
    }
    // simulate store
    const list = JSON.parse(localStorage.getItem('ev_subs') || '[]');
    if(list.includes(email)){
      subscribeMsg.textContent = 'You are already subscribed (simulated).';
      subscribeMsg.style.color = 'var(--muted)';
    } else {
      list.push(email);
      localStorage.setItem('ev_subs', JSON.stringify(list));
      subscribeMsg.textContent = 'Thanks! Subscription saved (simulated).';
      subscribeMsg.style.color = 'green';
      subscribeEmail.value = '';
    }
  });

  // --- Contact form validation (client-only) ---
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if(name.length < 2){
      formMsg.textContent = 'Please enter your name (at least 2 chars).';
      formMsg.style.color = 'tomato';
      form.name.focus();
      return;
    }
    if(!/^\S+@\S+\.\S+$/.test(email)){
      formMsg.textContent = 'Please enter a valid email.';
      formMsg.style.color = 'tomato';
      form.email.focus();
      return;
    }
    if(message.length < 10){
      formMsg.textContent = 'Message too short (min 10 chars).';
      formMsg.style.color = 'tomato';
      form.message.focus();
      return;
    }

    // simulate send
    formMsg.textContent = 'Message sent (simulated). Thank you!';
    formMsg.style.color = 'green';
    form.reset();
  });

  // --- Visit buttons ---
  document.getElementById('routeBtn').addEventListener('click', () => {
    alert('Suggested route: Lukla → Phakding → Namche Bazaar → Tengboche → Dingboche → Lobuche → Everest Base Camp (EBC).');
  });
  document.getElementById('mapBtn').addEventListener('click', () => {
    window.open('https://www.google.com/maps/place/Mount+Everest', '_blank', 'noopener');
  });

  // --- Accessibility: smooth scroll for internal anchors ---
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  // --- Small UX: show one initial fact ---
  showFact(0);
})();
