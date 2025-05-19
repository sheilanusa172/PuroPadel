const cartBody = document.getElementById("cartBody");
const subtotalEl = document.getElementById("subtotal");
const ivaEl = document.getElementById("iva");
const totalEl = document.getElementById("total");

function renderCart() {
  const cart = getCart();
  cartBody.innerHTML = "";
  let subtotal = 0;

  cart.forEach((item, index) => {
    const row = document.createElement("tr");
    const itemSubtotal = item.price * item.quantity;
    subtotal += itemSubtotal;

    row.innerHTML = `
      <td>${item.name}</td>
      <td><input type="number" min="1" value="${item.quantity}" onchange="changeQty(${index}, this.value)" /></td>
      <td>₡${item.price.toLocaleString()}</td>
      <td>₡${itemSubtotal.toLocaleString()}</td>
      <td><button onclick="removeItem(${index})" class="text-red-600">Eliminar</button></td>
    `;
    cartBody.appendChild(row);
  });

  const iva = subtotal * 0.13;
  const total = subtotal + iva;
  subtotalEl.textContent = subtotal.toFixed(2);
  ivaEl.textContent = iva.toFixed(2);
  totalEl.textContent = total.toFixed(2);
}

function changeQty(index, qty) {
  const cart = getCart();
  cart[index].quantity = parseInt(qty);
  if (cart[index].quantity <= 0) cart.splice(index, 1);
  saveCart(cart);
  renderCart();
  updateCartCount();
}

function removeItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
  updateCartCount();
}

document.getElementById("checkoutBtn").addEventListener("click", () => {
  localStorage.removeItem("cart");
  alert("¡Compra realizada con éxito!");
  renderCart();
  updateCartCount();
});

renderCart();
updateCartCount();