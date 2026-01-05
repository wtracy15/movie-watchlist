const watchlistSection = document.getElementById('watchlist')

document.addEventListener('click', function(e){
    if (e.target.closest("#search-btn")){
        window.location.href = 'index.html'
    }
    if (e.target.closest(".remove-watchlist-btn")){
        removeMovieFromWatchlist(e.target)
    }
})

initializeWatchlist()

function initializeWatchlist(){
    const watchlist = JSON.parse(localStorage.getItem('watchlist'))
    console.log(watchlist)
    if(watchlist.length !== 0 && watchlist !== null){
        console.log("watchlist is not")
        let watchlistHtml = ""
        watchlist.forEach(movie => {
            //TODO: Fix spanless title
            watchlistHtml += `
                <div class="movie" id=${movie.id}>
                    <img class="poster" src=${movie.img}>
                    <div class="movie-info">
                        <h3 class="title">${movie.title}</h3>
                        <div class="info-bar">
                            <p class="runtime">${movie.runtime}</p>
                            <p class="genre">${movie.genre}</p>
                            <button class="remove-watchlist-btn"><span class="minus">-</span> Remove from watchlist</button>
                        </div>
                        <p class="plot">${movie.plot}</p>
                    </div>
                </div>
            `
        })
        watchlistSection.innerHTML = watchlistHtml
    }
}

function removeMovieFromWatchlist(target){
    const movieElement = target.closest(".movie")
    const movieId = movieElement.id
    let watchlist = JSON.parse(localStorage.getItem("watchlist"))
    watchlist = watchlist.filter(movie => movie.id !== movieId)
    localStorage.setItem("watchlist", JSON.stringify(watchlist))
    movieElement.remove()
    
    if(watchlist.length === 0){
        watchlistSection.innerHTML = `
            <div class="no-watchlist">
                <p>Your watchlist is looking a little empty...</p>
            </div>
        `
    }
}