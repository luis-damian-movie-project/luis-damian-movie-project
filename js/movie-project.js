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
                <li class="grabTitle">Title: ${movie.title}</li>
                <li class="grabRelease">Release Date: ${movie.release_date}</li>
                <li class="grabImg">Poster Path: ${movie.poster_path}</li>
                <li class="grabSum">Overview: ${movie.overview}</li>
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
                const movieTitle = movieCard.querySelector('.grabTitle').innerText;
                const movieRelease = movieCard.querySelector('.grabRelease').innerText;
                const movieImg = movieCard.querySelector('.grabImg');
                const movieSum = movieCard.querySelector('.grabSum').innerText;

                const newMovie = {
                    title: movieTitle,
                    release: movieRelease,
                    img: movieImg,
                    sum: movieSum,
                }


                const response = await addToFavorites(newMovie)
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

        let isFirstSlide = true; // To determine the first slide

        for (let movie of movies.results) {
            let movieCard = document.createElement('div');
            movieCard.classList.add('movie-card')
            // Update the HTML content of the movie card
            movieCard.innerHTML = `
        
<!--        put code above down here-->
        <div class="card" style="width: 18rem;">
          <img class="grabImg" src="${imgUrl + movie.poster_path}" alt="${movie.title} Poster" class="card-img-top "/>
  <div class="card-body">
            <h5 class="card-title text-center grabTitle">${movie.title}</h5>
            <p class="card-text overview grabSum fs-7">${movie.overview}</p>
          <div class="card-body">
            <button id="save-btn" type="button" class="save-btn btn btn-info">Testing Fav</button>
            <button id="remove-btn" type="button" class="remove-btn btn btn-danger">Remove</button>
          </div>
  </div>
</div>
      `;

            // Add the carousel-item class only to the first slide
            if (isFirstSlide) {
                movieCard.classList.add('active');
                isFirstSlide = false;
            }

            // Rest of the code remains the same
            let removeButton = movieCard.querySelector('.remove-btn');
            removeButton.addEventListener('click', () => {
                movieCard.remove();
            });

            const saveButton = movieCard.querySelector('#save-btn');
            saveButton.addEventListener('click', addToFavorites);

            movieContainer.append(movieCard);
        }
    } catch (error) {
        console.error(error);
    }
};


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