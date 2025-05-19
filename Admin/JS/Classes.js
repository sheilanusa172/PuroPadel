let classes = [];
let editingClassId = null;

const classesList = document.getElementById('classesList');
const classModal = document.getElementById('classModal');
const classForm = document.getElementById('classForm');
const modalTitle = document.getElementById('modalTitle');
const btnAddClass = document.getElementById('btnAddClass');
const btnCancel = document.getElementById('btnCancel');
const detailsModal = document.getElementById('detailsModal');
const detailsContent = document.getElementById('detailsContent');
const btnCloseDetails = document.getElementById('btnCloseDetails');

const className = document.getElementById('className');
const classDate = document.getElementById('classDate');
const classTime = document.getElementById('classTime');
const classDescription = document.getElementById('classDescription');
const classLevel = document.getElementById('classLevel');
const classTrainer = document.getElementById('classTrainer');
const classMaxUsers = document.getElementById('classMaxUsers');

const trainers = ['Entrenador A', 'Entrenador B', 'Entrenador C'];

function populateTrainers() {
  classTrainer.innerHTML = '';
  trainers.forEach(trainer => {
    const option = document.createElement('option');
    option.value = trainer;
    option.textContent = trainer;
    classTrainer.appendChild(option);
  });
}

btnAddClass.addEventListener('click', () => {
  editingClassId = null;
  modalTitle.textContent = 'Nueva Clase';
  classForm.reset();
  populateTrainers();
  classModal.classList.remove('hidden');
});

btnCancel.addEventListener('click', () => {
  classModal.classList.add('hidden');
});

btnCloseDetails.addEventListener('click', () => {
  detailsModal.classList.add('hidden');
});

classForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newClass = {
    id: editingClassId || Date.now(),
    name: className.value,
    date: classDate.value,
    time: classTime.value,
    description: classDescription.value,
    level: classLevel.value,
    trainer: classTrainer.value,
    maxUsers: parseInt(classMaxUsers.value),
    participants: [],
    evaluation: "",
    status: "scheduled"
  };

  if (editingClassId) {
    classes = classes.map(c => c.id === editingClassId ? newClass : c);
  } else {
    classes.push(newClass);
  }

  classModal.classList.add('hidden');
  renderClasses();
});

function renderClasses() {
  classesList.innerHTML = '';

  classes.forEach(cls => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-2xl shadow p-6';

    card.innerHTML = `
      <h3 class="text-xl font-bold mb-2">${cls.name}</h3>
      <p class="mb-2"><strong>Fecha:</strong> ${cls.date}</p>
      <p class="mb-2"><strong>Hora:</strong> ${cls.time}</p>
      <p class="mb-2"><strong>Nivel:</strong> ${cls.level}</p>
      <p class="mb-2"><strong>Entrenador:</strong> ${cls.trainer}</p>
      <p class="mb-2"><strong>Participantes:</strong> ${cls.participants.length} / ${cls.maxUsers}</p>
      <p class="mb-2"><strong>Estado:</strong> ${formatStatus(cls.status)}</p>
      <div class="flex gap-2 mt-4">
        <button onclick="viewDetails(${cls.id})" class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Ver Detalles</button>
        <button onclick="editClass(${cls.id})" class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Editar</button>
        <button onclick="cancelClass(${cls.id})" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Cancelar</button>
      </div>
    `;

    classesList.appendChild(card);
  });
}

function viewDetails(id) {
  const cls = classes.find(c => c.id === id);
  if (cls) {
    detailsContent.innerHTML = `
      <h3 class="text-xl font-bold">${cls.name}</h3>
      <p><strong>Fecha:</strong> ${cls.date}</p>
      <p><strong>Hora:</strong> ${cls.time}</p>
      <p><strong>Nivel:</strong> ${cls.level}</p>
      <p><strong>Entrenador:</strong> ${cls.trainer}</p>
      <p><strong>Límite de alumnos:</strong> ${cls.maxUsers}</p>
      <div class="mt-4">
        <h4 class="text-lg font-bold">Participantes</h4>
        ${cls.participants.length > 0
          ? `<ul class="list-disc list-inside">${cls.participants.map(p => `<li>${p}</li>`).join('')}</ul>`
          : '<p class="text-gray-600">No hay participantes.</p>'}
      </div>
      <div class="mt-4">
        <h4 class="text-lg font-bold">Evaluación</h4>
        <textarea id="evaluationInput" class="border p-3 rounded-xl w-full" rows="4">${cls.evaluation}</textarea>
        <button onclick="saveEvaluation(${cls.id})" class="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Guardar Evaluación</button>
      </div>
    `;
    detailsModal.classList.remove('hidden');
  }
}

function saveEvaluation(id) {
  const evaluationText = document.getElementById('evaluationInput').value;
  classes = classes.map(c => c.id === id ? { ...c, evaluation: evaluationText } : c);
  alert('Evaluación guardada exitosamente.');
  detailsModal.classList.add('hidden');
}

function editClass(id) {
  const cls = classes.find(c => c.id === id);
  if (cls) {
    editingClassId = id;
    modalTitle.textContent = 'Editar Clase';
    className.value = cls.name;
    classDate.value = cls.date;
    classTime.value = cls.time;
    classDescription.value = cls.description;
    classLevel.value = cls.level;
    populateTrainers();
    classTrainer.value = cls.trainer;
    classMaxUsers.value = cls.maxUsers;
    classModal.classList.remove('hidden');
  }
}

function cancelClass(id) {
  const confirmCancel = confirm('¿Estás seguro de cancelar esta clase?');
  if (confirmCancel) {
    classes = classes.map(c => c.id === id ? { ...c, status: 'cancelled' } : c);
    renderClasses();
  }
}

function formatStatus(status) {
  if (status === 'scheduled') return '🟢 Programada';
  if (status === 'finished') return '🔵 Finalizada';
  if (status === 'cancelled') return '🔴 Cancelada';
  return status;
}

populateTrainers();
renderClasses();
