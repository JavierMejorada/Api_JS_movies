const searchForm = document.getElementById('searchForm');
const resultsSection = document.getElementById('results');

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = document.getElementById('query').value;

  try {
    const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
    const shows = response.data;

    resultsSection.innerHTML = '';

    if (shows.length > 0) {
      shows.forEach(({ show }) => {
        const showElement = document.createElement('div');
        showElement.innerHTML = `
          <h3>${show.name}</h3>
          <img src="${show.image?.medium || 'https://via.placeholder.com/210'}" alt="${show.name}">
          <p>${show.summary || 'Sin descripción disponible'}</p>
        `;
        resultsSection.appendChild(showElement);
      });
    } else {
      resultsSection.innerHTML = '<p>No se encontraron resultados</p>';
    }
  } catch (error) {
    console.error(error);
    resultsSection.innerHTML = '<p>Ocurrió un error al buscar las series</p>';
  }
});
