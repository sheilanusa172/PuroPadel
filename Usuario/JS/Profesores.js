// Sidebar toggle con desplazamiento del contenido
document.getElementById("menu-toggle").addEventListener("click", function () {
  const body = document.body;
  const sidebar = document.getElementById("sidebar");

  const isOpen = body.classList.contains("sidebar-open");

  if (isOpen) {
    body.classList.remove("sidebar-open");
    sidebar.style.left = "-250px";
  } else {
    body.classList.add("sidebar-open");
    sidebar.style.left = "0px";
  }
});

// Mostrar/ocultar notificaciones
document.getElementById("notification-btn").addEventListener("click", function () {
  toggleDropdown("notification-menu");
});

// Mostrar/ocultar menú de perfil
document.getElementById("profile-btn").addEventListener("click", function () {
  toggleDropdown("profile-menu");
});

// Cierre inteligente de dropdowns
function toggleDropdown(id) {
  const dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach(dropdown => {
    if (dropdown.id !== id) {
      dropdown.style.display = "none";
    }
  });

  const target = document.getElementById(id);
  target.style.display = target.style.display === "block" ? "none" : "block";
}
