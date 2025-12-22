// -------------------------
// REFERENCIAS A ELEMENTOS
// -------------------------
const userBtn = document.getElementById("userBtn");
const dropdown = document.getElementById("dropdown");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const logoutBtn = document.getElementById("logoutBtn");

const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const submitBtn = document.getElementById("submitBtn");
const modalTitle = document.getElementById("modalTitle");

// -------------------------
// ESTADO DE SESIÓN
// -------------------------
let loggedIn = localStorage.getItem("loggedIn") === "true";

// -------------------------
// FUNCIONES
// -------------------------
function updateMenu() {
  if (loggedIn) {
    loginBtn.classList.add("hidden");
    registerBtn.classList.add("hidden");
    logoutBtn.classList.remove("hidden");
  } else {
    loginBtn.classList.remove("hidden");
    registerBtn.classList.remove("hidden");
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

// Abrir / cerrar filtro al pulsar botón
filterBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // 👈 evita que el click llegue al document
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
