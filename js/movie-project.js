"use strict"

//This function retrieves movies from the api and displays them on the page from a search
const getMoviesBySearch = async (queryParam) => {
    const url = 'https://api.themoviedb.org/3/movie/popular';
    const imgUrl = 'https://image.tmdb.org/t/p/original'
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
        const movieContainer = document.getElementById('popularMovieCards')
        movieContainer.innerHTML = ('')
        for (let movie of movies.results) {
            // node needs to appear within id #div
            let movieCard = document.createElement('div')
            movieCard.innerHTML = `
        
<!--        put code above down here-->
            <div class="card" style="width: 18rem;">
            <img id="moviePoster" class="grabImg" src="${imgUrl + movie.poster_path}" alt="${movie.title} Poster" class="card-img-top "/>
           <div class="card-body">
            <h5 class="card-title text-center grabTitle">${movie.title}</h5>
            <p class="card-text overview grabSum fs-7">${movie.overview}</p>
            <p class="grabRelease">${movie.release_date}</p>
            <div class="card-body">
            <button id="save-btn" type="button" class="save-btn btn btn-info">Testing Fav</button>
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


const showPopularMovies = async () => {
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
        const response = await fetch(url, options);
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
            <button id="save-btn" type="button" class="save-btn btn btn-info">Testing Fav</button>
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
            let id = movie.id
            let removeButton = movieCard.querySelector('.remove-btn')
            removeButton.addEventListener('click', () => {
                movieCard.remove()
                removeFromFavorites(id);
            })
        }


    } catch (error) {

    }
}

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



(() => {
    getFavorites()

    // showPopularMovies()
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