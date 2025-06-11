document.addEventListener('DOMContentLoaded', () => {
  const btnStartNow = document.getElementById('btnStartNow');
  const btnAddTournament = document.getElementById('btnAddTournament');
  const btnCancel = document.getElementById('btnCancel');
  const tournamentModal = document.getElementById('tournamentModal');
  const tournamentForm = document.getElementById('tournamentForm');
  const tournamentsList = document.getElementById('tournamentsList');

  const urlParams = new URLSearchParams(window.location.search);
  const tournamentId = Number(urlParams.get('id'));

  let tournaments = JSON.parse(localStorage.getItem('tournaments')) || [];

  // Mostrar modal
  btnAddTournament?.addEventListener('click', () => {
    tournamentModal.classList.remove('hidden');
  });

  // Ocultar modal
  btnCancel?.addEventListener('click', () => {
    tournamentModal.classList.add('hidden');
  });

  // Guardar torneo nuevo
  tournamentForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const newTournament = {
      id: Date.now(),
      name: document.getElementById('name').value,
      participants: document.getElementById('participants').value,
      category: document.getElementById('category').value,
      time: document.getElementById('time').value,
      format: document.getElementById('format').value,
      visibility: document.getElementById('visibility').value,
      description: document.getElementById('description').value,
      status: 'notStarted'
    };

    tournaments.push(newTournament);
    localStorage.setItem('tournaments', JSON.stringify(tournaments));

    tournamentForm.reset();
    tournamentModal.classList.add('hidden');
    renderTournaments();
  });

  // Renderizar torneos existentes
  function renderTournaments() {
    if (!tournamentsList) return;
    tournamentsList.innerHTML = '';

    tournaments.forEach(t => {
      const card = document.createElement('div');
      card.className = 'tournament-card';
      card.innerHTML = `
        <h3>${t.name}</h3>
        <p><strong>Categoría:</strong> ${t.category}</p>
        <p><strong>Hora:</strong> ${t.time}</p>
        <p><strong>Formato:</strong> ${t.format}</p>
        <p><strong>Participantes:</strong> ${t.participants}</p>
        <p><strong>Visibilidad:</strong> ${t.visibility}</p>
        <p><strong>Estado:</strong> ${formatStatus(t.status)}</p>
        <div class="card-actions">
          ${t.status === 'notStarted' ? `<button class="start-btn" onclick="startTournament(${t.id})">Iniciar Torneo</button>` : ''}
          <button class="result-btn" onclick="alert('Aquí se mostrarán los resultados del torneo')">Ver Resultados</button>
          <button class="positions-btn" onclick="alert('Aquí se mostrarán las posiciones en vivo')">Ver Posiciones</button>
        </div>
      `;
      tournamentsList.appendChild(card);
    });
  }

  function formatStatus(status) {
    if (status === 'notStarted') return 'No iniciado';
    if (status === 'inProgress') return 'En progreso';
    if (status === 'finished') return 'Finalizado';
    return status;
  }

  // Función global para iniciar torneo desde tarjeta
  window.startTournament = function(id) {
    const index = tournaments.findIndex(t => t.id === id);
    if (index !== -1 && tournaments[index].status === 'notStarted') {
      tournaments[index].status = 'inProgress';
      localStorage.setItem('tournaments', JSON.stringify(tournaments));
      alert(`Torneo "${tournaments[index].name}" iniciado.`);
      renderTournaments(); // refresca vista
    }
  };

  // Iniciar torneo si estamos en página de detalles
  btnStartNow?.addEventListener('click', () => {
    const index = tournaments.findIndex(t => t.id === tournamentId);

    if (index !== -1) {
      if (tournaments[index].status === 'notStarted') {
        tournaments[index].status = 'inProgress';
        localStorage.setItem('tournaments', JSON.stringify(tournaments));
        alert(`Tournament "${tournaments[index].name}" has started!`);
      } else {
        alert(`This tournament is already in status: ${tournaments[index].status}`);
      }

      window.location.href = 'Tournaments.html';
    } else {
      alert('Tournament not found.');
    }
  });

  renderTournaments();
});
