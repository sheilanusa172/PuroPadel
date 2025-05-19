const products = [
    {
      id: 1,
      name: "Veloziraptor",
      price: 111111,
      image: "https://cdn.pixabay.com/photo/2020/11/04/08/46/padel-5712700_960_720.jpg"
    },
    {
      id: 2,
      name: "Biciclón",
      price: 222222,
      image: "https://cdn.pixabay.com/photo/2016/12/13/23/14/padel-1905408_960_720.jpg"
    },
    {
      id: 3,
      name: "CicloTravesura",
      price: 333333,
      image: "https://cdn.pixabay.com/photo/2020/10/28/15/43/padel-5693264_960_720.jpg"
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