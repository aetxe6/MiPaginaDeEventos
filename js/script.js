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

const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const submitBtn = document.getElementById("submitBtn");
const modalTitle = document.getElementById("modalTitle");
const mapBtn = document.getElementById("mapBtn");

const cards = document.querySelectorAll(".card");

const cardsContainer = document.querySelector(".cards-container");
const searchInput = document.getElementById("searchInput");
const mapContainer = document.getElementById("mapContainer");

let map; // variable global Leaflet
let markers = []; // para guardar los marcadores




// Datos de ejemplo de eventos con lat/lng
const eventLocations = [
  { id: "1", title: "Concierto en Vivo", lat: 40.4168, lng: -3.7038 }, // Madrid
  { id: "2", title: "Obra de Teatro", lat: 41.3851, lng: 2.1734 }, // Barcelona
  { id: "3", title: "Exposición de Arte", lat: 39.4699, lng: -0.3763 }, // Valencia
  { id: "4", title: "Festival Nocturno", lat: 38.9067, lng: 1.4206 }, // Ibiza
];
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();

  cards.forEach(card => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    const category = card.dataset.category.toLowerCase();

    // Si el texto coincide con el título o categoría, mostramos
    if (title.includes(query) || category.includes(query)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});


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

// Actualiza visibilidad de los botones de wishlist por card
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

// Muestra todas las cards y actualiza botones
function renderAllCards() {
  cards.forEach(card => {
    card.style.display = "block";
    updateWishlistButtons(card);
  });
}

// Función para ir a la página de detalle
function goToEvent(eventId) {
  window.location.href = `evento.html?id=${eventId}`;
}


// -------------------------
// EVENT LISTENERS
// -------------------------
mapBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // evitar cierre accidental de dropdowns

  const showingMap = !mapContainer.classList.contains("hidden");

  if (showingMap) {
    mapContainer.classList.add("hidden");
    cardsContainer.classList.remove("hidden");
    mapBtn.textContent = "Mapa de eventos🌍";
  } else {
    cardsContainer.classList.add("hidden");
    mapContainer.classList.remove("hidden");
    mapBtn.textContent = "Volver a lista";

    if (!map) {
      map = L.map("mapContainer").setView([40.4168, -3.7038], 5);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      // Crear marcadores de cada card
      cards.forEach(card => {
        const lat = parseFloat(card.dataset.lat);
        const lng = parseFloat(card.dataset.lng);
        const id = card.dataset.id;
        const title = card.querySelector("h3").textContent;

        const marker = L.marker([lat, lng]).addTo(map);
        marker.bindPopup(`<b>${title}</b><br><button onclick="window.location.href='evento.html?id=${id}'">Ver detalle</button>`);
        markers.push(marker);
      });
    }
  }
});


// Toggle dropdown usuario
userBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdown.classList.toggle("hidden");
});

// Cerrar dropdown al hacer click fuera
document.addEventListener("click", (e) => {
  if (!dropdown.classList.contains("hidden") &&
      !dropdown.contains(e.target) &&
      e.target !== userBtn) {
    dropdown.classList.add("hidden");
  }

  if (!filterDropdown.classList.contains("hidden") &&
      !filterDropdown.contains(e.target) &&
      e.target !== filterBtn) {
    filterDropdown.classList.add("hidden");
  }
});


// Abrir modal login
loginBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  modal.classList.remove("hidden");
  modal.classList.add("show");
  modalTitle.textContent = "Iniciar Sesión";
  dropdown.classList.add("hidden");
});

// Abrir modal registro
registerBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  modal.classList.remove("hidden");
  modal.classList.add("show");
  modalTitle.textContent = "Registrarse";
  dropdown.classList.add("hidden");
});

// Cerrar modal con botón
closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
  modal.classList.add("hidden");
});

// Cerrar modal al hacer click fuera del contenido
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
    modal.classList.add("hidden");
  }
});

// Login simulado
submitBtn.addEventListener("click", () => {
  loggedIn = true;
  localStorage.setItem("loggedIn", "true");
  updateMenu();
  renderAllCards();
  modal.classList.remove("show");
  alert("Sesión iniciada (simulada)");
});

// Logout
logoutBtn.addEventListener("click", () => {
  loggedIn = false;
  localStorage.removeItem("loggedIn");
  updateMenu();
  renderAllCards();
});

// Mostrar wishlist: solo cards guardadas
wishlistBtn.addEventListener("click", () => {
  const wishlist = getWishlist();
  cards.forEach(card => {
    if (wishlist.includes(card.dataset.id)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
  dropdown.classList.add("hidden");
});

// Home: mostrar todas las cards
homeBtn.addEventListener("click", () => {
  renderAllCards();
});

// -------------------------
// BOTONES DE CADA CARD
// -------------------------
cards.forEach(card => {
  const addBtn = card.querySelector(".add-to-wishlist");
  const removeBtn = card.querySelector(".remove-from-wishlist");
  const eventId = card.dataset.id;

  // Inicializar visibilidad botones
  updateWishlistButtons(card);

  // Añadir a wishlist
  addBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // evitar abrir página detalle
    if (!loggedIn) {
      alert("Debes iniciar sesión");
      return;
    }

    const wishlist = getWishlist();
    if (!wishlist.includes(eventId)) {
      wishlist.push(eventId);
      saveWishlist(wishlist);
      updateWishlistButtons(card);
    }
  });

  // Eliminar de wishlist
  removeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    let wishlist = getWishlist();
    wishlist = wishlist.filter(id => id !== eventId);
    saveWishlist(wishlist);
    updateWishlistButtons(card);
  });

  // Abrir página detalle al clickear en la card
  card.addEventListener("click", () => {
    window.location.href = `evento.html?id=${eventId}`;
  });
});

// Inicializar menú y cards al cargar
updateMenu();
renderAllCards();


const filterBtn = document.getElementById("filterBtn");
const filterDropdown = document.getElementById("filterDropdown");

const filterCheckboxes = filterDropdown.querySelectorAll("input[type=checkbox]");

filterCheckboxes.forEach(checkbox => {
  checkbox.addEventListener("change", () => {
    const selectedCategories = Array.from(filterCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    cards.forEach(card => {
      if (selectedCategories.length === 0 || selectedCategories.includes(card.dataset.category)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});


filterBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // evitar que se cierre al click fuera
  filterDropdown.classList.toggle("hidden");
});






