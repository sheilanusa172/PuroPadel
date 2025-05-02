// Toggle Dark Mode
const darkToggle = document.getElementById('darkModeToggle');
darkToggle?.addEventListener('change', () => {
  document.body.classList.toggle('bg-gray-900');
  document.body.classList.toggle('text-white');

  // Aplica a las tarjetas blancas
  document.querySelectorAll('.card-section').forEach(card => {
    card.classList.toggle('bg-white');
    card.classList.toggle('bg-gray-800');
    card.classList.toggle('text-gray-900');
    card.classList.toggle('text-white');
  });

  // Título de Configuración
  document.getElementById('pageTitle')?.classList.toggle('text-white');
});

// Mostrar u ocultar secciones al hacer clic en el título
const sectionToggles = document.querySelectorAll('[data-toggle]');
sectionToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    const targetId = toggle.getAttribute('data-toggle');
    const targetSection = document.getElementById(targetId);
    if (targetSection) targetSection.classList.toggle('hidden');
  });
});

// Cambiar contraseña
const passwordForm = document.getElementById('passwordForm');
passwordForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const current = document.getElementById('currentPassword').value;
  const newPass = document.getElementById('newPassword').value;
  const confirm = document.getElementById('confirmPassword').value;

  if (newPass !== confirm) {
    alert('Las contraseñas no coinciden');
    return;
  }

  console.log('Contraseña actual:', current);
  console.log('Nueva contraseña:', newPass);
  alert('Contraseña actualizada con éxito');
});

// Guardar número de teléfono
const personalForm = document.getElementById('personalForm');
personalForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const phone = document.getElementById('phoneNumber').value;

  console.log('Teléfono actualizado:', phone);
  alert('Datos personales actualizados');
});

// Cerrar sesión
document.getElementById('logoutBtn')?.addEventListener('click', () => {
  alert('Sesión cerrada');
  // Aquí podrías hacer: localStorage.clear(); o redirigir al login
});
