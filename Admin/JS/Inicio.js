const sidebar = document.getElementById('sidebar');
const content = document.getElementById('main-content');

// Sidebar (CORREGIDO: desplaza correctamente)
document.getElementById('menu-toggle').addEventListener('click', () => {
  if (sidebar.style.left === '-250px') {
    sidebar.style.left = '0';
    if (content) content.style.marginLeft = '250px';
  } else {
    sidebar.style.left = '-250px';
    if (content) content.style.marginLeft = '0';
  }
});

// Notificaciones y perfil
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

// Cerrar menús al hacer clic fuera
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
const newsForm = document.getElementById('news-form');
const formContainer = document.getElementById('form-container');
const showFormButton = document.getElementById('show-form-button');
const filterInput = document.getElementById('filter-input');
let noNewsMessage = null;

showFormButton.addEventListener('click', () => {
  formContainer.style.display = 'block';
});

newsForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('news-title').value.trim();
  const description = document.getElementById('news-description').value.trim();
  const imageInput = document.getElementById('news-image');
  const tag = document.getElementById('news-tag').value.trim();
  const date = new Date().toLocaleString();

  if (!title) {
    alert('El título de la noticia es obligatorio.');
    return;
  }

  const newsItem = document.createElement('div');
  newsItem.classList.add('news-item');

  newsItem.innerHTML = `
    <h3 class="news-title">${title}</h3>
    <p class="date">Publicado el: ${date}</p>
    ${description ? `<p class="news-description">${description}</p>` : ''}
    ${tag ? `<p class="news-tag" data-tag="${tag.toLowerCase()}"><strong>Etiquetado:</strong> ${tag}</p>` : ''}
  `;

  if (imageInput.files.length > 0) {
    const image = document.createElement('img');
    image.src = URL.createObjectURL(imageInput.files[0]);
    image.classList.add('news-image');
    newsItem.appendChild(image);
  }

  // Like ❤️
  const likeContainer = document.createElement('div');
  likeContainer.classList.add('like-container');
  const likeButton = document.createElement('button');
  likeButton.classList.add('like-button');
  likeButton.innerHTML = '♡';
  const likeCount = document.createElement('span');
  likeCount.classList.add('like-count');
  likeCount.textContent = '0';

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

  // Botones eliminar y editar
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  deleteButton.innerText = '❌';
  deleteButton.addEventListener('click', () => {
    newsItem.remove();
    checkNoNews();
  });

  const editButton = document.createElement('button');
  editButton.classList.add('edit-button');
  editButton.innerText = '✏️';
  editButton.addEventListener('click', () => editNews(newsItem));

  newsItem.appendChild(deleteButton);
  newsItem.appendChild(editButton);

  newsList.prepend(newsItem);

  newsForm.reset();
  formContainer.style.display = 'none';
  checkNoNews();
});

// Filtro por título
filterInput.addEventListener('input', () => {
  const search = filterInput.value.toLowerCase();
  const newsItems = document.querySelectorAll('.news-item');
  let found = false;

  newsItems.forEach(item => {
    const title = item.querySelector('.news-title').innerText.toLowerCase();
    item.style.display = title.includes(search) ? 'block' : 'none';
    if (title.includes(search)) found = true;
  });

  if (!found) {
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
});

// Editar noticia completa
function editNews(newsItem) {
  const titleElement = newsItem.querySelector('.news-title');
  const descriptionElement = newsItem.querySelector('.news-description');
  const tagElement = newsItem.querySelector('.news-tag');
  const imageElement = newsItem.querySelector('img');
  const likeContainer = newsItem.querySelector('.like-container');

  const form = document.createElement('form');
  form.style.display = 'flex';
  form.style.flexDirection = 'column';
  form.style.gap = '10px';

  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.value = titleElement.innerText;

  const descInput = document.createElement('textarea');
  descInput.value = descriptionElement ? descriptionElement.innerText : '';
  descInput.rows = 3;

  const tagInput = document.createElement('input');
  tagInput.type = 'text';
  tagInput.value = tagElement ? tagElement.innerText.replace('Etiquetado: ', '') : '';

  const imageInput = document.createElement('input');
  imageInput.type = 'file';
  imageInput.accept = 'image/*';

  const saveButton = document.createElement('button');
  saveButton.innerText = 'Guardar Cambios';
  saveButton.type = 'submit';
  saveButton.style.backgroundColor = '#26468B';
  saveButton.style.color = 'white';
  saveButton.style.padding = '8px';
  saveButton.style.border = 'none';
  saveButton.style.borderRadius = '5px';
  saveButton.style.cursor = 'pointer';

  form.append(titleInput, descInput, tagInput, imageInput, saveButton);

  newsItem.innerHTML = '';
  newsItem.appendChild(form);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    newsItem.innerHTML = `
      <h3 class="news-title">${titleInput.value}</h3>
      <p class="date">${new Date().toLocaleString()}</p>
      ${descInput.value ? `<p class="news-description">${descInput.value}</p>` : ''}
      ${tagInput.value ? `<p class="news-tag" data-tag="${tagInput.value.toLowerCase()}"><strong>Etiquetado:</strong> ${tagInput.value}</p>` : ''}
    `;

    if (imageInput.files.length > 0) {
      const newImg = document.createElement('img');
      newImg.src = URL.createObjectURL(imageInput.files[0]);
      newImg.classList.add('news-image');
      newsItem.appendChild(newImg);
    } else if (imageElement) {
      newsItem.appendChild(imageElement);
    }

    newsItem.appendChild(likeContainer);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-button');
    deleteBtn.innerText = '❌';
    deleteBtn.addEventListener('click', () => {
      newsItem.remove();
      checkNoNews();
    });

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-button');
    editBtn.innerText = '✏️';
    editBtn.addEventListener('click', () => editNews(newsItem));

    newsItem.append(deleteBtn, editBtn);
    checkNoNews();
  });
}

// Checar si hay noticias
function checkNoNews() {
  const items = document.querySelectorAll('.news-item');
  if (items.length === 0 && !noNewsMessage) {
    noNewsMessage = document.createElement('div');
    noNewsMessage.classList.add('no-news-message');
    noNewsMessage.innerText = 'No se encontraron noticias.';
    newsList.appendChild(noNewsMessage);
  } else if (items.length > 0 && noNewsMessage) {
    noNewsMessage.remove();
    noNewsMessage = null;
  }
}
