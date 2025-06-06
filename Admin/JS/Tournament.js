document.addEventListener('DOMContentLoaded', () => {
  const btnStartNow = document.getElementById('btnStartNow');
  const urlParams = new URLSearchParams(window.location.search);
  const tournamentId = Number(urlParams.get('id'));

  // Obtener torneos del localStorage
  let tournaments = JSON.parse(localStorage.getItem('tournaments')) || [];

  btnStartNow.addEventListener('click', () => {
    const index = tournaments.findIndex(t => t.id === tournamentId);

    if (index !== -1) {
      if (tournaments[index].status === 'notStarted') {
        tournaments[index].status = 'inProgress';
        localStorage.setItem('tournaments', JSON.stringify(tournaments));
        alert(`Tournament "${tournaments[index].name}" has started!`);
      } else {
        alert(`This tournament is already in status: ${tournaments[index].status}`);
      }

      // Redirigir de vuelta a la lista de torneos
      window.location.href = 'Tournaments.html';
    } else {
      alert('Tournament not found.');
    }
  });
});
