"use strict"
const getMoviesBySearch = async (queryParam) => {
    try {

        const baseUrl = 'https://api.themoviedb.org/3/search/movie';
        const queryString = `?query=${encodeURIComponent(queryParam)}&api_key=${MOVIE_DB_API}`;
        const url = baseUrl + queryString;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${MOVIE_TOKEN_AUTH}`
            }
        }
        const response = await fetch(url, options)
        const movies =  await response.json();
        const movieContainer =  document.getElementById('movie-card')
        for (let movie of movies.results) {
            // node needs to appear within id #div
            let movieCard = document.createElement('div')
            movieCard.innerHTML = (`
                <ul>
                <li>Title: ${movie.title}</li>
                <li>Release Date: ${movie.release_date}</li>
                <li>Poster Path: ${movie.poster_path}</li>
                <li>Overview: ${movie.overview}</li>
                </ul>
            `);
            movieContainer.append(movieCard)
            console.log(movie)
        // return movie
        }
    } catch (error) {
        console.error(error)
    }

}


(() => {

    // Select the search button element
    const searchButton = document.querySelector('#searchMovie');

    // Add event listener to the search button
    searchButton.addEventListener('click', () => {
        const searchInput = document.querySelector('#searchInput').value;
        getMoviesBySearch(searchInput);
    });
    // typed event
    const searchInput = document.querySelector('#searchInput');
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const searchInputValue = searchInput.value;
            getMoviesBySearch(searchInputValue);
        }
    });





})();