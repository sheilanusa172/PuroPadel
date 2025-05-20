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
  const notiMenu = document.getElementById('notification-menu');
  const profileMenu = document.getElementById('profile-menu');
  notiMenu.style.display = (notiMenu.style.display === 'block') ? 'none' : 'block';
  if (profileMenu) profileMenu.style.display = 'none';
});

document.getElementById('profile-btn').addEventListener('click', () => {
  const profileMenu = document.getElementById('profile-menu');
  const notiMenu = document.getElementById('notification-menu');
  profileMenu.style.display = (profileMenu.style.display === 'block') ? 'none' : 'block';
  if (notiMenu) notiMenu.style.display = 'none';
});

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
});

// Datos horarios y precios
const horariosDisponibles = {
  '1': {
   '2025-05-19': ['10:30 AM - 11:30 AM', '02:00 PM - 03:00 PM'],
    '2025-05-21': ['11:00 AM - 12:00 PM', '04:00 PM - 05:00 PM'],
     '2025-05-22': ['11:00 AM - 12:00 PM', '04:00 PM - 05:00 PM'],
      '2025-05-27': ['11:00 AM - 12:00 PM', '04:00 PM - 05:00 PM']
  },
  '2': {
    '2025-05-18': ['10:30 AM - 11:30 AM', '02:00 PM - 03:00 PM'],
    '2025-05-21': ['11:00 AM - 12:00 PM', '04:00 PM - 05:00 PM'],
     '2025-05-25': ['1:00 PM - 2:00 PM', '04:00 PM - 05:00 PM'],
      '2025-05-29': ['11:00 AM - 12:00 PM', '06:00 PM - 07:00 PM']
  }
};

const precios = {
  '1': 50,
  '2': 60
};

function mostrarHorarios() {
  const profesor = document.getElementById('profesor').value;
  const fecha = document.getElementById('fecha').value;
  const horariosDiv = document.getElementById('horariosDisponibles');
  const precioDiv = document.getElementById('precioClase');

  horariosDiv.innerHTML = '';
  precioDiv.innerHTML = '';

  if (precios[profesor]) {
    precioDiv.textContent = `Precio base del profesor: $${precios[profesor]} USD`;
  }

  if (horariosDisponibles[profesor] && horariosDisponibles[profesor][fecha]) {
    const select = document.createElement('select');
    select.id = 'horarioSeleccionado';
    horariosDisponibles[profesor][fecha].forEach(horario => {
      const option = document.createElement('option');
      option.value = horario;
      option.textContent = horario;
      select.appendChild(option);
    });
    horariosDiv.appendChild(select);
  } else {
    const p = document.createElement('p');
    p.textContent = 'No hay horarios disponibles para la fecha seleccionada.';
    horariosDiv.appendChild(p);
  }
}

function mostrarParticipantes() {
  const cantidad = parseInt(document.getElementById('cantidad').value);
  const camposDiv = document.getElementById('camposParticipantes');
  const precioDiv = document.getElementById('precioPorPersona');
  camposDiv.innerHTML = '';
  precioDiv.innerHTML = '';

  if (cantidad > 0) {
    if (cantidad === 1) {
      const p = document.createElement('p');
      camposDiv.appendChild(p);
    } else {
      for (let i = 2; i <= cantidad; i++) {
        const label = document.createElement('label');
        label.textContent = `Nombre del participante ${i}:`;

        const input = document.createElement('input');
        input.type = 'text';
        input.name = `participante${i}`;
        input.required = true;

        camposDiv.appendChild(label);
        camposDiv.appendChild(input);
      }
    }

    let precioFinal = 0;
    switch (cantidad) {
      case 1: precioFinal = 60; break;
      case 2: precioFinal = 50; break;
      case 3: precioFinal = 40; break;
      case 4: precioFinal = 30; break;
    }

    precioDiv.textContent = `Precio por persona: $${precioFinal} USD`;
  }
}
