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
        const movies = await response.json();
        const movieContainer =  document.getElementById('movie-card')
        movieContainer.innerHTML = ('')
        for (let movie of movies.results) {
            // node needs to appear within id #div
            let movieCard = document.createElement('div')
            movieCard.innerHTML = (`
                <ul>
                <li>Title: ${movie.title}</li>
                <li>Release Date: ${movie.release_date}</li>
                <li>Poster Path: ${movie.poster_path}</li>
                <li>Overview: ${movie.overview}</li>
                <button id="save-btn" type="button" class="save-btn btn btn-outline-primary">Testing Fav</button>
                 <button id="remove-btn" type="button" class=" remove-btn btn btn-outline-primary">Remove</button>
                </ul>
            `);
            let removeButton = movieCard.querySelector('.remove-btn')
            removeButton.addEventListener('click', () => {
                movieCard.remove();
            })
            const saveButton = movieCard.querySelector('#save-btn')
            saveButton.addEventListener('click', saveToFavorites)
            movieContainer.append(movieCard)

         // return movies
        }
    } catch (error) {
        console.error(error)
    }

}



//     const saveToFavorites = async (e) => {
//         e.preventDefault()
//         let selectedMovie = document.getElementsByTagName('ul')
//         let savedMovieCard = {
//         Title: 'movie.title',
//         ReleaseDate: 'movie.release_date',
//         Overview: 'movie.overview',
//         PosterPath: 'movie.poster_path',
//         }
//         let movieJSON = JSON.stringify(savedMovieCard)
//         const options = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: movieJSON
//         }
//         const response = await fetch('http://localhost:3000/movies', options)
//
// }

const saveToFavorites = async (e) => {
    e.preventDefault();
    // Assuming each movie card has a button with class 'save-button'
    const movieCard = e.target.closest('ul');
    if (!movieCard) {
        // Handle the case where the user clicks somewhere other than a movie card
        return;
    }

    // Extract movie data from the movie card
    const title = movieCard.querySelector('li[data-property="Title"]').innerText;
    const releaseDate = movieCard.querySelector('li[data-property="ReleaseDate"]').innerText;
    const overview = movieCard.querySelector('li[data-property="Overview"]').innerText;
    const posterPath = movieCard.querySelector('li[data-property="PosterPath"]').innerText;

    // Create the savedMovieCard object
    const savedMovieCard = {
        Title: title,
        ReleaseDate: releaseDate,
        Overview: overview,
        PosterPath: posterPath,
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(savedMovieCard),
    };

    try {
        const response = await fetch('http://localhost:3000/movies', options);
        if (response.ok) {
            // Successfully saved the movie to favorites
            console.log('Movie saved to favorites!');
        } else {
            console.error('Failed to save movie to favorites:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error saving movie to favorites:', error);
    }
};






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