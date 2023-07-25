// const searchInput = document.querySelector('#searchInput');


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
        const data =  await response.json();
        console.log(data)
        return data
    } catch (error) {

    }

}

// const displayMovie = () => {
//
// }


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