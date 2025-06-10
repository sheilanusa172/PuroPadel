let tournaments = [];

function renderTournaments() {
  const tableBody = document.getElementById("tournamentTableBody");
  tableBody.innerHTML = "";

  tournaments.forEach((t, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${t.name}</td>
      <td>${t.startDate}</td>
      <td>${t.endDate}</td>
      <td>${t.level}</td>
      <td>${t.players || 0}</td>
      <td><span class="${getStatusClass(t.status)}">${t.status}</span></td>
      <td>
        <button class="btn-info" onclick="viewPlayers(${i})">View</button>
        <button class="btn-primary" onclick="editTournament(${i})">Edit</button>
        <button class="btn-danger" onclick="deleteTournament(${i})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function getStatusClass(status) {
  switch (status) {
    case "Active":
      return "badge-success";
    case "Finalized":
      return "badge-secondary";
    case "Cancelled":
      return "badge-danger";
    default:
      return "";
  }
}

function showTournamentForm() {
  document.getElementById("tournamentFormContainer").classList.remove("hidden");
  document.getElementById("tournamentForm").reset();
  document.getElementById("tournamentId").value = "";
  document.getElementById("tournamentCode").value = "";
  document.getElementById("codeContainer").classList.add("hidden");
  document.getElementById("formTitle").innerText = "Create Tournament";
}

function hideTournamentForm() {
  document.getElementById("tournamentFormContainer").classList.add("hidden");
}

function handlePrivacyChange() {
  const privacy = document.getElementById("tournamentPrivacy").value;
  const codeField = document.getElementById("codeContainer");

  if (privacy === "Private") {
    const code = Math.floor(100000 + Math.random() * 900000);
    document.getElementById("tournamentCode").value = code;
    codeField.classList.remove("hidden");
  } else {
    document.getElementById("tournamentCode").value = "";
    codeField.classList.add("hidden");
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

  const codeField = document.getElementById("codeContainer");
  if (t.privacy === "Private") {
    codeField.classList.remove("hidden");
  } else {
    codeField.classList.add("hidden");
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
