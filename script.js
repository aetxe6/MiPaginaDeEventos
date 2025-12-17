<script>
  const userBtn = document.getElementById("userBtn");
  const dropdown = document.getElementById("dropdown");
  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  let loggedIn = localStorage.getItem("loggedIn") === "true";

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

  userBtn.addEventListener("click", () => {
    dropdown.classList.toggle("hidden");
  });

  loginBtn.addEventListener("click", () => {
    localStorage.setItem("loggedIn", "true");
    loggedIn = true;
    updateMenu();
    alert("Sesión iniciada (simulada)");
  });

  registerBtn.addEventListener("click", () => {
    alert("Aquí iría el formulario de registro");
  });

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedIn");
    loggedIn = false;
    updateMenu();
    alert("Sesión cerrada");
  });

  updateMenu();
</script>
