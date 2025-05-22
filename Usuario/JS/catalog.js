const products = [
    {
      id: 1,
      name: "Muñequeras",
      price: 111111,
      image: "https://www.zonadepadel.es/9699-home_default/munequeras-bullpadel-bpmu214-oceano-profundo-negro.jpg"
    },
    {
      id: 2,
      name: "Gorras",
      price: 222222,
      image: "https://www.tuescuelapadel.com/wp-content/uploads/2022/03/gorras_padel.jpg"
    },
    {
      id: 3,
      name: "Protectores",
      price: 333333,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-jq5SZEq6NrCDa1G1DyAarf-mYhKG3FpCZA&s"
    }
  ];
  
  const catalog = document.getElementById("productCatalog");
  
  function renderCatalog() {
    products.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}" />
        <h3>${p.name}</h3>
        <p>₡${p.price.toLocaleString()}</p>
        <button onclick="addToCart(${p.id})">Agregar al carrito</button>
      `;
      catalog.appendChild(card);
    });
  }
  
  function addToCart(id) {
    const cart = getCart();
    const item = cart.find(i => i.id === id);
    if (item) {
      item.quantity++;
    } else {
      const product = products.find(p => p.id === id);
      cart.push({ ...product, quantity: 1 });
    }
    saveCart(cart);
    updateCartCount();
  }
  
  renderCatalog();
  updateCartCount();