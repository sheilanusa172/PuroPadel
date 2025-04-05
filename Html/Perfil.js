document.getElementById('menu-toggle').addEventListener('click', function(event) {
    var sidebar = document.getElementById('sidebar');
    var content = document.querySelector('.content');
    
    // Toggle sidebar
    if (sidebar.style.left === '-250px' || sidebar.style.left === '') {
        sidebar.style.left = '0px';
        content.style.marginLeft = '250px';
    } else {
        sidebar.style.left = '-250px';
        content.style.marginLeft = '0';
    }
    event.stopPropagation(); // Stop propagation to document level
});

document.getElementById('profile-btn').addEventListener('click', function(event) {
    var menu = document.getElementById('profile-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    event.stopPropagation();
});

document.getElementById('notification-btn').addEventListener('click', function(event) {
    var menu = document.getElementById('notification-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    event.stopPropagation();
});

document.addEventListener('click', function(event) {
    var sidebar = document.getElementById('sidebar');
    var profileMenu = document.getElementById('profile-menu');
    var notificationMenu = document.getElementById('notification-menu');
    
    // Close sidebar if clicked outside and it's open
    if (!sidebar.contains(event.target) && sidebar.style.left === '0px') {
        sidebar.style.left = '-250px';
        document.querySelector('.content').style.marginLeft = '0';
    }

    // Close menus if clicked outside
    if (!profileMenu.contains(event.target) && profileMenu.style.display === 'block') {
        profileMenu.style.display = 'none';
    }

    if (!notificationMenu.contains(event.target) && notificationMenu.style.display === 'block') {
        notificationMenu.style.display = 'none';
    }
});

function showInfo(type) {
    const infoContent = document.getElementById('info-content');
    const infoTitle = document.getElementById('info-title');
    const infoText = document.getElementById('info-text');
    infoContent.style.display = 'block';

    switch (type) {
        case 'clases':
            infoTitle.innerText = "Clases";
            infoText.innerHTML = `Record 1: 30 alumnos en una clase.<br>
                                  Record 2: Clase de 2 horas de técnica avanzada.<br>
                                  Record 3: 5 clases en un día.<br>`;
            break;
        case 'partido':
            infoTitle.innerText = "Partido";
            infoText.innerHTML = `Record 1: Partido más largo de 5 horas.<br>
                                  Record 2: Juego de dobles con jugadores internacionales.<br>
                                  Record 3: Partido bajo lluvia intensa.<br>`;
            break;
        case 'torneos':
            infoTitle.innerText = "Torneos";
            infoText.innerHTML = `Record 1: Torneo de 50 participantes.<br>
                                  Record 2: Torneo ganado sin perder un set.<br>
                                  Record 3: Torneo juvenil con premios significativos.<br>`;
            break;
    }
}

function closeInfo() {
    const infoContent = document.getElementById('info-content');
    infoContent.style.display = 'none';
}
