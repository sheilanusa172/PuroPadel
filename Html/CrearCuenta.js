// Toggle del sidebar
document.getElementById('menu-toggle').addEventListener('click', function () {
    const sidebar = document.getElementById('sidebar');
    const content = document.querySelector('.content');
    if (sidebar.style.left === '-250px') {
        sidebar.style.left = '0';
        if (content) content.style.marginLeft = '250px';
    } else {
        sidebar.style.left = '-250px';
        if (content) content.style.marginLeft = '0';
    }
});

// Dropdown de notificaciones
document.getElementById('notification-btn').addEventListener('click', function () {
    const menu = document.getElementById('notification-menu');
    const profileMenu = document.getElementById('profile-menu');
    if (profileMenu) profileMenu.style.display = 'none';
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
});

// Dropdown de perfil
document.getElementById('profile-btn').addEventListener('click', function () {
    const menu = document.getElementById('profile-menu');
    const notificationMenu = document.getElementById('notification-menu');
    if (notificationMenu) notificationMenu.style.display = 'none';
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
});

// Cierra los menús si se hace clic fuera
document.addEventListener('click', function (e) {
    const notiBtn = document.getElementById('notification-btn');
    const profileBtn = document.getElementById('profile-btn');
    const notiMenu = document.getElementById('notification-menu');
    const profileMenu = document.getElementById('profile-menu');

    if (!notiBtn.contains(e.target) && !notiMenu.contains(e.target)) {
        notiMenu.style.display = 'none';
    }
    if (!profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
        profileMenu.style.display = 'none';
    }
});
