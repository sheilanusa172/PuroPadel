document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('reservationCalendar');
    if (!calendarEl) {
        console.error('Element with id "reservationCalendar" not found.');
        return;
    }

    const calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: [FullCalendar.dayGridPlugin],
        initialView: 'dayGridMonth',
        events: [
            {
                title: 'Event 1',
                start: '2023-10-01',
            },
            {
                title: 'Event 2',
                start: '2023-10-05',
                end: '2023-10-07',
            },
        ],
    });

    calendar.render();
});