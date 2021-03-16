// ombd api key = http://www.omdbapi.com/?apikey=[yourkey]&

// $('.search-button').on('click', function(){
//     $.ajax({
//         url: 'https://www.omdbapi.com/?apikey=edbec6cb&s=' + $(".input-keyword").val(),
//         success: res => {
//             const movies = res.Search;
//             console.log(movies);
    
//             let card = '';
//             movies.forEach(movie => {
//                 card += showMovies(movie);
//             });
    
//             $('.movie-container').html(card);
    
//             // KETIKA TOMBOL DETAIL DI KLIK
//             $('.detailBtn').on('click', function(){
//                 $.ajax({
//                     url: 'https://www.omdbapi.com/?apikey=edbec6cb&i=' + $(this).data("imdbid"),
//                     success: res => {
//                         const details = showDetails(res);
    
//                     $('.modal-body').html(details);
//                     },
//                     error: e => {
//                         console.log(e.responseText);
//                     }
//                 });
//             });
//         },
//         error: e => {
//             console.log(e.responseText);
//         }
//     })
// });

const searchButton = document.querySelector('.search-button');

searchButton.addEventListener('click', async () => {
    const inputKeyword = document.querySelector('.input-keyword');
    const movies = await fetch(`https://www.omdbapi.com/?apikey=edbec6cb&s=${inputKeyword.value}`)
        .then(response => response.json())
        .then(response => response.Search);
    updateUI(movies);

});

//event binding (kasih event ke element yang belum ada)
document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('detailBtn')) {
        const imdbid = e.target.dataset.imdbid;
        const detail = await fetch(`https://www.omdbapi.com/?apikey=edbec6cb&i=${imdbid}`)
            .then(response => response.json())
            .then(response => response);
        updateUIDetail(detail);
    }
})

function updateUI(movies){
    const movieContainer = document.querySelector('.movie-container');
    let card = '';
    movies.forEach(movie => {
        card += showMovies(movie);
    });

    movieContainer.innerHTML = card;
}

function updateUIDetail(detail){
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = showDetails(detail);
}

function showMovies(movie) {
    return `<div class="col-md-4 my-3">
    <div class="card">
        <img src="${movie.Poster}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${movie.Title}</h5>
            <h6 class="text-muted">${movie.Year}</h6>
            <a href="#" class="btn btn-primary detailBtn" data-bs-toggle="modal" 
            data-bs-target="#movieDetail" data-imdbid="${movie.imdbID}">Details</a>
        </div>
        </div>
    </div>`;
}

function showDetails(detail) {
    return `<div class="container-fluid">
    <div class="row">
        <div class="col-md-3">
            <img class="img-fluid" src="${detail.Poster}" alt="">
        </div>
        <div class="col-md">
            <ul class="list-group">
                <li class="list-group-item"><h4>${detail.Title} (${detail.Year})</h4></li>
                <li class="list-group-item"><strong>Director</strong><br> ${detail.Director}</li>
                <li class="list-group-item"><strong>Actor</strong><br>  ${detail.Actors}</li>
                <li class="list-group-item"><strong>Writer</strong><br>  ${detail.Writer}</li>
                <li class="list-group-item"><strong>Plot</strong><br>  ${detail.Plot}</li>
            </ul>
        </div>
    </div>
</div>`;
}
