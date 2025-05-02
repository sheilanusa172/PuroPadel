document.getElementById('menu-toggle').addEventListener('click', function() {
    var sidebar = document.getElementById('sidebar');
    var content = document.querySelector('.content');
    
    if (sidebar.style.left === '-250px') {
        sidebar.style.left = '0';
        content.style.marginLeft = '250px';
    } else {
        sidebar.style.left = '-250px';
        content.style.marginLeft = '0';
    }
});

document.getElementById('notification-btn').addEventListener('click', function() {
    var menu = document.getElementById('notification-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block'; // Toggle display
});

document.getElementById('profile-btn').addEventListener('click', function() {
    var menu = document.getElementById('profile-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block'; // Toggle display for profile menu
});

document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', function() {
        let rating = this.getAttribute('data-value');
        updateStars(rating);
    });
});

function updateStars(rating) {
    document.querySelectorAll('.star').forEach(star => {
        star.style.color = star.getAttribute('data-value') <= rating ? '#ffc107' : '#333';
    });
}

function showInfo(type) {
    const infoContent = document.getElementById('info-content');
    const infoTitle = document.getElementById('info-title');
    const infoText = document.getElementById('info-text');
    infoContent.style.display = 'block';

    switch (type) {
        case 'clases':
            infoTitle.innerText = "Clases";
            infoText.innerHTML = "Detalles de las clases...";
            break;
        case 'partido':
            infoTitle.innerText = "Partido";
            infoText.innerHTML = "Detalles del partido...";
            break;
        case 'torneos':
            infoTitle.innerText = "Torneos";
            infoText.innerHTML = "Detalles de torneos...";
            break;
    }
}

function closeInfo() {
    document.getElementById('info-content').style.display = 'none';
}
