function getCart() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  }
  
  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById("cartCount");
    if (badge) badge.textContent = count;
  }