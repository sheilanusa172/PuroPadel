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

    const disponibles = [1, 3, 4, 6];

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
                <button class="abrir-config-btn reservar-btn">Reservar Cancha</button>
            </div>
        `;

        overlay.querySelector('.cerrar-modal').addEventListener('click', () => {
            overlay.remove();
        });

        overlay.querySelector('.abrir-config-btn').addEventListener('click', () => {
            mostrarOpcionesReserva(overlay);
        });

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
            <div id="info-extra" style="margin-bottom: 15px;"></div>
            <label>¿En cuántas personas deseas dividir el pago?</label><br>
            <select id="division-pago" style="margin-top: 8px;">
                <option value="1">1 persona</option>
                <option value="2">2 personas</option>
                <option value="3">3 personas</option>
                <option value="4">4 personas</option>
            </select>
            <p style="margin-top:10px;" id="monto-pagar">Total a pagar: $40</p>
            <button class="reservar-btn">Reservar Cancha</button>
        </div>
    `;

    const selectDivision = overlay.querySelector('#division-pago');
    const montoPagar = overlay.querySelector('#monto-pagar');
    const infoExtra = overlay.querySelector('#info-extra');

    selectDivision.addEventListener('change', () => {
        const valor = Number(selectDivision.value);
        montoPagar.textContent = `Total a pagar: $${(40 / valor).toFixed(2)} por persona`;
    });

    overlay.querySelectorAll('.modo-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const modo = btn.dataset.modo;

            if (modo === 'publica') {
                infoExtra.innerHTML = `
                    <p>Otros usuarios pueden unirse si tienen tu ID.</p>
                    <label>¿Cuántas personas ya tienes?</label>
                    <select id="ya-tiene">
                        <option value="1">1 persona</option>
                        <option value="2">2 personas</option>
                        <option value="3">3 personas</option>
                        <option value="4">4 personas</option>
                    </select>
                    <div id="usuarios-extra" style="margin-top: 10px;"></div>
                `;

                const selectYaTiene = infoExtra.querySelector('#ya-tiene');
                const usuariosExtra = infoExtra.querySelector('#usuarios-extra');

                selectYaTiene.addEventListener('change', () => {
                    const yaTiene = Number(selectYaTiene.value);
                    const disponibles = 4 - yaTiene;
                    usuariosExtra.innerHTML = disponibles > 0
                        ? `<p>Pueden unirse ${disponibles} persona(s).</p>
                            <label>¿Tienes ID de usuario?</label><br>
                            <input type="radio" name="tiene-id" value="si"> Sí
                            <input type="radio" name="tiene-id" value="no" checked> No
                            <div id="input-id" style="margin-top: 10px;"></div>`
                        : `<p>No hay espacio para más personas.</p>`;

                    const radios = usuariosExtra.querySelectorAll('input[name="tiene-id"]');
                    radios.forEach(radio => {
                        radio.addEventListener('change', () => {
                            const inputId = usuariosExtra.querySelector('#input-id');
                            if (radio.value === 'si') {
                                inputId.innerHTML = '<input type="text" placeholder="Ingresa tu ID">';
                            } else {
                                inputId.innerHTML = '<p>Se te registrará como invitado.</p>';
                            }
                        });
                    });
                });

                selectYaTiene.dispatchEvent(new Event('change'));
            } else {
                infoExtra.innerHTML = `<p>Tu código privado de acceso: <strong>${codigoPrivado}</strong></p>`;
            }
        });
    });

    overlay.querySelector('.cerrar-modal').addEventListener('click', () => {
        overlay.remove();
    });

    overlay.querySelector('.reservar-btn').addEventListener('click', () => {
        const categoria = overlay.querySelector('#categoria')?.value || "";
        alert(`Reserva confirmada (simulación).\nCategoría: ${categoria}`);
        overlay.remove();
    });

    document.body.appendChild(overlay);
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
