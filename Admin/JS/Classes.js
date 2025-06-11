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
    card.className = 'class-card';

    card.innerHTML = `
      <h3>${cls.name}</h3>
      <p><strong>Fecha:</strong> ${cls.date}</p>
      <p><strong>Hora:</strong> ${cls.time}</p>
      <p><strong>Nivel:</strong> ${cls.level}</p>
      <p><strong>Entrenador:</strong> ${cls.trainer}</p>
      <p><strong>Participantes:</strong> ${cls.participants.length} / ${cls.maxUsers}</p>
      <p><strong>Estado:</strong> <span class="status-${cls.status}">${formatStatus(cls.status)}</span></p>
      <div class="actions">
        <button onclick="viewDetails(${cls.id})">Ver Detalles</button>
        <button onclick="editClass(${cls.id})">Editar</button>
        <button onclick="cancelClass(${cls.id})">Cancelar</button>
      </div>
    `;

    classesList.appendChild(card);
  });
}

function viewDetails(id) {
  const cls = classes.find(c => c.id === id);
  if (cls) {
    detailsContent.innerHTML = `
      <h3>${cls.name}</h3>
      <p><strong>Fecha:</strong> ${cls.date}</p>
      <p><strong>Hora:</strong> ${cls.time}</p>
      <p><strong>Nivel:</strong> ${cls.level}</p>
      <p><strong>Entrenador:</strong> ${cls.trainer}</p>
      <p><strong>Límite de alumnos:</strong> ${cls.maxUsers}</p>
      <div class="mt-4">
        <h4>Participantes</h4>
        ${cls.participants.length > 0
          ? `<ul>${cls.participants.map(p => `<li>${p}</li>`).join('')}</ul>`
          : '<p>No hay participantes.</p>'}
      </div>
      <div class="mt-4">
        <h4>Evaluación</h4>
        <textarea id="evaluationInput" rows="4" class="w-full border rounded p-2">${cls.evaluation}</textarea>
        <button onclick="saveEvaluation(${cls.id})">Guardar Evaluación</button>
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
  if (status === 'scheduled') return 'Programada';
  if (status === 'finished') return 'Finalizada';
  if (status === 'cancelled') return 'Cancelada';
  return status;
}

populateTrainers();
renderClasses();
