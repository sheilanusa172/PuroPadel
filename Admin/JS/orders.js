const orders = [
    {
      cliente: "Carlos Ramírez",
      articulos: "Raqueta, Pelotas",
      cantidad: 2,
      categoria: "Deportes",
      precioSinIVA: 100,
      precioConIVA: 113,
      estado: "pending"
    },
    {
      cliente: "Laura Gómez",
      articulos: "Camiseta",
      cantidad: 1,
      categoria: "Ropa",
      precioSinIVA: 25,
      precioConIVA: 28.25,
      estado: "completed"
    },
    {
      cliente: "Ana Morales",
      articulos: "Gorra",
      cantidad: 1,
      categoria: "Accesorios",
      precioSinIVA: 15,
      precioConIVA: 16.95,
      estado: "cancelled"
    }
  ];
  
  const tableBody = document.getElementById("ordersTableBody");
  const filter = document.getElementById("orderFilter");
  
  let selectedOrderIndex = null;
  
  function renderOrders(filterValue = "all") {
    tableBody.innerHTML = "";
    const filtered = filterValue === "all" ? orders : orders.filter(order => order.estado === filterValue);
  
    filtered.forEach((order, index) => {
      const row = document.createElement("tr");
  
      const sinpeInfo = order.sinpeCode
        ? `<div class="text-sm text-green-700 mt-1">
            Sinpe: <strong>${order.sinpeCode}</strong><br/>
            Pago: ${order.paymentDate}
          </div>`
        : order.estado === "completed"
        ? `<button onclick="openPaymentModal(${index})" class="text-blue-600 underline text-sm">Registrar Pago</button>`
        : "";
  
      row.innerHTML = `
        <td class="px-6 py-4">${order.cliente}</td>
        <td class="px-6 py-4">${order.articulos}</td>
        <td class="px-6 py-4">${order.cantidad}</td>
        <td class="px-6 py-4">${order.categoria}</td>
        <td class="px-6 py-4">₡${order.precioSinIVA.toFixed(2)}</td>
        <td class="px-6 py-4">₡${order.precioConIVA.toFixed(2)}</td>
        <td class="px-6 py-4">
          <div class="flex flex-col gap-2">
            <select onchange="changeOrderStatus(${index}, this.value)" class="border rounded px-2 py-1 text-sm w-full">
              <option value="pending" ${order.estado === "pending" ? "selected" : ""}>Pendiente</option>
              <option value="completed" ${order.estado === "completed" ? "selected" : ""}>Completada</option>
              <option value="cancelled" ${order.estado === "cancelled" ? "selected" : ""}>Cancelada</option>
            </select>
            <span class="inline-block px-3 py-1 rounded-full text-white text-xs text-center ${
              order.estado === "pending"
                ? "bg-yellow-500"
                : order.estado === "completed"
                ? "bg-green-600"
                : "bg-red-500"
            }">${capitalize(order.estado)}</span>
            ${sinpeInfo}
          </div>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  filter.addEventListener("change", () => {
    renderOrders(filter.value);
  });
  
  // Capitalizar estado
  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  
  // Modal de pago
  function openPaymentModal(index) {
    selectedOrderIndex = index;
    document.getElementById("sinpeCode").value = "";
    document.getElementById("paymentDate").value = "";
    document.getElementById("paymentModal").classList.remove("hidden");
  }
  
  document.getElementById("paymentForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const code = document.getElementById("sinpeCode").value.trim();
    const date = document.getElementById("paymentDate").value;
  
    if (!/^\d{6}$/.test(code)) {
      alert("El código Sinpe debe tener exactamente 6 dígitos.");
      return;
    }
  
    if (selectedOrderIndex !== null && date) {
      orders[selectedOrderIndex].sinpeCode = code;
      orders[selectedOrderIndex].paymentDate = date;
      document.getElementById("paymentModal").classList.add("hidden");
      renderOrders(filter.value);
    }
  });
  
  // Cambiar estado desde el select
  function changeOrderStatus(index, newStatus) {
    orders[index].estado = newStatus;
  
    // Si no está completada, eliminar datos de pago
    if (newStatus !== "completed") {
      delete orders[index].sinpeCode;
      delete orders[index].paymentDate;
    }
  
    renderOrders(filter.value);
  }
  
  renderOrders();  