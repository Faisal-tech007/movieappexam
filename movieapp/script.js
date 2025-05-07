document.addEventListener('DOMContentLoaded', () => {
    const movieForm = document.getElementById('movieForm');
    const movieList = document.getElementById('movieList');

    // Hardcoded list of movies
    const initialMovies = [
        { title: 'Inception', notes: 'A dream within a dream.', watched: false },
        { title: 'Interstellar', notes: 'Time travel and black holes.', watched: false },
        { title: 'The Matrix', notes: 'Reality is a simulation.', watched: false }
    ];

    // Load existing movies from localStorage or use the hardcoded list
    const movies = JSON.parse(localStorage.getItem('movies')) || initialMovies;

    // Function to render the movie list
    function renderMovies() {
        movieList.innerHTML = '';
        movies.forEach((movie, index) => {
            const li = document.createElement('li');
            const span = document.createElement('span');
            span.textContent = `${movie.title} - ${movie.notes ? movie.notes : ''}`;
            const button = document.createElement('button');
            button.textContent = movie.watched ? 'Unwatch' : 'Watch';
            button.addEventListener('click', () => {
                movie.watched = !movie.watched;
                button.style.backgroundColor = movie.watched ? '#28a745' : '#ffeb3b'; // Change color to yellow for Unwatch
                localStorage.setItem('movies', JSON.stringify(movies));
                renderMovies();
            });
            li.appendChild(span);
            li.appendChild(button);
            movieList.appendChild(li);
        });
    }

    // Render the initial list of movies
    renderMovies();

    // Handle form submission
    movieForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const notes = document.getElementById('notes').value;
        const newMovie = { title, notes, watched: false };
        movies.push(newMovie);
        localStorage.setItem('movies', JSON.stringify(movies));
        renderMovies();
        document.getElementById('title').value = '';
        document.getElementById('notes').value = '';
    });
});