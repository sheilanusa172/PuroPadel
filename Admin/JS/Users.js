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
    userModal.classList.remove('hidden');
  });
  
  // Cancel Add/Edit User
  document.getElementById('btnCancel').addEventListener('click', () => {
    userModal.classList.add('hidden');
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
    userModal.classList.add('hidden');
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
      row.className = 'border-b hover:bg-gray-50';
      row.innerHTML = `
        <td class="p-4 text-blue-600 hover:underline cursor-pointer" onclick="viewDetails(${user.id})">${user.name}</td>
        <td class="p-4">${user.email}</td>
        <td class="p-4">${user.role}</td>
        <td class="p-4">
          <span class="${user.status === 'Active' ? 'text-green-600' : 'text-red-600'} font-semibold">${user.status}</span>
        </td>
        <td class="p-4 flex justify-center gap-2">
          <button class="text-blue-600 hover:underline" onclick="editUser(${user.id})">Edit</button>
          <button class="${user.status === 'Active' ? 'text-yellow-600' : 'text-green-600'} hover:underline" onclick="toggleStatus(${user.id})">
            ${user.status === 'Active' ? 'Deactivate' : 'Activate'}
          </button>
          <button class="text-red-600 hover:underline" onclick="deleteUser(${user.id})">Delete</button>
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
      userModal.classList.remove('hidden');
    }
  }
  
  // Activate/Deactivate User
  function toggleStatus(id) {
    users = users.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u);
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
      const reservas = ["Reserva Cancha 1", "Reserva Cancha 3"];
      const torneos = ["Torneo Primavera", "Torneo Verano"];
      const clases = ["Clase con Coach Mario", "Clase Avanzada"];
  
      detailsContent.innerHTML = `
        <div>
          <h3 class="text-xl font-semibold mb-2">User Info</h3>
          <p><strong>Name:</strong> ${user.name}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Role:</strong> ${user.role}</p>
          <p><strong>Status:</strong> ${user.status}</p>
        </div>
        <div>
          <h3 class="text-xl font-semibold mt-4 mb-2">Reservations History</h3>
          <ul class="list-disc list-inside">
            ${reservas.map(r => `<li>${r}</li>`).join('')}
          </ul>
        </div>
        <div>
          <h3 class="text-xl font-semibold mt-4 mb-2">Tournaments History</h3>
          <ul class="list-disc list-inside">
            ${torneos.map(t => `<li>${t}</li>`).join('')}
          </ul>
        </div>
        <div>
          <h3 class="text-xl font-semibold mt-4 mb-2">Classes History</h3>
          <ul class="list-disc list-inside">
            ${clases.map(c => `<li>${c}</li>`).join('')}
          </ul>
        </div>
      `;
      detailsModal.classList.remove('hidden');
    }
  }
  
  // Close Details Modal
  btnCloseDetails.addEventListener('click', () => {
    detailsModal.classList.add('hidden');
  });
  
  // Filters events
  filterRole.addEventListener('change', renderTable);
  filterStatus.addEventListener('change', renderTable);
  filterName.addEventListener('input', renderTable);
  
  // Initial render
  renderTable();
  