let tournaments = [];

function renderTournaments() {
  const tableBody = document.getElementById("tournamentTableBody");
  tableBody.innerHTML = "";

  tournaments.forEach((t, i) => {
    tableBody.innerHTML += `
      <tr>
        <td>${t.name}</td>
        <td>${t.startDate}</td>
        <td>${t.endDate}</td>
        <td>${t.level}</td>
        <td>${t.players || 0}</td>
        <td><span class="badge bg-${t.status === "Active" ? "success" : t.status === "Finalized" ? "secondary" : "danger"}">${t.status}</span></td>
        <td>
          <button class="btn btn-sm btn-info me-1" onclick="viewPlayers(${i})">View</button>
          <button class="btn btn-sm btn-primary me-1" onclick="editTournament(${i})">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteTournament(${i})">Delete</button>
        </td>
      </tr>`;
  });

  if ($.fn.DataTable.isDataTable("#tournamentTable")) {
    $("#tournamentTable").DataTable().destroy();
  }
  $("#tournamentTable").DataTable();
}

function showTournamentForm() {
  document.getElementById("tournamentFormContainer").classList.remove("d-none");
  document.getElementById("tournamentForm").reset();
  document.getElementById("tournamentId").value = "";
  document.getElementById("tournamentCode").value = "";
  document.getElementById("codeContainer").classList.add("d-none");
  document.getElementById("formTitle").innerText = "Create Tournament";
}

function hideTournamentForm() {
  document.getElementById("tournamentFormContainer").classList.add("d-none");
}

function handlePrivacyChange() {
  const privacy = document.getElementById("tournamentPrivacy").value;
  const codeField = document.getElementById("codeContainer");

  if (privacy === "Private") {
    const code = Math.floor(100000 + Math.random() * 900000); // 6-digit code
    document.getElementById("tournamentCode").value = code;
    codeField.classList.remove("d-none");
  } else {
    codeField.classList.add("d-none");
    document.getElementById("tournamentCode").value = "";
  }
}

function saveTournament(e) {
  e.preventDefault();
  const id = document.getElementById("tournamentId").value;

  const t = {
    name: document.getElementById("tournamentName").value,
    startDate: document.getElementById("tournamentStart").value,
    endDate: document.getElementById("tournamentEnd").value,
    level: document.getElementById("tournamentLevel").value,
    status: document.getElementById("tournamentStatus").value,
    description: document.getElementById("tournamentDescription").value,
    format: document.getElementById("tournamentFormat").value,
    privacy: document.getElementById("tournamentPrivacy").value,
    accessCode: document.getElementById("tournamentCode").value,
    image: document.getElementById("tournamentImage").files[0]?.name || "",
    players: Math.floor(Math.random() * 32) + 1
  };

  id ? tournaments[id] = t : tournaments.push(t);
  hideTournamentForm();
  renderTournaments();
}

function editTournament(index) {
  const t = tournaments[index];
  document.getElementById("tournamentId").value = index;
  document.getElementById("tournamentName").value = t.name;
  document.getElementById("tournamentStart").value = t.startDate;
  document.getElementById("tournamentEnd").value = t.endDate;
  document.getElementById("tournamentLevel").value = t.level;
  document.getElementById("tournamentStatus").value = t.status;
  document.getElementById("tournamentDescription").value = t.description;
  document.getElementById("tournamentFormat").value = t.format;
  document.getElementById("tournamentPrivacy").value = t.privacy;
  document.getElementById("tournamentCode").value = t.accessCode;

  // Mostrar código si es privado
  const codeField = document.getElementById("codeContainer");
  if (t.privacy === "Private") {
    codeField.classList.remove("d-none");
  } else {
    codeField.classList.add("d-none");
  }

  document.getElementById("formTitle").innerText = "Edit Tournament";
  showTournamentForm();
}

function deleteTournament(index) {
  if (confirm("Delete this tournament?")) {
    tournaments.splice(index, 1);
    renderTournaments();
  }
}

function viewPlayers(index) {
  const t = tournaments[index];
  alert(`Players in "${t.name}": ${t.players}`);
}

document.addEventListener("DOMContentLoaded", renderTournaments);
