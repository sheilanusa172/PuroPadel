document.addEventListener("DOMContentLoaded", () => {
    const solicitudForm = document.getElementById("solicitudForm");
    const detallePartido = document.getElementById("detalle-partido");
    const detalleInfo = document.getElementById("detalleInfo");

    // Simulación: datos de partido estático (el mismo mostrado en el HTML)
    const partidoEjemplo = {
        nombre: "Cancha Pública - Partido Abierto",
        nivel: "Intermedio",
        anfitrion: "Laura Gutiérrez",
        fecha: "2025-05-22",
        hora: "19:00",
        descripcion: "Partido para nivel intermedio. Se buscan 2 jugadores para completar el grupo."
    };

    // Si se quisiera activar el detalle en el futuro:
    const tarjetas = document.querySelectorAll(".card");
    tarjetas.forEach(tarjeta => {
        tarjeta.addEventListener("click", () => {
            mostrarDetalle(partidoEjemplo);
        });
    });

    // Mostrar detalle del partido en sección inferior
    function mostrarDetalle(partido) {
        detalleInfo.innerHTML = `
            <h3>${partido.nombre}</h3>
            <p><strong>Fecha:</strong> ${partido.fecha}</p>
            <p><strong>Hora:</strong> ${partido.hora}</p>
            <p><strong>Anfitrión:</strong> ${partido.anfitrion}</p>
            <p><strong>Nivel:</strong> ${partido.nivel}</p>
            <p>${partido.descripcion}</p>
        `;
        detallePartido.style.display = "block";
        window.scrollTo(0, detallePartido.offsetTop);
    }

    // Enviar solicitud al anfitrión (simulado)
    solicitudForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const nombreSolicitante = document.getElementById("nombreSolicitante").value;
        const mensajeSolicitud = document.getElementById("mensajeSolicitud").value;
        alert(`Solicitud enviada por: ${nombreSolicitante}\nMensaje: ${mensajeSolicitud}`);
        solicitudForm.reset();
    });
});
