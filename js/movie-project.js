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
            movieContainer.append(movieCard)
            let removeButton = movieCard.querySelector('.remove-btn')
            removeButton.addEventListener('click', () => {
                movieCard.remove();
            })
            const saveButton = movieCard.querySelector('#save-btn')
            saveButton.addEventListener('click', async(e) => {
                e.preventDefault();
                console.log(movieCard)
                const response = await addToFavorites()
                // console.log(response)
                return response
                // const favMoviesDiv =
                // document.querySelector('#favorite-movies');
                // await renderFavoriteMovies(await getFavovoriteMovies());
            })

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

const addToFavorites = async (resultPara) => {
    const url = 'http://localhost:3000/movies'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(savedMovieCard)
    };
    const response = await fetch(url, options);
    const data = response.json()
    return data
}


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