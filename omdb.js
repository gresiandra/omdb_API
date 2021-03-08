// ombd api key = http://www.omdbapi.com/?apikey=[yourkey]&

$('.search-button').on('click', function(){
    $.ajax({
        url: 'http://www.omdbapi.com/?apikey=edbec6cb&s=' + $(".input-keyword").val(),
        success: res => {
            const movies = res.Search;
            console.log(movies);
    
            let card = '';
            movies.forEach(movie => {
                card += `<div class="col-md-4 my-3">
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
            });
    
            $('.movie-container').html(card);
    
            // KETIKA TOMBOL DETAIL DI KLIK
            $('.detailBtn').on('click', function(){
                $.ajax({
                    url: 'http://www.omdbapi.com/?apikey=edbec6cb&i=' + $(this).data("imdbid"),
                    success: res => {
                        const details = `<div class="container-fluid">
                        <div class="row">
                            <div class="col-md-3">
                                <img class="img-fluid" src="${res.Poster}" alt="">
                            </div>
                            <div class="col-md">
                                <ul class="list-group">
                                    <li class="list-group-item"><h4>${res.Title} (${res.Year})</h4></li>
                                    <li class="list-group-item"><strong>Director</strong><br> ${res.Director}</li>
                                    <li class="list-group-item"><strong>Actor</strong><br>  ${res.Actors}</li>
                                    <li class="list-group-item"><strong>Writer</strong><br>  ${res.Writer}</li>
                                    <li class="list-group-item"><strong>Plot</strong><br>  ${res.Plot}</li>
                                </ul>
                            </div>
                        </div>
                    </div>`;
    
                    $('.modal-body').html(details);
                    }
                });
            });
        },
        error: e => {
            console.log(e.responseText);
        }
    })
});
