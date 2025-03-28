document.getElementById('menu-toggle').addEventListener('click', function() {
    var sidebar = document.getElementById('sidebar');
    var content = document.querySelector('.content');
    if (sidebar.style.left === '0px') {
        sidebar.style.left = '-250px';
        content.style.marginLeft = '0'; // Contenido regresa a su lugar original
    } else {
        sidebar.style.left = '0px';
        content.style.marginLeft = '250px'; // Contenido se desplaza a la derecha
    }
});
