// Find our date picker inputs on the page
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');

// Call the setupDateInputs function from dateRange.js
// This sets up the date pickers to:
// - Default to a range of 9 days (from 9 days ago to today)
// - Restrict dates to NASA's image archive (starting from 1995)
setupDateInputs(startInput, endInput);
// NASA API key
const API_KEY = 'Ub3gj6lENSgT8HZZG2D9r24VRwPQujvrWQdzPLik'; // 

const button = document.querySelector('button');
const gallery = document.querySelector('.gallery');

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

    gallery.innerHTML = ''; // Clear previous content

    data.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('gallery-item');

      if (item.media_type === 'image') {
        card.innerHTML = `
          <img src="${item.url}" alt="${item.title}">
          <p><strong>${item.title}</strong> (${item.date})</p>
          <p>${item.explanation}</p>
        `;
      } else if (item.media_type === 'video') {
        card.innerHTML = `
          <p><strong>${item.title}</strong> (${item.date})</p>
          <a href="${item.url}" target="_blank">Watch Video</a>
        `;
      }

      gallery.appendChild(card);
    });
  } catch (error) {
    gallery.innerHTML = `<p class="placeholder">Something went wrong: ${error.message}</p>`;
  }
});
