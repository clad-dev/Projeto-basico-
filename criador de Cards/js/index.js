 const form = document.getElementById('add-card-form');
  const cardsContainer = document.getElementById('cards-container');

  const imageLinkInput = document.getElementById('image-link');
const imageFileInput = document.getElementById('image-file');
const radios = document.querySelectorAll('input[name="image-type"]');

radios.forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.value === 'link') {
      imageLinkInput.style.display = 'block';
      imageFileInput.style.display = 'none';
    } else {
      imageLinkInput.style.display = 'none';
      imageFileInput.style.display = 'block';
    }
  });
});

  form.addEventListener('submit', function(e) {
  e.preventDefault();

  const selectedType = document.querySelector('input[name="image-type"]:checked').value;
  const imageLink = imageLinkInput.value;
  const imageFile = imageFileInput.files[0];

  const name = document.getElementById('name').value;
  const charClass = document.getElementById('class').value;
  const power = document.getElementById('power').value;

  function createCard(imageSrc) {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <button class="delete-btn">✖</button>
      <img src="${imageSrc}" alt="${name}">
      <div class="info">
        <h3>Nome: ${name}</h3>
        <p>Classe: ${charClass}</p>
        <p>Poder: ${power}</p>
      </div>
    `;

    card.addEventListener('click', () => {
      card.classList.toggle('show');
    });

    card.querySelector('.delete-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      card.remove();
    });

    cardsContainer.appendChild(card);
  }

  if (selectedType === 'file') {
    if (!imageFile) {
      alert("Escolha uma imagem da galeria");
      return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
      createCard(event.target.result);
    };
    reader.readAsDataURL(imageFile);

  } else {
    if (!imageLink) {
      alert("Digite um link de imagem");
      return;
    }

    createCard(imageLink);
  }

  form.reset();

    // Botão de excluir
    card.querySelector('.delete-btn').addEventListener('click', (e) => {
      e.stopPropagation(); // impede o clique de abrir o card
      card.remove();
    });

    cardsContainer.appendChild(card);
    form.reset();
  });