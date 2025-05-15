let currentMonth = new Date();
let events = {};

const calendar = document.getElementById('calendar');
const currentMonthLabel = document.getElementById('currentMonth');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

const eventModal = document.getElementById('eventModal');
const modalTitle = document.getElementById('modalTitle');
const eventForm = document.getElementById('eventForm');
const eventTitle = document.getElementById('eventTitle');
const eventDescription = document.getElementById('eventDescription');
const eventStartTime = document.getElementById('eventStartTime');
const eventEndTime = document.getElementById('eventEndTime');
const eventType = document.getElementById('eventType');
const btnCancelEvent = document.getElementById('btnCancelEvent');

let selectedDate = null;

prevMonthBtn.addEventListener('click', () => {
  currentMonth.setMonth(currentMonth.getMonth() - 1);
  renderCalendar();
});

nextMonthBtn.addEventListener('click', () => {
  currentMonth.setMonth(currentMonth.getMonth() + 1);
  renderCalendar();
});

btnCancelEvent.addEventListener('click', () => {
  eventModal.classList.add('hidden');
});

eventForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (selectedDate) {
    if (!events[selectedDate]) {
      events[selectedDate] = [];
    }

    events[selectedDate].push({
      title: eventTitle.value,
      description: eventDescription.value,
      startTime: eventStartTime.value,
      endTime: eventEndTime.value,
      type: eventType.value
    });

    eventModal.classList.add('hidden');
    renderCalendar();
  }
});

function renderCalendar() {
  calendar.innerHTML = '';
  currentMonthLabel.textContent = currentMonth.toLocaleString('es-ES', { month: 'long', year: 'numeric' });

  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const startDay = firstDay.getDay(); // 0 (domingo) a 6 (sábado)

  for (let i = 0; i < startDay; i++) {
    const emptyCell = document.createElement('div');
    calendar.appendChild(emptyCell);
  }

  for (let day = 1; day <= lastDay.getDate(); day++) {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    const dayCell = document.createElement('div');
    dayCell.className = 'bg-white rounded-2xl shadow p-2 cursor-pointer hover:bg-blue-100';
    dayCell.innerHTML = `<div class="font-bold">${day}</div>`;

    if (events[dateStr]) {
      events[dateStr].forEach(event => {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'mt-1 text-xs bg-blue-200 rounded p-1 truncate';
        eventDiv.innerHTML = `<strong>${event.startTime}</strong> ${event.title} (${event.type})`;
        dayCell.appendChild(eventDiv);
      });
    }

    dayCell.addEventListener('click', () => openEventModal(dateStr));
    calendar.appendChild(dayCell);
  }
}

function openEventModal(dateStr) {
  selectedDate = dateStr;
  eventTitle.value = '';
  eventDescription.value = '';
  eventStartTime.value = '';
  eventEndTime.value = '';
  eventType.value = 'Clase';
  modalTitle.textContent = `Nuevo Evento para ${selectedDate}`;
  eventModal.classList.remove('hidden');
}

renderCalendar();
