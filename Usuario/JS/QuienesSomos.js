const sidebar = document.getElementById('sidebar');
const content = document.getElementById('main-content');

document.getElementById('menu-toggle').addEventListener('click', () => {
  const body = document.body;
  const isOpen = body.classList.contains("sidebar-open");
  body.classList.toggle("sidebar-open");
  sidebar.style.left = isOpen ? '-250px' : '0';
});

document.getElementById('notification-btn').addEventListener('click', () => {
  document.getElementById('notification-menu').style.display = 'block';
  document.getElementById('profile-menu').style.display = 'none';
});

document.getElementById('profile-btn').addEventListener('click', () => {
  document.getElementById('profile-menu').style.display = 'block';
  document.getElementById('notification-menu').style.display = 'none';
});

document.addEventListener('click', (e) => {
  const ids = ['notification-btn', 'profile-btn', 'menu-toggle'];
  const menus = ['notification-menu', 'profile-menu'];
  const clickedInsideMenu = menus.some(id => document.getElementById(id).contains(e.target));
  const clickedOnButton = ids.some(id => document.getElementById(id).contains(e.target));

  if (!clickedInsideMenu && !clickedOnButton) {
    menus.forEach(id => document.getElementById(id).style.display = 'none');
    sidebar.style.left = '-250px';
    content.style.marginLeft = '0';
  }
});
