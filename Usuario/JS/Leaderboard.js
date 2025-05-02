const sidebar = document.getElementById('sidebar');
const content = document.getElementById('main-content');

// Toggle sidebar
document.getElementById('menu-toggle').addEventListener('click', () => {
  if (sidebar.style.left === '-250px') {
    sidebar.style.left = '0';
    if (content) content.style.marginLeft = '250px';
  } else {
    sidebar.style.left = '-250px';
    if (content) content.style.marginLeft = '0';
  }
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

// Cerrar sidebar y menús al hacer clic fuera
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
    if (content) content.style.marginLeft = '0';
  }
});
