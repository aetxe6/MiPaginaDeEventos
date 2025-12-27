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
    description: `En junio de 2025, Bruce Springsteen & The E Street Band llegarán a Donostia con dos conciertos previstos en el Estadio Reale Arena (Anoeta), los días 21 y 24 de junio, como parte de su gira europea. Se espera que el legendario artista estadounidense, acompañado de su mítica banda, ofrezca un espectáculo lleno de energía, interpretando desde sus grandes éxitos como Born to Run hasta temas más recientes. Miles de asistentes podrán disfrutar de noches memorables llenas de música, emoción y mensajes de esperanza y libertad, mientras la ciudad se prepara para vibrar con su presencia.`,
    cover: "../image/concierto.jpg"
  },
  "2": {
    title: "Obra de Teatro",
    description: `Durante 2025, el Antzoki Zaharra —Teatro Principal de Donostia— acogerá una programación teatral variada dentro de la temporada de Donostia Kultura. Entre los eventos destacados se prevé la Muestra de Teatro Joven, con obras como El teatro es un asco, una sátira sobre los clichés del teatro contemporáneo. También se representarán montajes como ¿Sabes que las flores de plástico nunca han vivido, verdad?, combinando drama y comedia en torno a la identidad y las relaciones familiares. Este emblemático espacio de la Parte Vieja continuará consolidando su papel como referente cultural local en 2025.`,
    cover: "../image/antzoki zaharra.jpg"
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
    cover: "../image/Museo San Telmo.jpg"
    
  },
  "4": {
    title: "Festival Nocturno",
    description: `El Festival de Jazz de San Sebastián —Donostiako Jazzaldia— es una cita musical anual que transforma Donostia en el epicentro del jazz durante cinco días cada julio. Fundado en 1966, es el festival de jazz más antiguo de España y uno de los más prestigiosos de Europa, con cerca de cien conciertos repartidos en escenarios urbanos, desde playas y plazas hasta auditorios y teatros. 
 La programación mezcla actuaciones gratuitas y de pago con artistas internacionales de renombre y talentos emergentes, creando un ambiente festivo que inunda toda la ciudad. 
 Además, el público puede disfrutar de espacios emblemáticos como la playa de Zurriola, la Plaza de la Trinidad o el Kursaal, lo que convierte al Jazzaldia en una experiencia cultural y musical única. 
.`,
    cover: "../image/jazzaldia.jpg"
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
