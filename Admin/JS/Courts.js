let courts = [];
let editingCourtId = null;

const courtsList = document.getElementById('courtsList');
const courtModal = document.getElementById('courtModal');
const courtForm = document.getElementById('courtForm');
const modalTitle = document.getElementById('modalTitle');
const btnAddCourt = document.getElementById('btnAddCourt');
const btnCancel = document.getElementById('btnCancel');

const courtName = document.getElementById('courtName');
const courtStatus = document.getElementById('courtStatus');
const courtImage = document.getElementById('courtImage');

const maintenanceDaysContainer = document.getElementById('maintenanceDaysContainer');
const maintenanceCheckboxes = document.querySelectorAll('.maintenance-day');

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const defaultSchedule = "5:00-23:00";

courtStatus.addEventListener('change', () => {
  maintenanceDaysContainer.classList.toggle('hidden', courtStatus.value !== 'maintenance');
});

btnAddCourt.addEventListener('click', () => {
  editingCourtId = null;
  modalTitle.textContent = 'Nueva Cancha';
  courtForm.reset();
  maintenanceDaysContainer.classList.add('hidden');
  maintenanceCheckboxes.forEach(cb => cb.checked = false);
  courtModal.classList.remove('hidden');

  // Asignar horarios por defecto
  days.forEach(day => {
    document.getElementById(day).value = defaultSchedule;
  });
});

btnCancel.addEventListener('click', () => {
  courtModal.classList.add('hidden');
});

courtForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const availability = {};
  days.forEach(day => {
    availability[day] = document.getElementById(day).value;
  });

  const maintenanceDays = [];
  maintenanceCheckboxes.forEach(cb => {
    if (cb.checked) maintenanceDays.push(cb.value);
  });

  const newCourt = {
    id: editingCourtId || Date.now(),
    name: courtName.value,
    status: courtStatus.value,
    maintenanceDays: maintenanceDays,
    availability: availability,
    image: courtImage.files[0] ? URL.createObjectURL(courtImage.files[0]) : null
  };

  if (editingCourtId) {
    courts = courts.map(c => c.id === editingCourtId ? newCourt : c);
  } else {
    courts.push(newCourt);
  }

  courtModal.classList.add('hidden');
  renderCourts();
});

function renderCourts() {
  courtsList.innerHTML = '';

  courts.forEach(court => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-2xl shadow p-6';

    card.innerHTML = `
      ${court.image ? `<img src="${court.image}" alt="Court Image" class="rounded-xl mb-4 h-40 w-full object-cover">` : ''}
      <h3 class="text-xl font-bold mb-2">${court.name}</h3>
      <p class="mb-2"><strong>Estado:</strong> ${formatStatus(court.status)}</p>
      ${
        court.status === 'maintenance' && court.maintenanceDays?.length
          ? `<p class="mb-2"><strong>Días en mantenimiento:</strong> ${court.maintenanceDays.map(capitalize).join(', ')}</p>`
          : ''
      }
      <div class="mb-2">
        <strong>Disponibilidad:</strong>
        <ul class="list-disc list-inside text-sm">
          ${days.map(day => `<li class="text-gray-600">${capitalize(day)}: ${court.availability[day] || 'No disponible'}</li>`).join('')}
        </ul>
      </div>
      <div class="flex gap-2 mt-4">
        <button onclick="editCourt(${court.id})" class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Editar</button>
        <button onclick="changeStatus(${court.id})" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Cambiar Estado</button>
      </div>
    `;

    courtsList.appendChild(card);
  });
}

function editCourt(id) {
  const court = courts.find(c => c.id === id);
  if (court) {
    editingCourtId = id;
    modalTitle.textContent = 'Editar Cancha';
    courtName.value = court.name;
    courtStatus.value = court.status;
    maintenanceDaysContainer.classList.toggle('hidden', court.status !== 'maintenance');
    maintenanceCheckboxes.forEach(cb => {
      cb.checked = court.maintenanceDays?.includes(cb.value);
    });
    days.forEach(day => {
      document.getElementById(day).value = court.availability[day] || '';
    });
    courtModal.classList.remove('hidden');
  }
}

function changeStatus(id) {
  const court = courts.find(c => c.id === id);
  if (court) {
    if (court.status === 'active') court.status = 'maintenance';
    else if (court.status === 'maintenance') court.status = 'disabled';
    else court.status = 'active';
    renderCourts();
  }
}

function formatStatus(status) {
  if (status === 'active') return '🟢 Activa';
  if (status === 'maintenance') return '🟠 Mantenimiento';
  if (status === 'disabled') return '🔴 Deshabilitada';
  return status;
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

renderCourts();
