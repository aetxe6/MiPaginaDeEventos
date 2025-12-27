// Obtener elementos
const eventCover = document.getElementById("eventCover");
const eventTitle = document.getElementById("eventTitle");
const eventDescription = document.getElementById("eventDescription");
const addToWishlistBtn = document.getElementById("addToWishlistBtn");
const removeFromWishlistBtn = document.getElementById("removeFromWishlistBtn");
// Datos del evento (puedes obtenerlos de query params o de un fetch)
const params = new URLSearchParams(window.location.search);
const eventId = params.get("id");

const eventData = {
  "1": {
    title: "Concierto en Vivo",
    description: `¡Prepárate para vivir la experiencia musical más increíble del año! 
      Nuestro concierto en vivo reúne a artistas de renombre, efectos visuales impactantes
      y un ambiente único que hará que quieras estar en primera fila. ¡No te lo pierdas!`,
    cover: "https://images.unsplash.com/photo-1518972559570-0f8c7f6d6b9f"
  },
  "2": {
    title: "Obra de Teatro",
    description: `Una obra que combina talento actoral, escenografía impecable y una historia que te hará reflexionar.
      Ideal para los amantes de la cultura y la creatividad. Reserva tu asiento y vive la magia del teatro.`,
    cover: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
  },
  "3": {
    title: "Exposición de Arte",
    description: `La exposición “Vistiendo un jardín” en el Museo San Telmo 
    de Donostia explora la evolución de los motivos florales en los textiles entre 
    el Barroco y la Ilustración (siglos XVIII–principios XIX), mostrando cómo la moda 
    y la naturaleza se entrelazaron en esa época. La muestra, organizada junto al Museo 
    del Traje de Madrid, reúne alrededor de 140 piezas, entre prendas históricas, accesorios y 
    objetos decorativos que reflejan los profundos cambios culturales y científicos de la época. A través 
    de bordados, estampados y complementos, la exposición invita a contemplar la transformación estética y 
    simbólica de la flora en la indumentaria.`,
    cover: "C:\Users\pc\Documents\Eventos\MiPaginaDeEventos\image\Museo San Telmo.jpg"
    //cover: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf"
  },
  "4": {
    title: "Festival Nocturno",
    description: `Sumérgete en la experiencia nocturna más divertida y vibrante. Música, luces, DJs internacionales 
      y un ambiente que no olvidarás. Prepárate para bailar toda la noche y disfrutar con tus amigos.`,
    cover: "https://images.unsplash.com/photo-1497032205916-ac775f0649ae"
  }
};


if(eventData[eventId]){
  const event = eventData[eventId];
  document.getElementById("eventTitle").textContent = event.title;
  document.getElementById("eventDescription").textContent = event.description;
  document.getElementById("eventHeader").style.backgroundImage = `url('${event.cover}')`;
}



// Buscar el evento correspondiente
const event = eventsData.find(e => e.id === eventId);

if (event) {
  eventCover.src = event.cover;
  eventTitle.textContent = event.title;
  eventDescription.textContent = event.description;
}

// Funciones de wishlist
function getWishlist() {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
}

function saveWishlist(list) {
  localStorage.setItem("wishlist", JSON.stringify(list));
}

function updateWishlistButtons() {
  const wishlist = getWishlist();
  if (wishlist.includes(eventId)) {
    addToWishlistBtn.classList.add("hidden");
    removeFromWishlistBtn.classList.remove("hidden");
  } else {
    addToWishlistBtn.classList.remove("hidden");
    removeFromWishlistBtn.classList.add("hidden");
  }
}

// Inicializamos los botones al cargar
updateWishlistButtons();

// Eventos de los botones
addToWishlistBtn.addEventListener("click", () => {
  const wishlist = getWishlist();
  if (!wishlist.includes(eventId)) {
    wishlist.push(eventId);
    saveWishlist(wishlist);
  }
  updateWishlistButtons();
});

removeFromWishlistBtn.addEventListener("click", () => {
  let wishlist = getWishlist();
  wishlist = wishlist.filter(id => id !== eventId);
  saveWishlist(wishlist);
  updateWishlistButtons();
});
