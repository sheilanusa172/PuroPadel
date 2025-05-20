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
        "numeroCanchas",
        "horasReservar",
        "premios",
        "descripcionTorneo",
        "tipoTorneo",
        "categoria"
    ];
    const steps = inputs.map((id, i) => document.getElementById(`step${i + 1}`));
    steps.push(document.getElementById("step9"), document.getElementById("step10"));

    // Mostrar siguiente campo al llenar el anterior
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
            document.getElementById("step10").style.display = "block";
        });
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const torneo = {
            nombre: document.getElementById("nombreTorneo").value,
            cantidadJugadores: document.getElementById("cantidadJugadores").value,
            numeroCanchas: numeroCanchasInput.value,
            horasReservar: document.getElementById("horasReservar").value,
            premios: document.getElementById("premios").value,
            descripcion: document.getElementById("descripcionTorneo").value,
            tipoTorneo: document.getElementById("tipoTorneo").value,
            categoria: document.getElementById("categoria").value,
            privacidad: document.querySelector('input[name="privacidad"]:checked').value,
            codigo: codigoGenerado.value || null
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

        const existentes = contenedor.querySelectorAll(".tarjeta-torneo");
        existentes.forEach(e => e.remove());

        torneos.forEach(torneo => {
            if (torneo.privacidad === "publico") {
                const card = document.createElement("div");
                card.classList.add("tarjeta-torneo");

                card.innerHTML = `
                    <h3>${torneo.nombre}</h3>
                    <p><strong>Jugadores:</strong> ${torneo.cantidadJugadores}</p>
                    <p><strong>Canchas:</strong> ${torneo.numeroCanchas}</p>
                    <p><strong>Horas:</strong> ${torneo.horasReservar}</p>
                    <p><strong>Tipo:</strong> ${torneo.tipoTorneo}</p>
                    <p><strong>Categoría:</strong> ${torneo.categoria}</p>
                    <p><strong>Descripción:</strong> ${torneo.descripcion}</p>
                    <button>Unirse</button>
                `;
                contenedor.appendChild(card);
            }
        });
    }

    mostrarTorneos();
});
