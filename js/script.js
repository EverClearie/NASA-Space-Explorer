const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');
setupDateInputs(startInput, endInput);

const API_KEY = 'Ub3gj6lENSgT8HZZG2D9r24VRwPQujvrWQdzPLik';
const button = document.querySelector('button');
const gallery = document.getElementById('gallery');

// Add a random "Did You Know?" fact on load
const facts = [
  "Did you know? A day on Venus is longer than a year on Venus.",
  "Did you know? Neutron stars can spin 600 times per second.",
  "Did you know? One spoonful of a neutron star weighs about 6 billion tons.",
  "Did you know? The Sun accounts for 99.86% of the mass in our solar system.",
  "Did you know? Space is completely silent—no air, no sound.",
  "Did you know? Saturn’s rings are made of billions of pieces of ice and rock."
];
const fact = facts[Math.floor(Math.random() * facts.length)];
const factBox = document.createElement('div');
factBox.className = 'fact-box';
factBox.textContent = fact;
document.querySelector('.container').insertBefore(factBox, gallery);

button.addEventListener('click', async () => {
  const startDate = startInput.value;
  const endDate = endInput.value;

  if (!startDate || !endDate) {
    alert("Please select both a start and end date.");
    return;
  }

  gallery.innerHTML = `<p class="placeholder">Loading space awesomeness...</p>`;

  const apiURL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`;

  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    gallery.innerHTML = ''; // Clear loading

    data.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('gallery-item');

      // Hover zoom effect (CSS will handle)
      let content = '';

      if (item.media_type === 'image') {
        content = `
          <img src="${item.url}" alt="${item.title}" class="zoomable" />
          <p><strong>${item.title}</strong> (${item.date})</p>
        `;

        card.addEventListener('click', () => {
          openModal(item);
        });

      } else if (item.media_type === 'video') {
        content = `
          <p><strong>${item.title}</strong> (${item.date})</p>
          <a href="${item.url}" target="_blank">📺 Watch Video</a>
        `;
      }

      card.innerHTML = content;
      gallery.appendChild(card);
    });

  } catch (error) {
    gallery.innerHTML = `<p class="placeholder">Something went wrong: ${error.message}</p>`;
  }
});

function openModal(item) {
  const modal = document.createElement('div');
  modal.className = 'modal';

  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <img src="${item.hdurl || item.url}" alt="${item.title}" />
      <h2>${item.title}</h2>
      <p><em>${item.date}</em></p>
      <p>${item.explanation}</p>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector('.close').onclick = () => modal.remove();
  modal.onclick = e => {
    if (e.target === modal) modal.remove();
  };
}
