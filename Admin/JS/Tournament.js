let tournaments = [];
let editingTournamentId = null;

const tournamentsList = document.getElementById('tournamentsList');
const tournamentModal = document.getElementById('tournamentModal');
const tournamentForm = document.getElementById('tournamentForm');
const modalTitle = document.getElementById('modalTitle');
const searchInput = document.getElementById('searchInput');
const visibilityFilter = document.getElementById('visibilityFilter');

// Elements inside form
const nameInput = document.getElementById('name');
const participantsInput = document.getElementById('participants');
const categoryInput = document.getElementById('category');
const timeInput = document.getElementById('time');
const formatInput = document.getElementById('format');
const visibilityInput = document.getElementById('visibility');
const photoInput = document.getElementById('photo');
const descriptionInput = document.getElementById('description');

// Open Modal
btnAddTournament.addEventListener('click', () => {
  editingTournamentId = null;
  modalTitle.textContent = 'Add Tournament';
  tournamentForm.reset();
  tournamentModal.classList.remove('hidden');
});

// Close Modal
btnCancel.addEventListener('click', () => {
  tournamentModal.classList.add('hidden');
});

// Submit Tournament Form
tournamentForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let accessCode = null;
  if (visibilityInput.value === 'private') {
    accessCode = generateAccessCode();
  }

  const newTournament = {
    id: editingTournamentId || Date.now(),
    name: nameInput.value,
    participants: participantsInput.value,
    category: categoryInput.value,
    time: timeInput.value,
    format: formatInput.value,
    visibility: visibilityInput.value,
    description: descriptionInput.value,
    photo: photoInput.files[0] ? URL.createObjectURL(photoInput.files[0]) : null,
    accessCode: accessCode,
    status: 'notStarted' // 👈 nuevo campo de estado
  };

  if (editingTournamentId) {
    tournaments = tournaments.map(t => t.id === editingTournamentId ? newTournament : t);
  } else {
    tournaments.push(newTournament);
  }

  tournamentModal.classList.add('hidden');
  renderTournaments();
});

// Generate 6 digit access code
function generateAccessCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Start Tournament
function startTournament(event, id) {
  event.stopPropagation();
  const tournament = tournaments.find(t => t.id === id);
  if (tournament && tournament.status === 'notStarted') {
    tournament.status = 'inProgress';
    alert(`Tournament "${tournament.name}" has started!`);
    renderTournaments();
  }
}

// Render Tournaments
function renderTournaments() {
  tournamentsList.innerHTML = '';

  const searchTerm = searchInput.value.toLowerCase();
  const visibility = visibilityFilter.value;

  const filtered = tournaments.filter(t => {
    const matchesName = t.name.toLowerCase().includes(searchTerm);
    const matchesVisibility = visibility === 'all' || t.visibility === visibility;
    return matchesName && matchesVisibility;
  });

  filtered.forEach(tournament => {
    const card = document.createElement('div');
    card.className = 'torneo-card border border-gray-300 rounded-2xl p-6 bg-white shadow hover:shadow-lg cursor-pointer';
    card.innerHTML = `
      <h3 class="text-xl font-bold mb-2">${tournament.name}</h3>
      <p><strong>Category:</strong> ${tournament.category}</p>
      <p><strong>Participants:</strong> ${tournament.participants}</p>
      <p><strong>Visibility:</strong> ${tournament.visibility.charAt(0).toUpperCase() + tournament.visibility.slice(1)}</p>
      <p><strong>Status:</strong> ${tournament.status}</p>
      <div class="detalles-torneo hidden mt-4 bg-gray-50 p-4 rounded-xl">
        <p><strong>Time:</strong> ${tournament.time}</p>
        <p><strong>Format:</strong> ${tournament.format}</p>
        <p><strong>Description:</strong> ${tournament.description}</p>
        ${tournament.visibility === 'private' && tournament.accessCode ? `<p><strong>Access Code:</strong> ${tournament.accessCode}</p>` : ''}
        ${tournament.photo ? `<img src="${tournament.photo}" alt="Tournament Photo" class="mt-4 rounded-xl">` : ''}
        <div class="flex flex-wrap gap-2 mt-4">
          ${tournament.status === 'notStarted' ? `<button onclick="startTournament(event, ${tournament.id})" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Start</button>` : ''}
          <button onclick="window.location.href='../Html/TournamentResoults.html'" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">View Results</button>
          <button onclick="window.location.href='../Html/TournamentStandings.html'" class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Standings</button>
          <button onclick="editTournament(event, ${tournament.id})" class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Edit</button>
          <button onclick="deleteTournament(event, ${tournament.id})" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
        </div>
      </div>
    `;

    card.addEventListener('click', () => expandTournament(card));
    tournamentsList.appendChild(card);
  });
}

// Expand or Collapse Tournament Card
function expandTournament(card) {
  const details = card.querySelector('.detalles-torneo');
  details.classList.toggle('hidden');
}

// Edit Tournament
function editTournament(event, id) {
  event.stopPropagation();
  const tournament = tournaments.find(t => t.id === id);
  if (tournament) {
    editingTournamentId = id;
    modalTitle.textContent = 'Edit Tournament';
    nameInput.value = tournament.name;
    participantsInput.value = tournament.participants;
    categoryInput.value = tournament.category;
    timeInput.value = tournament.time;
    formatInput.value = tournament.format;
    visibilityInput.value = tournament.visibility;
    descriptionInput.value = tournament.description;
    tournamentModal.classList.remove('hidden');
  }
}

// Delete Tournament
function deleteTournament(event, id) {
  event.stopPropagation();
  if (confirm('Are you sure you want to delete this tournament?')) {
    tournaments = tournaments.filter(t => t.id !== id);
    renderTournaments();
  }
}

// Filter Events
searchInput.addEventListener('input', renderTournaments);
visibilityFilter.addEventListener('change', renderTournaments);

// Initial render
renderTournaments();
