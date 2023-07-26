"use strict"
const genreListEndpoint = `https://api.themoviedb.org/3/genre/movie/list?api_key=${MOVIE_DB_API}`;

// Function to fetch the genre list
async function fetchGenreList() {
    try {
        const response = await fetch(genreListEndpoint);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        return data.genres;
    } catch (error) {
        console.error('Error fetching genre list:', error);
        return [];
    }
}
// Example usage
fetchGenreList()
    .then((genres) => {
        console.log(genres);
        // Do something with the genre list here
    })
    .catch((error) => {
        console.error('Error:', error);
    });
//This function retrieves movies from the api and displays them on the page from a search
const getMoviesBySearch = async (queryParam, genreId = null) => {
    const url = 'https://api.themoviedb.org/3/movie/popular';
    const imgUrl = 'https://image.tmdb.org/t/p/original'
    try {
        let baseUrl = 'https://api.themoviedb.org/3/search/movie';
        let queryString = `?query=${encodeURIComponent(queryParam)}&api_key=${MOVIE_DB_API}`;
        if (genreId !== null) {
            baseUrl = `https://api.themoviedb.org/3/discover/movie`;
            queryString = `?with_genres=${genreId}&api_key=${MOVIE_DB_API}`;
        }
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
        const movieContainer = document.getElementById('popularMovieCards')
        movieContainer.innerHTML = ('')
        for (let movie of movies.results) {
           console.log(movie)
            // node needs to appear within id #div
            let movieCard = document.createElement('div')
            movieCard.innerHTML = `
            <div class="card" style="width: 18rem;">
            <img id="moviePoster" class="grabImg" src="${imgUrl + movie.poster_path}" alt="${movie.title} Poster" class="card-img-top "/>
           <div class="card-body">
            <h5 class="card-title text-center grabTitle">${movie.title}</h5>
            <p class="card-text overview grabSum fs-7">${movie.overview}</p>
            <p class="grabRelease">${movie.release_date}</p>
            <div class="card-body">
            <button id="save-btn" type="button" class="save-btn btn btn-info">Favorites +</button>
            <button id="remove-btn" type="button" class="remove-btn btn btn-danger">Remove</button>
            </div>
            </div>
            </div>
            `;
            movieContainer.append(movieCard)
            let removeButton = movieCard.querySelector('.remove-btn')
            removeButton.addEventListener('click', () => {
                movieCard.remove();
            })
            const saveButton = movieCard.querySelector('#save-btn')
            saveButton.addEventListener('click', async(e) => {
                e.preventDefault();

                const movieTitle = movieCard.querySelector('.grabTitle').innerText;
                const movieRelease = movieCard.querySelector('.grabRelease').innerText;
                // const movieImg = movieCard.querySelector('.grabImg').innerText;
                const movieSum = movieCard.querySelector('.grabSum').innerText;
                const imageElement = document.getElementById('moviePoster')
                const imageUrl = imageElement.src
                const newMovie = {
                    title: movieTitle,
                    release: movieRelease,
                    img: imageUrl,
                    sum: movieSum,
                }

                const response = await addToFavorites(newMovie)
                return response
            })
        }
    } catch (error) {
        console.error('Error:', error);
    }

}


const showPopularMovies = async (genreId = null) => {
    const url = 'https://api.themoviedb.org/3/movie/popular';
    const imgUrl = 'https://image.tmdb.org/t/p/original'
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${MOVIE_TOKEN_AUTH}`,
        },
    };
    try {
        let fullUrl = url;
        if (genreId !== null) {
            fullUrl = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&api_key=${MOVIE_DB_API}`;
        }
        const response = await fetch(fullUrl, options);
        const movies = await response.json();
        const movieContainer = document.getElementById('popularMovieCards');
        movieContainer.innerHTML = '';

        for (let movie of movies.results) {
            let movieCard = document.createElement('div');
            movieCard.classList.add('movie-card')
            movieCard.innerHTML = (`
            <div class="card" style="width: 18rem;">
            <img id="moviePoster" class="grabImg" src="${imgUrl}${movie.poster_path}" alt="${movie.title} Poster" class="card-img-top "/>
            <div class="card-body">
            <h5 class="card-title text-center grabTitle">${movie.title}</h5>
            <p class="card-text overview grabSum fs-7">${movie.overview}</p>
            <p class="grabRelease">${movie.release_date}</p>
            <div class="card-body">
            <button id="save-btn" type="button" class="save-btn btn btn-info">Favorites +</button>
            <button id="remove-btn" type="button" class="remove-btn btn btn-danger">Remove</button>
            </div>
            </div>
            </div>
      `);
            movieContainer.append(movieCard);

            // Rest of the code remains the same
            let removeButton = movieCard.querySelector('.remove-btn');
            removeButton.addEventListener('click', () => {
                movieCard.remove();
            });

            const saveButton = movieCard.querySelector('#save-btn')
            saveButton.addEventListener('click', async(e) => {
                e.preventDefault();
                console.log(movieCard)
                const movieTitle = movieCard.querySelector('.grabTitle').innerText;
                const movieRelease = movieCard.querySelector('.grabRelease').innerText;
                // const movieImg = movieCard.querySelector('.grabImg').innerText;
                const movieSum = movieCard.querySelector('.grabSum').innerText;
                const imageElement = document.getElementById('moviePoster')
                const imageUrl = imageElement.src
                const newMovie = {
                    title: movieTitle,
                    release: movieRelease,
                    img: imageUrl,
                    sum: movieSum,
                }

                const response = await addToFavorites(newMovie)
                return response
            })
        }
    } catch (error) {

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
        const movieContainer = document.getElementById('popularMovieCards');
        movieContainer.innerHTML = '';
        for (let movie of data) {
            console.log(movie)
            /* fetch for image urls goes here */
            let movieCard = document.createElement('div');
            movieCard.classList.add('movie-card')
            movieCard.innerHTML = (`
            <div class="card" style="width: 18rem;">
            <img class="grabImg" src="" alt="${movie.title} Poster" class="card-img-top "/>
            <div class="card-body">
            <h5 class="card-title text-center grabTitle">${movie.title}</h5>
            <p class="card-text overview grabSum fs-7">${movie.sum}</p>
            <p class="grabRelease">${movie.release}</p>
            <div class="card-body">
            <button id="remove-btn" type="button" class="remove-btn btn btn-danger">Remove</button>
            </div>
            </div>
            </div>
      `);
            movieContainer.append(movieCard);
            const id = movie.id
            const removeButton = movieCard.querySelector('.remove-btn')
            removeButton.addEventListener('click', () => {
                movieCard.remove()
                removeFromFavorites(id);
            })
        }


    } catch (error) {
        console.error('Error:', error);
    }
};

const addToFavorites = async (movie) => {
    const url = 'http://localhost:3000/movies'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie)
    };
    const response = await fetch(url, options);
    const data = response.json()
    return data
}

const removeFromFavorites = async (id) => {
    const url = `http://localhost:3000/movies/${id}`
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    }
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            console.error('Failed to remove movie', response.status, response.statusText)
        } else {
            console.log('Movie removed successfully')
        }
    } catch (error) {
        console.error("Error removing movie", error)
    }
};

const clearSearchBar = () => {
    let input = document.getElementById('searchInput')
    input.value = ''
}


(() => {

    const favoriteBtn = document.getElementById('favorites')
    favoriteBtn.addEventListener('click', getFavorites)
    showPopularMovies()

    const home = document.getElementById('popular')
    home.addEventListener('click', () => {
        showPopularMovies()
        clearSearchBar()
    })
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
    const genreLinks = document.querySelectorAll('.genre-filter');
    genreLinks.forEach(link => {
        link.addEventListener('click', () => {
            const genreId = link.getAttribute('data-genre-id');
            getMoviesBySearch('', genreId)
            clearSearchBar(); // Pass an empty string for search query and genreId for filtering
        });
    });















})();