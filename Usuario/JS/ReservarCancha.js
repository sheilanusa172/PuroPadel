const diasContenedor = document.getElementById('dias-semana');
const horarioSelect = document.getElementById('horario');
const canchaContenedor = document.getElementById('contenedor-canchas');
const mensaje = document.getElementById('mensaje');
const duracionSelect = document.getElementById('duracion');
const selectorFechaLejana = document.getElementById('selector-fecha-lejana');

let fechaActual = new Date();
const horariosEjemplo = {
  "2025-05-19": [
    { "id": 2, "hora": "6:00" },
    { "id": 5, "hora": "6:00" },
    { "id": 3, "hora": "6:00" },
    { "id": 5, "hora": "7:00" },
    { "id": 2, "hora": "7:00" },
    { "id": 8, "hora": "7:00" },
    { "id": 3, "hora": "7:00" },
    { "id": 4, "hora": "7:00" },
    { "id": 1, "hora": "8:00" },
    { "id": 5, "hora": "8:00" },
    { "id": 4, "hora": "8:00" },
    { "id": 3, "hora": "8:00" },
    { "id": 8, "hora": "9:00" },
    { "id": 1, "hora": "9:00" },
    { "id": 2, "hora": "9:00" },
    { "id": 3, "hora": "9:00" },
    { "id": 4, "hora": "9:00" },
    { "id": 6, "hora": "9:00" },
    { "id": 6, "hora": "10:00" },
    { "id": 8, "hora": "10:00" },
    { "id": 1, "hora": "10:00" },
    { "id": 7, "hora": "12:00" },
    { "id": 3, "hora": "12:00" },
    { "id": 5, "hora": "13:00" },
    { "id": 1, "hora": "13:00" },
    { "id": 2, "hora": "13:00" },
    { "id": 4, "hora": "13:00" },
    { "id": 1, "hora": "14:00" },
    { "id": 2, "hora": "14:00" },
    { "id": 5, "hora": "14:00" },
    { "id": 6, "hora": "14:00" },
    { "id": 1, "hora": "15:00" },
    { "id": 2, "hora": "15:00" },
    { "id": 3, "hora": "15:00" },
    { "id": 4, "hora": "15:00" },
    { "id": 6, "hora": "16:00" },
    { "id": 7, "hora": "16:00" },
    { "id": 8, "hora": "16:00" },
    { "id": 2, "hora": "16:00" },
    { "id": 3, "hora": "17:00" },
    { "id": 4, "hora": "17:00" },
    { "id": 5, "hora": "17:00" },
    { "id": 6, "hora": "18:00" },
    { "id": 1, "hora": "18:00" },
    { "id": 2, "hora": "18:00" },
    { "id": 3, "hora": "19:00" },
    { "id": 4, "hora": "19:00" },
    { "id": 5, "hora": "19:00" },
    { "id": 8, "hora": "19:00" },
    { "id": 6, "hora": "20:00" },
    { "id": 1, "hora": "20:00" },
    { "id": 2, "hora": "20:00" },
    { "id": 3, "hora": "21:00" },
    { "id": 4, "hora": "21:00" },
    { "id": 5, "hora": "21:00" }
  ],
  // ...
  // Agregaremos los demás días igual si querés (martes a domingo)
};

const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

function clonarFecha(fecha) {
  return new Date(fecha.getTime());
}

function generarCanchasEjemplo() {
  const canchas = [];
  for (let i = 1; i <= 8; i++) {
    const horaRandom = `${Math.floor(Math.random() * 7 + 15)}:00`; // 15:00 a 21:00
    canchas.push({ id: i, hora: horaRandom });
  }
  return canchas;
}

function generarDiasSemana(base) {
  diasContenedor.innerHTML = '';
  const inicioSemana = clonarFecha(base);
  inicioSemana.setDate(inicioSemana.getDate() - inicioSemana.getDay());

  for (let i = 0; i < 7; i++) {
    const dia = clonarFecha(inicioSemana);
    dia.setDate(inicioSemana.getDate() + i);
    const iso = dia.toISOString().split('T')[0];
    const texto = `${diasSemana[dia.getDay()]} ${dia.getDate()}`;

    if (!horariosEjemplo[iso]) horariosEjemplo[iso] = generarCanchasEjemplo();

    const btn = document.createElement('button');
    btn.textContent = texto;
    btn.dataset.fecha = iso;

    btn.addEventListener('click', () => {
      document.querySelectorAll('.dias-semana button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      mostrarCanchasDisponibles(iso);
    });

    diasContenedor.appendChild(btn);
  }
}

function generarHorarios() {
  for (let h = 6; h < 23; h++) {
    horarioSelect.append(new Option(`${h}:00`, `${h}:00`));
    horarioSelect.append(new Option(`${h}:30`, `${h}:30`));
  }
}

function mostrarCanchasDisponibles(fecha) {
  const horaSeleccionada = horarioSelect.value;
  const canchas = horariosEjemplo[fecha] || [];
  canchaContenedor.innerHTML = '';
  mensaje.textContent = '';

  const disponibles = horaSeleccionada
    ? canchas.filter(c => c.hora === horaSeleccionada)
    : canchas;

  if (disponibles.length === 0) {
    mensaje.textContent = "No hay canchas disponibles para este horario.";
    return;
  }

  disponibles.forEach(c => {
    const cancha = document.createElement('div');
    cancha.classList.add('cancha');
    cancha.innerHTML = `
      <button class="cancha-btn" data-id="${c.id}">
        <video src="/imagenes/Diseño2.mp4" muted loop autoplay></video>
        <div class="overlay">Cancha ${c.id} - ${c.hora}</div>
      </button>
    `;
    agregarEventosCancha(cancha);
    canchaContenedor.appendChild(cancha);
  });
}

selectorFechaLejana.addEventListener('change', (e) => {
  const fecha = new Date(e.target.value);
  const iso = fecha.toISOString().split('T')[0];
  const texto = `${diasSemana[fecha.getDay()]} ${fecha.getDate()}`;

  if (!horariosEjemplo[iso]) horariosEjemplo[iso] = generarCanchasEjemplo();

  // Crear botón si no existe
  const yaExiste = [...diasContenedor.children].some(b => b.dataset.fecha === iso);
  if (!yaExiste) {
    const btn = document.createElement('button');
    btn.textContent = texto;
    btn.dataset.fecha = iso;
    btn.classList.add('active');

    document.querySelectorAll('.dias-semana button').forEach(b => b.classList.remove('active'));
    btn.addEventListener('click', () => {
      document.querySelectorAll('.dias-semana button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      mostrarCanchasDisponibles(iso);
    });

    diasContenedor.appendChild(btn);
  } else {
    const btn = [...diasContenedor.children].find(b => b.dataset.fecha === iso);
    document.querySelectorAll('.dias-semana button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  mostrarCanchasDisponibles(iso);
});

function agregarEventosCancha(cancha) {
  const btn = cancha.querySelector('.cancha-btn');
  btn.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.classList.add('reserva-overlay');
    overlay.innerHTML = `
      <div class="reserva-box">
        <button class="cerrar-modal">✕</button>
        <h3>¿Deseas reservar esta cancha?</h3>
        <button class="abrir-config-btn reservar-btn">Reservar Cancha</button>
      </div>
    `;
    overlay.querySelector('.cerrar-modal').addEventListener('click', () => overlay.remove());
    overlay.querySelector('.abrir-config-btn').addEventListener('click', () => mostrarOpcionesReserva(overlay));
    document.body.appendChild(overlay);
  });
}

function mostrarOpcionesReserva(overlayAnterior) {
  overlayAnterior.remove();
  const overlay = document.createElement('div');
  overlay.classList.add('reserva-overlay');
  const codigoPrivado = Math.floor(1000 + Math.random() * 9000);

  overlay.innerHTML = `
    <div class="reserva-box">
      <button class="cerrar-modal">✕</button>
      <h3>Configuración de Reserva</h3>
      <p>¿Deseas que sea pública o privada?</p>
      <div style="margin: 10px 0;">
        <button class="modo-btn" data-modo="publica">Pública</button>
        <button class="modo-btn" data-modo="privada">Privada</button>
      </div>
      <label for="categoria">Categoría:</label>
      <select id="categoria">
        <option value="primera">Primera</option>
        <option value="segunda">Segunda</option>
        <option value="tercera">Tercera</option>
        <option value="cuarta">Cuarta</option>
      </select>
      <div id="info-extra" style="margin-top: 15px; margin-bottom: 15px;"></div>
      <button class="reservar-btn">Reservar Cancha</button>
    </div>
  `;

  const infoExtra = overlay.querySelector('#info-extra');

  overlay.querySelectorAll('.modo-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const modo = btn.dataset.modo;
      if (modo === 'publica') {
        infoExtra.innerHTML = `
          <label>¿Cuántas personas se unirán (sin contar al creador)?</label>
          <select id="cantidad-usuarios">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <div id="campos-id" style="margin-top: 10px;"></div>
        `;

        const select = overlay.querySelector('#cantidad-usuarios');
        const camposID = overlay.querySelector('#campos-id');

        select.addEventListener('change', () => {
          const cantidad = parseInt(select.value);
          camposID.innerHTML = '';
          for (let i = 1; i <= cantidad; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = `ID del usuario ${i}`;
            input.style = 'display:block;margin:5px auto;padding:6px;width:80%;';
            camposID.appendChild(input);
          }
        });

        select.dispatchEvent(new Event('change'));
      } else {
        infoExtra.innerHTML = `<p>Tu código privado de acceso: <strong>${codigoPrivado}</strong></p>`;
      }
    });
  });

  overlay.querySelector('.cerrar-modal').addEventListener('click', () => overlay.remove());

  overlay.querySelector('.reservar-btn').addEventListener('click', () => {
    const categoria = overlay.querySelector('#categoria')?.value || "";
    alert(`Reserva confirmada (simulación).\nCategoría: ${categoria}`);
    overlay.remove();
  });

  document.body.appendChild(overlay);
}

// Semana
document.getElementById('semana-previa').addEventListener('click', () => {
  fechaActual.setDate(fechaActual.getDate() - 7);
  generarDiasSemana(fechaActual);
});

document.getElementById('semana-siguiente').addEventListener('click', () => {
  fechaActual.setDate(fechaActual.getDate() + 7);
  generarDiasSemana(fechaActual);
});

horarioSelect.addEventListener('change', () => {
  const active = document.querySelector('.dias-semana button.active');
  if (active) mostrarCanchasDisponibles(active.dataset.fecha);
});
duracionSelect.addEventListener('change', () => {
  const active = document.querySelector('.dias-semana button.active');
  if (active) mostrarCanchasDisponibles(active.dataset.fecha);
});

generarDiasSemana(fechaActual);
generarHorarios();

// SIDEBAR
const sidebar = document.getElementById('sidebar');
const content = document.getElementById('main-content');

document.getElementById('menu-toggle').addEventListener('click', () => {
  if (sidebar.style.left === '0px') {
    sidebar.style.left = '-300px';
    content.style.marginLeft = '0';
  } else {
    sidebar.style.left = '0';
    content.style.marginLeft = '300px';
  }
});

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

  if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
    sidebar.style.left = '-300px';
    content.style.marginLeft = '0';
  }
});
