// Datos simulados para demostración (sin conexión al backend aún)
const teachers = [
  {
    teacherName: "Juan Pérez",
    individualClasses: 12,
    groupClasses: 5,
    revenueIndividual: 480,
    revenueGroup: 350,
    totalRevenue: 830
  },
  {
    teacherName: "Laura González",
    individualClasses: 8,
    groupClasses: 10,
    revenueIndividual: 320,
    revenueGroup: 800,
    totalRevenue: 1120
  },
  {
    teacherName: "Carlos Rodríguez",
    individualClasses: 4,
    groupClasses: 3,
    revenueIndividual: 160,
    revenueGroup: 240,
    totalRevenue: 400
  },
  {
    teacherName: "María Fernández",
    individualClasses: 20,
    groupClasses: 0,
    revenueIndividual: 800,
    revenueGroup: 0,
    totalRevenue: 800
  }
];

function renderPerformance(data) {
  const tbody = document.getElementById('teachersPerformance');
  tbody.innerHTML = "";

  data.forEach(t => {
    const totalStyle = t.totalRevenue < 500 ? "text-red-600 font-bold" : "text-green-700 font-bold";
    const row = `
      <tr class="hover:bg-gray-50">
        <td class="py-2 px-4 font-medium">${t.teacherName}</td>
        <td class="py-2 px-4">${t.individualClasses}</td>
        <td class="py-2 px-4">${t.groupClasses}</td>
        <td class="py-2 px-4">$${t.revenueIndividual.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
        <td class="py-2 px-4">$${t.revenueGroup.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
        <td class="py-2 px-4 ${totalStyle}">$${t.totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

// Simular filtrado con datos actuales (sin backend aún)
document.getElementById("btnFilter").addEventListener("click", () => {
  const start = document.getElementById("startDate").value;
  const end = document.getElementById("endDate").value;
  console.log(`Filtro simulado: desde ${start} hasta ${end}`);
  renderPerformance(teachers); // datos fijos por ahora
});

// Render inicial
renderPerformance(teachers);
