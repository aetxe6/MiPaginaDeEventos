// -------------------------
// REFERENCIAS A ELEMENTOS
// -------------------------
const userBtn = document.getElementById("userBtn");
const dropdown = document.getElementById("dropdown");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const logoutBtn = document.getElementById("logoutBtn");
const wishlistBtn = document.getElementById("wishlistBtn");

const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const submitBtn = document.getElementById("submitBtn");
const modalTitle = document.getElementById("modalTitle");

// Modal de eventos
const eventModal = document.getElementById("eventModal");
const closeEventModal = document.getElementById("closeEventModal");
const eventTitle = document.getElementById("eventTitle");
const eventDescription = document.getElementById("eventDescription");
const addToWishlistBtn = document.getElementById("addToWishlistBtn");
// Wishlist
const wishlistModal = document.getElementById("wishlistModal");
const closeWishlistModal = document.getElementById("closeWishlistModal");
const wishlistContainer = document.getElementById("wishlistContainer");
const wishlistEmpty = document.getElementById("wishlistEmpty");



function getWishlist() {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
}

function saveWishlist(wishlist) {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

function renderWishlist() {
  const wishlist = getWishlist();
  wishlistContainer.innerHTML = "";

  if (wishlist.length === 0) {
    wishlistEmpty.style.display = "block";
    return;
  }

  wishlistEmpty.style.display = "none";

  wishlist.forEach(event => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="card-content">
        <h3>${event.title}</h3>
        <p>${event.description}</p>
      </div>
    `;

    wishlistContainer.appendChild(card);
  });
}


// -------------------------
// ESTADO DE SESIÓN
// -------------------------
let loggedIn = localStorage.getItem("loggedIn") === "true";
let currentEvent = null;

// -------------------------
// FUNCIONES
// -------------------------
function updateMenu() {
  if (loggedIn) {
    loginBtn.classList.add("hidden");
    registerBtn.classList.add("hidden");
    wishlistBtn.classList.remove("hidden"); // NUEVO
    logoutBtn.classList.remove("hidden");
  } else {
    loginBtn.classList.remove("hidden");
    registerBtn.classList.remove("hidden");
    wishlistBtn.classList.add("hidden");   // NUEVO
    logoutBtn.classList.add("hidden");
  }
}

// -------------------------
// EVENT LISTENERS
// -------------------------

// Toggle dropdown
userBtn.addEventListener("click", () => {
  dropdown.classList.toggle("hidden");
});

// Abrir modal de login
loginBtn.addEventListener("click", () => {
  modal.classList.add("show");
  modalTitle.textContent = "Iniciar Sesión";
  dropdown.classList.add("hidden"); // Oculta dropdown al abrir modal
});

// Abrir modal de registro
registerBtn.addEventListener("click", () => {
  modal.classList.add("show");
  modalTitle.textContent = "Registrarse";
  dropdown.classList.add("hidden"); // Oculta dropdown al abrir modal
});

// Cerrar modal
closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
});

// Login simulado al pulsar Entrar
submitBtn.addEventListener("click", () => {
  loggedIn = true;
  localStorage.setItem("loggedIn", "true");
  updateMenu();
  modal.classList.remove("show");
  alert("Sesión iniciada (simulada)");
});

// Cerrar sesión
logoutBtn.addEventListener("click", () => {
  loggedIn = false;
  localStorage.removeItem("loggedIn");
  updateMenu();
  alert("Sesión cerrada");
});

// Cerrar modal al hacer click fuera del contenido
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
  }
});

// Inicializa menú al cargar
updateMenu();

// -------------------------
// FILTRO DE EVENTOS (UX)
// -------------------------
const filterBtn = document.getElementById("filterBtn");
const filterDropdown = document.getElementById("filterDropdown");
const checkboxes = filterDropdown.querySelectorAll("input[type='checkbox']");
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
  card.addEventListener("click", () => {
    currentEvent = {
      title: card.querySelector("h3").textContent,
      description: card.querySelector("p").textContent
    };

    eventTitle.textContent = currentEvent.title;
    eventDescription.textContent = currentEvent.description;

    eventModal.classList.add("show");
  });
});


// Abrir / cerrar filtro al pulsar botón
filterBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  filterDropdown.classList.toggle("hidden");
});

// Evitar que clicks dentro del dropdown lo cierren
filterDropdown.addEventListener("click", (e) => {
  e.stopPropagation();
});

// Cerrar filtro al hacer click fuera
document.addEventListener("click", () => {
  filterDropdown.classList.add("hidden");
});

// Función para filtrar cards
function filterCards() {
  const activeCategories = Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value);

  cards.forEach(card => {
    const category = card.dataset.category;
    card.style.display =
      activeCategories.length === 0 || activeCategories.includes(category)
        ? "block"
        : "none";
  });
}

// Escuchar cambios en los checkboxes
checkboxes.forEach(checkbox => {
  checkbox.addEventListener("change", filterCards);
});

cards.forEach(card => {
  card.addEventListener("click", () => {
    const title = card.querySelector("h3").textContent;
    const description = card.querySelector("p").textContent;

    eventTitle.textContent = title;
    eventDescription.textContent = description;

    eventModal.classList.add("show");
  });
});

closeEventModal.addEventListener("click", () => {
  eventModal.classList.remove("show");
});

eventModal.addEventListener("click", (e) => {
  if (e.target === eventModal) {
    eventModal.classList.remove("show");
  }
});


addToWishlistBtn.addEventListener("click", () => {
  if (!loggedIn) {
    alert("Debes iniciar sesión para añadir eventos a tu lista");
    return;
  }

  alert("Evento añadido a tu lista (simulado)");
});

wishlistBtn.addEventListener("click", () => {
  dropdown.classList.add("hidden");
  renderWishlist();
  wishlistModal.classList.add("show");
});

closeWishlistModal.addEventListener("click", () => {
  wishlistModal.classList.remove("show");
});

wishlistModal.addEventListener("click", (e) => {
  if (e.target === wishlistModal) {
    wishlistModal.classList.remove("show");
  }
});

addToWishlistBtn.addEventListener("click", () => {
  if (!loggedIn) {
    alert("Debes iniciar sesión para añadir eventos");
    return;
  }

  if (!currentEvent) return;

  const wishlist = getWishlist();

  const exists = wishlist.some(
    event => event.title === currentEvent.title
  );

  if (exists) {
    alert("Este evento ya está en tu lista");
    return;
  }

  wishlist.push(currentEvent);
  saveWishlist(wishlist);

  alert("Evento añadido a tu lista");
});


