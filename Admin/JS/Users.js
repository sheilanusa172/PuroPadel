let users = [
  { id: 1, name: "Allan Blanco", email: "allan@email.com", role: "Admin", status: "Active" },
  { id: 2, name: "Sheila Nuñez", email: "sheila@email.com", role: "Coach", status: "Inactive" }
];

let editingUserId = null;

const tableBody = document.getElementById('tableBody');
const userModal = document.getElementById('userModal');
const modalTitle = document.getElementById('modalTitle');
const userForm = document.getElementById('userForm');
const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');
const userRole = document.getElementById('userRole');
const userStatus = document.getElementById('userStatus');
const filterRole = document.getElementById('filterRole');
const filterStatus = document.getElementById('filterStatus');
const filterName = document.getElementById('filterName');
const detailsModal = document.getElementById('detailsModal');
const detailsContent = document.getElementById('detailsContent');
const btnCloseDetails = document.getElementById('btnCloseDetails');

// Modal to Add User
document.getElementById('btnAddUser').addEventListener('click', () => {
  editingUserId = null;
  modalTitle.textContent = 'Add User';
  userForm.reset();
  detailsModal.style.display = 'none';
  userModal.style.display = 'flex';
});

// Cancel Add/Edit User
document.getElementById('btnCancel').addEventListener('click', () => {
  userModal.style.display = 'none';
});

// Save User (Add or Edit)
userForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = userName.value;
  const email = userEmail.value;
  const role = userRole.value;
  const status = userStatus.value;

  if (editingUserId) {
    users = users.map(u => u.id === editingUserId ? { ...u, name, email, role, status } : u);
  } else {
    const id = Date.now();
    users.push({ id, name, email, role, status });
  }

  userModal.style.display = 'none';
  renderTable();
});

// Render Table
function renderTable() {
  tableBody.innerHTML = '';
  const filters = users.filter(user => {
    return (filterRole.value === '' || user.role === filterRole.value) &&
           (filterStatus.value === '' || user.status === filterStatus.value) &&
           (filterName.value === '' || user.name.toLowerCase().includes(filterName.value.toLowerCase()));
  });

  filters.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td style="color:blue; cursor:pointer; text-decoration:underline;" onclick="viewDetails(${user.id})">${user.name}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td><span style="font-weight:bold; color:${user.status === 'Active' ? 'green' : 'red'}">${user.status}</span></td>
      <td>
        <button onclick="editUser(${user.id})">Edit</button>
        <button onclick="toggleStatus(${user.id})">${user.status === 'Active' ? 'Deactivate' : 'Activate'}</button>
        <button onclick="deleteUser(${user.id})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Edit User
function editUser(id) {
  const user = users.find(u => u.id === id);
  if (user) {
    editingUserId = id;
    modalTitle.textContent = 'Edit User';
    userName.value = user.name;
    userEmail.value = user.email;
    userRole.value = user.role;
    userStatus.value = user.status;
    detailsModal.style.display = 'none';
    userModal.style.display = 'flex';
  }
}

// Activate/Deactivate User
function toggleStatus(id) {
  users = users.map(u => u.id === id ? {
    ...u,
    status: u.status === 'Active' ? 'Inactive' : 'Active'
  } : u);
  renderTable();
}

// Delete User
function deleteUser(id) {
  if (confirm('Are you sure you want to delete this user?')) {
    users = users.filter(u => u.id !== id);
    renderTable();
  }
}

// View User Details
function viewDetails(id) {
  const user = users.find(u => u.id === id);
  if (user) {
    userModal.style.display = 'none';
    const reservas = ["Reserva Cancha 1", "Reserva Cancha 3"];
    const torneos = ["Torneo Primavera", "Torneo Verano"];
    const clases = ["Clase con Coach Mario", "Clase Avanzada"];

    detailsContent.innerHTML = `
      <div>
        <h3>User Info</h3>
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Role:</strong> ${user.role}</p>
        <p><strong>Status:</strong> ${user.status}</p>
      </div>
      <div>
        <h3>Reservations History</h3>
        <ul>
          ${reservas.map(r => `<li>${r}</li>`).join('')}
        </ul>
      </div>
      <div>
        <h3>Tournaments History</h3>
        <ul>
          ${torneos.map(t => `<li>${t}</li>`).join('')}
        </ul>
      </div>
      <div>
        <h3>Classes History</h3>
        <ul>
          ${clases.map(c => `<li>${c}</li>`).join('')}
        </ul>
      </div>
    `;
    detailsModal.style.display = 'flex';
  }
}

// Close Details Modal
btnCloseDetails.addEventListener('click', () => {
  detailsModal.style.display = 'none';
});

// Filters events
filterRole.addEventListener('change', renderTable);
filterStatus.addEventListener('change', renderTable);
filterName.addEventListener('input', renderTable);

// Initial render
renderTable();
