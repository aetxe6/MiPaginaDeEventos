document.addEventListener("DOMContentLoaded", () => {

  // -------------------------
  // ELEMENTOS
  // -------------------------
  const eventTitle = document.getElementById("eventTitle");
  const eventDescription = document.getElementById("eventDescription");
  const addBtn = document.getElementById("addToWishlistBtn");
  const removeBtn = document.getElementById("removeFromWishlistBtn");

  const userBtn = document.getElementById("userBtn");
  const dropdown = document.getElementById("dropdown");
  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const wishlistBtn = document.getElementById("wishlistBtn");

  const params = new URLSearchParams(window.location.search);

  const eventId = params.get("id"); // string
  

  const modal = document.getElementById("modal");
  const closeModal = document.getElementById("closeModal");
  const submitBtn = document.getElementById("submitBtn");
  const modalTitle = document.getElementById("modalTitle");

  const myEventsBtn = document.getElementById("myEventsBtn");
  const buyBtn = document.getElementById("buyTicketBtn");
  const buyModal = document.getElementById("buyModal");
  const closeBuyModal = document.getElementById("closeBuyModal");
  const payBtn = document.querySelector(".pay-btn"); // clase .pay-btn

  
  /*
  let ticketPurchased = localStorage.getItem(`ticket_${eventId}`) === "true";
  updateTicketButton();
  */
  let ticketPurchased = false; // estado inicial
  // Al iniciar sesión
function login() {
  localStorage.setItem("loggedIn", "true");
  localStorage.setItem("userEmail", "correo@usuario.com"); // opcional
}

// Al cerrar sesión
function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("userEmail");
}

// Comprobar sesión
function isLoggedIn() {
  return localStorage.getItem("loggedIn") === "true";
}


  // Pulsar botón principal
buyBtn.addEventListener("click", () => {
  if (ticketPurchased) {
    // Si ya está comprada, desmarcar
    ticketPurchased = false;
    updateTicketButton();
  } else {
    // Si no está comprada, abrir modal
    buyModal.classList.remove("hidden");
  }
});

// Confirmar pago en modal
payBtn.addEventListener("click", (e) => {
  e.preventDefault(); // evitar submit

  ticketPurchased = true;       // marcar como comprada
  updateTicketButton();         // actualizar botón
  buyModal.classList.add("hidden"); // cerrar modal
});


  // Función para actualizar el botón según el estado
function updateTicketButton() {
  if (ticketPurchased) {
    buyBtn.textContent = "Entrada comprada";
    buyBtn.style.backgroundColor = "#ef4444";
    buyBtn.style.color = "white";
  } else {
    buyBtn.textContent = "Comprar entrada";
    buyBtn.style.backgroundColor = "#10b981";
    buyBtn.style.color = "white";
  }
}
// Inicializar botón
updateTicketButton();

  let loggedIn = localStorage.getItem("loggedIn") === "true";
  // Después de definir loggedIn
  updateUserMenu();  // Esto ya llama a updateWishlistButtons() dentro


  // -------------------------
  // DATOS DEL EVENTO
  // -------------------------
   const eventData = {
    "1": {
      title: "Concierto en Vivo",
      description: `En junio de 2025, Bruce Springsteen & The E Street Band llegarán a Donostia con dos conciertos previstos en el Estadio Reale Arena (Anoeta), los días 21 y 24 de junio, como parte de su gira europea. Se espera que el legendario artista estadounidense, acompañado de su mítica banda, ofrezca un espectáculo lleno de energía, interpretando desde sus grandes éxitos como Born to Run hasta temas más recientes. Miles de asistentes podrán disfrutar de noches memorables llenas de música, emoción y mensajes de esperanza y libertad, mientras la ciudad se prepara para vibrar con su presencia.`,
      cover: "image/concierto.jpg",
      price: "70 €",
      lat: 43.30126382921542,
      lng: -1.9744438700375722
    },
    "2": {
      title: "Obra de Teatro",
      description: `Durante 2025, el Antzoki Zaharra —Teatro Principal de Donostia— acogerá una programación teatral variada dentro de la temporada de Donostia Kultura. Entre los eventos destacados se prevé la Muestra de Teatro Joven, con obras como El teatro es un asco, una sátira sobre los clichés del teatro contemporáneo. También se representarán montajes como ¿Sabes que las flores de plástico nunca han vivido, verdad?, combinando drama y comedia en torno a la identidad y las relaciones familiares. Este emblemático espacio de la Parte Vieja continuará consolidando su papel como referente cultural local en 2025.`,
      cover: "image/antzoki zaharra.jpg",
      price: "20 €",
      lat: 43.32272517870711,
      lng: -1.9856465883199799
    },
    "3": {
      title: "Exposición de Arte",
      description: `La exposición “Vistiendo un jardín” en el Museo San Telmo de Donostia explora la evolución de los motivos florales en los textiles entre el Barroco y la Ilustración (siglos XVIII–principios XIX), mostrando cómo la moda y la naturaleza se entrelazaron en esa época. La muestra, organizada junto al Museo del Traje de Madrid, reúne alrededor de 140 piezas, entre prendas históricas, accesorios y objetos decorativos que reflejan los profundos cambios culturales y científicos de la época. A través de bordados, estampados y complementos, la exposición invita a contemplar la transformación estética y simbólica de la flora en la indumentaria.`,
      cover: "image/Museo San Telmo.jpg",
      price: "15 €",
      lat: 43.3251724845734,
      lng: -1.9848547325000765
    },
    "4": {
      title: "Festival Nocturno",
      description: `El Festival de Jazz de San Sebastián —Donostiako Jazzaldia— es una cita musical anual que transforma Donostia en el epicentro del jazz durante cinco días cada julio. Fundado en 1966, es el festival de jazz más antiguo de España y uno de los más prestigiosos de Europa, con cerca de cien conciertos repartidos en escenarios urbanos, desde playas y plazas hasta auditorios y teatros. La programación mezcla actuaciones gratuitas y de pago con artistas internacionales de renombre y talentos emergentes, creando un ambiente festivo que inunda toda la ciudad. Además, el público puede disfrutar de espacios emblemáticos como la playa de Zurriola, la Plaza de la Trinidad o el Kursaal, lo que convierte al Jazzaldia en una experiencia cultural y musical única.`,
      cover: "image/jazzaldia.jpg",
      price: "Gratis",
      lat: 43.325641883420786,
      lng: -1.978224972430884
    }
  };

  const event = eventData[eventId];
  if (!event) return;

  // -------------------------
  // PINTAR EVENTO
  // -------------------------
  eventTitle.textContent = event.title;
  eventDescription.textContent = event.description;
  document.getElementById("eventHeader").style.backgroundImage = `url('${event.cover}')`;
  // Mostrar precio
  document.getElementById("eventPrice").textContent = event.price;

  // -------------------------
  // MAPA
  // -------------------------
  const map = L.map("eventMap").setView([event.lat, event.lng], 15);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);
  L.marker([event.lat, event.lng]).addTo(map).bindPopup(event.title);

  // -------------------------
  // MENÚ DE USUARIO
  // -------------------------
  function updateUserMenu() {
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
  updateWishlistButtons(); // ✅ Aquí se decide qué botón mostrar
}
/*
function updateUserMenu() {
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
  updateWishlistButtons(); // ✅ Aquí se decide qué botón mostrar
}
*/

payBtn.addEventListener("click", () => {
  localStorage.setItem(`ticket_${eventId}`, "true");

  let misEventos = JSON.parse(localStorage.getItem("misEventos")) || [];
  if (!misEventos.includes(eventId)) {
    misEventos.push(eventId);
    localStorage.setItem("misEventos", JSON.stringify(misEventos));
  }

  updateTicketButton();
  buyModal.classList.add("hidden");
});

// Inicializar botón
updateTicketButton();


  userBtn.addEventListener("click", e => {
    e.stopPropagation();
    dropdown.classList.toggle("hidden");
  });

  

  document.addEventListener("click", e => {
    if (!dropdown.contains(e.target) && e.target !== userBtn) dropdown.classList.add("hidden");
  });


  logoutBtn.addEventListener("click", () => {
    loggedIn = false;
    localStorage.removeItem("loggedIn");
    updateUserMenu(); // solo actualizar el menú
  });

  wishlistBtn.addEventListener("click", () => {
  // Guardamos un flag para indicar que queremos ver la wishlist al entrar en la página principal
  localStorage.setItem("showWishlist", "true");
  // Redirigimos a la página principal
  window.location.href = "index.html";
});



  updateUserMenu();

  // -------------------------
  // WISHLIST
  // -------------------------
  function getWishlist() {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  }

  function saveWishlist(list) {
    localStorage.setItem("wishlist", JSON.stringify(list));
  }

  function updateWishlistButtons() {
  if (!loggedIn) {
    addBtn.classList.add("hidden");
    removeBtn.classList.add("hidden");
    return;
  }
  const wishlist = getWishlist();
  if (wishlist.includes(eventId)) {
    addBtn.classList.add("hidden");
    removeBtn.classList.remove("hidden");
  } else {
    addBtn.classList.remove("hidden");
    removeBtn.classList.add("hidden");
  }
}

  addBtn.addEventListener("click", () => { 
    const wishlist = getWishlist();
    if (!wishlist.includes(eventId)) {
      wishlist.push(eventId);
      saveWishlist(wishlist);
    }
    updateWishlistButtons();
  });

  removeBtn.addEventListener("click", () => {
    let wishlist = getWishlist();
    wishlist = wishlist.filter(id => id !== eventId);
    saveWishlist(wishlist);
    updateWishlistButtons();
  });

  // Abrir modal login
loginBtn.addEventListener("click", e => {
  e.stopPropagation();
  modal.classList.remove("hidden");
  modal.classList.add("show");
  modalTitle.textContent = "Iniciar Sesión";
  dropdown.classList.add("hidden");
});

// Abrir modal registro
registerBtn.addEventListener("click", e => {
  e.stopPropagation();
  modal.classList.remove("hidden");
  modal.classList.add("show");
  modalTitle.textContent = "Registrarse";
  dropdown.classList.add("hidden");
});

// Cerrar modal con botón
function closeModalFunction(modalElement) {
  modalElement.classList.add("hidden");
  modalElement.classList.remove("show");
}

closeModal.addEventListener("click", () => closeModalFunction(modal));
modal.addEventListener("click", e => {
  if (e.target === modal) closeModalFunction(modal);
});

closeBuyModal.addEventListener("click", () => closeModalFunction(buyModal));
buyModal.addEventListener("click", e => {
  if (e.target === buyModal) closeModalFunction(buyModal);
});

// Login simulado
submitBtn.addEventListener("click", () => {
  loggedIn = true;
  localStorage.setItem("loggedIn", "true");
  updateUserMenu();
  updateWishlistButtons();
  modal.classList.remove("show");
  modal.classList.add("hidden");
  alert("Sesión iniciada (simulada)");
});

modal.addEventListener("click", e => {
  if (e.target === modal) { // solo si clic fuera del contenido
    modal.classList.remove("show");
    modal.classList.add("hidden");
  }
});

payBtn.addEventListener("click", () => {
  ticketPurchased = true;
  localStorage.setItem(`ticket_${eventId}`, "true");

  let misEventos = JSON.parse(localStorage.getItem("misEventos")) || [];
  if (!misEventos.includes(eventId)) {
    misEventos.push(eventId);
    localStorage.setItem("misEventos", JSON.stringify(misEventos));
  }

  updateTicketButton();
  buyModal.classList.add("hidden");
});





buyModal.addEventListener("click", (e) => {
  if (e.target === buyModal) {
    buyModal.classList.add("hidden");
  }
});

myEventsBtn.addEventListener("click", () => {
  // Guardamos un flag indicando que queremos ver solo nuestros eventos
  localStorage.setItem("showMyEvents", "true");
  // Redirigimos a la página principal
  window.location.href = "index.html";
});

});

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const wishlistBtn = document.getElementById("wishlistBtn");

  function updateUserMenu() {
    if (isLoggedIn()) {
      loginBtn.classList.add("hidden");
      logoutBtn.classList.remove("hidden");
      wishlistBtn.classList.remove("hidden");
    } else {
      loginBtn.classList.remove("hidden");
      logoutBtn.classList.add("hidden");
      wishlistBtn.classList.add("hidden");
    }
  }

  updateUserMenu();

  logoutBtn.addEventListener("click", () => {
    logout();
    updateUserMenu();
  });
});