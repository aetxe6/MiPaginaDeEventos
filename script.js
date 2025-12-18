// Referencias a elementos del menú
const userBtn = document.getElementById("userBtn");
const dropdown = document.getElementById("dropdown");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const logoutBtn = document.getElementById("logoutBtn");

// Estado de sesión
let loggedIn = localStorage.getItem("loggedIn") === "true";

// Función para actualizar el menú según si hay sesión
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

// Mostrar/ocultar dropdown al pulsar el icono
userBtn.addEventListener("click", () => {
  dropdown.classList.toggle("hidden");
});

// Iniciar sesión (simulado)
loginBtn.addEventListener("click", () => {
  localStorage.setItem("loggedIn", "true");
  loggedIn = true;
  updateMenu();
  alert("Sesión iniciada (simulada)");
});

// Registrarse (solo alerta)
registerBtn.addEventListener("click", () => {
  alert("Aquí iría el formulario de registro");
});

// Cerrar sesión
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedIn");
  loggedIn = false;
  updateMenu();
  alert("Sesión cerrada");
});

// Inicializar menú al cargar la página
updateMenu();
