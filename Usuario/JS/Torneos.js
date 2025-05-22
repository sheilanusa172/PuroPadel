document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formTorneo");
  const zonaCanchas = document.getElementById("zonaCanchas");
  const numeroCanchasInput = document.getElementById("numeroCanchas");
  const privacidadRadios = document.getElementsByName("privacidad");
  const codigoPrivado = document.getElementById("codigoPrivado");
  const codigoGenerado = document.getElementById("codigoGenerado");

  const inputs = [
    "nombreTorneo",
    "cantidadJugadores",
    "horaSeleccionada",
    "numeroCanchas",
    "horasReservar",
    "premios",
    "descripcionTorneo",
    "tipoTorneo",
    "categoria"
  ];
  const steps = inputs.map((id, i) => document.getElementById(`step${i + 1}`));
  steps.push(document.getElementById("step10"), document.getElementById("step11"), document.getElementById("step12"));

  inputs.forEach((id, index) => {
    const el = document.getElementById(id);
    el.addEventListener("input", () => {
      if (el.value.trim() !== "") {
        if (steps[index + 1]) steps[index + 1].style.display = "block";
      }
    });
  });

  numeroCanchasInput.addEventListener("input", () => {
    const cantidad = Math.min(parseInt(numeroCanchasInput.value), 8);
    zonaCanchas.innerHTML = "";
    for (let i = 1; i <= cantidad; i++) {
      const div = document.createElement("div");
      div.classList.add("cancha");
      const video = document.createElement("video");
      video.src = "/imagenes/Diseño2.mp4";
      video.muted = true;
      video.loop = true;
      video.autoplay = true;
      video.playsInline = true;
      div.appendChild(video);
      zonaCanchas.appendChild(div);
    }
  });

  privacidadRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      if (radio.value === "privado" && radio.checked) {
        const codigo = generarCodigo();
        codigoGenerado.value = codigo;
        codigoPrivado.style.display = "block";
      } else {
        codigoPrivado.style.display = "none";
        codigoGenerado.value = "";
      }
      document.getElementById("step12").style.display = "block";
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const torneo = {
      nombre: document.getElementById("nombreTorneo").value,
      cantidadJugadores: document.getElementById("cantidadJugadores").value,
      hora: document.getElementById("horaSeleccionada").value,
      numeroCanchas: numeroCanchasInput.value,
      horasReservar: document.getElementById("horasReservar").value,
      premios: document.getElementById("premios").value,
      descripcion: document.getElementById("descripcionTorneo").value,
      tipoTorneo: document.getElementById("tipoTorneo").value,
      categoria: document.getElementById("categoria").value,
      privacidad: document.querySelector('input[name="privacidad"]:checked').value,
      codigo: codigoGenerado.value || null,
      imagen: "/imagenes/SAI.png"
    };

    const torneos = JSON.parse(localStorage.getItem("torneos")) || [];
    torneos.push(torneo);
    localStorage.setItem("torneos", JSON.stringify(torneos));
    alert("Torneo creado correctamente.");
    form.reset();
    zonaCanchas.innerHTML = "";
    codigoPrivado.style.display = "none";
    steps.forEach((s, i) => i > 0 ? s.style.display = "none" : null);
    mostrarTorneos();
  });

  function generarCodigo() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigo = '';
    for (let i = 0; i < 6; i++) {
      codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return codigo;
  }

  function mostrarTorneos() {
    const contenedor = document.querySelector(".unirse-torneo");
    const torneos = JSON.parse(localStorage.getItem("torneos")) || [];
    contenedor.querySelectorAll(".tarjeta-torneo").forEach(e => e.remove());

    torneos.forEach((torneo, index) => {
      const card = document.createElement("div");
      card.classList.add("tarjeta-torneo");
      card.innerHTML = `
        <h3>${torneo.nombre}</h3>
        <img src="${torneo.imagen}" alt="Imagen del torneo">
        <p><strong>Jugadores:</strong> ${torneo.cantidadJugadores}</p>
        <p><strong>Hora:</strong> ${torneo.hora}</p>
        <p><strong>Canchas:</strong> ${torneo.numeroCanchas}</p>
        <p><strong>Horas:</strong> ${torneo.horasReservar}</p>
        <p><strong>Tipo:</strong> ${torneo.tipoTorneo}</p>
        <p><strong>Categoría:</strong> ${torneo.categoria}</p>
        <p><strong>Descripción:</strong> ${torneo.descripcion}</p>
        <button onclick="editarTorneo(${index})">Editar</button>
        <button onclick="eliminarTorneo(${index})">Eliminar</button>
      `;
      contenedor.appendChild(card);
    });
  }

  window.eliminarTorneo = function(index) {
    const torneos = JSON.parse(localStorage.getItem("torneos")) || [];
    if (confirm("¿Estás seguro de eliminar este torneo?")) {
      torneos.splice(index, 1);
      localStorage.setItem("torneos", JSON.stringify(torneos));
      mostrarTorneos();
    }
  };

  window.editarTorneo = function(index) {
    const torneos = JSON.parse(localStorage.getItem("torneos")) || [];
    const torneo = torneos[index];

    const overlay = document.createElement("div");
    overlay.classList.add("reserva-overlay");
    overlay.innerHTML = `
      <div class="reserva-box">
        <button class="cerrar-modal">✕</button>
        <h3>Editar Torneo</h3>
        <input type="text" id="editNombre" value="${torneo.nombre}" placeholder="Nombre del torneo">
        <input type="number" id="editJugadores" value="${torneo.cantidadJugadores}" placeholder="Cantidad de jugadores">
        <input type="number" id="editHoras" value="${torneo.horasReservar}" placeholder="Horas a reservar">
        <input type="text" id="editPremios" value="${torneo.premios}" placeholder="Premios">
        <textarea id="editDescripcion" rows="3">${torneo.descripcion}</textarea>
        <button class="reservar-btn">Guardar Cambios</button>
      </div>
    `;

    overlay.querySelector(".cerrar-modal").addEventListener("click", () => overlay.remove());
    overlay.querySelector(".reservar-btn").addEventListener("click", () => {
      torneo.nombre = document.getElementById("editNombre").value;
      torneo.cantidadJugadores = document.getElementById("editJugadores").value;
      torneo.horasReservar = document.getElementById("editHoras").value;
      torneo.premios = document.getElementById("editPremios").value;
      torneo.descripcion = document.getElementById("editDescripcion").value;

      torneos[index] = torneo;
      localStorage.setItem("torneos", JSON.stringify(torneos));
      overlay.remove();
      mostrarTorneos();
    });

    document.body.appendChild(overlay);
  };

  mostrarTorneos();

  // Sidebar funcional
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('menu-toggle');
  const notiBtn = document.getElementById('notification-btn');
  const profileBtn = document.getElementById('profile-btn');
  const notiMenu = document.getElementById('notification-menu');
  const profileMenu = document.getElementById('profile-menu');

  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  notiBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    notiMenu.style.display = notiMenu.style.display === 'block' ? 'none' : 'block';
    profileMenu.style.display = 'none';
  });

  profileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    profileMenu.style.display = profileMenu.style.display === 'block' ? 'none' : 'block';
    notiMenu.style.display = 'none';
  });

  document.addEventListener('click', (e) => {
    if (!notiBtn.contains(e.target)) notiMenu.style.display = 'none';
    if (!profileBtn.contains(e.target)) profileMenu.style.display = 'none';
  });
});
