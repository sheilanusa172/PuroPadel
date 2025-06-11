const calendar = document.getElementById("calendar");
const currentMonth = document.getElementById("currentMonth");
const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");
const eventModal = document.getElementById("eventModal");
const eventForm = document.getElementById("eventForm");
const btnCancelEvent = document.getElementById("btnCancelEvent");

let selectedDate = null;
let currentDate = new Date();

// Eventos por día
let events = {};

function formatDateKey(date) {
  return date.toISOString().split("T")[0];
}

function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const monthNames = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];
  currentMonth.textContent = `${monthNames[month]} de ${year}`;
  calendar.innerHTML = "";

  for (let i = 0; i < firstDay; i++) {
    calendar.innerHTML += `<div></div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    const dayDate = new Date(year, month, i);
    const dateKey = formatDateKey(dayDate);

    const dayCell = document.createElement("div");
    dayCell.classList.add("day-cell");
    dayCell.innerHTML = `<div class="day-number">${i}</div>`;

    if (events[dateKey]) {
      events[dateKey].forEach(evt => {
        const evtDiv = document.createElement("div");
        evtDiv.className = "event-chip";
        evtDiv.innerHTML = `
          <strong>${evt.title}</strong>
          <small>${evt.startTime}</small>
        `;
        dayCell.appendChild(evtDiv);
      });
    }

    dayCell.addEventListener("click", () => {
      selectedDate = dayDate;
      eventModal.classList.remove("hidden");
    });

    calendar.appendChild(dayCell);
  }
}

prevMonth.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

nextMonth.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

btnCancelEvent.addEventListener("click", () => {
  eventModal.classList.add("hidden");
  eventForm.reset();
});

eventForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("eventTitle").value;
  const description = document.getElementById("eventDescription").value;
  const startTime = document.getElementById("eventStartTime").value;
  const endTime = document.getElementById("eventEndTime").value;
  const type = document.getElementById("eventType").value;

  const dateKey = formatDateKey(selectedDate);
  if (!events[dateKey]) events[dateKey] = [];

  events[dateKey].push({
    title,
    description,
    startTime,
    endTime,
    type
  });

  eventModal.classList.add("hidden");
  eventForm.reset();
  renderCalendar(currentDate);
});

renderCalendar(currentDate);
