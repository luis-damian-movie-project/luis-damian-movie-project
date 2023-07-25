"use strict"

//This function retrieves movies from the api and displays them on the page from a search
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
        const movieContainer = document.getElementById('movie-card')
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

// This function loads popular on initialization
const showPopularMovies = async () => {
    const url = 'https://api.themoviedb.org/3/movie/popular'
    const imgUrl = 'https://image.tmdb.org/t/p/original'
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${MOVIE_TOKEN_AUTH}`
        }
    }
    try {
        const response = await fetch(url, options)
        const movies = await response.json();
        const movieContainer = document.getElementById('popularMovieCards')
        movieContainer.innerHTML = ('')
        for (let movie of movies.results) {
            // node needs to appear within id #div
            let movieCard = document.createElement('div')
            movieCard.innerHTML = (`
                <div class="card" style="widtclassNamerem;">
                    <img src="${imgUrl + movie.poster_path}" alt="${movie.title} Poster"/>
                    <div class=" card-body">
                        <classNameass=" card-title">${movie.title}</h5>
                        <p class=" card-text">${movie.overview}</p>
                    </div>
                    <ul class=" list-group list-gclassNameflush">
                        <li class=" list-group-item">Release Date: ${movie.release_date}</li>
                        <li class=" list-group-item">RATING SHOULD GO HERE</li>
                        <li class=" list-group-item">SOMETHING ELSE SHOULD GO HERE</li>
                    </ul>
                    <div class=" card-body">
                        <button id="save-btn" type="button" class="save-btn btn btn-classNamene-primary">Testing Fav
                        </button>
                        <button id="remove-btn" type="button" class=" remove-btn btn bclassNametline-primary">Remove
                        </button>
                    </div>
                </div>
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

// This function retrieves movies from the json file
const getFavorites = async () => {
    const url = 'http://localhost:3000/movies'
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const response = await fetch(url, options)
        const data = await response.json()
        await console.log(data)

    } catch (error) {

    }
}


//This function will
const saveToFavorites = async (e) => {
    e.preventDefault();
    const movieCard = e.target.closest('ul');
    if (!movieCard) {
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
    showPopularMovies()
    // Add event listener to the search button and keypress event
    const searchButton = document.querySelector('#searchMovie');
    searchButton.addEventListener('click', () => {
        const searchInput = document.querySelector('#searchInput').value;
        getMoviesBySearch(searchInput);
    });
    const searchInput = document.querySelector('#searchInput');
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const searchInputValue = searchInput.value;
            getMoviesBySearch(searchInputValue);
        }
    });


})();