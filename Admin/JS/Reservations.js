let reservations = [
    { id: 1, court: "Cancha 1", date: "2025-05-20", time: "10:00", user: "Allan Blanco", status: "active" },
    { id: 2, court: "Cancha 2", date: "2025-05-21", time: "14:00", user: "Sheila Nuñez", status: "finished" },
    { id: 3, court: "Cancha 1", date: "2025-05-22", time: "16:00", user: "Laura Jiménez", status: "active" }
  ];
  
  const calendar = document.getElementById('calendar');
  const filterCourt = document.getElementById('filterCourt');
  const filterDate = document.getElementById('filterDate');
  const filterStatus = document.getElementById('filterStatus');
  const btnExport = document.getElementById('btnExport');
  
  const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  
  // Inicializar Canchas
  function initializeCourts() {
    const courts = [...new Set(reservations.map(r => r.court))];
    courts.forEach(court => {
      const option = document.createElement('option');
      option.value = court;
      option.textContent = court;
      filterCourt.appendChild(option);
    });
  }
  
  // Renderizar Calendario
  function renderCalendar() {
    calendar.innerHTML = '';
  
    daysOfWeek.forEach((day, index) => {
      const column = document.createElement('div');
      column.className = 'bg-white rounded-2xl shadow p-4';
  
      const title = document.createElement('h3');
      title.className = 'text-xl font-bold mb-4 text-center';
      title.textContent = day;
      column.appendChild(title);
  
      const today = new Date();
      const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(currentDate.getDate() + index);
      const currentDateStr = currentDate.toISOString().split('T')[0];
  
      const dayReservations = reservations.filter(r => {
        const matchesDate = r.date === currentDateStr;
        const matchesCourt = filterCourt.value === '' || r.court === filterCourt.value;
        const matchesStatus = filterStatus.value === '' || r.status === filterStatus.value;
        const matchesSpecificDate = filterDate.value === '' || r.date === filterDate.value;
        return matchesDate && matchesCourt && matchesStatus && matchesSpecificDate;
      });
  
      dayReservations.forEach(res => {
        const card = document.createElement('div');
        card.className = `p-3 mt-2 rounded-xl text-sm ${res.status === 'active' ? 'bg-green-100' : res.status === 'cancelled' ? 'bg-red-100' : 'bg-blue-100'}`;
  
        card.innerHTML = `
          <p><strong>${res.time}</strong> - ${res.user}</p>
          <p class="text-gray-600">${res.court}</p>
          <button onclick="cancelReservation(${res.id})" class="mt-2 text-red-600 underline text-xs">Cancelar</button>
        `;
  
        column.appendChild(card);
      });
  
      calendar.appendChild(column);
    });
  }
  
  // Cancelar Reserva
  function cancelReservation(id) {
    const confirmCancel = confirm('¿Estás seguro de cancelar esta reserva?');
    if (confirmCancel) {
      reservations = reservations.map(r => r.id === id ? { ...r, status: 'cancelled' } : r);
      renderCalendar();
    }
  }
  
  // Exportar Reservas
  function exportReservations() {
    let data = "ID,CANCHA,FECHA,HORA,USUARIO,ESTADO\n";
    reservations.forEach(r => {
      data += `${r.id},${r.court},${r.date},${r.time},${r.user},${r.status}\n`;
    });
  
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reservas.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }
  
  filterCourt.addEventListener('change', renderCalendar);
  filterDate.addEventListener('change', renderCalendar);
  filterStatus.addEventListener('change', renderCalendar);
  btnExport.addEventListener('click', exportReservations);
  
  initializeCourts();
  renderCalendar();
  