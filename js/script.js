// -------------------------
// REFERENCIAS A ELEMENTOS
// -------------------------
const userBtn = document.getElementById("userBtn");
const dropdown = document.getElementById("dropdown");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const logoutBtn = document.getElementById("logoutBtn");
const wishlistBtn = document.getElementById("wishlistBtn");
const homeBtn = document.getElementById("homeBtn");

const cards = document.querySelectorAll(".card");

// -------------------------
// ESTADO DE SESIÓN
// -------------------------
let loggedIn = localStorage.getItem("loggedIn") === "true";

// -------------------------
// FUNCIONES
// -------------------------
function getWishlist() {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
}

function saveWishlist(wishlist) {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

function updateMenu() {
  if (loggedIn) {
    loginBtn.classList.add("hidden");
    registerBtn.classList.add("hidden");
    wishlistBtn.classList.remove("hidden");
    logoutBtn.classList.remove("hidden");
  } else {
    loginBtn.classList.remove("hidden");
    registerBtn.classList.remove("hidden");
    wishlistBtn.classList.add("hidden");
    logoutBtn.classList.add("hidden");
  }
}

function updateWishlistButtons(card) {
  const addBtn = card.querySelector(".add-to-wishlist");
  const removeBtn = card.querySelector(".remove-from-wishlist");

  if (!loggedIn) {
    addBtn.classList.add("hidden");
    removeBtn.classList.add("hidden");
    return;
  }

  const wishlist = getWishlist();
  const eventId = card.dataset.id;

  if (wishlist.includes(eventId)) {
    addBtn.classList.add("hidden");
    removeBtn.classList.remove("hidden");
  } else {
    addBtn.classList.remove("hidden");
    removeBtn.classList.add("hidden");
  }
}

function renderAllCards() {
  cards.forEach(card => {
    card.style.display = "block";
    updateWishlistButtons(card);
  });
}

// -------------------------
// EVENT LISTENERS
// -------------------------
userBtn.addEventListener("click", () => dropdown.classList.toggle("hidden"));

document.addEventListener("click", (e) => {
  if (!dropdown.classList.contains("hidden") &&
      !dropdown.contains(e.target) &&
      e.target !== userBtn) {
    dropdown.classList.add("hidden");
  }
});

// Login / registro simulados
loginBtn.addEventListener("click", () => { loggedIn = true; localStorage.setItem("loggedIn", "true"); updateMenu(); renderAllCards(); alert("Sesión iniciada (simulada)"); });
registerBtn.addEventListener("click", () => { loggedIn = true; localStorage.setItem("loggedIn", "true"); updateMenu(); renderAllCards(); alert("Registro simulado"); });
logoutBtn.addEventListener("click", () => { loggedIn = false; localStorage.removeItem("loggedIn"); updateMenu(); renderAllCards(); });

// Wishlist
wishlistBtn.addEventListener("click", () => {
  cards.forEach(card => {
    const eventId = card.dataset.id;
    if (getWishlist().includes(eventId)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
  dropdown.classList.add("hidden");
});

// Home
homeBtn.addEventListener("click", () => renderAllCards());

// Botones de cada card
cards.forEach(card => {
  const addBtn = card.querySelector(".add-to-wishlist");
  const removeBtn = card.querySelector(".remove-from-wishlist");
  const eventId = card.dataset.id;

  updateWishlistButtons(card);

  addBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!loggedIn) { alert("Debes iniciar sesión"); return; }
    const wishlist = getWishlist();
    if (!wishlist.includes(eventId)) { wishlist.push(eventId); saveWishlist(wishlist); updateWishlistButtons(card); }
  });

  removeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    let wishlist = getWishlist();
    wishlist = wishlist.filter(id => id !== eventId);
    saveWishlist(wishlist);
    updateWishlistButtons(card);
  });
});

// Inicializar menú y cards
updateMenu();
renderAllCards();
