const sidebar = document.getElementById('sidebar');
const content = document.getElementById('main-content');

// Sidebar y menú
document.getElementById('menu-toggle').addEventListener('click', () => {
  const body = document.body;
  const isOpen = body.classList.contains("sidebar-open");
  body.classList.toggle("sidebar-open");
  sidebar.style.left = isOpen ? '-250px' : '0';
});

document.getElementById('notification-btn').addEventListener('click', () => {
  toggleDropdown('notification-menu', 'profile-menu');
});

document.getElementById('profile-btn').addEventListener('click', () => {
  toggleDropdown('profile-menu', 'notification-menu');
});

function toggleDropdown(showId, hideId) {
  const show = document.getElementById(showId);
  const hide = document.getElementById(hideId);
  show.style.display = show.style.display === 'block' ? 'none' : 'block';
  hide.style.display = 'none';
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.header') && !e.target.closest('.dropdown')) {
    document.getElementById('notification-menu').style.display = 'none';
    document.getElementById('profile-menu').style.display = 'none';
  }
  if (!sidebar.contains(e.target) && !e.target.closest('#menu-toggle')) {
    sidebar.style.left = '-250px';
    if (content) content.style.marginLeft = '0';
  }
});

// Noticias
const newsList = document.getElementById('news-list');
const filterInput = document.getElementById('filter-input');
let noNewsMessage = null;

function renderNoticias(noticias) {
  newsList.innerHTML = '';
  noticias.forEach(data => {
    const newsItem = document.createElement('div');
    newsItem.classList.add('news-item');

    newsItem.innerHTML = `
      <h3 class="news-title">${data.title}</h3>
      <p class="date">Publicado el: ${data.date}</p>
      ${data.description ? `<p class="news-description">${data.description}</p>` : ''}
      ${data.tag ? `<p class="news-tag"><strong>Etiquetado:</strong> ${data.tag}</p>` : ''}
    `;

    const img = document.createElement('img');
    img.src = '/imagenes/SAI.png';
    img.classList.add('news-image');
    newsItem.appendChild(img);

    const likeContainer = document.createElement('div');
    likeContainer.classList.add('like-container');

    const likeButton = document.createElement('button');
    likeButton.classList.add('like-button');
    likeButton.innerHTML = '♡';

    const likeCount = document.createElement('span');
    likeCount.classList.add('like-count');
    likeCount.textContent = data.likes || '0';

    likeButton.addEventListener('click', () => {
      if (likeButton.classList.contains('liked')) {
        likeButton.classList.remove('liked');
        likeButton.innerHTML = '♡';
        likeCount.textContent = parseInt(likeCount.textContent) - 1;
      } else {
        likeButton.classList.add('liked');
        likeButton.innerHTML = '❤️';
        likeCount.textContent = parseInt(likeCount.textContent) + 1;
      }
    });

    likeContainer.appendChild(likeButton);
    likeContainer.appendChild(likeCount);
    newsItem.appendChild(likeContainer);

    newsList.appendChild(newsItem);
  });

  checkNoNews();
}

filterInput.addEventListener('input', () => {
  const search = filterInput.value.toLowerCase();
  const noticias = JSON.parse(localStorage.getItem('noticias')) || [];
  const filtradas = noticias.filter(n => n.title.toLowerCase().includes(search));
  renderNoticias(filtradas);
});

window.addEventListener('load', () => {
  let noticias = JSON.parse(localStorage.getItem('noticias'));

  if (!noticias || noticias.length === 0) {
    noticias = [
      {
        title: "¡Gran Torneo de Primavera!",
        date: "2025-04-05",
        description: "Este fin de semana celebramos nuestro Torneo Primavera con más de 30 jugadores inscritos.",
        tag: "Torneo",
        likes: 12
      },
      {
        title: "Nueva Cancha Techada",
        date: "2025-03-28",
        description: "Ya está habilitada nuestra nueva cancha techada con iluminación LED.",
        tag: "Instalaciones",
        likes: 8
      },
      {
        title: "Clases Personalizadas",
        date: "2025-03-20",
        description: "Nuestros entrenadores certificados ya están disponibles para sesiones uno a uno.",
        tag: "Clases",
        likes: 5
      }
    ];
    localStorage.setItem('noticias', JSON.stringify(noticias));
  }

  renderNoticias(noticias);
});

function checkNoNews() {
  if (!newsList.hasChildNodes()) {
    if (!noNewsMessage) {
      noNewsMessage = document.createElement('div');
      noNewsMessage.classList.add('no-news-message');
      noNewsMessage.innerText = 'No se encontraron noticias.';
      newsList.appendChild(noNewsMessage);
    }
  } else {
    if (noNewsMessage) {
      noNewsMessage.remove();
      noNewsMessage = null;
    }
  }
}
