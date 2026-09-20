function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function iconMarkup(g, cls) {
  return g.iconImg
    ? `<img src="${esc(g.iconImg)}" alt="${esc(g.name)} icon" loading="lazy">`
    : g.icon;
}

function renderFeatured() {
  const g = GAMES[0];
  document.getElementById("feat-title").textContent = g.name;
  document.getElementById("feat-sub").textContent = g.description;

  const dlBtn = g.downloadType !== "googlePlay"
    ? `<button class="btn btn-accent openDl" data-id="${g.id}">Download APK</button>` : "";
  const playBtn = (g.downloadType === "googlePlay" || g.downloadType === "both") && g.googlePlayUrl
    ? `<a href="${esc(g.googlePlayUrl)}" class="btn btn-primary" target="_blank" rel="noopener">Get it on Google Play</a>` : "";
  const shotsBtn = g.screenshots.length
    ? `<button class="btn btn-outline openShots" data-id="${g.id}" data-index="0">View Screenshots</button>` : "";

  const thumbs = g.screenshots.length
    ? `<div class="thumb-row">${g.screenshots.map((s, i) =>
        `<img src="${esc(s)}" alt="${esc(g.name)} screenshot ${i + 1}" loading="lazy" class="openShots" data-id="${g.id}" data-index="${i}">`
      ).join("")}</div>` : "";

  document.getElementById("featCardBody").innerHTML = `
    <div class="feat-art">${iconMarkup(g)}</div>
    <div>
      <div class="badge">${esc(g.genre)} · ${esc(g.platform.join(", "))}</div>
      <p style="color:var(--text-secondary);margin-bottom:10px;">${esc(g.description)}</p>
      <div class="feat-meta"><span>Version ${esc(g.version)}</span><span>${esc(g.platform.join(", "))}</span><span>Status: Coming Soon</span></div>
      <div class="feat-actions">${dlBtn}${playBtn}${shotsBtn}</div>
      ${thumbs}
    </div>`;
}

function renderGrid() {
  document.getElementById("gamesGrid").innerHTML = GAMES.map(g => `
    <div class="game-card">
      <div class="card-art">${g.iconImg ? `<img src="${esc(g.iconImg)}" alt="${esc(g.name)}" loading="lazy">` : g.icon}</div>
      <div class="card-body">
        <h3>${esc(g.name)}</h3>
        <p>${esc(g.description)}</p>
        <div class="card-foot">
          <span class="pill">${esc(g.genre)}</span>
          <button class="btn btn-outline openDl" data-id="${g.id}" style="padding:8px 16px;font-size:13px;">View Game</button>
        </div>
      </div>
    </div>`).join("");
}

function renderUpdates() {
  document.getElementById("updatesGrid").innerHTML = UPDATES.map(u => `
    <div class="update-card">
      <div class="update-date">${esc(u.date)}</div>
      <h3>${esc(u.title)}</h3>
      <p>${esc(u.desc)}</p>
    </div>`).join("");
}

renderFeatured();
renderGrid();
renderUpdates();

// header scroll effect
const header = document.getElementById("siteHeader");
window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 10));

// mobile menu
const hamBtn = document.getElementById("hamBtn");
const mobileMenu = document.getElementById("mobileMenu");
hamBtn.addEventListener("click", () => mobileMenu.classList.toggle("open"));
mobileMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => mobileMenu.classList.remove("open")));

// download modal
const dlModal = document.getElementById("dlModal");
document.getElementById("dlClose").addEventListener("click", () => dlModal.classList.remove("open"));
dlModal.addEventListener("click", e => { if (e.target === dlModal) dlModal.classList.remove("open"); });

// lightbox gallery
const lbModal = document.getElementById("lbModal");
const lbImg = document.getElementById("lbImg");
let lbGame = null, lbIndex = 0;

function openLightbox(gameId, index) {
  lbGame = GAMES.find(g => g.id === gameId);
  if (!lbGame || !lbGame.screenshots.length) return;
  lbIndex = index;
  lbImg.src = lbGame.screenshots[lbIndex];
  lbModal.classList.add("open");
}
function stepLightbox(dir) {
  if (!lbGame) return;
  const n = lbGame.screenshots.length;
  lbIndex = (lbIndex + dir + n) % n;
  lbImg.src = lbGame.screenshots[lbIndex];
}
document.getElementById("lbClose").addEventListener("click", () => lbModal.classList.remove("open"));
document.getElementById("lbPrev").addEventListener("click", () => stepLightbox(-1));
document.getElementById("lbNext").addEventListener("click", () => stepLightbox(1));
lbModal.addEventListener("click", e => { if (e.target === lbModal) lbModal.classList.remove("open"); });
document.addEventListener("keydown", e => {
  if (!lbModal.classList.contains("open")) return;
  if (e.key === "Escape") lbModal.classList.remove("open");
  if (e.key === "ArrowLeft") stepLightbox(-1);
  if (e.key === "ArrowRight") stepLightbox(1);
});
// basic swipe support
let touchStartX = null;
lbModal.addEventListener("touchstart", e => { touchStartX = e.touches[0].clientX; });
lbModal.addEventListener("touchend", e => {
  if (touchStartX === null) return;
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 40) stepLightbox(dx > 0 ? -1 : 1);
  touchStartX = null;
});

document.addEventListener("click", e => {
  const dl = e.target.closest(".openDl");
  if (dl) {
    const g = GAMES.find(x => x.id === dl.dataset.id);
    if (!g) return;
    document.getElementById("dlTitle").textContent = `You're downloading ${g.name}`;
    document.getElementById("dlVersion").textContent = `Version: ${g.version}`;
    document.getElementById("dlBtn").href = g.apkUrl || "#";
    dlModal.classList.add("open");
    return;
  }
  const shot = e.target.closest(".openShots");
  if (shot) {
    openLightbox(shot.dataset.id, parseInt(shot.dataset.index, 10) || 0);
  }
});

// contact form -> mailto fallback
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("cName").value;
  const email = document.getElementById("cEmail").value;
  const msg = document.getElementById("cMsg").value;
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`);
  window.location.href = `mailto:YOUR_CONTACT_EMAIL?subject=${encodeURIComponent("Message from KS Game Labs website")}&body=${body}`;
});
