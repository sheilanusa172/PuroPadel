// Toggle Sidebar
const menuToggle = document.getElementById('menu-toggle');
menuToggle?.addEventListener('click', function () {
  const sidebar = document.getElementById('sidebar');
  const content = document.querySelector('.content');
  if (sidebar.style.left === '-250px') {
    sidebar.style.left = '0';
    content.style.marginLeft = '250px';
  } else {
    sidebar.style.left = '-250px';
    content.style.marginLeft = '0';
  }
});

// Notificaciones
const notificationBtn = document.getElementById('notification-btn');
notificationBtn?.addEventListener('click', function () {
  const menu = document.getElementById('notification-menu');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});

// Menú de perfil
const profileBtn = document.getElementById('profile-btn');
profileBtn?.addEventListener('click', function () {
  const menu = document.getElementById('profile-menu');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});

// Calificación por estrellas
document.querySelectorAll('.star').forEach(star => {
  star.addEventListener('click', function () {
    let rating = this.getAttribute('data-value');
    updateStars(rating);
  });
});

function updateStars(rating) {
  document.querySelectorAll('.star').forEach(star => {
    star.style.color = star.getAttribute('data-value') <= rating ? '#ffc107' : '#333';
  });
}

// Mostrar detalles e historial
function showInfo(type) {
  const infoContent = document.getElementById('info-content');
  const infoTitle = document.getElementById('info-title');
  const infoText = document.getElementById('info-text');
  const recordStats = document.getElementById('record-stats');
  infoContent.style.display = 'block';

  switch (type) {
    case 'clases':
      infoTitle.innerText = "Clases";
      recordStats.innerHTML = `
        <p class="font-semibold">📚 Récord de Clases:</p>
        <ul class="list-disc ml-5">
          <li>Clases Tomadas: 10</li>
          <li>Evaluaciones Positivas: 9</li>
          <li>Entrenadores Distintos: 3</li>
        </ul>
      `;
      infoText.innerHTML = "Has participado en múltiples clases de pádel enfocadas en técnica, resistencia y táctica de juego.";
      break;
    case 'partido':
      infoTitle.innerText = "Partido";
      recordStats.innerHTML = `
        <p class="font-semibold">🎾 Récord de Partidos:</p>
        <ul class="list-disc ml-5">
          <li>Partidos Jugados: 25</li>
          <li>Ganados: 15</li>
          <li>Perdidos: 10</li>
        </ul>
      `;
      infoText.innerHTML = "Tu rendimiento en partidos ha sido sólido, con una tasa de victoria del 60%. Sigue mejorando.";
      break;
    case 'torneos':
      infoTitle.innerText = "Torneos";
      recordStats.innerHTML = `
        <p class="font-semibold">🏆 Récord de Torneos:</p>
        <ul class="list-disc ml-5">
          <li>Torneos Jugados: 4</li>
          <li>Finales Alcanzadas: 2</li>
          <li>Títulos Ganados: 1</li>
        </ul>
      `;
      infoText.innerHTML = "Has demostrado un gran desempeño competitivo al llegar a varias finales de torneos locales.";
      break;
  }
}

function closeInfo() {
  document.getElementById('info-content').style.display = 'none';
}

// Reportar Usuario
const reportBtn = document.getElementById('reportButton');
reportBtn?.addEventListener('click', () => {
  if (confirm("¿Estás seguro que deseas reportar a este usuario?")) {
    alert("Gracias, tu reporte ha sido recibido y está siendo revisado.");
    // Lógica de envío al backend aquí si se desea
  }
});
