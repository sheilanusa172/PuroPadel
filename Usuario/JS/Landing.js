const landingVideo = document.getElementById('landingVideo');

landingVideo.addEventListener('ended', () => {
    window.location.href = '/Usuario/Html/Inicio.html'; // Redirige al finalizar el video
});


