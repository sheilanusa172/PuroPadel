// Toggle Dark Mode
document.getElementById('darkModeToggle')?.addEventListener('change', () => {
  document.body.classList.toggle('bg-gray-900');
  document.body.classList.toggle('text-white');

  document.querySelectorAll('.card-section').forEach(card => {
    card.classList.toggle('bg-white');
    card.classList.toggle('bg-gray-800');
    card.classList.toggle('text-gray-900');
    card.classList.toggle('text-white');
  });

  document.getElementById('pageTitle')?.classList.toggle('text-white');
});

// Mostrar/ocultar secciones
const toggles = document.querySelectorAll('[data-toggle]');
toggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    const targetId = toggle.getAttribute('data-toggle');
    const section = document.getElementById(targetId);
    section?.classList.toggle('hidden');
  });
});

// Actualizar contraseña
document.getElementById('passwordForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const current = document.getElementById('currentPassword').value;
  const nueva = document.getElementById('newPassword').value;
  const confirm = document.getElementById('confirmPassword').value;

  if (nueva !== confirm) {
    alert('Las contraseñas no coinciden');
    return;
  }

  console.log('Contraseña actual:', current);
  console.log('Nueva contraseña:', nueva);
  alert('Contraseña actualizada');
});

// Actualizar datos personales
document.getElementById('personalForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const phone = document.getElementById('phoneNumber').value;
  console.log('Teléfono actualizado:', phone);
  alert('Datos personales actualizados');
});

// Cerrar sesión
document.getElementById('logoutBtn')?.addEventListener('click', () => {
  alert('Sesión cerrada');
  // Redirección o limpieza de sesión puede ir aquí
});
