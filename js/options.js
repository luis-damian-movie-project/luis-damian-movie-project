"use strict"

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

let movieCard = document.createElement('div')
movieCard.innerHTML = (`
                <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
            <h3 class="grabTitle pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">${movie.title}</h3>
            <ul class="d-flex list-unstyled mt-auto">
              <li class="me-auto">
                <img src="https://github.com/twbs.png" alt="Bootstrap" width="32" height="32" class="rounded-circle border border-white">
              </li>
              <li class="d-flex align-items-center me-3">
                <small>${movie.overview}</small>
              </li>
              <li class="d-flex align-items-center">
                <small>${movie.release_date}</small>
              </li>
              <button id="save-btn" type="button" class="save-btn btn btn-outline-primary">Testing Fav</button>
            </ul>
          </div>
            `);