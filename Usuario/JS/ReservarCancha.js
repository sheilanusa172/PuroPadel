const diasContenedor = document.getElementById('dias-semana');
const horarioSelect = document.getElementById('horario');
const canchaContenedor = document.getElementById('contenedor-canchas');
const mensaje = document.getElementById('mensaje');
const duracionSelect = document.getElementById('duracion');

let fechaActual = new Date();

function clonarFecha(fecha) {
    return new Date(fecha.getTime());
}

function generarDiasSemana(base) {
    diasContenedor.innerHTML = "";
    const inicioSemana = clonarFecha(base);
    inicioSemana.setDate(inicioSemana.getDate() - inicioSemana.getDay());

    const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    for (let i = 0; i < 7; i++) {
        const dia = clonarFecha(inicioSemana);
        dia.setDate(inicioSemana.getDate() + i);

        const boton = document.createElement('button');
        const diaTexto = `${dias[dia.getDay()]} ${dia.getDate()}/${dia.getMonth() + 1}`;
        boton.textContent = diaTexto;
        boton.dataset.fecha = dia.toISOString().split("T")[0];

        boton.addEventListener('click', () => {
            document.querySelectorAll('.dias-semana button').forEach(b => b.classList.remove('active'));
            boton.classList.add('active');
            mostrarCanchasDisponibles();
        });

        diasContenedor.appendChild(boton);
    }
}

function generarHorarios() {
    for (let h = 6; h < 23; h++) {
        horarioSelect.append(new Option(`${h}:00`, `${h}:00`));
        horarioSelect.append(new Option(`${h}:30`, `${h}:30`));
    }
}

function mostrarCanchasDisponibles() {
    const hora = horarioSelect.value;
    const duracion = duracionSelect.value;
    const diaSeleccionado = document.querySelector('.dias-semana button.active');

    canchaContenedor.innerHTML = "";
    mensaje.textContent = "";

    if (!hora || !diaSeleccionado) {
        const cancha = document.createElement('div');
        cancha.classList.add('cancha');

        cancha.innerHTML = `
            <button class="cancha-btn">
                <video src="/imagenes/Diseño#2.mp4" muted loop autoplay></video>
                <div class="overlay">Cancha 1 (Ejemplo)</div>
            </button>
        `;

        agregarEventosCancha(cancha);
        canchaContenedor.appendChild(cancha);
        return;
    }

    const disponibles = [1, 3, 4, 6]; // Simulación

    if (disponibles.length === 0) {
        mensaje.textContent = "No hay canchas disponibles para este horario.";
        return;
    }

    for (let i = 1; i <= 8; i++) {
        if (disponibles.includes(i)) {
            const cancha = document.createElement('div');
            cancha.classList.add('cancha');

            cancha.innerHTML = `
                <button class="cancha-btn" data-id="${i}">
                    <video src="/imagenes/Diseño2.mp4" muted loop autoplay></video>
                    <div class="overlay">Cancha ${i}</div>
                </button>
            `;

            agregarEventosCancha(cancha);
            canchaContenedor.appendChild(cancha);
        }
    }
}

function agregarEventosCancha(cancha) {
    const btn = cancha.querySelector('.cancha-btn');

    btn.addEventListener('click', () => {
        const overlay = document.createElement('div');
        overlay.classList.add('reserva-overlay');

        overlay.innerHTML = `
            <div class="reserva-box">
                <button class="cerrar-modal">✕</button>
                <h3>¿Deseas reservar esta cancha?</h3>
                <button class="reservar-btn">Reservar Cancha</button>
            </div>
        `;

        overlay.querySelector('.cerrar-modal').addEventListener('click', () => {
            overlay.remove();
        });

        document.body.appendChild(overlay);
    });
}

document.getElementById('semana-previa').addEventListener('click', () => {
    fechaActual.setDate(fechaActual.getDate() - 7);
    generarDiasSemana(fechaActual);
});

document.getElementById('semana-siguiente').addEventListener('click', () => {
    fechaActual.setDate(fechaActual.getDate() + 7);
    generarDiasSemana(fechaActual);
});

horarioSelect.addEventListener('change', mostrarCanchasDisponibles);
duracionSelect.addEventListener('change', mostrarCanchasDisponibles);

generarDiasSemana(fechaActual);
generarHorarios();
mostrarCanchasDisponibles();
