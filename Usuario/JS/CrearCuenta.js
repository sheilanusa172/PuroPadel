const sidebar = document.getElementById('sidebar');
const content = document.getElementById('main-content');

// Toggle sidebar con desplazamiento de contenido
document.getElementById('menu-toggle').addEventListener('click', () => {
  const isClosed = sidebar.style.left === '-250px';
  sidebar.style.left = isClosed ? '0' : '-250px';
  content.classList.toggle('shifted', isClosed);
});

// Notificaciones
document.getElementById('notification-btn').addEventListener('click', () => {
  const notiMenu = document.getElementById('notification-menu');
  const profileMenu = document.getElementById('profile-menu');
  notiMenu.style.display = (notiMenu.style.display === 'block') ? 'none' : 'block';
  if (profileMenu) profileMenu.style.display = 'none';
});

// Perfil
document.getElementById('profile-btn').addEventListener('click', () => {
  const profileMenu = document.getElementById('profile-menu');
  const notiMenu = document.getElementById('notification-menu');
  profileMenu.style.display = (profileMenu.style.display === 'block') ? 'none' : 'block';
  if (notiMenu) notiMenu.style.display = 'none';
});

// Cierre general
document.addEventListener('click', (e) => {
  const notiBtn = document.getElementById('notification-btn');
  const profileBtn = document.getElementById('profile-btn');
  const notiMenu = document.getElementById('notification-menu');
  const profileMenu = document.getElementById('profile-menu');
  const toggleBtn = document.getElementById('menu-toggle');

  if (!notiBtn.contains(e.target) && !notiMenu.contains(e.target)) {
    notiMenu.style.display = 'none';
  }

  if (!profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
    profileMenu.style.display = 'none';
  }

  if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
    sidebar.style.left = '-250px';
    content.classList.remove('shifted');
  }
});
