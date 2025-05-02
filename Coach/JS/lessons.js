let lessons = [];

function renderLessons() {
  const tableBody = document.getElementById("lessonTableBody");
  tableBody.innerHTML = "";

  lessons.forEach((lesson, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${lesson.date}</td>
      <td>${lesson.time}</td>
      <td>${lesson.players}</td>
      <td><span class="badge bg-${lesson.status === "Scheduled" ? "success" : "danger"}">${lesson.status}</span></td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" onclick="editLesson(${index})">Edit</button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteLesson(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function showLessonForm() {
  document.getElementById("lessonFormContainer").classList.remove("d-none");
  document.getElementById("formTitle").innerText = "Create Lesson";
  document.getElementById("lessonForm").reset();
  document.getElementById("lessonId").value = "";
}

function hideLessonForm() {
  document.getElementById("lessonFormContainer").classList.add("d-none");
}

function saveLesson(event) {
  event.preventDefault();

  const id = document.getElementById("lessonId").value;
  const lesson = {
    date: document.getElementById("lessonDate").value,
    time: document.getElementById("lessonTime").value,
    players: document.getElementById("lessonPlayers").value,
    status: document.getElementById("lessonStatus").value,
  };

  if (id) {
    lessons[id] = lesson;
  } else {
    lessons.push(lesson);
  }

  hideLessonForm();
  renderLessons();
}

function editLesson(index) {
  const lesson = lessons[index];
  document.getElementById("lessonId").value = index;
  document.getElementById("lessonDate").value = lesson.date;
  document.getElementById("lessonTime").value = lesson.time;
  document.getElementById("lessonPlayers").value = lesson.players;
  document.getElementById("lessonStatus").value = lesson.status;
  document.getElementById("formTitle").innerText = "Edit Lesson";
  showLessonForm();
}

function deleteLesson(index) {
  if (confirm("Are you sure you want to delete this lesson?")) {
    lessons.splice(index, 1);
    renderLessons();
  }
}

renderLessons();
