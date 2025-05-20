const sidebar = document.getElementById('sidebar');
const content = document.getElementById('main-content');

// Sidebar toggle
document.getElementById('menu-toggle').addEventListener('click', () => {
  const body = document.body;
  const isOpen = body.classList.contains("sidebar-open");
  body.classList.toggle("sidebar-open");
  sidebar.style.left = isOpen ? '-250px' : '0';
});

// Dropdowns
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

// Datos de ejemplo por categoría
const datosRanking = {
  primera: [
    { jugador: "Juan Pérez", victorias: 12, derrotas: 3, jugados: 6, ganados: 8, exito: "90%" },
    { jugador: "Carlos Ramírez", victorias: 10, derrotas: 5, jugados: 7, ganados: 6, exito: "85%" }
  ],
  segunda: [
    { jugador: "Diego Fernández", victorias: 9, derrotas: 6, jugados: 8, ganados: 9, exito: "78%" }
  ],
  tercera: [
    { jugador: "Luis Gómez", victorias: 8, derrotas: 7, jugados: 7, ganados: 5, exito: "74%" }
  ],
  cuarta: [
    { jugador: "Andrés López", victorias: 7, derrotas: 8, jugados: 6, ganados: 1, exito: "47%" }
  ]
};

function filtrarCategoria() {
  const categoria = document.getElementById('categoria').value;
  const contenedor = document.getElementById('tablaContainer');
  const titulo = document.getElementById('tituloCategoria');

  let jugadores = [];
  let mostrarCategoria = false;

  if (categoria === 'libre') {
    jugadores = Object.entries(datosRanking).flatMap(([cat, lista]) =>
      lista.map(j => ({ ...j, categoria: cat }))
    );
    mostrarCategoria = true;
    titulo.textContent = "Ranking - Todos los jugadores (Libre)";
  } else {
    jugadores = datosRanking[categoria] || [];
    titulo.textContent = `Ranking - Categoría ${categoria.charAt(0).toUpperCase() + categoria.slice(1)}`;
  }

  let tablaHTML = `
    <table>
      <thead>
        <tr>
          <th>Posición</th>
          <th>Jugador</th>
          <th>Victorias</th>
          <th>Derrotas</th>
          <th>Torneos Jugados</th>
          <th>Torneos Ganados</th>
          <th>Éxito</th>
          ${mostrarCategoria ? '<th>Categoría</th>' : ''}
          <th>Perfil</th>
        </tr>
      </thead>
      <tbody>
  `;

  jugadores.forEach((jugador, index) => {
    tablaHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${jugador.jugador}</td>
        <td>${jugador.victorias}</td>
        <td>${jugador.derrotas}</td>
        <td>${jugador.jugados}</td>
        <td>${jugador.ganados}</td>
        <td>${jugador.exito}</td>
        ${mostrarCategoria ? `<td>${jugador.categoria}</td>` : ''}
        <td><a href="/Usuario/Html/Perfil.html">Ver Perfil</a></td>
      </tr>
    `;
  });

  tablaHTML += "</tbody></table>";
  contenedor.innerHTML = tablaHTML;
}

// Cargar libre por defecto
window.onload = filtrarCategoria;
