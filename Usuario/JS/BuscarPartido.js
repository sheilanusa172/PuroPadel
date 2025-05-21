document.addEventListener("DOMContentLoaded", () => {
    const buscarForm = document.getElementById("buscarForm");
    const modal = document.getElementById("modalSolicitud");
    const cerrar = document.querySelector(".cerrar");
    const comentario = document.getElementById("comentario");
    const enviarSolicitud = document.getElementById("enviarSolicitud");

    const sidebar = document.getElementById("sidebar");
    const menuToggle = document.getElementById("menu-toggle");
    const notificationBtn = document.getElementById("notification-btn");
    const profileBtn = document.getElementById("profile-btn");
    const notificationMenu = document.getElementById("notification-menu");
    const profileMenu = document.getElementById("profile-menu");

    // Sidebar toggle
    menuToggle.addEventListener("click", () => {
        sidebar.style.left = sidebar.style.left === "0px" ? "-300px" : "0px";
    });

    // Notificaciones
    notificationBtn.addEventListener("click", () => {
        notificationMenu.style.display = notificationMenu.style.display === "block" ? "none" : "block";
        profileMenu.style.display = "none";
    });

    // Perfil
    profileBtn.addEventListener("click", () => {
        profileMenu.style.display = profileMenu.style.display === "block" ? "none" : "block";
        notificationMenu.style.display = "none";
    });

    // Buscar partidos
    buscarForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const fecha = document.getElementById("fecha").value;
        const hora = document.getElementById("hora").value;
        if (fecha && hora) {
            alert(`Buscando partidos para el ${fecha} a las ${hora}`);
        } else {
            alert("Por favor, selecciona una fecha y hora.");
        }
    });

    // Unirse a partidos
    const botonesUnirse = document.querySelectorAll(".btn-unirse");

    botonesUnirse.forEach(boton => {
        boton.addEventListener("click", () => {
            const card = boton.closest(".card");
            const tipo = card.dataset.tipo;
            if (tipo === "publico") {
                alert("Te has unido al partido exitosamente.");
            } else if (tipo === "privado") {
                const codigoReal = card.dataset.codigo;
                const ingresado = prompt("Este partido es privado. Ingresa el código de 4 dígitos:");
                if (ingresado === codigoReal) {
                    modal.style.display = "block";
                } else {
                    alert("Código incorrecto. No puedes unirte.");
                }
            }
        });
    });

    // Modal
    cerrar.addEventListener("click", () => {
        modal.style.display = "none";
        comentario.value = "";
    });

    enviarSolicitud.addEventListener("click", () => {
        const mensaje = comentario.value.trim();
        if (mensaje) {
            alert("Solicitud enviada con el siguiente mensaje:\n" + mensaje);
            comentario.value = "";
            modal.style.display = "none";
        } else {
            alert("Por favor, escribe un comentario antes de enviar.");
        }
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
            comentario.value = "";
        }
    });
});
