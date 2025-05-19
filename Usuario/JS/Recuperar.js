// Archivo: recuperar.js

function handleRecovery(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;

  // Simula envío (reemplaza con fetch a API si lo deseas)
  document.getElementById('message').textContent =
    `Se ha enviado un enlace de recuperación a ${email}`;

  // Limpia el campo
  e.target.reset();
}
